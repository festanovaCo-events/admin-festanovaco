export type EventType = 'wedding' | 'birthday' | 'anniversary' | 'graduation' | 'corporate';
export type EventMode = 'on_site' | 'online' | 'hybrid';
export type AssetKind = 'banner' | 'carousel_image' | 'video' | 'doc' | 'audio';

export type EventTypeApi = Uppercase<EventType>;
export type EventModeApi = Uppercase<EventMode>;
export type AssetKindApi = Uppercase<AssetKind>;

