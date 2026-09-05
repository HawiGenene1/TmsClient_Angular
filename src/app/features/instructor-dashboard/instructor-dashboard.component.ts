import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnrollmentStore } from '../../store/enrollment.store';
import { AnalyticsChartComponent } from '../../ui/analytics-chart/analytics-chart.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tms-instructor-dashboard',
  standalone: true,
  imports: [AnalyticsChartComponent],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.scss',
})
export class InstructorDashboardComponent implements OnInit {
  store = inject(EnrollmentStore);
  private auth = inject(AuthService, { optional: true });
  private router = inject(Router, { optional: true });

  ngOnInit() {
    this.store.loadEnrollments();
  }

  async logout(): Promise<void> {
    try {
      await this.auth?.logout();
    } catch {
      // Fallback
    }
    this.router?.navigate(['/login']);
  }
}

// Alias for compatibility
export { InstructorDashboardComponent as InstructorDashboard };
