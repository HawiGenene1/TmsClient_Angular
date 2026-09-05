import { Component, signal, computed, inject } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { CourseCardComponent } from "../../ui/course-card/course-card.component";
import { Course } from "../../models/course.model";
import { CourseService } from "../../services/course.service";

@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: "./student-dashboard.component.html",
  styleUrl: "./student-dashboard.component.scss",
})
export class StudentDashboardComponent {
  // Inject the CourseService
  private api = inject(CourseService);

  studentName = signal("Liya Kebede");
  earnedCredits = signal(45);
  selectedCourse = signal<Course | null>(null);

  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? "Eligible for Graduation" : "In Progress"
  );

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

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);
    console.log("Enrollment requested for:", course.title);
  }
}
