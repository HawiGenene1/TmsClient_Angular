import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: 'enroll', loadComponent: () => import('./features/enrollment-form/enrollment-form.component').then(m => m.EnrollmentFormComponent) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
