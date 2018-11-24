import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@auth/services/auth.service';
import { Store } from '@ngrx/store';
import { Logout } from '@auth/actions/auth.actions';
import { storeStub } from '@tests/helper-functions';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceSpy: AuthService;
  let store: Store<any>;

  const authSpy = { userIsLoggedIn: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Store, useValue: storeStub }
      ]
    });

    authGuard = TestBed.get(AuthGuard);
    authServiceSpy = TestBed.get(AuthService);
    store = TestBed.get(Store);
  });

  it('should allow access and not navigate if the user is logged in', () => {
    const spy = jest.spyOn(store, 'dispatch');

    authServiceSpy.checkUserIsLoggedIn = jest.fn(() => true);

    expect(authGuard.canActivate()).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
    spy.mockReset();
  });

  it('should dispatch a logout action if the user is not logged in', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const logoutAction = new Logout();
    authServiceSpy.checkUserIsLoggedIn = jest.fn(() => false);

    expect(authGuard.canActivate()).toEqual(false);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(logoutAction);
    spy.mockReset();
  });
});
