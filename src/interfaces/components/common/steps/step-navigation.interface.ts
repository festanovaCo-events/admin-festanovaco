export interface Step {
  id: number;
  name: string;
  description: string;
}

export interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

