import { z } from "zod";

export const EVENT_TYPES = [
  "boda",
  "cumpleanos",
  "aniversario",
  "graduacion",
  "corporativo",
] as const;

const MAX_IMAGE_SIZE_MB = 5;
const MAX_MUSIC_SIZE_MB = 10;
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const MAX_MUSIC_SIZE = MAX_MUSIC_SIZE_MB * 1024 * 1024;

const imageFileSchema = z
  .custom<File>()
  .refine((file) => file instanceof File, {
    message: "Debe ser un archivo válido",
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: `La imagen no puede superar los ${MAX_IMAGE_SIZE_MB} MB`,
  });

const musicFileSchema = z
  .custom<File>()
  .refine((file) => file instanceof File || file === undefined, {
    message: "Debe ser un archivo válido",
  })
  .refine((file) => !file || file.size <= MAX_MUSIC_SIZE, {
    message: `La canción no puede superar los ${MAX_MUSIC_SIZE_MB} MB`,
  });

export const createEventFormSchema = z
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
      .array(imageFileSchema)
      .min(1, "Debes subir una imagen para el banner")
      .max(1, "Solo puedes subir 1 imagen"),
    gallery: z
      .array(imageFileSchema)
      .min(1, "Debes subir al menos una imagen a la galería")
      .max(10, "Máximo 10 fotos"),
    footerPhoto: z
      .array(imageFileSchema)
      .min(1, "Debes subir una imagen para el pie de foto")
      .max(1, "Solo puedes subir 1 imagen"),

    musicOption: z.enum(["url", "file"]),
    musicUrl: z.string().url("Debe ser una URL válida").optional(),
    musicFile: musicFileSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eventType === "boda") {
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
            message: `${field.errorMessage}`,
            path: [field.field],
          });
        }
      });
    }
  });

export type CreateEventFormValues = z.infer<typeof createEventFormSchema>;
