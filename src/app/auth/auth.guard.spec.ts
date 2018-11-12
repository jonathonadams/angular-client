import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Logout } from './auth.actions';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceSpy: AuthService;
  let store: Store<any>;

  const spy = { userIsLoggedIn: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: spy },
        { provide: Store, useValue: {} }
      ]
    });

    authGuard = TestBed.get(AuthGuard);
    authServiceSpy = TestBed.get(AuthService);
    store = TestBed.get(Store);
  });

  it('should dispatch a logout action if the user is not logged in', () => {
    jest.spyOn(store, 'dispatch');
    const logoutAction = new Logout();
    authServiceSpy.checkUserIsLoggedIn = jest.fn(() => false);

    expect(authGuard.canActivate()).toEqual(false);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(logoutAction);
  });

  it('should allow access and not navigate if the user is logged in', () => {
    jest.spyOn(store, 'dispatch');

    authServiceSpy.checkUserIsLoggedIn = jest.fn(() => false);

    expect(authGuard.canActivate()).toEqual(true);
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
