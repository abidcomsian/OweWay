import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
    selector: 'app-call-selector',
    templateUrl: './call-selector.component.html',
    styleUrls: ['./call-selector.component.css']
})
export class CallSelectorComponent {
    // Define the form group for Reactive Forms
    //registerForm = this.fb.group({
    //  name: ['', Validators.required],
    //  email: ['', [Validators.required, Validators.email]],
    //  password: ['', Validators.required]
    //});
    /////////////////////////
    registerForm: FormGroup;
    loginForm: FormGroup;
    message: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
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

    showRegisterForm: boolean = true; // default to show registration form

    toggleForm(): void {
        this.showRegisterForm = !this.showRegisterForm;
    }


  onSubmit() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.authService.register(data).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.message = "Registration successful!";
            // Optionally, switch to login form
            this.showRegisterForm = false;
            this.loginForm.controls['email'].setValue(data.email); // Prefill login email
          } else if (response.status === 'exists') {
            this.message = "You are already registered! Please log in.";
            this.showRegisterForm = false; // switch to login
            this.loginForm.controls['email'].setValue(data.email);
          } else {
            this.message = response.message || "Registration failed. Please try again.";
          }
        },
        error: (error) => {
          // Show friendly error, not the raw HTML error page
          if (error.status === 404) {
            this.message = "Server endpoint not found. Please check your server.";
          } else {
            this.message = error.error?.message || "An error occurred. Please try again.";
          }
        },
        complete: () => {
          // You can put a completion message here if needed
          console.log('Registration observable completed.');
        }
      });
    }
  }



    ////////////////////////
    onLogin(): void {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (res) => {
                    this.message = res.message;
                },
                error: (err) => {
                    this.message = err.error || 'Invalid credentials. Please register first!';
                }
            });
        }
    }
}
