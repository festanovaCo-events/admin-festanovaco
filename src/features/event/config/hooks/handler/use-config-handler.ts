"use client";

import { useRouter } from "next/navigation";
import {
  configureEvent,
  formatEventConfigData,
  uploadAllAssets,
} from "../data/config";
import type { ConfigState } from "../state/use-config-state";
import type { EventConfigFormValues } from "../validations/config-event-form.schema";

type UseConfigHandlerParams = Pick<
  ConfigState,
  | "eventType"
  | "eventId"
  | "currentStep"
  | "markStepAsCompleted"
  | "execute"
  | "bannerPhotos"
  | "galleryPhotos"
  | "footerPhotos"
>;

export function useConfigHandler({
  eventType,
  eventId,
  currentStep,
  markStepAsCompleted,
  execute,
  bannerPhotos,
  galleryPhotos,
  footerPhotos,
}: UseConfigHandlerParams) {
  const router = useRouter();

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

  return { onCancel, onBackToList, onSubmit };
}
