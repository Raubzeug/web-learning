# from django.contrib.auth.models import User, Group
from django.contrib.auth.models import Group
from account_app.models import CustomUser as User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from courses_app.models import Course


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:group-detail")

    class Meta:
        model = Group
        fields = ('url', 'name')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:customuser-detail")
    groups = serializers.HyperlinkedRelatedField(view_name="courses_app:group-detail",
                                                 queryset=Group.objects.all(), many=True)
    courses = serializers.HyperlinkedRelatedField(view_name="courses_app:course-detail",
                                                  queryset=Course.objects.all(), many=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups', 'courses')


class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, min_length=3, max_length=20)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True, min_length=6)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError('Please enter a password and confirm it')
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError('Passwords do not match')
        return data

    def validate_email(self, email):
        existing = User.objects.filter(email=email).first()
        if existing:
            raise serializers.ValidationError('Someone with this email was already registered')
        return email

    def validate_username(self, username):
        existing = User.objects.filter(username=username).first()
        if existing:
            raise serializers.ValidationError('Someone with this username was already registered')
        return username

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

