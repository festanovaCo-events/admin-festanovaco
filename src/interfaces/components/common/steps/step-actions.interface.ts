export interface StepActionsProps {
  currentStep: number;
  totalSteps: number;
  isLoading?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onCancel?: () => void;
}

