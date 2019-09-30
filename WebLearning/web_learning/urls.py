from django.conf import settings
from django.contrib import admin
from django.urls import path, include

from graphene_django.views import GraphQLView
from .schema import schema

def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    path('', trigger_error),
    path('admin/', admin.site.urls),
    path('api/', include('courses_app.urls')),
    path('api/auth/', include('account_app.urls')),
    path('graphql/', GraphQLView.as_view(graphiql=True, schema=schema)),
    path('django-rq', include('django_rq.urls')),

]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),

    ]