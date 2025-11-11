import { UseFormReturn } from "react-hook-form";
import { CreateEventFormValues } from "@/schema";

interface PhotoGalleryCardProps {
  form: UseFormReturn<CreateEventFormValues>;
  name: keyof CreateEventFormValues;
  photos: File[];
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
  title: string;
  description: string;
}

interface MusicUploadCardProps {
  form: UseFormReturn<CreateEventFormValues>;
}

interface BasicInfoCardProps {
  form: UseFormReturn<CreateEventFormValues>;
}

interface DateLocationCardProps {
  form: UseFormReturn<CreateEventFormValues>;
}

interface CeremonyDetailsCardProps {
  form: UseFormReturn<CreateEventFormValues>;
}

export type {
  PhotoGalleryCardProps,
  MusicUploadCardProps,
  BasicInfoCardProps,
  DateLocationCardProps,
  CeremonyDetailsCardProps,
};
