import { Injectable } from '@angular/core';
import {
  getString,
  setString,
  remove
} from 'tns-core-modules/application-settings';

// The appropriate local storage will be imported depending on if you are
// building for the web or for native web development
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem(key: string, value: string): void {
    setString(key, value);
  }

  getItem(key: string): string {
    return getString(key);
  }

  removeItem(key: string): void {
    remove(key);
  }
}
