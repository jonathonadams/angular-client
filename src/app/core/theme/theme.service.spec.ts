import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let themeService: ThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    themeService = TestBed.get(ThemeService);
  });

  it('should be created', () => {
    expect(themeService).toBeTruthy();
  });
});
