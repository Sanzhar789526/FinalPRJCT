import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent {
  // Пример данных для статистики
  totalStudents: number = 120;
  activeCourses: number = 5;
  completedCourses: number = 8;

  // Список студентов, ожидающих одобрения
  pendingStudents = [
    { name: 'John Doe', course: 'Angular Basics' },
    { name: 'Jane Smith', course: 'React Advanced' },
  ];

  // Расписание видеотрансляций
  liveSessions = [
    {
      title: 'Angular Live Q&A',
      course: 'Angular Basics',
      date: '2024-12-05',
      time: '18:00',
    },
    {
      title: 'React State Management',
      course: 'React Advanced',
      date: '2024-12-10',
      time: '20:00',
    },
  ];

  // Методы для управления студентами
  acceptStudent(student: any) {
    console.log('Accepted:', student);
    this.pendingStudents = this.pendingStudents.filter(
      (s) => s !== student
    );
  }

  rejectStudent(student: any) {
    console.log('Rejected:', student);
    this.pendingStudents = this.pendingStudents.filter(
      (s) => s !== student
    );
  }

  // Методы для работы с расписанием
  createNewSession() {
    console.log('Create a new live session');
    // Логика для добавления новой сессии
  }

  editSession(session: any) {
    console.log('Edit session:', session);
    // Логика для редактирования сессии
  }

  deleteSession(session: any) {
    console.log('Deleted session:', session);
    this.liveSessions = this.liveSessions.filter((s) => s !== session);
  }
}
