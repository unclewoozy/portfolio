from flask import Flask, jsonify, send_file, request, send_from_directory
from pypdf import PdfReader
from pathlib import Path
import json
import os
import urllib.request
import urllib.error
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / '.env')
app = Flask(__name__, static_folder=str(ROOT_DIR), static_url_path='')


def _trim(value, max_length=3000):
    return str(value or '').strip()[:max_length]


def _json_response(data, status=200):
    return jsonify(data), status

# Get the resume path - handle both local and Vercel environments
def get_resume_path():
    # Try different possible locations
    paths = [
        Path(__file__).parent.parent / 'documents' / 'resume.pdf',  # Local organized structure
        Path(__file__).parent.parent / 'resume.pdf',  # Legacy local fallback
        Path('/var/task/resume.pdf'),  # Vercel serverless /var/task
        Path('/var/task/documents/resume.pdf'),  # Vercel serverless organized structure
        Path('resume.pdf'),  # Current directory
        Path('documents/resume.pdf'),  # Current directory organized structure
    ]
    
    for p in paths:
        if p.exists():
            return p
    
    return None

@app.route('/api/resume/download', methods=['GET', 'OPTIONS'])
def download_resume():
    """Download the resume PDF"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        resume_path = get_resume_path()
        if not resume_path:
            return jsonify({'error': 'Resume file not found'}), 404
        
        return send_file(
            resume_path,
            mimetype='application/pdf',
            as_attachment=True,
            download_name='Sigmund_Godfrey_Resume.pdf'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/file', methods=['GET', 'OPTIONS'])
def resume_file():
    """Return raw resume PDF for in-app rendering."""
    if request.method == 'OPTIONS':
        return '', 200

    try:
        resume_path = get_resume_path()
        if not resume_path:
            return jsonify({'error': 'Resume file not found'}), 404

        return send_file(
            resume_path,
            mimetype='application/pdf',
            as_attachment=False,
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/info', methods=['GET', 'OPTIONS'])
def get_resume_info():
    """Extract resume metadata and first page info"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        resume_path = get_resume_path()
        if not resume_path:
            return jsonify({'error': 'Resume file not found'}), 404
        
        reader = PdfReader(resume_path)
        num_pages = len(reader.pages)
        
        # Extract text from first page
        first_page_text = reader.pages[0].extract_text() if num_pages > 0 else ''
        
        # Get metadata
        metadata = reader.metadata if reader.metadata else {}
        
        return jsonify({
            'total_pages': num_pages,
            'title': metadata.get('/Title', 'Resume'),
            'author': metadata.get('/Author', 'Sigmund Godfrey'),
            'first_page_preview': first_page_text[:500],
            'size_mb': round(resume_path.stat().st_size / (1024 * 1024), 2)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/contact', methods=['POST', 'OPTIONS'])
def contact_message():
    """Send contact form emails through Resend."""
    if request.method == 'OPTIONS':
        return '', 200

    try:
        body = request.get_json(silent=True) or {}
        name = _trim(body.get('name'), 90)
        email = _trim(body.get('email'), 120)
        subject = _trim(body.get('subject'), 140)
        message = _trim(body.get('message'), 3000)
        website = _trim(body.get('website'), 120)

        # Basic spam trap and validation
        if website:
            return _json_response({'ok': True, 'message': 'Accepted'}, 200)

        if not name or not email or not subject or not message:
            return _json_response({'error': 'Missing required fields.'}, 400)

        if '@' not in email or '.' not in email.split('@')[-1]:
            return _json_response({'error': 'Invalid email address.'}, 400)

        resend_api_key = os.getenv('RESEND_API_KEY', '').strip()
        resend_from = os.getenv('RESEND_FROM_EMAIL', '').strip()
        resend_to = os.getenv('RESEND_TO_EMAIL', '').strip()

        if not resend_api_key or not resend_from or not resend_to:
            return _json_response({
                'error': 'Email service is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and RESEND_TO_EMAIL.'
            }, 500)

        resend_payload = {
            'from': resend_from,
            'to': [resend_to],
            'reply_to': email,
            'subject': f'Portfolio Contact: {subject}',
            'text': (
                f'Name: {name}\n'
                f'Email: {email}\n'
                f'Subject: {subject}\n\n'
                f'Message:\n{message}\n'
            ),
            'html': (
                '<h2>New Portfolio Contact Message</h2>'
                f'<p><strong>Name:</strong> {name}</p>'
                f'<p><strong>Email:</strong> {email}</p>'
                f'<p><strong>Subject:</strong> {subject}</p>'
                '<p><strong>Message:</strong></p>'
                f'<p>{message.replace(chr(10), "<br>")}</p>'
            )
        }

        req = urllib.request.Request(
            'https://api.resend.com/emails',
            data=json.dumps(resend_payload).encode('utf-8'),
            headers={
                'Authorization': f'Bearer {resend_api_key}',
                'Content-Type': 'application/json',
            },
            method='POST'
        )

        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                status_code = response.getcode()
                response_body = response.read().decode('utf-8')
                parsed = json.loads(response_body) if response_body else {}

                if status_code >= 400:
                    return _json_response({'error': parsed.get('message', 'Email send failed.')}, 502)

                return _json_response({'ok': True, 'id': parsed.get('id')}, 200)
        except urllib.error.HTTPError as http_error:
            error_body = http_error.read().decode('utf-8') if http_error.fp else ''
            try:
                parsed_error = json.loads(error_body) if error_body else {}
                resend_msg = parsed_error.get('message') or parsed_error.get('error')
            except Exception:
                resend_msg = None
            fallback = f'Email delivery failed (Resend {http_error.code}).'
            if not resend_msg and error_body:
                resend_msg = error_body[:300]
            return _json_response({'error': resend_msg or fallback}, 502)
        except urllib.error.URLError as url_error:
            return _json_response({'error': f'Unable to reach email provider: {url_error.reason}'}, 502)

    except Exception as e:
        return _json_response({'error': str(e)}, 500)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    resume_path = get_resume_path()
    return jsonify({
        'status': 'healthy',
        'resume_found': resume_path is not None,
        'resume_path': str(resume_path) if resume_path else 'Not found'
    }), 200

@app.route('/', methods=['GET'])
def serve_index():
    """Serve portfolio homepage for local development."""
    return send_from_directory(ROOT_DIR, 'index.html')

@app.route('/<path:asset_path>', methods=['GET'])
def serve_assets(asset_path):
    """Serve static assets for local development."""
    target = ROOT_DIR / asset_path
    if target.exists() and target.is_file():
        return send_from_directory(ROOT_DIR, asset_path)
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
