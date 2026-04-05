'use client';

import 'zone.js';
import { useEffect } from 'react';
import { initTelemetry } from '@/lib/telemetry/otel';

export function OtelProvider() {
  useEffect(() => {
    initTelemetry();
  }, []);

  return null;
}
