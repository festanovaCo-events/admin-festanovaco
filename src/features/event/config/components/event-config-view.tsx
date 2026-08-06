"use client";

import { useTranslations } from "next-intl";
import { isEventTypeAvailable } from "@/constants/event/available-event-types";
import { AsyncStateLayout } from "@/shared/ui/common/layouts/async-state-layout";
import { Breadcrumb } from "@/shared/ui/common/breadcrumb/breadcrumb";
import { LoaderMessage } from "@/shared/ui/common/loaders/loader-message";
import { StepNavigation } from "@/shared/ui/common/steps/step-navigation";
import type { UseEventConfigReturn } from "../hooks/use-config";
import { EventConfigComingSoon } from "./event-config-coming-soon";
import { EventConfigError } from "./event-config-error";
import { EventConfigForm } from "./event-config-form";
import { EventConfigNotFound } from "./event-config-not-found";

export type EventConfigViewProps = UseEventConfigReturn;

export function EventConfigView({
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
  bannerPhotos,
  galleryPhotos,
  footerPhotos,
  handleBannerUpload,
  handleGalleryUpload,
  handleFooterUpload,
  removeBannerPhoto,
  removeGalleryPhoto,
  removeFooterPhoto,
  onSubmit,
  onCancel,
  onBackToList,
}: EventConfigViewProps) {
  const t = useTranslations("event.create");
  const tConfig = useTranslations("event.config");

  const TITLE_LOADER =
    currentStep < steps.length ? t("loader.saving") : t("loader.creating");

  if (!eventType || !eventId) {
    return <EventConfigNotFound onBack={onBackToList} />;
  }

  if (!isEventTypeAvailable(eventType)) {
    return <EventConfigComingSoon />;
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <AsyncStateLayout
        isLoading={isLoading || isStepLoading}
        error={error}
        skeleton={
          <LoaderMessage
            title={TITLE_LOADER}
            description={t("loader.pleaseWait")}
          />
        }
        errorComponent={<EventConfigError error={error} />}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {tConfig("title")}
          </h1>
          <Breadcrumb text={tConfig("breadcrumb")} />
        </div>

        <StepNavigation
          steps={steps}
          completedSteps={completedSteps}
          currentStep={currentStep}
        />

        <EventConfigForm
          form={form}
          currentStep={currentStep}
          eventType={eventType}
          onSubmit={onSubmit}
          bannerPhotos={bannerPhotos}
          galleryPhotos={galleryPhotos}
          footerPhotos={footerPhotos}
          handleBannerUpload={handleBannerUpload}
          handleGalleryUpload={handleGalleryUpload}
          handleFooterUpload={handleFooterUpload}
          removeBannerPhoto={removeBannerPhoto}
          removeGalleryPhoto={removeGalleryPhoto}
          removeFooterPhoto={removeFooterPhoto}
          totalSteps={steps.length}
          isLoading={isLoading}
          isStepLoading={isStepLoading}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onCancel={onCancel}
          onValidateStep={validateStep}
        />
      </AsyncStateLayout>
    </div>
  );
}
