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

const createImageFileSchema = (t: (key: string) => string) => {
  return z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: t("fileInvalid"),
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: t("imageSizeExceeded", { size: FILE_SIZE_LIMITS.IMAGE_MAX_MB }),
    });
};

const createMusicFileSchema = (t: (key: string) => string) => {
  return z
    .custom<File>()
    .refine((file) => file instanceof File || file === undefined, {
      message: t("fileInvalid"),
    })
    .refine((file) => !file || file.size <= MAX_MUSIC_SIZE, {
      message: t("musicSizeExceeded", { size: FILE_SIZE_LIMITS.MUSIC_MAX_MB }),
    });
};

export const createEventFormSchema = (t: (key: string) => string) => {
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

// Default schema for backwards compatibility (will use Spanish)
const imageFileSchemaDefault = z
  .custom<File>()
  .refine((file) => file instanceof File, {
    message: "Debe ser un archivo válido",
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: `La imagen no puede superar los ${FILE_SIZE_LIMITS.IMAGE_MAX_MB} MB`,
  });

export const createEventFormSchemaDefault = z
  .object({
    title: z
      .string()
      .min(1, "El título del evento es obligatorio")
      .min(3, "El título debe tener al menos 3 caracteres")
      .max(100, "El título no puede exceder los 100 caracteres"),

    description: z
      .string()
      .min(1, "La descripción es obligatoria")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(500, "La descripción no puede exceder los 500 caracteres"),

    eventType: z.enum(EVENT_TYPES, {
      error: "Selecciona un tipo de evento",
    }),

    date: z.string().min(1, "Selecciona la fecha del evento"),
    time: z.string().min(1, "Selecciona la hora del evento"),
    location: z.string().min(3, "El lugar del evento es obligatorio"),

    ceremonyDate: z.string().optional(),
    ceremonyTime: z.string().optional(),
    ceremonyLocation: z.string().optional(),

    bannerPhoto: z
      .array(imageFileSchemaDefault)
      .min(1, "Debes subir una imagen para el banner")
      .max(PHOTO_UPLOAD_LIMITS.BANNER_MAX, "Solo puedes subir 1 imagen"),
    gallery: z
      .array(imageFileSchemaDefault)
      .min(1, "Debes subir al menos una imagen a la galería")
      .max(PHOTO_UPLOAD_LIMITS.GALLERY_MAX, "Máximo 10 fotos"),
    footerPhoto: z
      .array(imageFileSchemaDefault)
      .min(1, "Debes subir una imagen para el pie de foto")
      .max(PHOTO_UPLOAD_LIMITS.FOOTER_MAX, "Solo puedes subir 1 imagen"),

    musicOption: z.enum([MUSIC_OPTION_VALUES.URL, MUSIC_OPTION_VALUES.FILE]),
    musicUrl: z.string().url("Debe ser una URL válida").optional(),
    musicFile: z.custom<File>().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eventType === EVENT_TYPE_VALUES.WEDDING) {
      const Validations = [
        {
          field: "ceremonyDate",
          value: data.ceremonyDate,
          errorMessage: "Selecciona la fecha de la ceremonia",
        },
        {
          field: "ceremonyTime",
          value: data.ceremonyTime,
          errorMessage: "Selecciona la hora de la ceremonia",
        },
        {
          field: "ceremonyLocation",
          value: data.ceremonyLocation,
          errorMessage: "Selecciona el lugar de la ceremonia",
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

// Base type that doesn't depend on translations
export type CreateEventFormValues = z.infer<
  typeof createEventFormSchemaDefault
>;
