import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnrollmentStore } from './store/enrollment.store';
let App = class App {
    store = inject(EnrollmentStore);
    ngOnInit() {
        // Start listening for live updates
        this.store.listenForLiveUpdates();
    }
};
App = __decorate([
    Component({
        selector: 'app-root',
        imports: [RouterOutlet],
        templateUrl: './app.html',
        styleUrl: './app.scss',
    })
], App);
export { App };
export { App as AppComponent };
