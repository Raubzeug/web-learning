from django.contrib import admin

from .models import Course, Lesson, Language


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'language', 'description', 'tutor', 'get_pupils_str')
    ordering = ('title',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        qs = qs.prefetch_related('pupils').select_related('language')
        return qs

    def get_pupils_str(self, obj):
        return ', '.join([p.username for p in obj.pupils.all()])
    get_pupils_str.short_description = 'Pupils'


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'course', 'data')
    ordering = ('data', 'course', 'title')

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    pass