import type { UseFormReturn } from "react-hook-form";
import type { SimpleCreateEventFormValues } from "@/features/event/create/hooks/validations/create-event.schema";

export interface CreateEventFormProps {
  form: UseFormReturn<SimpleCreateEventFormValues>;
  onSubmit: (data: SimpleCreateEventFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}
