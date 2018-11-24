import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jest-marbles';
import { createSpyObj } from '@test/helper-functions';
import {
  Login,
  LoginFailure,
  LoginRedirect,
  LoginSuccess,
  Logout
} from '@auth/actions/auth.actions';
import { AuthService } from '@auth/services/auth.service';
import { AuthEffects } from '@auth/effects/auth.effects';
import { LoginCredentials } from '../auth.model';
import { User } from '@features/users';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions$: Observable<any>;
  let router: any;
  const authSpy = createSpyObj('AuthService', ['login']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: authSpy
        },
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    actions$ = TestBed.get(Actions);
    router = TestBed.get(Router);

    spyOn(router, 'navigate').and.callThrough();
  });

  describe('login$', () => {
    it('should return an LoginSuccess action, with user information if login succeeds', () => {
      const credentials: LoginCredentials = { username: 'test', password: '' };
      const user = { username: 'User' } as User;
      const token = 'JWT.TOKEN';
      const action = new Login(credentials);
      const completion = new LoginSuccess({ user, token });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: { data: { login: { user, token } } } });
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      (expect(effects.login$) as any).toBeObservable(expected);
    });

    it('should return a new LoginFailure if the login service throws', () => {
      const credentials: LoginCredentials = { username: 'someOne', password: '' };
      const action = new Login(credentials);
      const completion = new LoginFailure('Invalid username or password');
      const error = 'Invalid username or password';

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      (expect(effects.login$) as any).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should dispatch a RouterNavigation action', () => {
      const user = { username: 'User' } as User;
      const token = 'JWT.TOKEN';
      const action = new LoginSuccess({ user, token });

      actions$ = hot('-a---', { a: action });

      effects.loginSuccess$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(true).toBe(false);
      });
    });
  });

  describe('loginRedirect$', () => {
    it('should dispatch a RouterNavigation action when LoginRedirect is dispatched', () => {
      const action = new LoginRedirect();

      actions$ = hot('-a---', { a: action });

      effects.loginRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
    });

    it('should dispatch a RouterNavigation action when Logout is dispatched', () => {
      const action = new Logout();

      actions$ = hot('-a---', { a: action });

      effects.loginRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});
