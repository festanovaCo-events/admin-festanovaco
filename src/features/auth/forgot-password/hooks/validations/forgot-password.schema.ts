import { z } from "zod";

export const createForgotPasswordSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
  });
};

export type ForgotPasswordValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;
