import type { UseFormReturn } from "react-hook-form";
import type { EventConfigFormValues } from "@/features/event/config/hooks/validations/config-event-form.schema";

export interface MusicUploadCardProps {
  form: UseFormReturn<EventConfigFormValues>;
}
