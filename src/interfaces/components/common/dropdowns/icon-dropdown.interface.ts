type DropdownOption = {
  label: string;
  value: string;
  src: string;
};

export type IconDropdownProps = {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  iconSize?: number;
  children: React.ReactNode;
};
