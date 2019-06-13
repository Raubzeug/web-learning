import graphene
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.authtoken.models import Token
from graphene_django.types import DjangoObjectType
from courses_app.models import Course, Lesson


class CourseType(DjangoObjectType):
    class Meta:
        model = Course


class LessonType(DjangoObjectType):
    class Meta:
        model = Lesson


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)

        return CreateUser(user=user)


class Login(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    result = graphene.String()

    def mutate(self, info, username, password):
        user = authenticate(username=username, password=password)
        if user.is_active:
            token, created = Token.objects.get_or_create(user=user)
            # login(info, user)
            print(info.SESSION)
            return Login(result=f'token: {token}')
        return Login(result='Wrong credentials')


class Enroll(graphene.Mutation):
    class Arguments:
        course_id = graphene.Int(required=True)

    result = graphene.String()

    def mutate(self, info, course_id):
        course = Course.objects.get(pk=course_id)
        user = info.context.user
        if not user.is_active:
            return Enroll(result='enroll failed')
        if course is not None and user is not None and user.is_active:
            course.pupils.add(user)
        return Enroll(result='succesfully enrolled')


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    enroll_course = Enroll.Field()
    login = Login.Field()


class Query:
    all_courses = graphene.List(CourseType)
    all_lessons = graphene.List(LessonType)
    all_users = graphene.List(UserType)

    course = graphene.Field(CourseType, id=graphene.Int(), title=graphene.String())
    lesson = graphene.Field(LessonType, id=graphene.Int(), title=graphene.String())
    user = graphene.Field(UserType, id=graphene.Int(), username=graphene.String())

    def resolve_course(self, info, **kwargs):
        if 'id' in kwargs:
            return Course.objects.get(id=kwargs['id'])
        if 'title' in kwargs:
            return Course.objects.get(title=kwargs['title'])
        return None

    def resolve_lesson(self, info, **kwargs):
        if 'id' in kwargs:
            return Lesson.objects.get(id=kwargs['id'])
        if 'title' in kwargs:
            return Course.objects.get(title=kwargs['title'])
        return None

    def resolve_user(self, info, **kwargs):
        if 'id' in kwargs:
            return User.objects.get(id=kwargs['id'])
        if 'username' in kwargs:
            return User.objects.get(title=kwargs['username'])
        return None

    def resolve_all_courses(self, info, **kwargs):
        return Course.objects.all()

    def resolve_all_lessons(self, info, **kwargs):
        return Lesson.objects.select_related('course').all()

    def resolve_all_users(self, info, **kwargs):
        return get_user_model().objects.all()