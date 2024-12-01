import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
  
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      const url = 'https://localhost:4200/register'; // Замените на ваш реальный URL
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(url, formData, { headers }).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
          this.registerForm.reset();
        },
        (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      );
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}