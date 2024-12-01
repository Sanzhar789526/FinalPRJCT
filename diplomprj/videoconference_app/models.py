# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models

class CustomUser(AbstractUser):
    ROLES = (
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.CharField(max_length=10, choices=ROLES, default='student')

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'role']

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

class VideoCall(models.Model):
    room_id = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Room {self.room_id} by {self.user.email}"

class DashboardLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    action = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.timestamp}"


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="created_courses"
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="enrolled_courses"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class CourseMaterial(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="materials")
    title = models.CharField(max_length=255)
    video = models.FileField(upload_to='course_videos/')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class EnrollmentRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollment_requests')
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='enrollment_requests')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.email} -> {self.course.title} ({self.status})"



class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    description = models.TextField()
    video_url = models.URLField(blank=True, null=True)  # URL для видео урока
    section = models.CharField(max_length=255, blank=True, null=True)  # Раздел урока
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.course.title})"


#***********************************************************************************************************
# models.py
from django.db import models
from django.conf import settings

class Test(models.Model):
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE, related_name='tests')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Test for {self.lesson.title}"


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField(default='')
    correct_answer = models.TextField(default='')  # Здесь учитель указывает правильный ответ

    def __str__(self):
        return f"Question: {self.question_text}"


class TestResult(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='test_results')
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='results')
    score = models.FloatField()  # Количество правильных ответов
    total_questions = models.IntegerField()  # Общее количество вопросов
    completed_at = models.DateTimeField(auto_now_add=True)

    def percentage(self):
        return (self.score / self.total_questions) * 100 if self.total_questions > 0 else 0

    def __str__(self):
        return f"{self.student.email} - {self.test.title} ({self.percentage()}%)"



from django.utils import timezone

class Announcement(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='announcements')
    title = models.CharField(max_length=255)
    description = models.TextField()
    scheduled_date = models.DateTimeField()  # Будущая дата и время онлайн-лекции
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Announcement for {self.lesson.title}: {self.title}"

