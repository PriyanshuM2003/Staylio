from django.urls import path
from . import api

urlpatterns = [
    path("", api.conversations_list, name="api_conversations_list"),
    path("create/", api.conversations_create, name="api_conversations_create"),
    path("<uuid:pk>/", api.conversation_detail, name="api_conversation_detail"),
]
