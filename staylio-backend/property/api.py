from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    parser_classes,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from .forms import PropertyForm, PropertyImageForm
from .models import Property, PropertyImage
from .serializers import (
    PropertiesListSerializer,
    PropertyDetailsSerializer,
    PropertyImageUploadSerializer,
    PropertyImageSerializer,
)
from user.models import User


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    properties = Property.objects.all()
    serializer = PropertiesListSerializer(
        properties, many=True, context={"request": request}
    )

    return JsonResponse({"data": serializer.data})


@api_view(["POST"])
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)

    if form.is_valid():
        property = form.save(commit=False)
        property.landlord = request.user
        property.save()

        return JsonResponse({"success": True, "id": property.id})
    else:
        print("error", form.errors, form.non_field_errors)
        return JsonResponse({"errors": form.errors.as_json()}, status=400)


@api_view(
    [
        "POST",
    ]
)
def upload_property_image(request):
    form = PropertyImageForm(request.POST, request.FILES)

    if form.is_valid():
        image_instance = form.save()
        return JsonResponse(
            {
                "success": True,
                "image_id": str(image_instance.id),
                "image_url": image_instance.image.url,
            },
            status=201,
        )
    else:
        return JsonResponse({"error": form.errors.as_json()}, status=400)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def property_details(request, pk):
    property = Property.objects.get(pk=pk)

    serializer = PropertyDetailsSerializer(property, many=False)

    return JsonResponse(serializer.data)
