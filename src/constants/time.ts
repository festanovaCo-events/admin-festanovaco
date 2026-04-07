export const TIME_VALUES = {
  HOURS_IN_MS: 60 * 60 * 1000,
  EIGHT_HOURS_IN_MS: 8 * 60 * 60 * 1000,
} as const;

export const TIMEOUTS = {
  MOCK_DELAY: 500,
  AXIOS_DEFAULT: 10000,
} as const;

export const CAPACITY_LIMITS = {
  MAX: 10000,
  MIN: 1,
} as const;
