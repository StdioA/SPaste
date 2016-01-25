from hashlib import md5
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.core.urlresolvers import reverse
from django.utils import timezone

from models import Paste

# Create your views here.
def index(request):
	return render(request, "paste/index.html")

def new(request):
	paste = Paste(create_time = timezone.now(),
				modified_time = timezone.now())
	paste.save()
	h = md5()
	h.update(str(paste.id))
	paste.paste_hash = h.hexdigest()[:6]
	paste.save()

	return HttpResponseRedirect(reverse('paste:edit', args=(paste.paste_hash, )))

def edit(request, hash_):
	paste = get_object_or_404(Paste, paste_hash = hash_)
	context = {
		"paste": paste,
	}
	return render(request, "paste/edit.html", context)

def api(request, hash_):
	if request.method == "GET":
		return HttpResponse("GET")
	elif request.method == "POST":
		return HttpResponse("POST")
	
	return Http404()
