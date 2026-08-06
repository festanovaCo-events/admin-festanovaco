import type { AssetKind } from "@/interfaces/api/event/types.interface";
import type { CreateEventRequest } from "@/interfaces/api/event/create/create-event-requests.interface";
import type { CreateEventResponse, EventConfigResponse, UploadAssetResponse } from "@/interfaces/api/event/responses.interface";
import type { EventConfigRequest } from "@/interfaces/api/event/config/event-config-requests.interface";
import { apiClient } from "@/shared/lib/api/axios.config";
import { API_ROUTES } from "@/shared/lib/api/routes";

/**
 * Servicio de eventos - Métodos POST.
 * Maneja las operaciones de creación de eventos, subida de assets y configuración de eventos.
 * Solo contiene llamados al API.
 */

/**
 * Crea un nuevo evento.
 * @param data - Datos del evento a crear
 * @returns Respuesta del API con datos del evento creado
 * @throws Error si la petición falla
 */
export async function createEvent(
  data: CreateEventRequest,
): Promise<CreateEventResponse> {
  const response = await apiClient.post<CreateEventResponse>(
    API_ROUTES.EVENT.CREATE,
    data,
  );

  return response.data;
}

/**
 * Sube un asset (imagen, video, audio, etc.) para un evento.
 * @param eventId - ID del evento
 * @param file - Archivo a subir
 * @param kind - Tipo de asset (banner, carousel_image, video, doc, audio)
 * @param position - Posición en el carrusel (opcional, default: 0)
 * @returns Respuesta del API con datos del asset subido
 * @throws Error si la petición falla
 */
export async function uploadEventAsset(
  eventId: string,
  file: File,
  kind: AssetKind,
  position: number = 0,
): Promise<UploadAssetResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("kind", kind);
  formData.append("position", position.toString());

  const response = await apiClient.post<UploadAssetResponse>(
    API_ROUTES.EVENT.ASSETS(eventId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

/**
 * Configura un evento.
 * @param eventType - Tipo de evento (wedding, birthday, etc.)
 * @param eventId - ID del evento
 * @param data - Datos de configuración del evento
 * @returns Respuesta del API
 * @throws Error si la petición falla
 */
export async function configureEvent(
  eventType: string,
  eventId: string,
  data: EventConfigRequest,
): Promise<EventConfigResponse> {
  const response = await apiClient.post<EventConfigResponse>(
    API_ROUTES.EVENT.CONFIG(eventType, eventId),
    data,
  );

  return response.data;
}
