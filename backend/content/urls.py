from django.urls import path
from . import views

urlpatterns = [
    path('api/site/', views.site_data, name='site-data'),
    path('api/resume/download', views.resume_download, name='resume-download'),
    path('api/resume/file', views.resume_file, name='resume-file'),
    path('api/contact', views.contact_message, name='contact'),
    path('health', views.health, name='health'),
]
