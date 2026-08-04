from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views.static import serve


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('content.urls')),
]

# Serve uploaded media. Guarded on directory existence so it also works on
# Vercel (read-only bundle, DEBUG off). `static()` is DEBUG-only, so use the
# raw `serve` view instead.
if settings.MEDIA_ROOT.exists():
    urlpatterns += [
        re_path(
            r'^media/(?P<path>.*)$',
            serve,
            kwargs={'document_root': str(settings.MEDIA_ROOT)},
            name='media',
        )
    ]

# Serve collected static (admin CSS/JS) in production too. Run
# `python manage.py collectstatic` before deploying to Vercel.
if settings.STATIC_ROOT.exists():
    urlpatterns += [
        re_path(
            r'^static/(?P<path>.*)$',
            serve,
            kwargs={'document_root': str(settings.STATIC_ROOT)},
            name='static',
        )
    ]

# Serve the built React SPA (dist/) so the whole site runs from one server.
# Everything that isn't /api/, /admin/, /media/ or /static/ falls through to index.html.
if settings.DIST_DIR.exists():
    urlpatterns += [
        re_path(
            r'^(?!api/|admin/|media/|static/)(?P<path>.+\.(?:js|css|png|jpg|jpeg|webp|svg|ico|woff2?|pdf|avif))$',
            serve,
            kwargs={'document_root': str(settings.DIST_DIR)},
            name='dist-assets',
        ),
        re_path(
            r'^(?!api/|admin/|media/|static/).*$',
            TemplateView.as_view(template_name='index.html'),
            name='spa-fallback',
        ),
    ]
