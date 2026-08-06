"use client";

import "zone.js";
import { useEffect } from "react";
import { initTelemetry } from "@/shared/lib/telemetry/otel";

export function OtelProvider() {
  useEffect(() => {
    initTelemetry();
  }, []);

  return null;
}
