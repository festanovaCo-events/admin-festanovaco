import type { FC } from "react";
import type { SelectOptionProps } from "@/interfaces/components/common/selects/select-option.interface";
import { Label } from "@/shared/ui/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn/ui/select";

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
