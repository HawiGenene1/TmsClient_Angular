import { __decorate } from "tslib";
import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let GradeService = class GradeService {
    http = inject(HttpClient);
    baseUrl = 'http://localhost:5000/api/grades';
    postGrade(payload) {
        return this.http.post(this.baseUrl, payload);
    }
};
GradeService = __decorate([
    Service()
], GradeService);
export { GradeService };
