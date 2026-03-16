import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import {
  EVENT_CREATE_STEP_IDS,
  EVENT_CREATE_STEP_KEYS,
  EVENT_CREATE_TIMEOUTS,
  EVENT_CREATE_FIELD_GROUPS,
  EVENT_TYPES,
} from "@/constants";
import type { EventConfigFormValues } from "@/schema";

export interface UseEventConfigStepsProps {
  eventType: string;
}

export interface UseEventConfigStepsReturn {
  steps: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  currentStep: number;
  completedSteps: number[];
  isStepLoading: boolean;
  handleNext: () => Promise<void>;
  handlePrevious: () => void;
  markStepAsCompleted: (step: number) => void;
  validateStep: (
    step: number,
    form: UseFormReturn<EventConfigFormValues>
  ) => Promise<boolean>;
}

export function useEventConfigSteps({
  eventType,
}: UseEventConfigStepsProps): UseEventConfigStepsReturn {
  const t = useTranslations("event.create");

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
  const [isStepLoading, setIsStepLoading] = useState(false);

  const handleNext = useCallback(async () => {
    setIsStepLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, EVENT_CREATE_TIMEOUTS.STEP_SAVE)
    );

    setCompletedSteps((prev) => {
      if (!prev.includes(currentStep)) {
        return [...prev, currentStep];
      }
      return prev;
    });

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }

    setIsStepLoading(false);
  }, [currentStep, steps.length]);

  const handlePrevious = useCallback(() => {
    if (currentStep > EVENT_CREATE_STEP_IDS.STEP_1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const markStepAsCompleted = useCallback((step: number) => {
    setCompletedSteps((prev) => {
      if (!prev.includes(step)) {
        return [...prev, step];
      }
      return prev;
    });
  }, []);

  const validateStep = useCallback(
    async (
      step: number,
      form: UseFormReturn<EventConfigFormValues>
    ): Promise<boolean> => {
      let fieldsToValidate: (keyof EventConfigFormValues)[] = [];

      switch (step) {
        case EVENT_CREATE_STEP_IDS.STEP_1:
          fieldsToValidate = ["husbandName", "wifeName", "quote"];
          break;
        case EVENT_CREATE_STEP_IDS.STEP_2:
          fieldsToValidate = ["partyDateTime", "addressParty"];
          if (eventType === EVENT_TYPES.WEDDING) {
            fieldsToValidate.push("weddingDateTime", "addressWedding");
          }
          break;
        case EVENT_CREATE_STEP_IDS.STEP_3:
          fieldsToValidate = [
            ...EVENT_CREATE_FIELD_GROUPS.STEP_3,
          ] as (keyof EventConfigFormValues)[];
          break;
        case EVENT_CREATE_STEP_IDS.STEP_4:
          fieldsToValidate = [
            ...EVENT_CREATE_FIELD_GROUPS.STEP_4,
          ] as (keyof EventConfigFormValues)[];
          break;
        default:
          return false;
      }

      const result = await form.trigger(fieldsToValidate);
      return result;
    },
    [eventType]
  );

  return {
    steps,
    currentStep,
    completedSteps,
    isStepLoading,
    handleNext,
    handlePrevious,
    markStepAsCompleted,
    validateStep,
  };
}
