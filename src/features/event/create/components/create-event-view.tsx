"use client";

import { useTranslations } from "next-intl";
import { AsyncStateLayout } from "@/shared/ui/common/layouts/async-state-layout";
import { Breadcrumb } from "@/shared/ui/common/breadcrumb/breadcrumb";
import { LoaderMessage } from "@/shared/ui/common/loaders/loader-message";
import type { UseCreateEventReturn } from "../hooks/use-create";
import { CreateEventError } from "./create-event-error";
import { CreateEventForm } from "./create-event-form";

export type CreateEventViewProps = UseCreateEventReturn;

export function CreateEventView({
  form,
  isLoading,
  error,
  onSubmit,
  onCancel,
}: CreateEventViewProps) {
  const t = useTranslations("event.create");

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

        <CreateEventForm
          form={form}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </AsyncStateLayout>
    </div>
  );
}
