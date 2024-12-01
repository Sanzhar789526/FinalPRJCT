import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      modules: this.fb.array([])
    });
  }

  // Получение массива модулей
  get modules(): FormArray {
    return this.courseForm.get('modules') as FormArray;
  }

  // Получение содержимого модуля
  getContent(moduleIndex: number): FormArray | null {
    const module = this.modules.at(moduleIndex) as FormGroup;
    return module?.get('content') as FormArray | null;
  }

  // Получение ответов теста
  getAnswers(moduleIndex: number, contentIndex: number): FormArray | null {
    const content = this.getContent(moduleIndex)?.at(contentIndex) as FormGroup;
    return content?.get('answers') as FormArray | null;
  }

  // Добавить модуль
  addModule(): void {
    this.modules.push(this.fb.group({
      title: ['', Validators.required],
      content: this.fb.array([])
    }));
  }

  // Удалить модуль
  removeModule(moduleIndex: number): void {
    this.modules.removeAt(moduleIndex);
  }

  // Добавить материал
  addMaterial(moduleIndex: number): void {
    this.getContent(moduleIndex)?.push(this.fb.group({
      type: ['material'],
      title: ['', Validators.required],
      text: ['', Validators.required]
    }));
  }

  // Добавить видео
  addVideo(moduleIndex: number): void {
    this.getContent(moduleIndex)?.push(this.fb.group({
      type: ['video'],
      title: ['', Validators.required],
      link: ['', Validators.required]
    }));
  }

  // Добавить тест
  addTest(moduleIndex: number): void {
    this.getContent(moduleIndex)?.push(this.fb.group({
      type: ['test'],
      question: ['', Validators.required],
      answers: this.fb.array([])
    }));
  }

  // Добавить ответ в тест
  addAnswer(moduleIndex: number, contentIndex: number): void {
    this.getAnswers(moduleIndex, contentIndex)?.push(this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    }));
  }

  // Удалить ответ
  removeAnswer(moduleIndex: number, contentIndex: number, answerIndex: number): void {
    this.getAnswers(moduleIndex, contentIndex)?.removeAt(answerIndex);
  }

  // Удалить контент
  removeContent(moduleIndex: number, contentIndex: number): void {
    this.getContent(moduleIndex)?.removeAt(contentIndex);
  }

  // Сохранить курс
  onSubmit(): void {
    console.log(this.courseForm.value);
  }
}