import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { NoNavbarLayoutComponent } from './no-navbar-layout/no-navbar-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { HomeComponent } from './home/home.component';
import { CourseCatalogComponent } from './course-catalog/course-catalog.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { LessonManagementComponent } from './lesson-management/lesson-management.component';
import { InteractiveModuleComponent } from './interactive-module/interactive-module.component';
import { CommunicationComponent } from './communication/communication.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Главная страница
  {
    path: 'register', component: RegisterComponent },
  
  // { path: '', component: VisitorViewComponent },
  { path: 'student', component: StudentProfileComponent, canActivate: [AuthGuard], data: { roles: 'student' } },
  { path: 'teacher', component: TeacherProfileComponent, canActivate: [AuthGuard], data: { roles: 'teacher' } },
  
 
  { path: 'catalog', component: CourseCatalogComponent, canActivate: [AuthGuard], data: { roles: ['student', 'visitor'] } },
  { path: 'course/:id', component: CoursePageComponent, canActivate: [AuthGuard], data: { roles: ['student', 'visitor'] }  }, // Страница курса
  { path: 'student-courses', component: StudentCoursesComponent, canActivate: [AuthGuard], data: { roles: 'student' }  },
  { path: 'student-course/:id', component: StudentCourseComponent, canActivate: [AuthGuard], data: { roles: 'student' }  },

  
  { path: 'teacher-lessons', component: LessonManagementComponent, canActivate: [AuthGuard], data: { roles: 'teacher' } }, // Управление уроками
  { path: 'create-course/:id', component: CreateCourseComponent, canActivate: [AuthGuard], data: { roles: 'teacher' } },
  { path: 'course-management/:id', component: CourseManagementComponent, canActivate: [AuthGuard], data: { roles: 'teacher' } },
  { path: 'teacher/dashboard', component: TeacherDashboardComponent, canActivate: [AuthGuard], data: { roles: 'teacher' } }, // Личный кабинет преподавателя
  
  { path: 'interactive', component: InteractiveModuleComponent }, // Интерактивный модуль
  { path: 'communication', component: CommunicationComponent }, // Коммуникация
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
