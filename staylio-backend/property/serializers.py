from rest_framework import serializers
from .models import Property, PropertyImage, Reservation
from user.serializers import UserDetailSerializer


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "property", "image", "created_at"]


class PropertyImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["property", "image"]


class PropertiesListSerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = (
            "id",
            "title",
            "price_per_night",
            "images",
            "is_favorite",
        )

    def get_is_favorite(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return user in obj.favorited.all()
        return None


class PropertyDetailsSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True, many=False)
    images = PropertyImageSerializer(many=True, read_only=True)
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = (
            "id",
            "title",
            "description",
            "price_per_night",
            "images",
            "bedrooms",
            "bathrooms",
            "is_favorite",
            "guests",
            "country",
            "state",
            "landlord",
        )

    def get_is_favorite(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return user in obj.favorited.all()
        return None

class ReservationListSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer(read_only=True, many=False)

    class Meta:
        model = Reservation
        fields = (
            "id",
            "start_date",
            "end_date",
            "number_of_nights",
            "total_price",
            "guests",
            "property",
        )
