from django.conf.urls import patterns, include, url
from .views import index

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'tweedli_web.views.home', name='home'),
                       # url(r'^tweedli_web/', include('tweedli_web.foo.urls')),

                       # Uncomment the admin/doc line below to enable admin
                       # documentation:
                       url(r'^admin/doc/', include(
                           'django.contrib.admindocs.urls')),

                       # Uncomment the next line to enable the admin:
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'', include('social_auth.urls')),
                       url(r'^logged-in/', index),
                       url(r'^$', index),
                       )
