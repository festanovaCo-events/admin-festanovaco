import { UseFormReturn } from "react-hook-form";
import type { EventConfigFormValues } from "@/schema";

export interface EventConfigFormProps {
  currentStep: number;
  eventType: string;
  onSubmit: (data: EventConfigFormValues) => Promise<void>;
  bannerPhotos: File[];
  galleryPhotos: File[];
  footerPhotos: File[];
  handleBannerUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGalleryUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFooterUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeBannerPhoto: (index: number) => void;
  removeGalleryPhoto: (index: number) => void;
  removeFooterPhoto: (index: number) => void;
  totalSteps: number;
  isLoading: boolean;
  isStepLoading: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
  onValidateStep?: (step: number, form: UseFormReturn<EventConfigFormValues>) => Promise<boolean>;
}
