import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@auth/services/auth.service';
import { catchError } from 'rxjs/operators';
import { AuthFacade } from '../services/auth.facade.service';
import { GlobalFacade } from '~/app/store/effects/global.facade';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private facade: AuthFacade,
    private globalFacade: GlobalFacade
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.facade.logout();
          this.globalFacade.displayNotification('Your session has expired, please login.');
        } else if (error.status === 404) {
          this.facade.logout();
          this.globalFacade.displayNotification(
            'An error has occurred, please login and try again.'
          );
        }
        return throwError(error);
      })
    );
  }
}
