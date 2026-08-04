from django.db import models


class OrderedModel(models.Model):
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        abstract = True
        ordering = ['order', 'id']


class Profile(OrderedModel):
    name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=120)
    roles = models.JSONField(default=list)
    tagline = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=60, blank=True)
    linkedin = models.URLField(blank=True)
    photo = models.ImageField(upload_to='profile/', blank=True)
    status_pills = models.JSONField(default=list)
    metrics = models.JSONField(default=list)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.name


class NavLink(OrderedModel):
    identifier = models.SlugField(unique=True)
    label = models.CharField(max_length=60)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.label


class MarqueeItem(OrderedModel):
    name = models.CharField(max_length=120)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.name


class AboutParagraph(OrderedModel):
    text = models.TextField()

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.text[:60]


class Education(OrderedModel):
    logo = models.ImageField(upload_to='about/', blank=True)
    school = models.CharField(max_length=200)
    program = models.CharField(max_length=200, blank=True)
    years = models.CharField(max_length=60, blank=True)
    location = models.CharField(max_length=200, blank=True)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.school


class Stat(OrderedModel):
    value = models.IntegerField(default=0)
    suffix = models.CharField(max_length=10, blank=True)
    label = models.CharField(max_length=120)
    icon = models.CharField(max_length=60, blank=True)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.label


class WhatIDo(OrderedModel):
    icon = models.CharField(max_length=60, blank=True)
    title = models.CharField(max_length=120)
    desc = models.TextField()

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.title


class Experience(OrderedModel):
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    date = models.CharField(max_length=60, blank=True)
    location = models.CharField(max_length=200, blank=True)
    summary = models.TextField(blank=True)
    detail = models.TextField(blank=True)
    highlights = models.JSONField(default=list)
    logos = models.JSONField(default=list)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return f'{self.role} — {self.company}'


class Project(OrderedModel):
    identifier = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    short_title = models.CharField(max_length=200, blank=True)
    date = models.CharField(max_length=60, blank=True)
    category = models.CharField(max_length=120, blank=True)
    cover = models.ImageField(upload_to='projects/', blank=True)
    tags = models.JSONField(default=list)
    description = models.JSONField(default=list)
    github = models.URLField(blank=True)
    demo = models.URLField(blank=True)
    featured = models.BooleanField(default=False)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.title


class ProjectImage(OrderedModel):
    project = models.ForeignKey(Project, related_name='gallery', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/')

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return f'{self.project.short_title or self.project.title} #{self.order}'


class Skill(OrderedModel):
    icon = models.CharField(max_length=120, blank=True)
    name = models.CharField(max_length=120)
    featured = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.name


class SkillCategory(OrderedModel):
    icon = models.CharField(max_length=60, blank=True)
    title = models.CharField(max_length=120)
    tags = models.JSONField(default=list)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.title


class Certification(OrderedModel):
    image = models.ImageField(upload_to='certs/', blank=True)
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=120)
    date = models.CharField(max_length=60, blank=True)
    verify = models.URLField(blank=True)
    viewable = models.BooleanField(default=False)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return f'{self.title} — {self.issuer}'


class ContactIntro(OrderedModel):
    text = models.TextField()

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.text[:60]


class ContactDetail(OrderedModel):
    icon = models.CharField(max_length=60, blank=True)
    label = models.CharField(max_length=120)
    value = models.CharField(max_length=200)
    href = models.CharField(max_length=300, blank=True)

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return self.label
