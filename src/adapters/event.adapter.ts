import type {
  CreateEventRequest,
  EventType,
  EventData,
  Event,
  AssetData,
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

function mapEventTypeToAPI(formEventType: string): EventType {
  const typeMap: Record<string, EventType> = {
    [EVENT_TYPE_VALUES.WEDDING]: 'wedding',
    [EVENT_TYPE_VALUES.BIRTHDAY]: 'birthday',
    [EVENT_TYPE_VALUES.ANNIVERSARY]: 'anniversary',
    [EVENT_TYPE_VALUES.GRADUATION]: 'graduation',
    [EVENT_TYPE_VALUES.CORPORATE]: 'corporate',
  };

  return typeMap[formEventType] || 'wedding';
}

function combineDateTime(date: string, time: string): string {
  return `${date}T${time}:00Z`;
}

function calculateEndDate(startsAt: string): string {
  const startDate = new Date(startsAt);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 8); // 8 horas por defecto
  return endDate.toISOString();
}

export function formatCreateEventData(
  formData: CreateEventFormValues | (CreateEventFormValues & { mode?: string; isPublic?: boolean; capacity?: number }),
  accountId: string
): CreateEventRequest {
  const startsAt = combineDateTime(formData.date, formData.time);
  const endsAt = calculateEndDate(startsAt);

  return {
    accountId,
    title: formData.title,
    type: mapEventTypeToAPI(formData.eventType),
    mode: (formData as any).mode || 'on_site',
    isPublic: (formData as any).isPublic !== undefined ? (formData as any).isPublic : true,
    capacity: (formData as any).capacity || 100,
    startsAt,
    endsAt,
  };
}

export function mapEventDataToEvent(eventData: EventData): Event {
  const startDate = new Date(eventData.starts_at);
  const date = startDate.toISOString().split('T')[0];
  const hours = String(startDate.getUTCHours()).padStart(2, '0');
  const minutes = String(startDate.getUTCMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  const eventType = eventData.type.toLowerCase();
  let bannerPhoto: string | undefined = undefined;
  if (eventData.assets && Array.isArray(eventData.assets)) {
    const bannerAsset = (eventData.assets as AssetData[]).find(
      (asset) => asset.kind === 'banner'
    );
    if (bannerAsset && bannerAsset.url) {
      bannerPhoto = bannerAsset.url;
    }
  }

  const hasNoAssets =
    !eventData.assets ||
    (Array.isArray(eventData.assets) && eventData.assets.length === 0);

  if (hasNoAssets) {
    bannerPhoto = EVENT_FALLBACK_IMAGE_BY_TYPE[eventType] || EVENT_FALLBACK_IMAGE_BY_TYPE.wedding;
  }

  return {
    id: eventData.id,
    title: eventData.title,
    description: '',
    eventType,
    date,
    time,
    location: '',
    bannerPhoto,
    status: eventData.status,
    capacity: eventData.capacity,
    createdAt: eventData.created_at,
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
      Address: formData.addressWedding || '',
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
    Address: formData.ceremonyLocation || formData.location || '',
    Quote: ('description' in formData ? formData.description : '') || '',
  };
}
