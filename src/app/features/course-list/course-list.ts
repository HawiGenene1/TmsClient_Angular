import { Component, OnInit, inject } from '@angular/core';
import { CourseStore } from '../../store/course.store';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseListComponent implements OnInit {
  store = inject(CourseStore);

  ngOnInit() {
    this.store.loadCourses();
  }

  deleteCourse(id: number) {
    this.store.deleteCourse(id);
  }
}