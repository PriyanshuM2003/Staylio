from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    parser_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from .forms import PropertyForm, PropertyImageForm
from .models import Property, Reservation
from .serializers import (
    PropertiesListSerializer,
    PropertyDetailsSerializer,
    ReservationListSerializer,
)
from user.models import User


@api_view(["GET"])
@authentication_classes([JWTAuthentication, SessionAuthentication, BasicAuthentication])
@permission_classes([AllowAny])
def properties_list(request):
    user = request.user
    if user.is_authenticated:
        properties = Property.objects.exclude(landlord=user)
    else:
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


@api_view(["POST"])
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

    serializer = PropertyDetailsSerializer(
        property, many=False, context={"request": request}
    )

    return JsonResponse(serializer.data)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def property_reservations(request, pk):
    property = Property.objects.get(pk=pk)
    reservations = property.reservations.all()

    serializer = ReservationListSerializer(reservations, many=True)
    
    return JsonResponse(serializer.data, safe=False)


@api_view(["POST"])
def book_property(request, pk):
    try:
        start_date = request.POST.get("start_date", "")
        end_date = request.POST.get("end_date", "")
        number_of_nights = request.POST.get("number_of_nights", "")
        total_price = request.POST.get("total_price", "")
        guests = request.POST.get("guests", "")

        property = Property.objects.get(pk=pk)

        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guests=guests,
            created_by=request.user,
        )

        return JsonResponse({"success": True})
    except Exception as e:
        print("Error", e)

        return JsonResponse({"success": False})
