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

  return {
    id: eventData.id,
    title: eventData.title,
    description: '',
    eventType,
    date,
    time,
    location: '',
    bannerPhoto,
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
      AddressParty: formData.addressParty || '',
      AddressWedding: formData.addressWedding || '',
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
    AddressParty: formData.location || '',
    AddressWedding: formData.ceremonyLocation || formData.location || '',
    Quote: ('description' in formData ? formData.description : '') || '',
  };
}
