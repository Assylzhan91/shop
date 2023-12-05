import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {UserInterface} from "@models";
import {AUTH_SERVICE} from "@tokens";

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
export class LoginPageComponent implements OnInit {
  form!: FormGroup<ILoginForm>
  submitted: boolean = false
  authService = inject(AUTH_SERVICE)
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
    if (this.form.value.email && this.form.value.password) {
      const user: UserInterface = {
        email: this.form.value.email,
        password: this.form.value.password,
        returnSecureToken: true
      }

      this.authService
        .login(user)
        .subscribe(() => {
          this.form.reset()
          this.router.navigate(['/admin', 'dashboard'])
          this.submitted = false
        })
    }
  }

  get getForm() {
    return this.form.controls
  }
}
