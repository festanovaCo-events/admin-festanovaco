"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Form } from "@/components/shadcn/ui/form";
import { MusicUploadCard } from "@/components/app/dashboard/event/create/music-upload-card";
import { PhotoGalleryCard } from "@/components/app/dashboard/event/create/photo-gallery-card";
import { CeremonyDetailsCard } from "@/components/app/dashboard/event/create/ceremony-details-card";
import { DateLocationCard } from "@/components/app/dashboard/event/create/date-location-card";
import { BasicInfoCard } from "@/components/app/dashboard/event/create/basic-info-card";
import {
  Breadcrumb,
  LoaderMessage,
  StepActions,
  StepNavigation,
} from "@/components/common";
import { useImageUpload } from "@/hooks";
import { createEventFormSchema, type CreateEventFormValues } from "@/schema";
import {
  EVENT_CREATE_STEP_IDS,
  EVENT_CREATE_FIELD_GROUPS,
  EVENT_CREATE_FIELD_NAMES,
  EVENT_CREATE_STEP_KEYS,
  EVENT_CREATE_DEFAULT_VALUES,
  EVENT_CREATE_TIMEOUTS,
  PHOTO_UPLOAD_LIMITS,
  EVENT_TYPE_VALUES,
  MUSIC_OPTION_VALUES,
} from "@/constants";

