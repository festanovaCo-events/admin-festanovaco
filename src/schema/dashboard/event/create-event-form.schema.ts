import { z } from "zod";
import {
  EVENT_TYPE_VALUES,
  FILE_SIZE_LIMITS,
  MUSIC_OPTION_VALUES,
  PHOTO_UPLOAD_LIMITS,
} from "@/constants";

export const EVENT_TYPES = [
  EVENT_TYPE_VALUES.WEDDING,
  EVENT_TYPE_VALUES.BIRTHDAY,
  EVENT_TYPE_VALUES.ANNIVERSARY,
  EVENT_TYPE_VALUES.GRADUATION,
  EVENT_TYPE_VALUES.CORPORATE,
] as const;

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

export const createEventFormSchema = (
  t: (key: string, params?: Record<string, any>) => string
) => {
  const imageFileSchema = createImageFileSchema(t);
  const musicFileSchema = createMusicFileSchema(t);

  return z
    .object({
      title: z
        .string()
        .min(1, t("titleRequired"))
        .min(3, t("titleMin"))
        .max(100, t("titleMax")),

      description: z
        .string()
        .min(1, t("descriptionRequired"))
        .min(10, t("descriptionMin"))
        .max(500, t("descriptionMax")),

      eventType: z.enum(EVENT_TYPES, {
        error: t("eventTypeRequired"),
      }),

      date: z.string().min(1, t("dateRequired")),
      time: z.string().min(1, t("timeRequired")),
      location: z.string().min(3, t("locationRequired")),

      ceremonyDate: z.string().optional(),
      ceremonyTime: z.string().optional(),
      ceremonyLocation: z.string().optional(),

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
      if (data.eventType === EVENT_TYPE_VALUES.WEDDING) {
        const Validations = [
          {
            field: "ceremonyDate",
            value: data.ceremonyDate,
            errorMessage: t("ceremonyDateRequired"),
          },
          {
            field: "ceremonyTime",
            value: data.ceremonyTime,
            errorMessage: t("ceremonyTimeRequired"),
          },
          {
            field: "ceremonyLocation",
            value: data.ceremonyLocation,
            errorMessage: t("ceremonyLocationRequired"),
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
      }
    });
};

export type CreateEventFormValues = {
  title: string;
  description: string;
  eventType: typeof EVENT_TYPES[number];
  date: string;
  time: string;
  location: string;
  ceremonyDate?: string;
  ceremonyTime?: string;
  ceremonyLocation?: string;
  bannerPhoto: File[];
  gallery: File[];
  footerPhoto: File[];
  musicOption: typeof MUSIC_OPTION_VALUES.URL | typeof MUSIC_OPTION_VALUES.FILE;
  musicUrl?: string;
  musicFile?: File;
};
