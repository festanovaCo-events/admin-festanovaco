"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { StepActionsProps } from "@/interfaces";

export const StepActions: FC<StepActionsProps> = ({
  currentStep,
  totalSteps,
  isLoading = false,
  onNext,
  onPrevious,
  onCancel,
}) => {
  const t = useTranslations("common.actions");
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between gap-4 pt-6">
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer"
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
      >
        {t("previous")}
      </Button>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
           className="cursor-pointer"
          onClick={onCancel}
          disabled={isLoading}
        >
          {t("cancel")}
        </Button>

        {!isLastStep ? (
          <Button
            type="button"
            className="min-w-[150px] cursor-pointer"
            onClick={onNext}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("saving")}
              </>
            ) : (
              t("next")
            )}
          </Button>
        ) : (
          <Button type="submit" disabled={isLoading} className="min-w-[150px] cursor-pointer">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("creating")}
              </>
            ) : (
              t("create")
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