const CreateEventPage = () => {
  const t = useTranslations("event.create");
  const tValidation = useTranslations("event.create.validation");

  const steps = useMemo(
    () => [
      {
        id: EVENT_CREATE_STEP_IDS.STEP_1,
        name: t(`${EVENT_CREATE_STEP_KEYS.STEP_1}.name`),
        description: t(`${EVENT_CREATE_STEP_KEYS.STEP_1}.description`),
      },
      {
        id: EVENT_CREATE_STEP_IDS.STEP_2,
        name: t(`${EVENT_CREATE_STEP_KEYS.STEP_2}.name`),
        description: t(`${EVENT_CREATE_STEP_KEYS.STEP_2}.description`),
      },
      {
        id: EVENT_CREATE_STEP_IDS.STEP_3,
        name: t(`${EVENT_CREATE_STEP_KEYS.STEP_3}.name`),
        description: t(`${EVENT_CREATE_STEP_KEYS.STEP_3}.description`),
      },
      {
        id: EVENT_CREATE_STEP_IDS.STEP_4,
        name: t(`${EVENT_CREATE_STEP_KEYS.STEP_4}.name`),
        description: t(`${EVENT_CREATE_STEP_KEYS.STEP_4}.description`),
      },
    ],
    [t]
  );

  const [currentStep, setCurrentStep] = useState<number>(
    EVENT_CREATE_STEP_IDS.STEP_1
  );
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventFormSchema(tValidation)),
    defaultValues: {
      title: EVENT_CREATE_DEFAULT_VALUES.TITLE,
      description: EVENT_CREATE_DEFAULT_VALUES.DESCRIPTION,
      eventType: EVENT_CREATE_DEFAULT_VALUES.EVENT_TYPE,
      gallery: EVENT_CREATE_DEFAULT_VALUES.GALLERY,
      bannerPhoto: EVENT_CREATE_DEFAULT_VALUES.BANNER_PHOTO,
      footerPhoto: EVENT_CREATE_DEFAULT_VALUES.FOOTER_PHOTO,
      date: EVENT_CREATE_DEFAULT_VALUES.DATE,
      time: EVENT_CREATE_DEFAULT_VALUES.TIME,
      location: EVENT_CREATE_DEFAULT_VALUES.LOCATION,
      musicOption: MUSIC_OPTION_VALUES.URL,
      musicUrl: EVENT_CREATE_DEFAULT_VALUES.MUSIC_URL,
      musicFile: EVENT_CREATE_DEFAULT_VALUES.MUSIC_FILE,
      ceremonyDate: EVENT_CREATE_DEFAULT_VALUES.CEREMONY_DATE,
      ceremonyTime: EVENT_CREATE_DEFAULT_VALUES.CEREMONY_TIME,
      ceremonyLocation: EVENT_CREATE_DEFAULT_VALUES.CEREMONY_LOCATION,
    },
  });

  const selectedType = form.watch("eventType");

  const {
    photos: bannerPhotos,
    handlePhotoUpload: handleBannerUpload,
    removePhoto: removeBannerPhoto,
  } = useImageUpload({ maxPhotos: PHOTO_UPLOAD_LIMITS.BANNER_MAX });

  const {
    photos: galleryPhotos,
    handlePhotoUpload: handleGalleryUpload,
    removePhoto: removeGalleryPhoto,
  } = useImageUpload({ maxPhotos: PHOTO_UPLOAD_LIMITS.GALLERY_MAX });

  const {
    photos: footerPhotos,
    handlePhotoUpload: handleFooterUpload,
    removePhoto: removeFooterPhoto,
  } = useImageUpload({ maxPhotos: PHOTO_UPLOAD_LIMITS.FOOTER_MAX });

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof CreateEventFormValues)[] = [];

    switch (step) {
      case EVENT_CREATE_STEP_IDS.STEP_1:
        fieldsToValidate = [
          ...EVENT_CREATE_FIELD_GROUPS.STEP_1,
        ] as (keyof CreateEventFormValues)[];
        break;
      case EVENT_CREATE_STEP_IDS.STEP_2:
        fieldsToValidate = [
          ...EVENT_CREATE_FIELD_GROUPS.STEP_2_BASE,
        ] as (keyof CreateEventFormValues)[];
        if (selectedType === EVENT_TYPE_VALUES.WEDDING) {
          fieldsToValidate.push(
            ...(EVENT_CREATE_FIELD_GROUPS.STEP_2_CEREMONY as (keyof CreateEventFormValues)[])
          );
        }
        break;
      case EVENT_CREATE_STEP_IDS.STEP_3:
        fieldsToValidate = [
          ...EVENT_CREATE_FIELD_GROUPS.STEP_3,
        ] as (keyof CreateEventFormValues)[];
        break;
      case EVENT_CREATE_STEP_IDS.STEP_4:
        fieldsToValidate = [
          ...EVENT_CREATE_FIELD_GROUPS.STEP_4,
        ] as (keyof CreateEventFormValues)[];
        break;
      default:
        return false;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);

    if (isValid) {
      setIsLoading(true);

      // Simulate API call to save step data
      await new Promise((resolve) =>
        setTimeout(resolve, EVENT_CREATE_TIMEOUTS.STEP_SAVE)
      );

      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }

      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > EVENT_CREATE_STEP_IDS.STEP_1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {};

  const onSubmit = async (data: CreateEventFormValues) => {
    setIsLoading(true);

    // Simulate final API call
    await new Promise((resolve) =>
      setTimeout(resolve, EVENT_CREATE_TIMEOUTS.FINAL_SUBMIT)
    );

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    console.log("Form submitted:", data);
    setIsLoading(false);
    // Handle form submission
  };

  const TITLE_LOADER =
    currentStep < steps.length ? t("loader.saving") : t("loader.creating");

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {isLoading && (
        <LoaderMessage
          title={TITLE_LOADER}
          description={t("loader.pleaseWait")}
        />
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <Breadcrumb text={t("breadcrumb")} />
      </div>

      <StepNavigation
        steps={steps}
        completedSteps={completedSteps}
        currentStep={currentStep}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === EVENT_CREATE_STEP_IDS.STEP_1 && (
            <BasicInfoCard form={form} />
          )}

          {currentStep === EVENT_CREATE_STEP_IDS.STEP_2 && (
            <div className="space-y-6">
              <DateLocationCard form={form} />
              {selectedType === EVENT_TYPE_VALUES.WEDDING && (
                <CeremonyDetailsCard form={form} />
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
            totalSteps={steps.length}
            isLoading={isLoading}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateEventPage;
