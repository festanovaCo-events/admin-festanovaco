import { FC } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { DateLocationCardProps } from "@/interfaces";

export const DateLocationCard: FC<DateLocationCardProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fecha y Ubicación</CardTitle>
        <CardDescription>Cuándo y dónde se realizará el evento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="date">
                  <Calendar className="h-4 w-4" />
                  Fecha del Evento
                </FormLabel>
                <FormControl>
                  <Input id="date" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="time">
                  <Clock className="h-4 w-4" />
                  Hora del Evento
                </FormLabel>
                <FormControl>
                  <Input id="time" type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="location">
                <MapPin className="h-4 w-4" />
                Lugar del Evento
              </FormLabel>
              <FormControl>
                <Input
                  id="location"
                  placeholder="Ej: Salón de Eventos El Jardín, Calle Principal 123"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
