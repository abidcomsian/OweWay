import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:5000/api/auth/register', this.registerForm.value)
        .subscribe({
          next: () => alert('Registration successful!'),
          error: err => alert('Error: ' + err.error?.message ?? err.message)
        });
    }
  }
}
