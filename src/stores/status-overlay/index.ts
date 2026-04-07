import { create } from "zustand";
import { createStatusOverlaySlice } from "./status-overlay.slice";
import { createStatusOverlayActions } from "./status-overlay.actions";
import type { StatusOverlayStore } from "@/interfaces/stores";

export const useStatusOverlayStore = create<StatusOverlayStore>()((set, get) => ({
  ...createStatusOverlaySlice(),
  ...createStatusOverlayActions(set, get),
}));

