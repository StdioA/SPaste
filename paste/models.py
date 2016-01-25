from __future__ import unicode_literals

import json
from django.db import models

# Create your models here.
class Paste(models.Model):
    paste_hash = models.CharField(max_length=6)                                     # hash_ = md5(id_)[:6]
    content = models.TextField()
    create_time = models.DateTimeField("Create time")
    modified_time = models.DateTimeField("Last Modified")

    def getCreateTime(self):
        return self.create_time.strftime("%Y-%m-%d %H:%M:%S")

    def getModifiedTime(self):
        return self.modified_time.strftime("%Y-%m-%d %H:%M:%S")

    def __str__(self):
        return str(self.id)

    def getData(self):
        data = {
            "note": {
                "hash": self.paste_hash,
                "create_time": self.create_time.strftime("%Y-%m-%d %H:%M:%S"), 
                "modified_time": self.modified_time.strftime("%Y-%m-%d %H:%M:%S"),
                "content": self.content,
            }
        }
        return data
