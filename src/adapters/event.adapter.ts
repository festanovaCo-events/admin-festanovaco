import type { EventData, Event, EventConfigRequest } from "@/interfaces";
import type { CreateEventFormValues, EventConfigFormValues } from "@/schema";

export function mapEventDataToEvent(eventData: EventData): Event {
  const startDate = new Date(eventData.starts_at);
  const safeDate = Number.isNaN(startDate.getTime()) ? new Date() : startDate;
  // Usar componentes locales para evitar cambio de día por conversión UTC
  const year = safeDate.getFullYear();
  const month = String(safeDate.getMonth() + 1).padStart(2, "0");
  const day = String(safeDate.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  const hours = String(safeDate.getHours()).padStart(2, "0");
  const minutes = String(safeDate.getMinutes()).padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const eventType = eventData.type.toLowerCase();

  if (
    eventData.config === null ||
    eventData.config.metadata === null ||
    eventData.assets === null
  ) {
    return {
      id: eventData.id,
      title: eventData.title,
      address: eventData.address,
      eventType,
      date,
      time,
      status: eventData.status,
      capacity: eventData.capacity,
      createdAt: eventData.created_at,
      createdBy: eventData.created_by,
      assets: null,
      additionalInformation: null,
    };
  }

  const rawAssets = Array.isArray(eventData.assets) ? eventData.assets : [];
  const sortedByPosition = [...rawAssets].sort(
    (a, b) => a.position - b.position,
  );
  const normalizeKind = (kind: string) => kind.toLowerCase();

  const getFirstAssetUrl = (kind: string): string => {
    const normalizedKind = kind.toLowerCase();
    return (
      sortedByPosition.find(
        (asset) => normalizeKind(asset.kind) === normalizedKind,
      )?.url ?? ""
    );
  };

  const getAssetUrls = (kind: string): string[] => {
    const normalizedKind = kind.toLowerCase();
    return sortedByPosition
      .filter((asset) => normalizeKind(asset.kind) === normalizedKind)
      .map((asset) => asset.url);
  };

  return {
    id: eventData.id,
    title: eventData.title,
    address: eventData.address,
    eventType,
    date,
    time,
    status: eventData.status,
    capacity: eventData.capacity,
    createdAt: eventData.created_at,
    createdBy: eventData.created_by,
    assets: {
      bannerPhoto: getFirstAssetUrl("banner"),
      gallery: getAssetUrls("carousel_image"),
      footerPhoto: getAssetUrls("banner")[getAssetUrls("banner").length - 1],
      musicUrl: getFirstAssetUrl("audio"),
    },
    additionalInformation: {
      description: eventData.config.metadata.quote,
      husbandName: eventData.config.metadata.husbandName,
      wifeName: eventData.config.metadata.wifeName,
      location: eventData.config.metadata.addressParty,
      startsAt: eventData.config.metadata.startsAt,
      endsAt: eventData.config.metadata.endsAt,
    },
  };
}

export function formatEventConfigData(
  formData: CreateEventFormValues | EventConfigFormValues,
): EventConfigRequest {
  if (
    !formData ||
    !(
      "husbandName" in formData &&
      "wifeName" in formData &&
      "quote" in formData &&
      "partyDateTime" in formData &&
      "addressParty" in formData
    )
  )
    return {
      HusbandName: "",
      WifeName: "",
      StartsAt: "",
      EndsAt: "",
      AddressParty: "",
      Quote: "",
    };

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
