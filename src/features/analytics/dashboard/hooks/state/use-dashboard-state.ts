"use client";

export function useDashboardState() {
  return {
    title: "AnalyticsPage",
  };
}

export type DashboardState = ReturnType<typeof useDashboardState>;
