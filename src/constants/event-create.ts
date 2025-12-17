/**
 * Constants for Event Create functionality
 * Centralizes all magic strings, numbers, and static data
 */

// Music Option Values
export const MUSIC_OPTION_VALUES = {
  URL: "url",
  FILE: "file",
} as const;

export type MusicOptionValue = typeof MUSIC_OPTION_VALUES[keyof typeof MUSIC_OPTION_VALUES];

// Event Type Values
export const EVENT_TYPE_VALUES = {
  WEDDING: "boda",
  BIRTHDAY: "cumpleanos",
  ANNIVERSARY: "aniversario",
  GRADUATION: "graduacion",
  CORPORATE: "corporativo",
} as const;

export type EventTypeValue = typeof EVENT_TYPE_VALUES[keyof typeof EVENT_TYPE_VALUES];

// Form Field Names
export const EVENT_CREATE_FIELD_NAMES = {
  // Step 1 - Basic Info
  TITLE: "title",
  DESCRIPTION: "description",
  EVENT_TYPE: "eventType",
  
  // Step 2 - Date and Location
  DATE: "date",
  TIME: "time",
  LOCATION: "location",
  
  // Step 2 - Ceremony (for weddings)
  CEREMONY_DATE: "ceremonyDate",
  CEREMONY_TIME: "ceremonyTime",
  CEREMONY_LOCATION: "ceremonyLocation",
  
  // Step 3 - Photos
  GALLERY: "gallery",
  BANNER_PHOTO: "bannerPhoto",
  FOOTER_PHOTO: "footerPhoto",
  
  // Step 4 - Music
  MUSIC_OPTION: "musicOption",
  MUSIC_URL: "musicUrl",
  MUSIC_FILE: "musicFile",
} as const;

// Field Groups for Validation
export const EVENT_CREATE_FIELD_GROUPS = {
  STEP_1: [
    EVENT_CREATE_FIELD_NAMES.TITLE,
    EVENT_CREATE_FIELD_NAMES.DESCRIPTION,
    EVENT_CREATE_FIELD_NAMES.EVENT_TYPE,
  ],
  STEP_2_BASE: [
    EVENT_CREATE_FIELD_NAMES.DATE,
    EVENT_CREATE_FIELD_NAMES.TIME,
    EVENT_CREATE_FIELD_NAMES.LOCATION,
  ],
  STEP_2_CEREMONY: [
    EVENT_CREATE_FIELD_NAMES.CEREMONY_DATE,
    EVENT_CREATE_FIELD_NAMES.CEREMONY_TIME,
    EVENT_CREATE_FIELD_NAMES.CEREMONY_LOCATION,
  ],
  STEP_3: [
    EVENT_CREATE_FIELD_NAMES.GALLERY,
    EVENT_CREATE_FIELD_NAMES.BANNER_PHOTO,
    EVENT_CREATE_FIELD_NAMES.FOOTER_PHOTO,
  ],
  STEP_4: [
    EVENT_CREATE_FIELD_NAMES.MUSIC_URL,
  ],
};

// Step IDs
export const EVENT_CREATE_STEP_IDS = {
  STEP_1: 1,
  STEP_2: 2,
  STEP_3: 3,
  STEP_4: 4,
} as const;

export type EventCreateStepId = typeof EVENT_CREATE_STEP_IDS[keyof typeof EVENT_CREATE_STEP_IDS];

// Photo Upload Limits
export const PHOTO_UPLOAD_LIMITS = {
  BANNER_MAX: 1,
  GALLERY_MAX: 10,
  FOOTER_MAX: 1,
} as const;

// File Size Limits (in MB)
export const FILE_SIZE_LIMITS = {
  IMAGE_MAX_MB: 5,
  MUSIC_MAX_MB: 10,
} as const;

// Timeouts (in milliseconds)
export const EVENT_CREATE_TIMEOUTS = {
  STEP_SAVE: 1500,
  FINAL_SUBMIT: 2000,
} as const;

// Default Form Values
export const EVENT_CREATE_DEFAULT_VALUES = {
  TITLE: "",
  DESCRIPTION: "",
  EVENT_TYPE: undefined,
  DATE: "",
  TIME: "",
  LOCATION: "",
  CEREMONY_DATE: "",
  CEREMONY_TIME: "",
  CEREMONY_LOCATION: "",
  GALLERY: [] as File[],
  BANNER_PHOTO: [] as File[],
  FOOTER_PHOTO: [] as File[],
  MUSIC_OPTION: MUSIC_OPTION_VALUES.URL,
  MUSIC_URL: "",
  MUSIC_FILE: undefined,
};

// Input Types
export const INPUT_TYPES = {
  DATE: "date",
  TIME: "time",
  URL: "url",
  FILE: "file",
  TEXT: "text",
} as const;

// Accept Types for File Inputs
export const FILE_ACCEPT_TYPES = {
  IMAGE: "image/*",
  AUDIO: "audio/*",
} as const;

// Step Configuration Keys (for translations)
export const EVENT_CREATE_STEP_KEYS = {
  STEP_1: "steps.step1",
  STEP_2: "steps.step2",
  STEP_3: "steps.step3",
  STEP_4: "steps.step4",
} as const;

