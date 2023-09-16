from django.contrib import admin
from django.urls import path, include
from core.views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('wel/', ReactView.as_view(), name="api_qoutes"),
    path('wel/quote/<str:pk>', getQuote, name="api_qoute"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
