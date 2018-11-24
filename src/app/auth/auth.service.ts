import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { GraphQLService } from '@app-core/graphql';
import { LocalStorageService } from '@app-core/storage';
import { DecodedJWT, LoginCredentials, LoginResponse } from '@auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {
  private storageKey = 'access_token';

  constructor(
    private graphQL: GraphQLService,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {}

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
  // swap out for a REST login function
  // login(
  //   credentials: LoginCredentials
  // ): Observable<FetchResult<{ data: { login: LoginResponse } }>> {
  //   const query = `
  //     mutation LoginUser($username: String!, $password: String!){
  //       login(username: $username, password: $password){
  //         token
  //         user {
  //           id
  //           username
  //         }
  //       }
  //     }
  //   `;
  //   return this.graphQL.mutation<{ data: { login: LoginResponse } }>(query, credentials);
  // }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.serverUrl}/authorize`, credentials);
  }
}
