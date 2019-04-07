import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { of } from 'rxjs';
import { AuthFacade } from '~/app/auth/services/auth.facade.service';

describe('ThemeService', () => {
  let themeService: ThemeService;
  let authFacade: AuthFacade;
  const authSpy = { authenticatedUser$: of(jest.fn()) };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, { provide: AuthFacade, useValue: authSpy }]
    });
    themeService = TestBed.get(ThemeService);
    authFacade = TestBed.get(AuthFacade);
  });

  it('should be created', () => {
    expect(themeService).toBeTruthy();
  });
});
