import { User } from '@features/users';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface DecodedJWT {
  sub: string; // subject (id)
  exp: number; // expire time
  iat: string; // issued at time
  admin: boolean;
}
