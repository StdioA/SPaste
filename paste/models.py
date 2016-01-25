from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Paste(models.Model):
	paste_hash = models.CharField(max_length=6)										# hash_ = md5(id_)[:6]
	content = models.TextField()
	create_time = models.DateTimeField("Create time")
	modified_time = models.DateTimeField("Last Modified")

	def getCreateTime(self):
		return self.create_time.strftime("%Y-%m-%d %H:%M")

	def getModifiedTime(self):
		return self.modified_time.strftime("%Y-%m-%d %H:%M")

	def __str__(self):
		return str(self.id)
