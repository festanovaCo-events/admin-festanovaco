"use client";

import { useTranslations } from "next-intl";
import { EVENT_CREATE_FIELD_NAMES, EVENT_CREATE_STEP_IDS } from "@/constants/event-create";
import { EVENT_TYPES } from "@/constants/event/event-types";
import type { EventConfigFormProps } from "@/interfaces/components/app/dashboard/event/config/event-config-form.interface";
import { StepActions } from "@/shared/ui/common/steps/step-actions";
import { Form } from "@/shared/ui/shadcn/ui/form";
import { BasicInfoCardConfig } from "./basic-info-card-config";
import { DateLocationCardConfig } from "./date-location-card-config";
import { MusicUploadCard } from "./music-upload-card";
import { PartyDetailsCardConfig } from "./party-details-card-config";
import { PhotoGalleryCard } from "./photo-gallery-card";

export const EventConfigForm = ({
  form,
  currentStep,
  eventType,
  onSubmit,
  bannerPhotos,
  galleryPhotos,
  footerPhotos,
  handleBannerUpload,
  handleGalleryUpload,
  handleFooterUpload,
  removeBannerPhoto,
  removeGalleryPhoto,
  removeFooterPhoto,
  totalSteps,
  isLoading,
  isStepLoading,
  onNext,
  onPrevious,
  onCancel,
  onValidateStep,
}: EventConfigFormProps) => {
  const t = useTranslations("event.create");

  const handleNextStep = async () => {
    if (onValidateStep) {
      const isValid = await onValidateStep(currentStep, form);
      if (isValid && onNext) {
        onNext();
      }
    } else if (onNext) {
      onNext();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === EVENT_CREATE_STEP_IDS.STEP_1 && (
          <BasicInfoCardConfig form={form} />
        )}

        {currentStep === EVENT_CREATE_STEP_IDS.STEP_2 && (
          <div className="space-y-6">
            {eventType !== EVENT_TYPES.WEDDING && (
              <DateLocationCardConfig form={form} />
            )}
            {eventType === EVENT_TYPES.WEDDING && (
              <PartyDetailsCardConfig form={form} />
            )}
          </div>
        )}

        {currentStep === EVENT_CREATE_STEP_IDS.STEP_3 && (
          <div className="space-y-6">
            <PhotoGalleryCard
              form={form}
              name={EVENT_CREATE_FIELD_NAMES.BANNER_PHOTO}
              title={t("gallery.bannerTitle")}
              description={t("gallery.bannerDescription")}
              photos={bannerPhotos}
              handlePhotoUpload={handleBannerUpload}
              removePhoto={removeBannerPhoto}
            />

            <PhotoGalleryCard
              form={form}
              name={EVENT_CREATE_FIELD_NAMES.GALLERY}
              title={t("gallery.galleryTitle")}
              description={t("gallery.galleryDescription", {
                count: galleryPhotos.length,
              })}
              photos={galleryPhotos}
              handlePhotoUpload={handleGalleryUpload}
              removePhoto={removeGalleryPhoto}
            />

            <PhotoGalleryCard
              form={form}
              name={EVENT_CREATE_FIELD_NAMES.FOOTER_PHOTO}
              title={t("gallery.footerTitle")}
              description={t("gallery.footerDescription")}
              photos={footerPhotos}
              handlePhotoUpload={handleFooterUpload}
              removePhoto={removeFooterPhoto}
            />
          </div>
        )}

        {currentStep === EVENT_CREATE_STEP_IDS.STEP_4 && (
          <MusicUploadCard form={form} />
        )}

        <StepActions
          currentStep={currentStep}
          totalSteps={totalSteps}
          isLoading={isLoading || isStepLoading}
          onNext={handleNextStep}
          onPrevious={onPrevious}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
};
