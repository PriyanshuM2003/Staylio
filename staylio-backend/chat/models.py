import uuid
from django.db import models

from user.models import User


class Converstaion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    users = models.ManyToManyField(User, related_name="conversations")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


class ConversationMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Converstaion, related_name="messages", on_delete=models.CASCADE
    )
    body = models.TextField()
    sent_to = models.ForeignKey(
        User, related_name="received_messages", on_delete=models.CASCADE
    )
    created_by = models.ForeignKey(
        User, related_name="sent_messages", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
