import type {
  CreateEventRequest,
  EventType,
  EventData,
  Event,
  EventConfigRequest,
} from '@/interfaces';
import type { CreateEventFormValues, EventConfigFormValues } from '@/schema';
import { EVENT_TYPE_VALUES } from '@/constants';

const EVENT_FALLBACK_IMAGE_BY_TYPE: Record<string, string> = {
  wedding:
    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=80',
  birthday:
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=80',
  anniversary:
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80',
  graduation:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80',
  corporate:
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80',
};

function combineDateTime(date: string, time: string): string {
  // Interpretar la fecha y hora como hora local del usuario y devolver ISO (UTC) del instante real
  // Evitar sufijo 'Z' directo que fuerza UTC y provoca desfases visuales
  const localDate = new Date(`${date}T${time}:00`);
  return localDate.toISOString();
}

export function mapEventDataToEvent(eventData: EventData): Event {
  const startDate = new Date(eventData.starts_at);
  const safeDate = Number.isNaN(startDate.getTime()) ? new Date() : startDate;
  // Usar componentes locales para evitar cambio de día por conversión UTC
  const year = safeDate.getFullYear();
  const month = String(safeDate.getMonth() + 1).padStart(2, '0');
  const day = String(safeDate.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;
  const hours = String(safeDate.getHours()).padStart(2, '0');
  const minutes = String(safeDate.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  const eventType = eventData.type.toLowerCase();
  const assets = Array.isArray(eventData.assets) ? eventData.assets : [];
  const sortedAssets = [...assets].sort((a, b) => a.position - b.position);
  const normalizeKind = (kind: string) => kind.toLowerCase();

  const getFirstAssetUrl = (kind: string): string | undefined => {
    const normalizedKind = kind.toLowerCase();
    return sortedAssets.find((asset) => normalizeKind(asset.kind) === normalizedKind)?.url;
  };

  const getAssetUrls = (kind: string): string[] => {
    const normalizedKind = kind.toLowerCase();
    return sortedAssets
      .filter((asset) => normalizeKind(asset.kind) === normalizedKind)
      .map((asset) => asset.url);
  };

  let bannerPhoto = getFirstAssetUrl('banner');

  const hasNoAssets =
    !eventData.assets ||
    (Array.isArray(eventData.assets) && eventData.assets.length === 0);

  if (hasNoAssets) {
    bannerPhoto = EVENT_FALLBACK_IMAGE_BY_TYPE[eventType] || EVENT_FALLBACK_IMAGE_BY_TYPE.wedding;
  }

  const gallery = getAssetUrls('carousel_image');
  const musicUrl = getFirstAssetUrl('audio');

  const bannerUrls = getAssetUrls('banner');
  const footerPhoto =
    bannerUrls.length > 1
      ? bannerUrls[bannerUrls.length - 1]
      : undefined;

  const description = eventData.config?.metadata?.quote?.trim() || '';
  const husbandName = eventData.config?.metadata?.husbandName?.trim();
  const wifeName = eventData.config?.metadata?.wifeName?.trim();
  const location = eventData.config?.metadata?.addressParty || '';

  return {
    id: eventData.id,
    title: eventData.title,
    description,
    husbandName,
    wifeName,
    eventType,
    date,
    time,
    location,
    bannerPhoto,
    gallery,
    musicUrl,
    footerPhoto,
    status: eventData.status,
    capacity: eventData.capacity,
    createdAt: eventData.created_at,
    createdBy: eventData.created_by,
  };
}

export function formatEventConfigData(
  formData: CreateEventFormValues | EventConfigFormValues
): EventConfigRequest {
  if ('husbandName' in formData && 'wifeName' in formData && 'quote' in formData) {
    const partyDate = formData.partyDateTime 
      ? new Date(formData.partyDateTime).toISOString()
      : '';
    const weddingDate = formData.weddingDateTime
      ? new Date(formData.weddingDateTime).toISOString()
      : partyDate;

    return {
      HusbandName: formData.husbandName || '',
      WifeName: formData.wifeName || '',
      PartyDate: partyDate,
      WeddingDate: weddingDate,
      AddressParty: formData.addressWedding || '',
      Quote: formData.quote || '',
    };
  }

  const partyDate = combineDateTime(formData.date, formData.time);
  const weddingDate = formData.ceremonyDate && formData.ceremonyTime
    ? combineDateTime(formData.ceremonyDate, formData.ceremonyTime)
    : partyDate;

  return {
    HusbandName: '',
    WifeName: '',
    PartyDate: partyDate,
    WeddingDate: weddingDate,
    AddressParty: formData.ceremonyLocation || formData.location || '',
    Quote: ('description' in formData ? formData.description : '') || '',
  };
}
