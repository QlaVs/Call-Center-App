import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'login-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
  ) {}


  title = 'Login Page Title';

  loginForm = this.formBuilder.group({
    login: '',
    password: ''
  });

  onSubmit(): void {
    // Process checkout data here

    console.warn("You've been logged in - ", this.loginForm.value);
    this.loginForm.reset();
  }
}
