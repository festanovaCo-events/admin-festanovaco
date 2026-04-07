export interface PhotoPreviewDialogProps {
  open: boolean;
  title: string;
  src: string | null;
  onOpenChange: (open: boolean) => void;
}
