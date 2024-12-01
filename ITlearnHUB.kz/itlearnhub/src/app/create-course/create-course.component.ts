import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent {
  courseForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      console.log('Курс создан:', courseData);
      this.successMessage = 'Курс успешно создан!';
      this.courseForm.reset(); // Сброс формы после успешного создания курса
    }
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Изображение загружено:', file.name);
    }
  }
}
