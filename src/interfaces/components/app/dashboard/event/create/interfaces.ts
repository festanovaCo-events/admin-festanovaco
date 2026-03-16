import { UseFormReturn, Path } from "react-hook-form";
import { EventConfigFormValues } from "@/schema";

interface PhotoGalleryCardProps {
  form: UseFormReturn<EventConfigFormValues>;
  name: Path<EventConfigFormValues>;
  photos: File[];
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
  title: string;
  description: string;
}

interface MusicUploadCardProps {
  form: UseFormReturn<EventConfigFormValues>;
}

interface BasicInfoCardProps {
  form: UseFormReturn<EventConfigFormValues>;
}

interface DateLocationCardProps {
  form: UseFormReturn<EventConfigFormValues>;
}

interface CeremonyDetailsCardProps {
  form: UseFormReturn<EventConfigFormValues>;
}

export type {
  PhotoGalleryCardProps,
  MusicUploadCardProps,
  BasicInfoCardProps,
  DateLocationCardProps,
  CeremonyDetailsCardProps,
};
