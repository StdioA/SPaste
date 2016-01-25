from django.conf.urls import include, url
import views

app_name = 'paste'
urlpatterns = [
	url(r'^new/', views.new, name='new'),
	url(r'^(?P<hash_>[0-9a-fA-F]{6})/', views.edit, name='edit'),
	url(r'^api/paste/(?P<hash_>[0-9a-fA-F]{6})/', views.api, name='api'),
	url(r'^', views.index, name='index'),
]
