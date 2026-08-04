# Sigmund's Portfolio

An IDE-themed portfolio SPA (React + Tailwind + Vite) served by a **Django** backend. All site content — projects, certifications, skills, experience, profile, contact — is stored in the database and editable through the Django admin at `/admin/`.

## Architecture

- `src/` — React frontend (Vite + Tailwind v4). All content reads from a single `/api/site/` JSON endpoint via `src/SiteData.jsx`. If the API is unreachable it falls back to the bundled `src/data/site.js`, so the frontend also runs standalone.
- `backend/` — Django 6 + SQLite locally (`backend/db.sqlite3`), switching automatically to a managed Postgres on Vercel via the `DATABASE_URL` env var. Models mirror the old `site.js` structure; Django admin manages every record; uploaded images live in `backend/media/`.
- `vercel.json` — routes `/admin`, `/api`, `/media`, `/health` and the SPA fallback to the Django WSGI function at `backend/config/wsgi.py`; `buildCommand` builds `dist/` first.
- `public/` — legacy static assets (still copied to `media/` by the seed command).

## Quick start

### 1. Install

Frontend:

```bash
npm install
```

Backend (once, into `backend/venv`):

```bash
python -m venv backend\venv
backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

### 2. Migrate + seed the database

```bash
npm run db:migrate
npm run db:seed
```

`db:seed` reads `src/data/site.js` (via Node) and writes every record into SQLite, copying image files from `public/` into `backend/media/`. Use `npm run db:seed:wipe` to reset content from the JS file first.

### 3. Create an admin account

```bash
npm run db:createsuperuser
```

Then log in at `http://127.0.0.1:8000/admin/`.

### 4. Build the SPA (required before serving from Django)

```bash
npm run build
```

### 5. Run the site

```bash
npm run db:run
```

Open `http://127.0.0.1:8000/`. Django serves the built SPA, `/api/...` endpoints, uploaded `/media/...` files, and `/admin/`.

## Development with hot reload

Run Django for the API/media on port 8000, and Vite on 5173 in a second terminal (Vite proxies `/api` and `/media` to Django):

```bash
npm run db:run          # terminal 1
npm run dev             # terminal 2 -> http://localhost:5173
```

## Managing content

Go to `/admin/` and edit any model. Notable ones:

- **Projects** — title, cover, tags, description, GitHub/demo links, and gallery screenshots (inline `ProjectImage` rows). Set `featured` for the hero project (first in list order = hero).
- **Certifications** — upload cert image, set issuer/date, add a `verify` credential URL, or tick `viewable` to make it open in a full-size modal.
- Everything else (profile, about, skills, experience, contact) is a model too.

After editing in admin, changes appear immediately — no rebuild needed.

## Deploying to Vercel (Django + Postgres)

Serverless function filesystems are ephemeral, so SQLite edits won't persist in production. This project is already deployed to a managed Postgres:

- **Production URL:** https://portfolio-sigmunds-projects-8ab98c01.vercel.app
- **Database:** Neon Postgres (`neon-champagne-ball`), connected via the `DATABASE_URL` env var.
- **Env vars set in Vercel:** `DATABASE_URL` (Neon), `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=false`, plus the existing `RESEND_*` vars.
- `vercel.json` routes everything to the Django function at `backend/config/wsgi.py`; the `buildCommand` builds the SPA into `dist/`, which Django serves.
- `backend/media/` is committed to git, so the seeded images ship with the function bundle.
- Admin credentials on Postgres: username `admin` / password `admin12345` (change in production).

To re-deploy:

```bash
npx vercel deploy --prod
```

**Persistent uploads:** admin uploads on Vercel go to the ephemeral disk (lost on cold start). For persistent uploads, add an S3-compatible backend via `DEFAULT_FILE_STORAGE` (e.g. `django-storages` + Cloudflare R2). Local uploads to `backend/media/` keep working regardless.

## Notes

- To re-seed from `site.js` after schema changes: `npm run db:seed:wipe` (against whatever `DATABASE_URL` points at, or SQLite if unset).
