import { FC } from "react";
import { Label } from "@/components/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface SelectOptionProps {
  eventType: string;
  setEventType: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  label: string;
}
export const SelectOption: FC<SelectOptionProps> = ({
  options,
  eventType,
  setEventType,
  placeholder,
  label,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="eventType">{label}</Label>
      <Select name="eventType" value={eventType} onValueChange={setEventType}>
        <SelectTrigger id="eventType">
          <SelectValue
            placeholder={
              placeholder ? placeholder : "Selecciona el tipo de evento"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
