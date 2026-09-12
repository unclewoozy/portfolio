import json

from django.conf import settings
from django.http import JsonResponse, FileResponse
from django.views.decorators.http import require_GET
from django.views.decorators.clickjacking import xframe_options_exempt

from .models import (
    Profile,
    NavLink,
    MarqueeItem,
    AboutParagraph,
    Education,
    Stat,
    WhatIDo,
    Experience,
    Project,
    Skill,
    SkillCategory,
    Certification,
    ContactIntro,
    ContactDetail,
)


def _media_url(field):
    if not field:
        return ''
    try:
        url = field.url
    except (ValueError, AttributeError):
        return ''
    return url if url.startswith(('/media/', '/static/')) else '/media/' + url.lstrip('/')


def _first_or_default(queryset):
    return queryset.first()


def build_site_data():
    profile = _first_or_default(Profile.objects.all())

    def profile_field(name, default):
        return getattr(profile, name) if profile else default

    def profile_json(name, default):
        value = profile_field(name, None)
        return value if isinstance(value, list) else default

    def list_field(model):
        return [m for m in model.objects.all()]

    projects = []
    for p in list_field(Project):
        gallery = [
            _media_url(img.image)
            for img in p.gallery.all()
        ]
        projects.append({
            'id': p.identifier,
            'title': p.title,
            'shortTitle': p.short_title or p.title,
            'date': p.date,
            'category': p.category,
            'cover': _media_url(p.cover),
            'gallery': gallery,
            'tags': p.tags,
            'description': p.description,
            'github': p.github,
            'demo': p.demo,
            'private': p.private,
        })

    return {
        'PROFILE': {
            'name': profile_field('name', ''),
            'firstName': profile_field('first_name', ''),
            'roles': profile_json('roles', []),
            'tagline': profile_field('tagline', ''),
            'location': profile_field('location', ''),
            'email': profile_field('email', ''),
            'phone': profile_field('phone', ''),
            'linkedin': profile_field('linkedin', ''),
            'resumeDownload': '/api/resume/download',
            'resumeView': '/api/resume/file',
            'photo': _media_url(profile.photo) if profile else '',
            'statusPills': profile_json('status_pills', []),
            'metrics': profile_json('metrics', []),
        },
        'NAV_LINKS': [
            {'id': n.identifier, 'label': n.label}
            for n in list_field(NavLink)
        ],
        'MARQUEE_ITEMS': [m.name for m in list_field(MarqueeItem)],
        'ABOUT': {
            'paragraphs': [p.text for p in list_field(AboutParagraph)],
            'education': [
                {
                    'logo': _media_url(e.logo),
                    'school': e.school,
                    'program': e.program,
                    'years': e.years,
                    'location': e.location,
                }
                for e in list_field(Education)
            ],
            'stats': [
                {'value': s.value, 'suffix': s.suffix, 'label': s.label, 'icon': s.icon}
                for s in list_field(Stat)
            ],
            'whatIDo': [
                {'icon': w.icon, 'title': w.title, 'desc': w.desc}
                for w in list_field(WhatIDo)
            ],
        },
        'EXPERIENCE': [
            {
                'logos': [str(l) for l in e.logos],
                'company': e.company,
                'role': e.role,
                'date': e.date,
                'location': e.location,
                'summary': e.summary,
                'detail': e.detail,
                'highlights': e.highlights,
            }
            for e in list_field(Experience)
        ],
        'PROJECTS': projects,
        'SKILLS': {
            'featured': [
                {'icon': s.icon, 'name': s.name}
                for s in list_field(Skill)
                if s.featured
            ],
            'categories': [
                {'icon': c.icon, 'title': c.title, 'tags': c.tags}
                for c in list_field(SkillCategory)
            ],
        },
        'CERTIFICATIONS': [
            {
                'image': _media_url(c.image),
                'title': c.title,
                'issuer': c.issuer,
                'date': c.date,
                'verify': c.verify,
                'viewable': c.viewable,
            }
            for c in list_field(Certification)
        ],
        'CONTACT': {
            'intro': [i.text for i in list_field(ContactIntro)],
            'details': [
                {
                    'icon': d.icon,
                    'label': d.label,
                    'value': d.value,
                    'href': d.href,
                }
                for d in list_field(ContactDetail)
            ],
        },
    }


@require_GET
def site_data(request):
    return JsonResponse(build_site_data(), safe=False)


def _resume_path():
    candidates = [
        settings.BASE_DIR / 'documents' / 'resume.pdf',
        settings.MEDIA_ROOT / 'documents' / 'resume.pdf',
        settings.ROOT_DIR / 'documents' / 'resume.pdf',
        settings.ROOT_DIR / 'public' / 'documents' / 'resume.pdf',
    ]
    for p in candidates:
        if p.exists():
            return p
    return None


@require_GET
def resume_download(request):
    path = _resume_path()
    if not path:
        return JsonResponse({'error': 'Resume file not found'}, status=404)
    response = FileResponse(open(path, 'rb'), as_attachment=True, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="Sigmund_Godfrey_Resume.pdf"'
    return response


@xframe_options_exempt
@require_GET
def resume_file(request):
    path = _resume_path()
    if not path:
        return JsonResponse({'error': 'Resume file not found'}, status=404)
    response = FileResponse(open(path, 'rb'), content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="resume.pdf"'
    return response


@require_GET
def health(request):
    return JsonResponse({'status': 'healthy'})
