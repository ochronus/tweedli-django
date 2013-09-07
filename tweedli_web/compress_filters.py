from __future__ import absolute_import
from compressor.filters.base import CompilerFilter
import hashlib
from django.conf import settings
from django.core.cache import cache

KEY = "compress:{digest}"


def get_file(digest):
    key = KEY.format(digest=digest)
    return cache.get(key)


def set_file(digest, value):
    key = KEY.format(digest=digest)
    cache.set(key, value)


class CleanCSSFilter(CompilerFilter):
    command = 'cleancss'

    def input(self, **kwargs):
        content_hash = hashlib.sha1(self.content.encode('utf8')).hexdigest()
        filter_content = get_file(content_hash)
        if filter_content is not None:
            return filter_content
        filter_content = super(CleanCSSFilter, self).input(**kwargs)
        set_file(content_hash, filter_content)
        return filter_content


class UglifyJSFilter(CompilerFilter):
    command = 'uglifyjs -'

    def input(self, **kwargs):
        content_hash = hashlib.sha1(self.content.encode('utf8')).hexdigest()
        filter_content = get_file(content_hash)
        if filter_content is not None:
            return filter_content
        filter_content = super(UglifyJSFilter, self).input(**kwargs)
        set_file(content_hash, filter_content)
        return filter_content