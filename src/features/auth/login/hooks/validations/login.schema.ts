import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(6, { message: t("passwordMin") }),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
