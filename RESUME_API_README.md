# Resume API Setup for Vercel Deployment

This portfolio now includes a Flask backend API for resume handling using pypdf.

## Project Structure

```
Portfolio/
├── index.html                 # Updated with Resume buttons
├── script.js                  # Added resume modal functionality
├── style.css                  # Added resume modal styling
├── resume.pdf                 # Your resume file
├── api/
│   ├── __init__.py
│   └── resume.py             # Flask API endpoints
├── requirements.txt          # Python dependencies
├── vercel.json              # Vercel configuration
└── .gitignore               # Git ignore file
```

## Features

- **Download Resume**: Direct download of resume.pdf
- **View Resume**: View resume in an embedded modal using PDF viewer
- **pypdf Integration**: Extract resume metadata and page information

## API Endpoints

- `GET /api/resume/download` - Download resume as PDF file
- `GET /api/resume/view` - Get resume as base64 for embedding
- `GET /api/resume/info` - Get resume metadata (pages, author, size)
- `GET /health` - Health check endpoint

## Local Testing

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run Flask locally:
   ```bash
   python api/resume.py
   ```

3. Access at `http://localhost:5000`

## Deployment to Vercel

1. Create a Vercel account and connect your GitHub repository
2. Vercel will automatically detect `vercel.json` and deploy accordingly
3. The Python API will run as serverless functions
4. Your static files (HTML, CSS, JS) will be served normally

## Environment Setup

The vercel.json file:
- Configures Python 3.9 runtime for the API
- Sets up routes to handle `/api/*` requests
- Adds CORS headers for API access
- Treats the project as a static site with serverless functions

## Notes

- Make sure `resume.pdf` is in the root directory
- The API uses pypdf for PDF processing
- All endpoints are serverless and scale automatically on Vercel
- Cold start time is typically < 1 second for lightweight Flask functions
