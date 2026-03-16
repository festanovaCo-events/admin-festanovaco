import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'auth_token';
const COOKIE_OPTIONS = {
  expires: 7,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
};

export function setAuthToken(token: string): void {
  Cookies.set(AUTH_TOKEN_KEY, token, COOKIE_OPTIONS);
}

export function getAuthToken(): string | undefined {
  return Cookies.get(AUTH_TOKEN_KEY);
}

export function removeAuthToken(): void {
  Cookies.remove(AUTH_TOKEN_KEY);
}
