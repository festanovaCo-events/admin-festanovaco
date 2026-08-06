import type { ButtonProps } from "@/shared/ui/shadcn/ui/button";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel: React.ReactNode;
  cancelLabel: React.ReactNode;
  confirmVariant?: ButtonProps["variant"];
  cancelVariant?: ButtonProps["variant"];
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  onConfirm: () => void;
}

