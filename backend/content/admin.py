from django.contrib import admin
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
    ProjectImage,
    Skill,
    SkillCategory,
    Certification,
    ContactIntro,
    ContactDetail,
)


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ['image', 'order']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'first_name', 'location', 'email']
    list_editable = ['first_name']


@admin.register(NavLink)
class NavLinkAdmin(admin.ModelAdmin):
    list_display = ['label', 'identifier', 'order']
    list_editable = ['order']


@admin.register(MarqueeItem)
class MarqueeItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    list_editable = ['order']


@admin.register(AboutParagraph)
class AboutParagraphAdmin(admin.ModelAdmin):
    list_display = ['text', 'order']
    list_editable = ['order']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['school', 'program', 'years', 'order']
    list_editable = ['order']


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'suffix', 'order']
    list_editable = ['order']


@admin.register(WhatIDo)
class WhatIDoAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'date', 'order']
    list_editable = ['order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'date', 'featured', 'order']
    list_editable = ['featured', 'order']
    list_filter = ['category', 'featured']
    search_fields = ['title', 'short_title', 'tags']
    inlines = [ProjectImageInline]
    prepopulated_fields = {'identifier': ('title',)}


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'featured', 'order']
    list_editable = ['featured', 'order']


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'issuer', 'date', 'viewable', 'order']
    list_editable = ['viewable', 'order']
    list_filter = ['issuer']


@admin.register(ContactIntro)
class ContactIntroAdmin(admin.ModelAdmin):
    list_display = ['text', 'order']
    list_editable = ['order']


@admin.register(ContactDetail)
class ContactDetailAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'order']
    list_editable = ['order']
