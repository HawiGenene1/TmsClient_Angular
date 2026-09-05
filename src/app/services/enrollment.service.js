import { __decorate } from "tslib";
import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let EnrollmentService = class EnrollmentService {
    http = inject(HttpClient);
    baseUrl = 'http://localhost:5000/api/enrollments';
    getAll() {
        return this.http.get(this.baseUrl);
    }
    approve(id) {
        return this.http.post(`${this.baseUrl}/${id}/approve`, {});
    }
};
EnrollmentService = __decorate([
    Service()
], EnrollmentService);
export { EnrollmentService };
