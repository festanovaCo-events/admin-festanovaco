import type { RegisterRequest } from '@/interfaces';

export function formatRegisterData(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): RegisterRequest {
  return {
    name: `${firstName} ${lastName}`.trim(),
    email,
    password,
  };
}
