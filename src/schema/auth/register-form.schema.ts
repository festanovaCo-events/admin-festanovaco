import { z } from "zod";

export const createRegisterSchema = (t: (key: string) => string) => {
  return z.object({
    firstName: z.string().min(1, t("firstNameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(6, { message: t("passwordMin") }),
  });
};

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
