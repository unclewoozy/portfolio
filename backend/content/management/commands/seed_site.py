import json
import shutil
import subprocess
import tempfile
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from content.models import (
    Profile,
    NavLink,
    MarqueeItem,
    AboutParagraph,
    Education,
    Stat,
    WhatIDo,
    Experience,
    Project,
    ProjectImage,
    Skill,
    SkillCategory,
    Certification,
    ContactIntro,
    ContactDetail,
)


class Command(BaseCommand):
    help = 'Seed SQLite with the content currently in src/data/site.js (and copy images).'

    def add_arguments(self, parser):
        parser.add_argument('--wipe', action='store_true', help='Delete existing content records first.')

    def handle(self, *args, **options):
        data = self._load_site_data()
        if options['wipe']:
            self._wipe()

        self._copy_images()

        self._seed_profile(data['PROFILE'])
        self._seed_simple(NavLink, data['NAV_LINKS'], {'label': 'label'})
        self._seed_marquee(data['MARQUEE_ITEMS'])
        self._seed_about(data['ABOUT'])
        self._seed_experience(data['EXPERIENCE'])
        self._seed_projects(data['PROJECTS'])
        self._seed_skills(data['SKILLS'])
        self._seed_certs(data['CERTIFICATIONS'])
        self._seed_contact(data['CONTACT'])

        self.stdout.write(self.style.SUCCESS('Seed complete.'))

    # ---------- helpers ----------

    def _load_site_data(self):
        root = settings.ROOT_DIR
        site_js = root / 'src' / 'data' / 'site.js'
        with tempfile.NamedTemporaryFile('w', suffix='.mjs', delete=False, encoding='utf-8') as tmp:
            tmp.write(
                "import { PROFILE, NAV_LINKS, MARQUEE_ITEMS, ABOUT, EXPERIENCE, PROJECTS, "
                "SKILLS, CERTIFICATIONS, CONTACT } from 'file:///"
                + str(site_js).replace('\\', '/').replace("'", "\\'")
                + "';\n"
                "console.log(JSON.stringify({ PROFILE, NAV_LINKS, MARQUEE_ITEMS, ABOUT, EXPERIENCE, "
                "PROJECTS, SKILLS, CERTIFICATIONS, CONTACT }));\n"
            )
            tmp_path = Path(tmp.name)
        try:
            result = subprocess.run(
                ['node', str(tmp_path)],
                capture_output=True,
                text=True,
                check=True,
                cwd=str(root),
            )
            return json.loads(result.stdout)
        finally:
            tmp_path.unlink(missing_ok=True)

    def _wipe(self):
        for model in [
            ContactDetail, ContactIntro, Certification, SkillCategory, Skill,
            ProjectImage, Project, Experience, WhatIDo, Stat, Education,
            AboutParagraph, MarqueeItem, NavLink, Profile,
        ]:
            model.objects.all().delete()

    def _copy_images(self):
        public = settings.ROOT_DIR / 'public'
        media = settings.MEDIA_ROOT
        if not public.exists():
            return
        copied = 0
        for src in public.rglob('*'):
            if not src.is_file():
                continue
            rel = src.relative_to(public)
            dst = media / rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            if not dst.exists():
                shutil.copy2(src, dst)
                copied += 1
        self.stdout.write(f'Copied {copied} new file(s) into media/.')
        self._copy_resume()

    def _copy_resume(self):
        candidates = [
            settings.ROOT_DIR / 'documents' / 'resume.pdf',
            settings.ROOT_DIR / 'public' / 'documents' / 'resume.pdf',
        ]
        for src in candidates:
            if src.exists():
                dst = settings.MEDIA_ROOT / 'documents' / 'resume.pdf'
                dst.parent.mkdir(parents=True, exist_ok=True)
                if not dst.exists():
                    shutil.copy2(src, dst)
                    self.stdout.write(f'Copied resume to {dst}')
                return

    def _copy_file(self, url, subdir):
        """Copy a public/ file referenced by a leading / URL into media, preserving its
        relative path so files with the same basename (e.g. gallery 1.jpg) never collide."""
        if not url or url.startswith(('http://', 'https://')):
            return url
        clean = url.lstrip('/')
        src = settings.ROOT_DIR / 'public' / clean
        if not src.exists():
            return url
        dst = settings.MEDIA_ROOT / clean
        dst.parent.mkdir(parents=True, exist_ok=True)
        if not dst.exists():
            shutil.copy2(src, dst)
        return clean

    # ---------- seeders ----------

    def _seed_profile(self, p):
        photo = self._copy_file(p.get('photo', ''), 'profile')
        obj, _ = Profile.objects.get_or_create(
            name=p['name'],
            defaults={
                'first_name': p.get('firstName', ''),
                'roles': p.get('roles', []),
                'tagline': p.get('tagline', ''),
                'location': p.get('location', ''),
                'email': p.get('email', ''),
                'phone': p.get('phone', ''),
                'linkedin': p.get('linkedin', ''),
                'photo': photo,
                'status_pills': p.get('statusPills', []),
                'metrics': p.get('metrics', []),
            },
        )
        self.stdout.write(f'Profile: {obj.name}')

    def _seed_simple(self, model, items, mapping, existing_keys=()):
        for i, item in enumerate(items):
            kwargs = {}
            for key, attr in mapping.items():
                kwargs[attr] = item.get(key)
            if model is NavLink:
                identifier = item.get('id') or item.get('identifier')
            else:
                identifier = None
            obj = None
            if identifier:
                obj = model.objects.filter(identifier=identifier).first()
            if obj is None:
                obj = model()
                for attr, value in kwargs.items():
                    setattr(obj, attr, value)
            for attr, value in kwargs.items():
                setattr(obj, attr, value)
            obj.order = i
            if identifier:
                obj.identifier = identifier
            obj.save()

    def _seed_marquee(self, items):
        MarqueeItem.objects.all().delete()
        for i, name in enumerate(items):
            MarqueeItem.objects.create(name=name, order=i)
        self.stdout.write(f'Marquee: {len(items)} items')

    def _seed_about(self, about):
        AboutParagraph.objects.all().delete()
        for i, text in enumerate(about.get('paragraphs', [])):
            AboutParagraph.objects.create(text=text, order=i)

        Education.objects.all().delete()
        for i, e in enumerate(about.get('education', [])):
            logo = self._copy_file(e.get('logo', ''), 'about')
            Education.objects.create(
                logo=logo, school=e['school'], program=e.get('program', ''),
                years=e.get('years', ''), location=e.get('location', ''), order=i,
            )

        Stat.objects.all().delete()
        for i, s in enumerate(about.get('stats', [])):
            Stat.objects.create(
                value=s.get('value', 0), suffix=s.get('suffix', ''),
                label=s['label'], icon=s.get('icon', ''), order=i,
            )

        WhatIDo.objects.all().delete()
        for i, w in enumerate(about.get('whatIDo', [])):
            WhatIDo.objects.create(icon=w.get('icon', ''), title=w['title'], desc=w.get('desc', ''), order=i)

    def _seed_experience(self, items):
        Experience.objects.all().delete()
        for i, e in enumerate(items):
            logos = []
            for logo_url in e.get('logos', []):
                logos.append(self._copy_file(logo_url, 'experience'))
            Experience.objects.create(
                company=e['company'], role=e['role'], date=e.get('date', ''),
                location=e.get('location', ''), summary=e.get('summary', ''),
                detail=e.get('detail', ''), highlights=e.get('highlights', []),
                logos=logos, order=i,
            )
        self.stdout.write(f'Experience: {len(items)} entries')

    def _seed_projects(self, items):
        Project.objects.all().delete()
        for i, p in enumerate(items):
            cover = self._copy_file(p.get('cover', ''), 'projects')
            project = Project.objects.create(
                identifier=p['id'], title=p['title'], short_title=p.get('shortTitle', ''),
                date=p.get('date', ''), category=p.get('category', ''),
                cover=cover, tags=p.get('tags', []), description=p.get('description', []),
                github=p.get('github', ''), demo=p.get('demo', ''),
                featured=(i == 0), order=i,
            )
            for j, gurl in enumerate(p.get('gallery', [])):
                gpath = self._copy_file(gurl, 'projects')
                if gpath != gurl:
                    gurl = gpath
                ProjectImage.objects.create(project=project, image=gurl, order=j)
        self.stdout.write(f'Projects: {len(items)} entries')

    def _seed_skills(self, skills):
        Skill.objects.all().delete()
        for i, s in enumerate(skills.get('featured', [])):
            Skill.objects.create(icon=s.get('icon', ''), name=s['name'], featured=True, order=i)
        SkillCategory.objects.all().delete()
        for i, c in enumerate(skills.get('categories', [])):
            SkillCategory.objects.create(icon=c.get('icon', ''), title=c['title'], tags=c.get('tags', []), order=i)

    def _seed_certs(self, items):
        Certification.objects.all().delete()
        for i, c in enumerate(items):
            image = self._copy_file(c.get('image', ''), 'certs')
            Certification.objects.create(
                image=image, title=c['title'], issuer=c['issuer'],
                date=c.get('date', ''), verify=c.get('verify', ''),
                viewable=c.get('viewable', False), order=i,
            )
        self.stdout.write(f'Certifications: {len(items)} entries')

    def _seed_contact(self, contact):
        ContactIntro.objects.all().delete()
        for i, text in enumerate(contact.get('intro', [])):
            ContactIntro.objects.create(text=text, order=i)
        ContactDetail.objects.all().delete()
        for i, d in enumerate(contact.get('details', [])):
            ContactDetail.objects.create(
                icon=d.get('icon', ''), label=d['label'], value=d['value'],
                href=d.get('href', ''), order=i,
            )
