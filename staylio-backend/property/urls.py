from django.urls import path
from . import api

urlpatterns = [
    path("", api.properties_list, name="api_properties_list"),
    path(
        "user-properties",
        api.auth_user_properties_list,
        name="api_auth_user_properties_list",
    ),
    path("create-property/", api.create_property, name="api_create_property"),
    path("property/<uuid:pk>/", api.property_details, name="api_property_details"),
    path(
        "upload-property-image/",
        api.upload_property_image,
        name="upload_property_image",
    ),
    path("property/<uuid:pk>/book/", api.book_property, name="api_book_property"),
    path(
        "property/<uuid:pk>/reservations/",
        api.property_reservations,
        name="api_property_reservations",
    ),
    path(
        "property/<uuid:pk>/toggle_favorite/",
        api.toggle_favorite,
        name="api_toggle_favorite",
    ),
]
