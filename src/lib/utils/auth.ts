import { getAuthToken } from './cookies';

/**
 * Verifica si el usuario está autenticado
 * @returns true si existe un token de autenticación, false en caso contrario
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return !!token;
}

/**
 * Obtiene el locale actual desde la URL
 * @returns El locale actual (ej: 'en', 'es') o 'en' como default
 */
export function getCurrentLocale(): string {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const pathname = window.location.pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  
  const validLocales = ['en', 'es'];
  const localeFromPath = pathSegments[0];
  
  if (validLocales.includes(localeFromPath)) {
    return localeFromPath;
  }

  const localeFromCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('NEXT_LOCALE='))
    ?.split('=')[1];

  if (localeFromCookie && validLocales.includes(localeFromCookie)) {
    return localeFromCookie;
  }

  return 'en';
}

/**
 * Verifica si la ruta actual es una ruta de autenticación
 * @returns true si estamos en una ruta de auth, false en caso contrario
 */
export function isAuthRoute(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const pathname = window.location.pathname;
  return pathname.includes('/auth/login') || 
         pathname.includes('/auth/register') || 
         pathname.includes('/auth/forgot-password');
}

/**
 * Redirige al login con el locale correcto
 * Verifica que no estemos ya en una ruta de auth para evitar loops
 * Verifica que no haya token antes de redirigir (evitar loops)
 * @param force - Si es true, fuerza la redirección sin verificar el token (útil para logout)
 */
export function redirectToLogin(force: boolean = false): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (isAuthRoute()) {
    return;
  }

  if (!force && isAuthenticated()) {
    return;
  }

  const locale = getCurrentLocale();
  window.location.href = `/${locale}/auth/login`;
}
