"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { EVENT_CREATE_DEFAULT_VALUES, PHOTO_UPLOAD_LIMITS } from "@/constants/event-create";
import type { EventConfigResponse } from "@/interfaces/api/event/responses.interface";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import {
  createEventConfigFormSchema,
  type EventConfigFormValues,
} from "../validations/config-event-form.schema";
import { useEventConfigSteps } from "./use-config-steps";
import { useImageUpload } from "./use-image-upload";

export function useConfigState() {
  const params = useParams();
  const eventType = params.eventType as string;
  const eventId = params.id as string;

  const t = useTranslations("event.create");
  const tValidation = useTranslations("event.config.validation");

  const configSteps = useEventConfigSteps({ eventType });

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

  return {
    eventType,
    eventId,
    ...configSteps,
    form,
    isLoading,
    error,
    execute,
    bannerPhotos: banner.photos,
    handleBannerUpload: banner.handlePhotoUpload,
    removeBannerPhoto: banner.removePhoto,
    galleryPhotos: gallery.photos,
    handleGalleryUpload: gallery.handlePhotoUpload,
    removeGalleryPhoto: gallery.removePhoto,
    footerPhotos: footer.photos,
    handleFooterUpload: footer.handlePhotoUpload,
    removeFooterPhoto: footer.removePhoto,
  };
}

export type ConfigState = ReturnType<typeof useConfigState>;
