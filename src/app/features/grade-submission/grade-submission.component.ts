import { Component } from '@angular/core';

@Component({
  selector: 'app-grade-submission',
  standalone: true,
  imports: [],
  templateUrl: './grade-submission.component.html',
  styleUrl: './grade-submission.component.scss',
})
export class GradeSubmissionComponent {}

// Alias for spec compatibility if imported as GradeSubmission
export { GradeSubmissionComponent as GradeSubmission };
