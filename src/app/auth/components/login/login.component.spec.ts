import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@auth/services/auth.service';
import { ThemeService } from '@app-core/theme/theme.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let authService: AuthService;
  let store: Store<any>;
  let theme: ThemeService;
  const authServiceSpy = { userIsLoggedIn: jest.fn() };
  const storeSpy = { dispatch: jest.fn() };
  const themeSpy = { darkTheme$: jest.fn() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: ThemeService, useValue: themeSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    authService = TestBed.get(AuthService);
    store = TestBed.get(Store);
    theme = TestBed.get(ThemeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
