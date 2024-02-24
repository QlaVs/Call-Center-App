import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cookie } from '../utils/cookies';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  title: any = '';
  
  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
  }

  registerForm = this.formBuilder.group({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    passwordRepeat: new FormControl("", Validators.required),
  });

  onSubmit(): void {
    if (this.registerForm.value.password != this.registerForm.value.passwordRepeat) {
      alert("Passwords don't match");
      return;
    }

    let currentUsers = JSON.parse(localStorage.getItem('users') as string) || [];
    if (currentUsers.filter(this.filterByUniceLogin).length == 0) {
      const userToken: string = uuidv4();

      localStorage.setItem('users',
        JSON.stringify(
          currentUsers.concat({
            login: this.registerForm.value.login as string,
            password: this.registerForm.value.password as string
          })
        )
      );

      var expDate = new Date().getTime() + (3600 * 1000);
      
      // Токены сваливаются в общий массив, в идеале нужно добавить очистку токенов
      localStorage.setItem('tokens',
        JSON.stringify(
          currentUsers.concat({
            userToken: userToken,
            expirationTime: expDate
          })
        )
      );
  
      let cookie: Cookie = new Cookie();
      cookie.setCookie('userToken', userToken, 0.04);
      cookie.setCookie('login', this.registerForm.value.login as string, 0.04);
  
      console.warn("You've been registered - ", this.registerForm.value);
      this.registerForm.reset();

      this.router.navigate(['/call']);
    } else {
      alert("Current login is already taken");
      return;
    }
  }

  public filterByUniceLogin = (
    item: {
      login: string,
      password: string
    }
  ) => {
    return item.login === this.registerForm.value.login;
  }
}