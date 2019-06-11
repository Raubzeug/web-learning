from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from courses_app.models import Course


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:group-detail")

    class Meta:
        model = Group
        fields = ('url', 'name')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:user-detail")
    groups = serializers.HyperlinkedRelatedField(view_name="courses_app:group-detail",
                                                 queryset=Group.objects.all(), many=True)
    courses = serializers.HyperlinkedRelatedField(view_name="courses_app:course-detail",
                                                  queryset=Course.objects.all(), many=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups', 'courses')


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email = validated_data['email'],
            username = validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class LogoutSerializer(serializers.Serializer):
    logout = serializers.BooleanField()
