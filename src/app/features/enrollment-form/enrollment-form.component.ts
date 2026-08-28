import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormArray } from "@angular/forms";

@Component({
  selector: "app-enrollment-form",
  standalone: true,
  imports: [ReactiveFormsModule],  // ⚠️ MUST include this!
  templateUrl: "./enrollment-form.component.html",
})
export class EnrollmentFormComponent {
  // inject(FormBuilder) = request the form builder service
  // Similar to dependency injection in C#
  private fb = inject(FormBuilder);

  // Signal to track if form was submitted successfully
  submitted = signal(false);

  // Create the form with validation rules
  form = this.fb.nonNullable.group({
    // Student ID: required AND must match pattern
    studentId: ["", [Validators.required, Validators.pattern("^STU-[0-9]{4}$")]],
    // Course ID: required
    courseId: ["", Validators.required],
    // Term: required (pre-filled)
    term: ["Fall 2026", Validators.required],
    // Notes: optional (no validators)
    notes: [""],
    // Backup Courses: starts empty, user adds rows
    backupCourses: this.fb.array<FormControl<string>>([])
  });

  // Getter to access backup courses more easily
  get backups() {
    return this.form.controls.backupCourses;
  }

  // Add a new backup course input
  addBackup() {
    this.backups.push(this.fb.control("", {
      nonNullable: true,
      validators: Validators.required
    }));
  }

  // Remove a backup course by index
  removeBackup(index: number) {
    this.backups.removeAt(index);
  }

  // Submit the form
  submit() {
    if (this.form.valid) {
      // getRawValue() = get ALL form data (even disabled fields)
      // Use getRawValue(), NOT .value!
      const payload = this.form.getRawValue();
      console.log("Enrollment payload:", payload);
      this.submitted.set(true);
    } else {
      // Show validation errors on ALL fields
      this.form.markAllAsTouched();
    }
  }
}
