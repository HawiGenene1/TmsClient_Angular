import { __decorate } from "tslib";
import { Component, input, effect } from "@angular/core";
import { RouterLink } from '@angular/router';
let CourseDetailComponent = class CourseDetailComponent {
    // This automatically gets the :id from the URL
    id = input.required();
    constructor() {
        effect(() => {
            console.log('Loading course detail for ID:', this.id());
        });
    }
};
CourseDetailComponent = __decorate([
    Component({
        selector: "app-course-detail",
        standalone: true,
        imports: [RouterLink],
        templateUrl: "./course-detail.component.html",
    })
], CourseDetailComponent);
export { CourseDetailComponent };
