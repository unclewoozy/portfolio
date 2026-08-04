"""
Django settings for config project.

The backend owns all portfolio content (SQLite) and exposes it via JSON APIs.
The built React SPA (dist/) is served by Django for local production-style runs.
"""

from pathlib import Path
import os

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parent.parent.parent / '.env')
except ImportError:
    pass

BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BASE_DIR.parent

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-b$03z8(^%7!ufto)s7lz+w*=-t+p!laoz--n4#@j$u$03jz1u6')

DEBUG = os.environ.get('DJANGO_DEBUG', 'true').lower() in ('1', 'true', 'yes')

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'content',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ROOT_DIR / 'dist'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# On Vercel (serverless) the filesystem is ephemeral, so SQLite edits won't
# persist. Set DATABASE_URL to a managed Postgres (e.g. Neon/Supabase) and the
# app switches automatically. Locally it stays on SQLite.
if os.environ.get('DATABASE_URL'):
    import dj_database_url  # type: ignore
    DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=False)

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Manila'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Uploaded content lives under backend/media/ (project covers, cert images, ...)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Django also serves the prebuilt Vite output so the whole site runs from one
# server (python manage.py runserver). Files that live in the old public/
# folder are copied into MEDIA_ROOT by the seed command.
DIST_DIR = ROOT_DIR / 'dist'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
