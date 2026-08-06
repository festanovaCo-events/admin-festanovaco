"use client";

import { useConfigEffect } from "./effect/use-config-effect";
import { useConfigHandler } from "./handler/use-config-handler";
import { useConfigState } from "./state/use-config-state";

export function useEventConfig() {
  const state = useConfigState();

  const handler = useConfigHandler({
    eventType: state.eventType,
    eventId: state.eventId,
    currentStep: state.currentStep,
    markStepAsCompleted: state.markStepAsCompleted,
    execute: state.execute,
    bannerPhotos: state.bannerPhotos,
    galleryPhotos: state.galleryPhotos,
    footerPhotos: state.footerPhotos,
  });

  useConfigEffect({ eventType: state.eventType, form: state.form });

  return {
    eventType: state.eventType,
    eventId: state.eventId,
    steps: state.steps,
    currentStep: state.currentStep,
    completedSteps: state.completedSteps,
    isStepLoading: state.isStepLoading,
    handleNext: state.handleNext,
    handlePrevious: state.handlePrevious,
    validateStep: state.validateStep,
    form: state.form,
    isLoading: state.isLoading,
    error: state.error,
    bannerPhotos: state.bannerPhotos,
    handleBannerUpload: state.handleBannerUpload,
    removeBannerPhoto: state.removeBannerPhoto,
    galleryPhotos: state.galleryPhotos,
    handleGalleryUpload: state.handleGalleryUpload,
    removeGalleryPhoto: state.removeGalleryPhoto,
    footerPhotos: state.footerPhotos,
    handleFooterUpload: state.handleFooterUpload,
    removeFooterPhoto: state.removeFooterPhoto,
    onSubmit: handler.onSubmit,
    onCancel: handler.onCancel,
    onBackToList: handler.onBackToList,
  };
}

export type UseEventConfigReturn = ReturnType<typeof useEventConfig>;
