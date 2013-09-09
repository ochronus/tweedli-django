from django.db import models
from django.contrib.auth.models import User


class Schedule(models.Model):
    when = models.PositiveIntegerField(db_index=True)                    #GMT
    tz_compensation = models.BigIntegerField(default=0, db_index=True)     # +/- seconds from GMT time
    user = models.ForeignKey(User, db_index=True)

class Tweet(models.Model):
    text = models.CharField(max_length=140)
    user = models.ForeignKey(User, db_index=True)
    order_id = models.SmallIntegerField(db_index=True)
    tweeted_at = models.PositiveIntegerField(default=None)

class TweetImage(models.Model):
    url = models.CharField(max_length=4096)
    tweet = models.ForeignKey(Tweet)