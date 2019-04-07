import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthFacade } from '~/app/auth/services/auth.facade.service';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { UserFacade } from '../../services/user.facade.service';

@Component({
  selector: 'demo-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnDestroy {
  public profileForm: FormGroup;
  public user$: Observable<User>;
  private subscription: Subscription;

  constructor(
    fb: FormBuilder,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    @Inject(DOCUMENT) private document
  ) {
    this.profileForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      lightPrimary: ['#000000'],
      lightAccent: ['#000000'],
      darkPrimary: ['#000000'],
      darkAccent: ['#000000']
    });

    this.user$ = this.authFacade.authenticatedUser$;

    this.user$.pipe(take(1)).subscribe(user => {
      this.profileForm.reset({ ...user, ...this.mapUserSettingsToFields(user) });
    });

    /**
     * Listen to the change in values of the form so you can update the theme colors in real-time
     */
    this.subscription = this.profileForm.valueChanges.subscribe(value => {
      this.document
        .querySelector(':root')
        .style.setProperty('--light-primary-color', value.lightPrimary);
      this.document
        .querySelector(':root')
        .style.setProperty('--light-accent-color', value.lightAccent);
      this.document
        .querySelector(':root')
        .style.setProperty('--dark-primary-color', value.darkPrimary);
      this.document
        .querySelector(':root')
        .style.setProperty('--dark-accent-color', value.darkAccent);
    });
  }

  mapUserSettingsToFields(
    user: User
  ): { lightPrimary: string; lightAccent: string; darkPrimary: string; darkAccent: string } {
    return {
      lightPrimary: user.settings.colors.lightPrimary,
      lightAccent: user.settings.colors.lightAccent,
      darkPrimary: user.settings.colors.darkPrimary,
      darkAccent: user.settings.colors.darkAccent
    };
  }

  mapFieldsToUserSettings(fields: {
    lightPrimary: string;
    lightAccent: string;
    darkPrimary: string;
    darkAccent: string;
    [prop: string]: any | undefined;
  }) {
    const settings = {
      lightPrimary: fields.lightPrimary,
      lightAccent: fields.lightAccent,
      darkPrimary: fields.darkPrimary,
      darkAccent: fields.darkAccent
    };
    delete fields.lightPrimary;
    delete fields.lightAccent;
    delete fields.darkPrimary;
    delete fields.darkAccent;

    return settings;
  }

  onSubmit({ valid, value }) {
    if (valid) {
      this.authFacade.authenticatedUser$.pipe(take(1)).subscribe(user => {
        const colorSetting = this.mapFieldsToUserSettings(value);
        const userSettings = { ...user.settings, colors: colorSetting };
        this.userFacade.updateUser({
          ...user,
          ...value,
          settings: userSettings
        });
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
