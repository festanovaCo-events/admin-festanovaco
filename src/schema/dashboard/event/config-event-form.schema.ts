import { z } from "zod";
import {
  EVENT_TYPE_VALUES,
  FILE_SIZE_LIMITS,
  MUSIC_OPTION_VALUES,
  PHOTO_UPLOAD_LIMITS,
  EVENT_TYPES,
} from "@/constants";

const MAX_IMAGE_SIZE = FILE_SIZE_LIMITS.IMAGE_MAX_MB * 1024 * 1024;
const MAX_MUSIC_SIZE = FILE_SIZE_LIMITS.MUSIC_MAX_MB * 1024 * 1024;

const createImageFileSchema = (
  t: (key: string, params?: Record<string, any>) => string
) => {
  return z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: t("fileInvalid"),
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: t("imageSizeExceeded", { size: FILE_SIZE_LIMITS.IMAGE_MAX_MB }),
    });
};

const createMusicFileSchema = (
  t: (key: string, params?: Record<string, any>) => string
) => {
  return z
    .custom<File>()
    .refine((file) => file instanceof File || file === undefined, {
      message: t("fileInvalid"),
    })
    .refine((file) => !file || file.size <= MAX_MUSIC_SIZE, {
      message: t("musicSizeExceeded", { size: FILE_SIZE_LIMITS.MUSIC_MAX_MB }),
    });
};

export const createEventConfigFormSchema = (
  t: (key: string, params?: Record<string, any>) => string,
  eventType: string
) => {
  const imageFileSchema = createImageFileSchema(t);
  const musicFileSchema = createMusicFileSchema(t);

  return z
    .object({
      husbandName: z
        .string()
        .min(1, t("husbandNameRequired"))
        .min(2, t("husbandNameMin"))
        .max(100, t("husbandNameMax")),

      wifeName: z
        .string()
        .min(1, t("wifeNameRequired"))
        .min(2, t("wifeNameMin"))
        .max(100, t("wifeNameMax")),

      quote: z
        .string()
        .min(1, t("quoteRequired"))
        .min(10, t("quoteMin"))
        .max(500, t("quoteMax")),

      partyDateTime: z.string().optional(),

      weddingDateTime: z.string().optional(),
      addressWedding: z.string().optional(),

      bannerPhoto: z
        .array(imageFileSchema)
        .min(1, t("bannerRequired"))
        .max(PHOTO_UPLOAD_LIMITS.BANNER_MAX, t("bannerMax")),
      gallery: z
        .array(imageFileSchema)
        .min(1, t("galleryMin"))
        .max(PHOTO_UPLOAD_LIMITS.GALLERY_MAX, t("galleryMax")),
      footerPhoto: z
        .array(imageFileSchema)
        .min(1, t("footerRequired"))
        .max(PHOTO_UPLOAD_LIMITS.FOOTER_MAX, t("footerMax")),

      musicOption: z.enum([MUSIC_OPTION_VALUES.URL, MUSIC_OPTION_VALUES.FILE]),
      musicUrl: z.string().url(t("musicUrlInvalid")).optional(),
      musicFile: musicFileSchema.optional(),
    })
    .superRefine((data, ctx) => {
      if (eventType === EVENT_TYPES.WEDDING) {
        const Validations = [
          {
            field: "weddingDateTime",
            value: data.weddingDateTime,
            errorMessage: t("weddingDateTimeRequired"),
          },
          {
            field: "addressWedding",
            value: data.addressWedding,
            errorMessage: t("addressWeddingRequired"),
          },
        ];

        Validations.forEach((field) => {
          if (!field.value || field.value.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: field.errorMessage,
              path: [field.field],
            });
          }
        });
      } else {
        // Para eventos que no son boda, partyDateTime es obligatorio
        if (!data.partyDateTime || data.partyDateTime.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("partyDateTimeRequired"),
            path: ["partyDateTime"],
          });
        }
      }
    });
};

export type EventConfigFormValues = z.infer<
  ReturnType<typeof createEventConfigFormSchema>
> & {
  eventType?: string;
};
