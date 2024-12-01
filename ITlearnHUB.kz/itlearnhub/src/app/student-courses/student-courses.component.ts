import { Component } from '@angular/core';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesComponent {
  filteredCourses = [
    {
      title: 'Introduction to Angular',
      description: 'Learn the basics of Angular, a powerful framework for building web applications.',
      category: 'Web Development',
      level: 'Beginner',
      duration: '5 hours',
      image: 'https://via.placeholder.com/150' // Замените на URL реального изображения
    },
    {
      title: 'Advanced JavaScript',
      description: 'Master advanced concepts of JavaScript, including closures, promises, and async/await.',
      category: 'Programming',
      level: 'Advanced',
      duration: '8 hours',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'Data Science with Python',
      description: 'Explore the fundamentals of data science using Python libraries like Pandas and NumPy.',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '10 hours',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'UI/UX Design Principles',
      description: 'Learn the key principles of UI/UX design to create visually appealing and user-friendly applications.',
      category: 'Design',
      level: 'Beginner',
      duration: '4 hours',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'Machine Learning Basics',
      description: 'An introduction to machine learning concepts and algorithms using Python.',
      category: 'AI/ML',
      level: 'Intermediate',
      duration: '6 hours',
      image: 'https://via.placeholder.com/150'
    }
  ];
}
