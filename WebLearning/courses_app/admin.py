from django.contrib import admin
from django.db.models import Prefetch

from account_app.models import CustomUser
from .models import Course, Lesson, Language


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'language', 'description', 'tutor', 'get_lessons_str', 'get_pupils_str')
    ordering = ('title',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)

        prefetch_qs_pupils = CustomUser.objects.only('username')
        prefetch_pupils = Prefetch('pupils', queryset=prefetch_qs_pupils)

        prefetch_qs_lessons = Lesson.objects.only('title')
        prefetch_lessons = Prefetch('lessons', queryset=prefetch_qs_lessons)

        qs = qs.prefetch_related(prefetch_lessons, prefetch_pupils).select_related('language')
        return qs

    def get_pupils_str(self, obj):
        return ', '.join([p.username for p in obj.pupils.all()])
    get_pupils_str.short_description = 'Pupils'

    def get_lessons_str(self, obj):
        return ', '.join([l.title for l in obj.lessons.all()])
    get_lessons_str.short_description = 'Lessons'

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'course', 'description', 'data')
    ordering = ('data', 'course', 'title')

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    pass