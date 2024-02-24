import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cookie } from '../utils/cookies';
import { v4 as uuidv4 } from 'uuid';


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
    private router: Router,
  ) {}


  title = 'Login Page';

  loginForm = this.formBuilder.group({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  onSubmit(): void {
    
    let currentUsers = JSON.parse(localStorage.getItem('users') as string) || [];
    let currentTokens = JSON.parse(localStorage.getItem('tokens') as string) || [];
    if (currentUsers.filter(this.filterByLogin).length > 0) {
      const userToken: string = uuidv4();

      var expDate = new Date().getTime() + (3600 * 1000);
      
      // Токены сваливаются в общий массив, в идеале нужно добавить очистку токенов
      localStorage.setItem('tokens',
        JSON.stringify(
          currentTokens.concat({
            userToken: userToken,
            expirationTime: expDate
          })
        )
      );
  
      let cookie: Cookie = new Cookie();
      cookie.setCookie('userToken', userToken, 0.04);
      cookie.setCookie('login', this.loginForm.value.login as string, 0.04);
  
      console.warn("You've been logged in - ", this.loginForm.value);
      this.loginForm.reset();

      this.router.navigate(['/call']);
    } else {
      alert("Incorrect login or password");
      return;
    }
  }

  public filterByLogin = (
    item: {
      login: string,
      password: string
    }
  ) => {
    return item.login === this.loginForm.value.login && item.password == this.loginForm.value.password;
  }
}
