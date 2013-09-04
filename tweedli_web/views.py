from django.shortcuts import render


def index(request):
    if request.user.is_authenticated():
        return render(request, 'main.html', {"foo": "bar"},
                    content_type="text/html")
    else:
        return render(request, 'index.html', {"foo": "bar"},
                    content_type="text/html")
