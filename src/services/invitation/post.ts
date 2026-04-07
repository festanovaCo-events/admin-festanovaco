import { apiClient } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';
import type { UploadInvitationResponse } from '@/interfaces';

/**
 * Servicio de invitaciones - Métodos POST
 * Maneja las operaciones de subida de archivos de invitados
 * Solo contiene llamados al API
 */

/**
 * Sube un archivo de invitados para un evento
 * @param eventId - ID del evento
 * @param file - Archivo Excel con invitados
 * @returns Respuesta del API con datos del archivo subido
 * @throws Error si la petición falla
 */
export async function uploadInvitationFile(
  eventId: string,
  file: File
): Promise<UploadInvitationResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<UploadInvitationResponse>(
      API_ROUTES.INVITATION.UPLOAD(eventId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
