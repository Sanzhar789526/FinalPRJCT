import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css'],
})
export class StudentCourseComponent implements OnInit {
  // @Input() course: any; // Курс передается в компонент через @Input
  course = {
    title: "Курс по Angular",
    modules: [
      {
        title: "Модуль 1",
        content: [
          {
            type: "material",
            title: "Введение",
            text: "Описание курса Angular."
          },
          {
            type: "video",
            title: "Видео-урок 1",
            link: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            type: "test",
            question: "Что такое Angular?",
            answers: [
              { text: "Фреймворк JavaScript", isCorrect: true },
              { text: "Язык программирования", isCorrect: false },
              { text: "База данных", isCorrect: false }
            ]
          },
          {
            type: "test",
            question: "Что такое Angular?",
            answers: [
              { text: "Фреймворк JavaScript", isCorrect: true },
              { text: "Язык программирования", isCorrect: false },
              { text: "База данных", isCorrect: false }
            ]
          },
          {
            type: "test",
            question: "Что такое Angular?",
            answers: [
              { text: "Фреймворк JavaScript", isCorrect: true },
              { text: "Язык программирования", isCorrect: false },
              { text: "База данных", isCorrect: false }
            ]
          }
          
        ]
      }
    ]
  };
  testForms: FormGroup[] = []; // Массив форм для тестов
  results: { testIndex: number; correct: boolean }[] = []; // Результаты тестов

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Создаем формы для тестов
    this.course.modules.forEach((module: any, moduleIndex: number) => {
      module.content.forEach((content: any, contentIndex: number) => {
        if (content.type === 'test') {
          const formControls: any = {};
          content.answers.forEach((_: any, answerIndex: number) => {
            formControls[`answer_${answerIndex}`] = [false]; // Контрол для каждого ответа
          });
          this.testForms.push(this.fb.group(formControls));
        }
      });
    });
  }

  // Метод для обработки безопасных URL
  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Метод отправки теста
  submitTest(testIndex: number, test: any): void {
    const formValues = this.testForms[testIndex].value;
    const correctAnswers = test.answers.map((a: any) => a.isCorrect);
    const userAnswers = Object.values(formValues);

    const isCorrect = userAnswers.every(
      (answer, index) => answer === correctAnswers[index]
    );

    this.results.push({ testIndex, correct: isCorrect });
  }
}
