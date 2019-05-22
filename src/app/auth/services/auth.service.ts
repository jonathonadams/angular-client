import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { GraphQLService } from '@app-core/graphql';
import { LocalStorageService } from '@app-core/storage';
import { DecodedJWT, LoginCredentials, LoginResponse } from '~/app/auth/models/auth.model';
import { ApolloQueryResult } from 'apollo-client';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class AuthService {
  private storageKey = 'access_token';

  constructor(private graphQL: GraphQLService, private localStorage: LocalStorageService) {}

  setAuthorizationToken(token: string): void {
    this.localStorage.setItem(this.storageKey, token);
  }

  getAuthorizationToken(): string {
    return this.localStorage.getItem(this.storageKey);
  }

  removeAuthorizationToken(): void {
    this.localStorage.removeItem(this.storageKey);
  }

  decodeToken(token: string): DecodedJWT {
    return jwtDecode<DecodedJWT>(token);
  }

  getDecodedToken(): DecodedJWT {
    return this.decodeToken(this.getAuthorizationToken());
  }

  checkTokenIsValid(token: string): boolean {
    const now = Math.floor(Date.now() / 1000);
    const expTime: number = this.decodeToken(token).exp;
    return now < expTime ? true : false;
  }

  // Checks if the user is logged in
  checkUserIsLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    return token && this.checkTokenIsValid(token) ? true : false;
  }

  // Check to see if the user is an admin
  checkUserIsAdmin(): boolean {
    const token = this.getAuthorizationToken();
    return token && this.checkTokenIsValid(token) ? this.decodeToken(token).admin : false;
  }
  // Login function that returns a user and JWT
  // This is a graphql login function
  login(credentials: LoginCredentials): Observable<ApolloQueryResult<{ login: LoginResponse }>> {
    const query = `
      mutation LoginUser($username: String!, $password: String!){
        login(username: $username, password: $password){
          token
        }
      }
    `;
    return this.graphQL.mutation<{ data: { login: LoginResponse } }>(query, credentials);
  }

  // swap out for a REST login function
  // login(credentials: LoginCredentials): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${environment.serverUrl}/authorize`, credentials);
  // }

  isPasswordAllowed(password: string): boolean {
    return !!password && password.length > 6 && /\d/.test(password) && /\D/.test(password);
  }

  passwordValidator() {
    return (control: AbstractControl) => {
      const allowed = this.isPasswordAllowed(control.value);
      // const forbidden = nameRe.test(control.value);
      return allowed ? null : { forbiddenName: { value: control.value } };
    };
  }
}
