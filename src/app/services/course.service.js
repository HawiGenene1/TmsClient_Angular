import { __decorate } from "tslib";
import { Service, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
// @Service() means Angular creates one instance of this service
// and shares it across the entire app (singleton)
let CourseService = class CourseService {
    http = inject(HttpClient);
    baseUrl = "http://localhost:5000/api/courses";
    // GET /api/courses?page=1&pageSize=50
    // Returns items[] from the PagedResponse envelope
    getAll(page = 1, pageSize = 50) {
        return this.http
            .get(this.baseUrl, {
            params: {
                page: page.toString(),
                pageSize: pageSize.toString(),
            },
        })
            .pipe(map((p) => p.items));
    }
    // GET /api/courses/{id}
    getById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
};
CourseService = __decorate([
    Service()
], CourseService);
export { CourseService };
