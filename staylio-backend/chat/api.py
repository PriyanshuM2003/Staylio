from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from .models import Conversation
from .serializers import (
    ConversationListSerializer,
    ConversationCreateSerializer,
    ConversationDetailSerializer,
)
from user.models import User


@api_view(["GET"])
def conversations_list(request):
    serializer = ConversationListSerializer(request.user.conversations.all(), many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(["POST"])
def conversations_create(request):
    serializer = ConversationCreateSerializer(data=request.data)

    if serializer.is_valid():
        conversation = serializer.save()

        user_id = serializer.validated_data["user_id"]
        try:
            target_user = User.objects.get(id=user_id)
            conversation.users.add(request.user, target_user)
        except User.DoesNotExist:
            return Response(
                {"error": "User with this ID does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        response_serializer = ConversationListSerializer(conversation)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def conversation_detail(request, pk):
    conversation = request.user.conversations.get(pk=pk)
    convesation_serializer = ConversationDetailSerializer(conversation, many=False)
    return JsonResponse({"conversation": convesation_serializer.data}, safe=False)
