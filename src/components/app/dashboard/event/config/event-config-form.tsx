"use client";

import { useTranslations } from "next-intl";
import { Form } from "@/components/shadcn/ui/form";
import { BasicInfoCardConfig } from "@/components/app/dashboard/event/config/basic-info-card-config";
import { DateLocationCardConfig } from "@/components/app/dashboard/event/config/date-location-card-config";
import { CeremonyDetailsCardConfig } from "@/components/app/dashboard/event/config/ceremony-details-card-config";
import { MusicUploadCard } from "@/components/app/dashboard/event/config/music-upload-card";
import { PhotoGalleryCard } from "@/components/app/dashboard/event/config/photo-gallery-card";
import { StepActions } from "@/components/common";
import {
  EVENT_CREATE_STEP_IDS,
  EVENT_CREATE_FIELD_NAMES,
  EVENT_TYPES,
} from "@/constants";
import type { EventConfigFormProps } from "@/interfaces/components/app/dashboard/event/config/event-config-form.interface";

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
            <DateLocationCardConfig form={form} />
            {eventType === EVENT_TYPES.WEDDING && (
              <CeremonyDetailsCardConfig form={form} />
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
