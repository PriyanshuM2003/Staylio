from django.forms import ModelForm

from .models import Property, PropertyImage


class PropertyForm(ModelForm):
    class Meta:
        model = Property
        fields = (
            "title",
            "description",
            "price_per_night",
            "bedrooms",
            "bathrooms",
            "guests",
            "country",
            "state",
            "category",
        )


class PropertyImageForm(ModelForm):
    class Meta:
        model = PropertyImage
        fields = ["image", "property"]
