import { Component, signal, computed, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CourseCardComponent } from "../../ui/course-card/course-card";
import { Course } from "../../models/course.model";
import { CourseService } from "../../services/course.service";


@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CourseCardComponent, RouterLink], // Added RouterLink for navigation
  templateUrl: "./student-dashboard.component.html",
  styleUrl: "./student-dashboard.component.scss",
})
export class StudentDashboardComponent implements OnInit {
  private courseService = inject(CourseService);

  studentName = signal("Liya Kebede");
  earnedCredits = signal(45);

  graduationStatus = computed(() => {
    return this.earnedCredits() >= 120
      ? "Eligible for Graduation"
      : "In Progress";
  });

  selectedCourse = signal<Course | null>(null);
  
  // Start with empty array - will be populated from API
  availableCourses = signal<Course[]>([]);

  ngOnInit() {
    // Fetch courses from the API when component initializes
    this.courseService.getAll(1, 50).subscribe({
      next: (courses) => {
        this.availableCourses.set(courses);
        console.log('Loaded courses from API:', courses);
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        // Optionally: set mock data as fallback
        this.loadMockData();
      }
    });
  }

  // Fallback mock data in case API is not available
  private loadMockData() {
    this.availableCourses.set([
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
        enrollmentCount: 25,
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
  }

  registerForClass() {
    this.earnedCredits.update((currentCredits) => currentCredits + 3);
  }

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }
}
