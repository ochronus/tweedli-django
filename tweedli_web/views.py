from django.shortcuts import render


def index(request):
    return render(request, 'index.html', {"foo": "bar"},
                  content_type="text/html")
