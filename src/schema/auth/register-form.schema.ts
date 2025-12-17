import { z } from "zod";

export const createRegisterSchema = (t: (key: string) => string) => {
  return z.object({
    firstName: z.string().min(1, t("validation.firstNameRequired")),
    lastName: z.string().min(1, t("validation.lastNameRequired")),
    email: z.email(t("validation.emailInvalid")),
    password: z.string().min(6, t("validation.passwordMin")),
  });
};

// Default schema for backwards compatibility (will use English)
export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
