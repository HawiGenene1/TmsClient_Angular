import { Component, input, output } from "@angular/core";
import { RouterLink } from '@angular/router';
import { Course } from "./../../models/course.model";

@Component({
  selector: "tms-course-card",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./course-card.component.html",
  styleUrl: "./course-card.component.scss",
})
export class CourseCardComponent {
  // This is like saying "I need a Course object to work"
  course = input.required<Course>();
  
  // This is like saying "I can send a message to my parent"
  enrollClicked = output<Course>();
}