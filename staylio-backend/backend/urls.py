from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.shortcuts import redirect

schema_view = get_schema_view(
    openapi.Info(
        title="Staylio API",
        default_version="v1",
        description="API documentation for Staylio project",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

def home_redirect(request):
    """Redirect root URL to Swagger documentation"""
    return redirect('/swagger/')

urlpatterns = [
    path("", home_redirect, name="home"),
    path("swagger.json", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path(
        "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("admin/", admin.site.urls),
    path("api/properties/", include("property.urls")),
    path("api/auth/", include("user.urls")),
    path("api/chat/", include("chat.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
