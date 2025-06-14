from rest_framework import serializers

from .models import Converstaion, ConversationMessage
from user.serializers import UserDetailSerializer
from user.models import User


class ConversationListSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Converstaion
        fields = ("id", "users", "modified_at")


class ConversationCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(
        write_only=True, help_text="ID of the user to create conversation with"
    )

    class Meta:
        model = Converstaion
        fields = ("user_id",)

    def create(self, validated_data):
        validated_data.pop("user_id")
        conversation = Converstaion.objects.create()
        return conversation

    def validate_user_id(self, value):
        """Validate that the provided user ID exists"""
        try:
            User.objects.get(id=value)
            return value
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this ID does not exist")
