import string
import random
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.core.urlresolvers import reverse
from django.utils import timezone

from models import Paste

# Create your views here.
def index(request):
    return render(request, "paste/index.html")

def new(request):
    while True:
        paste_hash = "".join([random.choice(string.digits+string.ascii_lowercase)
                        for i in range(6)])
        try:
            Paste.objects.get(paste_hash=paste_hash)
        except Paste.DoesNotExist:
            paste = Paste(create_time=timezone.now(),
                        modified_time=timezone.now(), 
                        paste_hash=paste_hash)
            paste.save()
            return HttpResponseRedirect(reverse('paste:edit', args=(paste.paste_hash, )))
        else:
            pass

def edit(request, hash_):
    hash_ = hash_.lower()
    paste = get_object_or_404(Paste, paste_hash=hash_)
    context = {
        "paste": paste,
    }
    return render(request, "paste/edit.html", context)

def api(request, hash_):
    hash_ = hash_.lower()
    try:
        paste = Paste.objects.get(paste_hash=hash_)
    except Paste.DoesNotExist:
        data = {"error": "not exist"}
    else:
        if request.method == "GET":
            return JsonResponse(paste.getData())
        elif request.method == "POST":
            content = request.POST["content"]
            paste.content = content
            paste.modified_time = timezone.now()
            paste.save()
            return JsonResponse(paste.getData())
    
    return Http404()
