import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';
import { AnalyticsChartComponent } from '../../ui/analytics-chart/analytics-chart.component';
let InstructorDashboardComponent = class InstructorDashboardComponent {
    store = inject(EnrollmentStore);
    ngOnInit() {
        this.store.loadEnrollments();
    }
};
InstructorDashboardComponent = __decorate([
    Component({
        selector: 'tms-instructor-dashboard',
        standalone: true,
        imports: [AnalyticsChartComponent],
        templateUrl: './instructor-dashboard.component.html',
        styleUrl: './instructor-dashboard.component.scss',
    })
], InstructorDashboardComponent);
export { InstructorDashboardComponent };
