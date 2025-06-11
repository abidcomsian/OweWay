import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-selector',
  templateUrl: './call-selector.component.html',
  styleUrls: ['./call-selector.component.css']
})
export class CallSelectorComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;
  message: string = '';
  showRegisterForm: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForm(): void {
    this.showRegisterForm = !this.showRegisterForm;
    this.message = '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;

      this.authService.register(data).subscribe({
        next: (response: any) => {
          this.message = response.message || '🎉 Registration successful!';
          this.showRegisterForm = false;
          this.loginForm.controls['email'].setValue(data.email);
          // Clear the registration form for new users
          this.registerForm.reset();
        },
        error: (error) => {
          // Handle specific backend error messages if any
          if (error.status === 400 && error.error && error.error.Message) {
            this.message = `❌ ${error.error.Message}`;
          } else if (error.status === 409) {
            // Conflict, email already exists scenario
            this.message = '❌ Email already exists. Please use a different email.';
          } else if (error.status === 404) {
            this.message = '❌ Server endpoint not found. Please check your server.';
          } else {
            this.message = '❌ Registration failed due to a server error. Please try again.';
          }
        }
      });
    } else {
      this.message = '⚠️ Please fill in all required fields correctly.';
    }
  }


  onLogin(): void {
    console.log('Login form submitted:', this.loginForm.value);

    if (this.loginForm.valid) {
      console.log('Form is valid, making API call...');

      const data = this.loginForm.value;

      this.authService.login(data).subscribe({
        next: (response: any) => {

          if (response.Blocked) {
            this.message = '❌ Your account is blocked. Please contact support.';
            this.router.navigate(['/blockUser']);
          } else {
            this.message = response.Message || '✅ Login successful!';
            if (response.Admin) {
              // Admin redirection if needed
              this.router.navigate(['/adminUser']);  // or admin home
            } else {
              // Normal user redirection
              this.router.navigate(['/homeUser']);
            }
          }

        },
        error: (error) => {
          console.log('Login error:', error);

          const backendMessage = error.error?.Message || error.error?.message;

          if (error.status === 400 && backendMessage) {
            this.message = backendMessage;
          } else if (error.status === 404) {
            this.message = '❌ Server endpoint not found. Please check your server.';
          } else {
            this.message = '❌ Login failed due to a server error. Please try again.';
          }
        }
      });

    } else {
      this.message = '⚠️ Please fill in all required fields correctly.';
    }
  }

}



