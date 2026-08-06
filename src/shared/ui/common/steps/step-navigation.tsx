import { Check, ChevronRight } from "lucide-react";
import type { FC } from "react";
import type { StepNavigationProps } from "@/interfaces/components/common/steps/step-navigation.interface";
import { cn } from "@/shared/lib/utils";

export const StepNavigation: FC<StepNavigationProps> = ({
  steps,
  currentStep,
  completedSteps,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  currentStep === step.id &&
                    "border-primary bg-primary text-primary-foreground",
                  completedSteps.includes(step.id) &&
                    currentStep !== step.id &&
                    "border-green-500 bg-green-500 text-white",
                  currentStep !== step.id &&
                    !completedSteps.includes(step.id) &&
                    "border-muted bg-background text-muted-foreground",
                )}
              >
                {completedSteps.includes(step.id) && currentStep !== step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center hidden md:block">
                <p
                  className={cn(
                    "text-sm font-medium",
                    currentStep === step.id && "text-foreground",
                    currentStep !== step.id && "text-muted-foreground",
                  )}
                >
                  {step.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight
                className={cn(
                  "h-5 w-5 mx-2 shrink-0",
                  completedSteps.includes(step.id)
                    ? "text-green-500"
                    : "text-muted-foreground",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
