from rest_framework import serializers

from .models import Converstaion, ConversationMessage

from user.serializers import UserDetailSerializer


class ConversationListSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Converstaion
        fields = ("id", "users", "modified_at")
