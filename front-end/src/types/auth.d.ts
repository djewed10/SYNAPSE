/**
 * Type Definitions - Auth
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface JWTPayload {
  sub: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}
