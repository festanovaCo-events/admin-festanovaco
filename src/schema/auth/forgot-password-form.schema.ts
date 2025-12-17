import { z } from "zod";

export const createForgotPasswordSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.email(t("validation.emailInvalid")),
  });
};

// Default schema for backwards compatibility (will use English)
export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
