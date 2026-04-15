import { context, propagation, trace } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { ZoneContextManager } from "@opentelemetry/context-zone";
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

const OTLP_ENDPOINT =
  process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT +
  API_ROUTES.TELEMETRY.TRACES;

let initialized = false;

export function initTelemetry(): void {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "admin-festanovaco",
  });

  const exporter = new OTLPTraceExporter({ url: OTLP_ENDPOINT });

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
