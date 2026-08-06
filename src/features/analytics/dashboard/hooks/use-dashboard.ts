"use client";

import { useDashboardEffect } from "./effect/use-dashboard-effect";
import { useDashboardHandler } from "./handler/use-dashboard-handler";
import { useDashboardState } from "./state/use-dashboard-state";

export function useDashboard() {
  const state = useDashboardState();
  useDashboardHandler();
  useDashboardEffect();
  return { title: state.title };
}

export type UseDashboardReturn = ReturnType<typeof useDashboard>;
