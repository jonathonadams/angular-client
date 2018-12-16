import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jest-marbles';
import { createSpyObj } from '@tests/helper-functions';
import { Login, LoginFailure, LoginSuccess } from '@auth/actions/auth.actions';
import { AuthService } from '@auth/services/auth.service';
import { AuthEffects } from '@auth/effects/auth.effects';
import { LoginCredentials } from '../models/auth.model';

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
      const token = 'JWT.TOKEN';
      const action = new Login(credentials);
      const completion = new LoginSuccess({ token });

      actions$ = hot('-a---', { a: action });
      // Example graphql response below
      // const response = cold('-a|', { a: { data: { login: { user, token } } } });
      const response = cold('-a|', { a: { token } });
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a new LoginFailure if the login service throws', () => {
      const credentials: LoginCredentials = { username: 'someOne', password: '' };
      const action = new Login(credentials);
      const completion = new LoginFailure(new Error('Invalid username or password'));
      const error = 'Invalid username or password';

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  // describe('loginSuccess$', () => {
  //   it('should dispatch a LoadAuthenticatedUser action', () => {
  //     const token = 'JWT.TOKEN';
  //     const action = new LoginSuccess({ token });
  //     const completion = new LoadAuthenticatedUser();

  //     actions$ = hot('-a---', { a: action });
  //     const expected = cold('-b', { b: completion });

  //     expect(effects.loginSuccess$).toBeObservable(expected);
  //   });
  // });

  // describe('loginRedirect$', () => {
  //   it('should dispatch a RouterNavigation action when LoginRedirect is dispatched', () => {
  //     const action = new LoginRedirect();

  //     actions$ = hot('-a---', { a: action });

  //     effects.loginRedirect$.subscribe(() => {
  //       expect(router.navigate).toHaveBeenCalledWith(['/login']);
  //     });
  //   });

  //   it('should dispatch a RouterNavigation action when Logout is dispatched', () => {
  //     const action = new Logout();

  //     actions$ = hot('-a---', { a: action });

  //     effects.loginRedirect$.subscribe(() => {
  //       expect(router.navigate).toHaveBeenCalledWith(['/login']);
  //     });
  //   });
  // });
});
