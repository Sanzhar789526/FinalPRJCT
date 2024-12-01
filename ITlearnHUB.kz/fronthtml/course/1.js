import { Component, OnInit } from '@angular/core';

interface Lesson {
  title: string;
  content: string;
  completed: boolean;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface Question {
  user: string;
  content: string;
  answers: { user: string; content: string }[];
}

interface Comment {
  user: string;
  content: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course = {
    title: 'Introduction to Data Science',
    description: 'Learn the basics of data science.',
    modules: [
      {
        title: 'Module 1: Basics',
        lessons: [
          { title: 'Lesson 1: Intro to Data Science', content: 'Lesson content goes here...', completed: false },
          { title: 'Lesson 2: Data Analysis', content: 'Lesson content goes here...', completed: false }
        ]
      },
      {
        title: 'Module 2: Advanced Topics',
        lessons: [
          { title: 'Lesson 1: Machine Learning', content: 'Lesson content goes here...', completed: false }
        ]
      }
    ]
  };

  currentModuleIndex = 0;
  currentLessonIndex = 0;
  currentLesson: Lesson | null = null;

  // Вопросы и ответы
  questions: Question[] = [];
  newQuestion: string = '';

  // Комментарии
  comments: Comment[] = [];
  newComment: string = '';

  ngOnInit(): void {}

  // Начало урока
  startLesson(lessonIndex: number) {
    this.currentLessonIndex = lessonIndex;
    this.currentLesson = this.course.modules[this.currentModuleIndex].lessons[lessonIndex];
  }

  // Отметка урока как завершенного
  markCompleted() {
    if (this.currentLesson) {
      this.currentLesson.completed = true;
      this.saveProgress();
      alert('Lesson marked as completed!');
    }
  }

  // Сохранение прогресса (здесь для примера сохраняется в локальную переменную)
  saveProgress() {
    // В реальном приложении, вы можете сохранить прогресс в базе данных или localStorage
  }

  // Добавление вопроса
  addQuestion() {
    if (this.newQuestion.trim()) {
      this.questions.push({
        user: 'User',
        content: this.newQuestion,
        answers: []
      });
      this.newQuestion = '';
    }
  }

  // Добавление ответа на вопрос
  addAnswer(questionIndex: number, answerContent: string) {
    if (answerContent.trim()) {
      this.questions[questionIndex].answers.push({
        user: 'User',
        content: answerContent
      });
    }
  }

  // Добавление комментария
  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        user: 'User',
        content: this.newComment
      });
      this.newComment = '';
    }
  }
}
