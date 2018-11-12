import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private config: MatSnackBarConfig;

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 4000;
    this.config.direction = 'ltr';
    this.config.horizontalPosition = 'center';
  }

  emit(notification: string) {
    this.snackBar.open(notification, 'Dismiss', this.config);
  }
}
