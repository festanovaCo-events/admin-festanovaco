import type { Path, UseFormReturn } from "react-hook-form";
import type { EventConfigFormValues } from "@/features/event/config/hooks/validations/config-event-form.schema";

export interface PhotoGalleryCardProps {
  form: UseFormReturn<EventConfigFormValues>;
  name: Path<EventConfigFormValues>;
  photos: File[];
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
  title: string;
  description: string;
}
