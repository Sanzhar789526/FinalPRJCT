import { Component, OnInit } from '@angular/core';

interface Instructor {
  name: string;
  avatar: string;
  bio: string;
}

interface Review {
  content: string;
  author: string;
}

interface Module {
  title: string;
  lessons: string[];
}

interface Course {
  title: string;
  description: string;
  instructor: Instructor;
  modules: Module[];
  reviews: Review[];
}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})

export class CoursePageComponent implements OnInit {
  course: Course = {
    title: 'Introduction to Data Science',
    description: 'This course covers the basics of data science, including data analysis, visualization, and machine learning.',
    instructor: {
      name: 'John Doe',
      avatar: 'assets/instructor-avatar.jpg', // Замените на путь к изображению преподавателя
      bio: 'John is an experienced data scientist with over 10 years of experience in the industry.'
    },
    modules: [
      {
        title: 'Module 1: Data Science Basics',
        lessons: [
          'Lesson 1: Introduction to Data Science',
          'Lesson 2: Data Analysis Techniques',
          'Lesson 3: Data Visualization'
        ]
      },
      {
        title: 'Module 2: Machine Learning',
        lessons: [
          'Lesson 1: Introduction to Machine Learning',
          'Lesson 2: Supervised Learning',
          'Lesson 3: Unsupervised Learning'
        ]
      }
    ],
    reviews: [
      {
        content: 'Great course! I learned a lot.',
        author: 'Student A'
      },
      {
        content: 'The instructor explained the concepts clearly.',
        author: 'Student B'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {}
}
