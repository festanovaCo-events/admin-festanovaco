import type { RegisterRequest } from "@/interfaces/api/auth/requests.interface";

export function formatRegisterData(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): RegisterRequest {
  return {
    name: `${firstName} ${lastName}`.trim(),
    email,
    password,
  };
}
