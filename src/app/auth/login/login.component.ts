import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared.actions';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  getEmailValidationError(): string {
    const emailControl = this.loginForm.get('email');

    if (emailControl.touched && !emailControl.valid) {
      if (emailControl.errors.required) {
        return 'Email is required';
      }

      if (emailControl.errors.email) {
        return 'Invalid email';
      }
    }

    return null;
  }

  getPasswordValidationError(): string {
    const passwordControl = this.loginForm.get('password');

    if (passwordControl.touched && !passwordControl.valid) {
      if (passwordControl.errors.required) {
        return 'Password is required';
      }

      if (passwordControl.errors.minlength) {
        return 'Password must be at least 6 chars';
      }
    }

    return null;
  }

  onSubmit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(loginStart({ email, password }));
  }

}
