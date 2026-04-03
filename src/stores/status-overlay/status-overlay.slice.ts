import type { StatusOverlayState } from "@/interfaces/stores/status-overlay.interface";

export const createStatusOverlaySlice = (): StatusOverlayState => ({
  isVisible: false,
  type: null,
  details: null,
  onRetry: undefined,
});

