import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

import {UserInterface} from "@models";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

interface ILoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit{
  form!:FormGroup<ILoginForm>
  submitted: boolean = false
  authService = inject(AuthService)
  router = inject(Router)

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('john91@gmail.com', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('Asdfg!1', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true
    if( this.form.value.email && this.form.value.password) {
      const user: UserInterface = {
        email: this.form.value.email,
        password: this.form.value.password,
      }

      this.authService
        .login(user)
        .then(({user})=> {
          this.form.reset()
          this.router.navigate(['/admin', 'dashboard'])
          this.submitted = false
      }).catch((err)=> {
        console.log(err)
      })
    }


  }

  get getForm () {
    return this.form.controls
  }
}
