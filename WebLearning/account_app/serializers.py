from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:user-detail")
    group = serializers.StringRelatedField()
    courses = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'group', 'courses')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:group-detail")

    class Meta:
        model = Group
        fields = ('url', 'name')
