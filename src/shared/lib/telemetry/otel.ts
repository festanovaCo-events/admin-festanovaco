import { context, propagation, trace } from "@opentelemetry/api";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  BatchSpanProcessor,
  WebTracerProvider,
} from "@opentelemetry/sdk-trace-web";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { API_ROUTES } from "../api/routes";

const OTEL_ENABLED =
  (process.env.NEXT_PUBLIC_OTEL_ENABLED ?? "true").toLowerCase() !== "false";

let initialized = false;

export function initTelemetry(): void {
  if (typeof window === "undefined" || initialized || !OTEL_ENABLED) return;
  initialized = true;

  const baseEndpoint = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT;

  if (!baseEndpoint) return;

  const otlpEndpoint = `${baseEndpoint}${API_ROUTES.TELEMETRY.TRACES}`;

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "admin-festanovaco",
  });

  const exporter = new OTLPTraceExporter({ url: otlpEndpoint });

  const provider = new WebTracerProvider({
    resource,
    spanProcessors: [new BatchSpanProcessor(exporter)],
  });

  propagation.setGlobalPropagator(new W3CTraceContextPropagator());

  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // TODO: cuando vuelva a tener ganas, configurar la seguridad de los cors
  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [/.*/],
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [/.*/],
      }),
    ],
  });
}

export function getTracer(name: string) {
  return trace.getTracer(name);
}

export { context, trace };
