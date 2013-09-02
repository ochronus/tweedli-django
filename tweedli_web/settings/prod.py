from .common import *  # noqa

ALLOWED_HOSTS = ['tweed.li']
COMPRESS_URL = "http://cdn1.tweed.li/static/"
COMPRESS_OFFLINE = True
DEBUG = False
TEMPLATE_DEBUG = False


DATABASES = {
    'default': {
        # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'ENGINE': 'django.db.backends.sqlite3',
        # Or path to database file if using sqlite3.
        'NAME': '/var/www/devel.db',
        # The following settings are not used with sqlite3:
        'USER': '',
        'PASSWORD': '',
        # Empty for localhost through domain sockets or '127.0.0.1' for
        # localhost through TCP.
        'HOST': '',
        'PORT': '',                      # Set to empty string for default.
    }
}


STATIC_URL = COMPRESS_URL


SENTRY_DSN = 'http://c5ac7afcbe6d46ca9876376ec1364c1c:aa4e20f986ac41a49ced8d8eaf88f34e@sentry.mostof.it/4'

# Add raven to the list of installed apps
INSTALLED_APPS = INSTALLED_APPS + (
    'raven.contrib.django.raven_compat',
)

SESSION_ENGINE = 'redis_sessions.session'
SESSION_REDIS_UNIX_DOMAIN_SOCKET_PATH = '/var/run/redis/redis.sock'
SESSION_REDIS_PREFIX = 'tweedli_sessions'
SESSION_REDIS_DB = 777

CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': '/var/run/redis/redis.sock',
        'OPTIONS': {
            'DB': 778,
            'PARSER_CLASS': 'redis.connection.HiredisParser'
        },
    },
}
