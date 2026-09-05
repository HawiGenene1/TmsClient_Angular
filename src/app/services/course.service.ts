import { Service, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Course, CourseDetail, PagedResponse } from "../models/course.model";

// @Service() means Angular creates one instance of this service
// and shares it across the entire app (singleton)
@Service()
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:5000/api/courses";

  // GET /api/courses?page=1&pageSize=50
  // Returns items[] from the PagedResponse envelope
  getAll(page = 1, pageSize = 50) {
    return this.http
      .get<PagedResponse<Course>>(this.baseUrl, {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
        },
      })
      .pipe(map((p) => p.items));
  }

  // GET /api/courses/{id}
  getById(id: string) {
    return this.http.get<CourseDetail>(`${this.baseUrl}/${id}`);
  }
}
