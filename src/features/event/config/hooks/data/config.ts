import { MUSIC_OPTION_VALUES } from "@/constants/event-create";
import type { EventConfigRequest } from "@/interfaces/api/event/config/event-config-requests.interface";
import { uploadEventAsset } from "@/shared/data/event/post";
import type { EventConfigFormValues } from "../validations/config-event-form.schema";

export { configureEvent, uploadEventAsset } from "@/shared/data/event/post";

/** Transforma los valores del formulario de configuración al payload esperado por la API. */
export function formatEventConfigData(
  formData: EventConfigFormValues,
): EventConfigRequest {
  const partyDate = formData.partyDateTime
    ? new Date(formData.partyDateTime).toISOString()
    : "";

  return {
    HusbandName: formData.husbandName,
    WifeName: formData.wifeName,
    StartsAt: partyDate,
    EndsAt: "",
    AddressParty: formData.addressParty ?? "",
    Quote: formData.quote,
  };
}

type UploadAllAssetsParams = {
  bannerPhotos: File[];
  galleryPhotos: File[];
  footerPhotos: File[];
  musicOption?: string;
  musicFile?: File;
  musicUrl?: string;
};

/** Sube en paralelo todos los assets (banner, galería, footer y música opcional) de un evento configurado. */
export async function uploadAllAssets(
  eventId: string,
  assets: UploadAllAssetsParams,
): Promise<void> {
  const uploadPromises: Promise<any>[] = [];

  if (assets.bannerPhotos.length !== 1) {
    throw new Error("Debe subir exactamente 1 imagen para el banner");
  }
  uploadPromises.push(
    uploadEventAsset(eventId, assets.bannerPhotos[0], "banner", 0),
  );

  if (assets.galleryPhotos.length === 0) {
    throw new Error("Debe subir al menos 1 imagen para la galería");
  }
  assets.galleryPhotos.forEach((photo, index) => {
    uploadPromises.push(
      uploadEventAsset(eventId, photo, "carousel_image", index),
    );
  });

  if (assets.footerPhotos.length !== 1) {
    throw new Error("Debe subir exactamente 1 imagen para el footer");
  }
  uploadPromises.push(
    uploadEventAsset(eventId, assets.footerPhotos[0], "banner", 0),
  );

  if (assets.musicOption === MUSIC_OPTION_VALUES.FILE && assets.musicFile) {
    uploadPromises.push(
      uploadEventAsset(eventId, assets.musicFile, "audio", 0),
    );
  }

  await Promise.all(uploadPromises);
}
