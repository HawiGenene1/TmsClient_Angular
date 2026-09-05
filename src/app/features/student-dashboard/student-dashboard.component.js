import { __decorate } from "tslib";
import { Component, signal, computed, inject } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { CourseCardComponent } from "../../ui/course-card/course-card.component";
import { CourseService } from "../../services/course.service";
let StudentDashboardComponent = class StudentDashboardComponent {
    // Inject the CourseService
    api = inject(CourseService);
    studentName = signal("Liya Kebede");
    earnedCredits = signal(45);
    selectedCourse = signal(null);
    graduationStatus = computed(() => this.earnedCredits() >= 120 ? "Eligible for Graduation" : "In Progress");
    // rxResource wraps the HTTP call into three managed signals:
    // - isLoading() → true while waiting for the server response
    // - error() → the error object if the request fails
    // - value() → the Course[] array when the request succeeds
    coursesResource = rxResource({
        stream: () => this.api.getAll(),
    });
    registerForClass() {
        this.earnedCredits.update((c) => c + 3);
    }
    handleEnroll(course) {
        this.selectedCourse.set(course);
        console.log("Enrollment requested for:", course.title);
    }
};
StudentDashboardComponent = __decorate([
    Component({
        selector: "app-student-dashboard",
        standalone: true,
        imports: [CourseCardComponent],
        templateUrl: "./student-dashboard.component.html",
        styleUrl: "./student-dashboard.component.scss",
    })
], StudentDashboardComponent);
export { StudentDashboardComponent };
