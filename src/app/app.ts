import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnrollmentStore } from './store/enrollment.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private store = inject(EnrollmentStore);

  ngOnInit() {
    // Start listening for live updates
    this.store.listenForLiveUpdates();
  }
}

export { App as AppComponent };
