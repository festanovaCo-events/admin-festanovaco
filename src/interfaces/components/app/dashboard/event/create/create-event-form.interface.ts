import type { SimpleCreateEventFormValues } from "@/schema";

export interface CreateEventFormProps {
  onSubmit: (data: SimpleCreateEventFormValues) => Promise<void>;
  isLoading: boolean;
}
