export interface SelectOptionProps {
  eventType: string;
  setEventType: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  label: string;
}

