import type { StatusOverlayActions } from "@/interfaces/stores/status-overlay.interface";

export const createStatusOverlayActions = (
  set: any,
  _get: any,
): StatusOverlayActions => ({
  showStatus: (payload) => {
    set({
      isVisible: true,
      type: payload.type,
      details: payload.details ?? null,
      onRetry: payload.onRetry,
    });
  },
  hideStatus: () => {
    set({
      isVisible: false,
      type: null,
      details: null,
      onRetry: undefined,
    });
  },
});
