export interface SortSelectOption {
  value: string;
  label: string;
}

export interface SortSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SortSelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}
