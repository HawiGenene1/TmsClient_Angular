import { Component, signal, computed } from "@angular/core";
import { CourseCardComponent } from "../../ui/course-card/course-card";
import { Course } from "../../models/course.model";


@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CourseCardComponent], // This tells Angular: "I use CourseCardComponent in my template"
  templateUrl: "./student-dashboard.component.html",
  styleUrl: "./student-dashboard.component.scss",
})
export class StudentDashboardComponent {
  studentName = signal("Liya Kebede");
  earnedCredits = signal(45);

  graduationStatus = computed(() => {
    return this.earnedCredits() >= 120
      ? "Eligible for Graduation"
      : "In Progress";
  });

  selectedCourse = signal<Course | null>(null);
  
  availableCourses = signal<Course[]>([
    {
      id: 1,
      title: "Advanced Java Services",
      code: "CSE-101",
      maxCapacity: 30,
      enrollmentCount: 10,
    },
    {
      id: 2,
      title: "Angular UI Lab",
      code: "CSE-210",
      maxCapacity: 25,
      enrollmentCount: 25, // This one is FULL!
    },
    {
      id: 3,
      title: "Database Systems",
      code: "CSE-301",
      maxCapacity: 40,
      enrollmentCount: 35,
    },
    {
      id: 4,
      title: "Software Engineering",
      code: "CSE-405",
      maxCapacity: 20,
      enrollmentCount: 8,
    },
  ]);

  registerForClass() {
    this.earnedCredits.update((currentCredits) => currentCredits + 3);
  }

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }
}
