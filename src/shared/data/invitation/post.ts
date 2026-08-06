import type { UploadInvitationResponse } from "@/interfaces/api/invitation/responses.interface";
import { apiClient } from "@/shared/lib/api/axios.config";
import { API_ROUTES } from "@/shared/lib/api/routes";

/**
 * Sube un archivo de invitados para un evento.
 * Compartido por la feature de guest-list y file-manager.
 * @param eventId - ID del evento
 * @param file - Archivo Excel con invitados
 * @returns Respuesta del API con datos del archivo subido
 * @throws Error si la petición falla
 */
export async function uploadInvitationFile(
  eventId: string,
  file: File,
): Promise<UploadInvitationResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<UploadInvitationResponse>(
    API_ROUTES.INVITATION.UPLOAD(eventId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
