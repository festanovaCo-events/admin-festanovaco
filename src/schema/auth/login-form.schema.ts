import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.email(t("validation.emailInvalid")),
    password: z.string().min(6, t("validation.passwordMin")),
  });
};

// Default schema for backwards compatibility (will use English)
export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
