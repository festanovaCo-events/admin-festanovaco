export type StatusOverlayType =
  | "forbidden"
  | "badRequest"
  | "internalServerError"
  | "notFound"
  | "noInternet"
  | "maintenance";

export interface StatusOverlayState {
  isVisible: boolean;
  type: StatusOverlayType | null;
  details: string | null;
  onRetry?: () => void;
}

export interface StatusOverlayActions {
  showStatus: (payload: {
    type: StatusOverlayType;
    details?: string | null;
    onRetry?: () => void;
  }) => void;
  hideStatus: () => void;
}

export type StatusOverlayStore = StatusOverlayState & StatusOverlayActions;

