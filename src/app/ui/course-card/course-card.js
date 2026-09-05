import { __decorate } from "tslib";
import { Component, input, output } from "@angular/core";
import { RouterLink } from '@angular/router';
let CourseCardComponent = class CourseCardComponent {
    // This is like saying "I need a Course object to work"
    course = input.required();
    // This is like saying "I can send a message to my parent"
    enrollClicked = output();
};
CourseCardComponent = __decorate([
    Component({
        selector: "tms-course-card",
        standalone: true,
        imports: [RouterLink],
        templateUrl: "./course-card.html",
        styleUrl: "./course-card.scss",
    })
], CourseCardComponent);
export { CourseCardComponent };
