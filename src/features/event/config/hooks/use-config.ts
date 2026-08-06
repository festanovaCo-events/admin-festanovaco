"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  EVENT_CREATE_DEFAULT_VALUES,
  PHOTO_UPLOAD_LIMITS,
} from "@/constants/event-create";
import type { EventConfigResponse } from "@/interfaces/api/event/responses.interface";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import {
  configureEvent,
  formatEventConfigData,
  uploadAllAssets,
} from "./data/config";
import { useEventConfigSteps } from "./state/use-config-steps";
import { useImageUpload } from "./state/use-image-upload";
import {
  createEventConfigFormSchema,
  type EventConfigFormValues,
} from "./validations/config-event-form.schema";

export function useEventConfig() {
  const params = useParams();
  const router = useRouter();
  const eventType = params.eventType as string;
  const eventId = params.id as string;

  const t = useTranslations("event.create");
  const tValidation = useTranslations("event.config.validation");

  const {
    steps,
    currentStep,
    completedSteps,
    isStepLoading,
    handleNext,
    handlePrevious,
    markStepAsCompleted,
    validateStep,
  } = useEventConfigSteps({ eventType });

  const resolver = useMemo(
    () => zodResolver(createEventConfigFormSchema(tValidation, eventType)),
    [tValidation, eventType],
  );

  const form = useForm<EventConfigFormValues>({
    resolver,
    defaultValues: {
      husbandName: EVENT_CREATE_DEFAULT_VALUES.HUSBAND_NAME,
      wifeName: EVENT_CREATE_DEFAULT_VALUES.WIFE_NAME,
      quote: EVENT_CREATE_DEFAULT_VALUES.QUOTE,
      partyDateTime: EVENT_CREATE_DEFAULT_VALUES.PARTY_DATETIME,
      addressParty: EVENT_CREATE_DEFAULT_VALUES.ADDRESS_PARTY,
      gallery: EVENT_CREATE_DEFAULT_VALUES.GALLERY,
      bannerPhoto: EVENT_CREATE_DEFAULT_VALUES.BANNER_PHOTO,
      footerPhoto: EVENT_CREATE_DEFAULT_VALUES.FOOTER_PHOTO,
      musicOption: EVENT_CREATE_DEFAULT_VALUES.MUSIC_OPTION,
      musicUrl: EVENT_CREATE_DEFAULT_VALUES.MUSIC_URL,
      musicFile: EVENT_CREATE_DEFAULT_VALUES.MUSIC_FILE,
    },
  });

  const { isLoading, error, execute } = useAsyncRequest<EventConfigResponse>({
    initialLoading: false,
    successMessage: t("success.configured"),
    errorMessage: t("error.configureFailed"),
    showToast: false,
  });

  const banner = useImageUpload({ maxPhotos: PHOTO_UPLOAD_LIMITS.BANNER_MAX });
  const gallery = useImageUpload({
    maxPhotos: PHOTO_UPLOAD_LIMITS.GALLERY_MAX,
  });
  const footer = useImageUpload({ maxPhotos: PHOTO_UPLOAD_LIMITS.FOOTER_MAX });

  useEffect(() => {
    form.clearErrors();
  }, [form]);

  const onCancel = () => {
    router.back();
  };

  const onBackToList = () => {
    router.push("/dashboard/event/list");
  };

  const onSubmit = async (data: EventConfigFormValues) => {
    await execute(async () => {
      const configData = formatEventConfigData(data);
      const [configResponse] = await Promise.all([
        configureEvent(eventType, eventId, configData),
        uploadAllAssets(eventId, {
          bannerPhotos: banner.photos,
          galleryPhotos: gallery.photos,
          footerPhotos: footer.photos,
          musicOption: data.musicOption,
          musicFile: data.musicFile,
          musicUrl: data.musicUrl,
        }),
      ]);

      markStepAsCompleted(currentStep);
      router.push("/dashboard/event/list");
      return configResponse;
    });
  };

  return {
    eventType,
    eventId,
    steps,
    currentStep,
    completedSteps,
    isStepLoading,
    handleNext,
    handlePrevious,
    validateStep,
    form,
    isLoading,
    error,
    bannerPhotos: banner.photos,
    handleBannerUpload: banner.handlePhotoUpload,
    removeBannerPhoto: banner.removePhoto,
    galleryPhotos: gallery.photos,
    handleGalleryUpload: gallery.handlePhotoUpload,
    removeGalleryPhoto: gallery.removePhoto,
    footerPhotos: footer.photos,
    handleFooterUpload: footer.handlePhotoUpload,
    removeFooterPhoto: footer.removePhoto,
    onSubmit,
    onCancel,
    onBackToList,
  };
}

export type UseEventConfigReturn = ReturnType<typeof useEventConfig>;
