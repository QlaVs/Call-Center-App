import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cookie } from '../utils/cookies';

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
    private route: ActivatedRoute
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
      localStorage.setItem('users',
        JSON.stringify(
          currentUsers.concat({
            login: this.registerForm.value.login as string,
            password: this.registerForm.value.password as string
          })
        )
      );
  
      let cookie: Cookie = new Cookie();
      cookie.setCookie('login', this.registerForm.value.login as string, 1);
  
      console.warn("You've been logged in - ", this.registerForm.value);
      this.registerForm.reset();

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