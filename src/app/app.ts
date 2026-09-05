import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnrollmentStore } from './store/enrollment.store';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private store = inject(EnrollmentStore);
  private auth = inject(AuthService);

  ngOnInit() {
    // Start listening for live updates
    this.store.listenForLiveUpdates();
    this.auth.loadCurrentUser();
  }
}

export { App as AppComponent };
