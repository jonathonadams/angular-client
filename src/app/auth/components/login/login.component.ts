import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { LoginCredentials } from '@app/auth/auth.model';
import { Login, LoginRedirect } from '@auth/auth.actions';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])
      ]
    });

    // Check user is logged in.
    this.checkUserIsLoggedIn();
  }

  checkUserIsLoggedIn(): void {
    if (this.auth.checkUserIsLoggedIn()) {
      this.store.dispatch(new LoginRedirect());
    }
  }

  reset(): void {
    this.loginForm.reset();
  }

  public onSubmit({ value, valid }: { value: LoginCredentials; valid: boolean }): void {
    if (valid) {
      this.store.dispatch(new Login(value));
    }
  }
}
