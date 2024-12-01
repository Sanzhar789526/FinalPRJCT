import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roleKey = 'userRole';

  constructor() {}

  setRole(role: 'visitor' | 'student' | 'teacher'): void {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): 'visitor' | 'student' | 'teacher' {
    return (localStorage.getItem(this.roleKey) as 'visitor' | 'student' | 'teacher') || 'visitor';
  }

  isVisitor(): boolean {
    return this.getRole() === 'visitor';
  }

  isStudent(): boolean {
    return this.getRole() === 'student';
  }

  isTeacher(): boolean {
    return this.getRole() === 'teacher';
  }

  getCurrentUser() {
    const role = this.getRole();
    const name = role === 'student' ? 'Student User' : role === 'teacher' ? 'Teacher User' : 'Visitor';
    return { role, name };
  }
}
