"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Breadcrumb,
  LoaderMessage,
  AsyncStateLayout,
} from "@/components/common";
import { CreateEventError } from "@/components/app/dashboard/event/create/create-event-error";
import { CreateEventForm } from "@/components/app/dashboard/event/create/create-event-form";
import { useAsyncRequest, useAuth } from "@/hooks";
import type { SimpleCreateEventFormValues } from "@/schema";
import { createEvent } from "@/services/event";
import type { CreateEventResponse, CreateEventRequest, EventType, EventMode } from "@/interfaces/api/event.interface";
import { TIME_VALUES } from "@/constants";

const CreateEventPage = () => {
  const t = useTranslations("event.create");
  const router = useRouter();
  const { accountId } = useAuth();

  const { isLoading, error, execute } = useAsyncRequest<CreateEventResponse>({
    successMessage: t("success.created"),
    errorMessage: t("error.createFailed"),
    showToast: false,
    onSuccess: () => {
      router.push("/dashboard/event/list");
    },
  });

  const handleSubmit = async (data: SimpleCreateEventFormValues) => {
    if (!accountId) {
      toast.error(t("error.noAccountId"));
      return;
    }

    await execute(async () => {
      const eventData: CreateEventRequest = {
        accountId,
        title: data.title,
        type: data.type as EventType,
        mode: data.mode as EventMode,
        address: data.address,
        isPublic: data.isPublic,
        capacity: data.capacity,
        startsAt: new Date().toISOString(),
        endsAt: new Date(Date.now() + TIME_VALUES.EIGHT_HOURS_IN_MS).toISOString(),
      };

      return await createEvent(eventData);
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <AsyncStateLayout
        isLoading={isLoading}
        error={error}
        skeleton={
          <LoaderMessage
            title={t("loader.creating")}
            description={t("loader.pleaseWait")}
          />
        }
        errorComponent={<CreateEventError error={error} />}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <Breadcrumb text={t("breadcrumb")} />
        </div>

        <CreateEventForm onSubmit={handleSubmit} isLoading={isLoading} />
      </AsyncStateLayout>
    </div>
  );
};

export default CreateEventPage;
