import { z } from "zod";
import { EVENT_TYPES, EVENT_MODES, CAPACITY_LIMITS } from "@/constants";

export const createSimpleEventFormSchema = (
  t: (key: string) => string
) => {
  return z.object({
    title: z
      .string()
      .min(1, t("titleRequired"))
      .min(3, t("titleMin"))
      .max(100, t("titleMax")),
    type: z.enum([
      EVENT_TYPES.WEDDING,
      EVENT_TYPES.BIRTHDAY,
      EVENT_TYPES.ANNIVERSARY,
      EVENT_TYPES.GRADUATION,
      EVENT_TYPES.CORPORATE,
    ], {
      message: t("typeRequired"),
    }),
    mode: z.enum([
      EVENT_MODES.ON_SITE,
      EVENT_MODES.ONLINE,
      EVENT_MODES.HYBRID,
    ], {
      message: t("modeRequired"),
    }),
    address: z
      .string()
      .min(1, t("addressRequired"))
      .min(3, t("addressMin")),
    isPublic: z.boolean(),
    capacity: z
      .number()
      .min(CAPACITY_LIMITS.MIN, t("capacityMin"))
      .max(CAPACITY_LIMITS.MAX, t("capacityMax")),
  });
};

export type SimpleCreateEventFormValues = z.infer<
  ReturnType<typeof createSimpleEventFormSchema>
>;
