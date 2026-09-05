import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService, { optional: true });
  private router = inject(Router, { optional: true });

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Invalid username or password');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { username, password } = this.form.getRawValue();

    try {
      if (this.auth) {
        await this.auth.login({ username, password });
      }
      this.router?.navigate(['/dashboard']);
    } catch {
      this.errorMessage.set('Invalid username or password');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}

// Alias for spec compatibility if imported as Login
export { LoginComponent as Login };
