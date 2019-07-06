from django.conf import settings
from django.contrib import admin
from django.urls import path, include

from graphene_django.views import GraphQLView
from .schema import schema


urlpatterns = [
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