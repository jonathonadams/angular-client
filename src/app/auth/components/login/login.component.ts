import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from '~/app/auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { ThemeService } from '@app-core/theme/theme.service';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../services/auth.facade.service';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  private darkTheme$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private facade: AuthFacade,
    private theme: ThemeService
  ) {
    this.darkTheme$ = this.theme.darkTheme$;
  }

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
      this.facade.loginRedirect();
    }
  }

  public onSubmit({ value, valid }: { value: LoginCredentials; valid: boolean }): void {
    if (valid) {
      this.facade.login(value);
    }
  }
}
