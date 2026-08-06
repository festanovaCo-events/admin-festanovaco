"use client";

import { AnalyticsDashboardView } from "@/features/analytics/dashboard/components/analytics-dashboard-view";
import { useDashboard } from "@/features/analytics/dashboard/hooks/use-dashboard";

const AnalyticsPage = () => {
  const props = useDashboard();
  return <AnalyticsDashboardView {...props} />;
};

export default AnalyticsPage;
