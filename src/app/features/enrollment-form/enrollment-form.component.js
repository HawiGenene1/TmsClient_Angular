import { __decorate } from "tslib";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule, } from "@angular/forms";
let EnrollmentFormComponent = class EnrollmentFormComponent {
    // inject(FormBuilder) is Angular's way of requesting a service
    fb = inject(FormBuilder);
    // A signal to track whether the form was submitted
    submitted = signal(false);
    // fb.nonNullable.group({...}) creates a form object
    // "nonNullable" ensures all values are typed as 'string' instead of 'string | null'
    form = this.fb.nonNullable.group({
        studentId: [
            "",
            [Validators.required, Validators.pattern("^STU-[0-9]{4}$")],
        ],
        courseId: ["", Validators.required],
        term: ["Fall 2026", Validators.required],
        notes: [""],
        backupCourses: this.fb.array([]),
    });
    // TypeScript property accessor - shortcut for this.form.controls.backupCourses
    get backups() {
        return this.form.controls.backupCourses;
    }
    // Adds a new empty text input to the backup courses array
    addBackup() {
        this.backups.push(this.fb.control("", {
            nonNullable: true,
            validators: Validators.required,
        }));
    }
    // Removes a specific backup course row by its position
    removeBackup(index) {
        this.backups.removeAt(index);
    }
    submit() {
        if (this.form.valid) {
            // getRawValue() extracts the full form data as a JSON object
            const payload = this.form.getRawValue();
            console.log("Enrollment payload:", payload);
            this.submitted.set(true);
        }
        else {
            // markAllAsTouched() forces Angular to show validation errors on every field
            this.form.markAllAsTouched();
        }
    }
};
EnrollmentFormComponent = __decorate([
    Component({
        selector: "app-enrollment-form",
        standalone: true,
        imports: [ReactiveFormsModule],
        templateUrl: "./enrollment-form.component.html",
        styleUrl: "./enrollment-form.component.scss",
    })
], EnrollmentFormComponent);
export { EnrollmentFormComponent };
