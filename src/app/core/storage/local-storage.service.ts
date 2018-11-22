import { Injectable } from '@angular/core';
import LocalStorage from './local-storage';

// The appropriate local storage will be imported depending on if you are
// building for the web or for native web development
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem(key: string, value: string): void {
    LocalStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return LocalStorage.getItem(key);
  }

  removeItem(key: string): void {
    LocalStorage.removeItem(key);
  }
}
