import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let storageService: LocalStorageService;
  const key = 'key';
  const value = 'some value';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    storageService = TestBed.get(LocalStorageService);
  });

  afterEach(() => {
    localStorage.removeItem(key);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  describe('setItem', () => {
    it('should set an item with the given key', () => {
      expect(localStorage.getItem(key)).toBeFalsy();
      storageService.setItem(key, value);
      expect(localStorage.getItem(key)).toBeDefined();
      expect(localStorage.getItem(key)).toEqual(value);
    });
  });

  describe('getItem', () => {
    it('should get an item with the given key', () => {
      localStorage.setItem(key, value);
      expect(storageService.getItem(key)).toBeDefined();
      expect(storageService.getItem(key)).toEqual(value);
    });
  });

  describe('removeItem', () => {
    it('should remove an item with the given key', () => {
      localStorage.setItem(key, value);
      expect(localStorage.getItem(key)).toBeDefined();
      expect(localStorage.getItem(key)).toEqual(value);

      storageService.removeItem(key);
      expect(localStorage.getItem(key)).toBeFalsy();
    });
  });
});
