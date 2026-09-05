import { __decorate } from "tslib";
import { Component, computed, input } from '@angular/core';
let AnalyticsChartComponent = class AnalyticsChartComponent {
    data = input.required();
    approvedHeight = computed(() => {
        const count = this.data().filter((e) => e.status === 'Approved').length;
        return Math.max(20, count * 3);
    });
    pendingHeight = computed(() => {
        const count = this.data().filter((e) => e.status === 'Pending').length;
        return Math.max(20, count * 3);
    });
    rejectedHeight = computed(() => {
        const count = this.data().filter((e) => e.status === 'Rejected').length;
        return Math.max(20, count * 3);
    });
};
AnalyticsChartComponent = __decorate([
    Component({
        selector: 'tms-analytics-chart',
        standalone: true,
        template: `
    <div class="chart-container">
      <h3>Enrollment Analytics</h3>
      <div class="chart-bars">
        <div class="bar approved" [style.height.px]="approvedHeight()">
          <span>Approved</span>
        </div>
        <div class="bar pending" [style.height.px]="pendingHeight()">
          <span>Pending</span>
        </div>
        <div class="bar rejected" [style.height.px]="rejectedHeight()">
          <span>Rejected</span>
        </div>
      </div>
      <div class="chart-summary">
        <p>Total records: {{ data().length }}</p>
      </div>
    </div>
  `,
        styleUrl: './analytics-chart.component.scss',
    })
], AnalyticsChartComponent);
export { AnalyticsChartComponent };
