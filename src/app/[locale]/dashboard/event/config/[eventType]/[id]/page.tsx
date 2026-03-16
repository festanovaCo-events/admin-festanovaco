"use client";

import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { EventConfigForm } from "@/components/app/dashboard/event/config/event-config-form";
import { EventConfigError } from "@/components/app/dashboard/event/config/event-config-error";
import { EventConfigComingSoon } from "@/components/app/dashboard/event/config/event-config-coming-soon";
import { EventConfigNotFound } from "@/components/app/dashboard/event/config/event-config-not-found";
import {
    Breadcrumb,
    LoaderMessage,
    StepNavigation,
    AsyncStateLayout,
} from "@/components/common";
import { useImageUpload, useAsyncRequest, useEventConfigSteps } from "@/hooks";
import type { EventConfigFormValues } from "@/schema";
import {
    configureEvent,
    uploadEventAsset,
} from "@/services/event";
import { formatEventConfigData } from "@/adapters/event.adapter";
import type { EventConfigResponse } from "@/interfaces/api/event.interface";
import {
    PHOTO_UPLOAD_LIMITS,
    MUSIC_OPTION_VALUES,
    isEventTypeAvailable,
} from "@/constants";

const EventConfigPage = () => {
    const t = useTranslations("event.create");
    const tConfig = useTranslations("event.config");
    const router = useRouter();
    const params = useParams();

    const eventType = params.eventType as string;
    const eventId = params.id as string;

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

    const { isLoading, error, execute } = useAsyncRequest<EventConfigResponse>({
        successMessage: t("success.configured"),
        errorMessage: t("error.configureFailed"),
        showToast: false,
    });

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


    const handleCancel = () => {
        router.back();
    };

    const uploadAllAssets = async (
        eventId: string,
        assets: {
            bannerPhotos: File[];
            galleryPhotos: File[];
            footerPhotos: File[];
            musicOption?: string;
            musicFile?: File;
            musicUrl?: string;
        }
    ): Promise<void> => {
        const uploadPromises: Promise<any>[] = [];

        if (assets.bannerPhotos.length !== 1) {
            throw new Error("Debe subir exactamente 1 imagen para el banner");
        }
        uploadPromises.push(
            uploadEventAsset(eventId, assets.bannerPhotos[0], "banner", 0)
        );

        if (assets.galleryPhotos.length === 0) {
            throw new Error("Debe subir al menos 1 imagen para la galería");
        }
        assets.galleryPhotos.forEach((photo, index) => {
            uploadPromises.push(
                uploadEventAsset(eventId, photo, "carousel_image", index)
            );
        });

        if (assets.footerPhotos.length !== 1) {
            throw new Error("Debe subir exactamente 1 imagen para el footer");
        }
        uploadPromises.push(
            uploadEventAsset(eventId, assets.footerPhotos[0], "banner", 0)
        );

        if (assets.musicOption === MUSIC_OPTION_VALUES.FILE && assets.musicFile) {
            uploadPromises.push(
                uploadEventAsset(eventId, assets.musicFile, "audio", 0)
            );
        }

        await Promise.all(uploadPromises);
    };

    const onSubmit = async (data: EventConfigFormValues) => {
        await execute(async () => {
            const configData = formatEventConfigData(data);

            const [configResponse] = await Promise.all([
                configureEvent(eventType, eventId, configData),
                uploadAllAssets(eventId, {
                    bannerPhotos,
                    galleryPhotos,
                    footerPhotos,
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

    const TITLE_LOADER =
        currentStep < steps.length ? t("loader.saving") : t("loader.creating");

    if (!eventType || !eventId) {
        return <EventConfigNotFound onBack={() => router.push("/dashboard/event/list")} />;
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
                    />}
                errorComponent={<EventConfigError error={error} />}
            >
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{tConfig("title")}</h1>
                    <Breadcrumb text={tConfig("breadcrumb")} />
                </div>

                <StepNavigation
                    steps={steps}
                    completedSteps={completedSteps}
                    currentStep={currentStep}
                />

                <EventConfigForm
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
                    onCancel={handleCancel}
                    onValidateStep={validateStep}
                />
            </AsyncStateLayout>
        </div>
    );
};

export default EventConfigPage;
