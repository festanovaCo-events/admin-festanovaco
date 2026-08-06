import { create } from "zustand";
import type { StatusOverlayStore } from "@/interfaces/stores/status-overlay.interface";
import { createStatusOverlayActions } from "./status-overlay.actions";
import { createStatusOverlaySlice } from "./status-overlay.slice";

export const useStatusOverlayStore = create<StatusOverlayStore>()((set, get) => ({
  ...createStatusOverlaySlice(),
  ...createStatusOverlayActions(set, get),
}));
