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
import { CeremonyDetailsCardProps } from "@/interfaces";

export const CeremonyDetailsCard: FC<CeremonyDetailsCardProps> = ({ form }) => {
  return (
    <Card className="border-accent">
      <CardHeader>
        <CardTitle>Detalles de la Ceremonia</CardTitle>
        <CardDescription>
          Información específica de la ceremonia de boda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ceremonyDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="ceremonyDate">
                  <Calendar className="h-4 w-4" />
                  Fecha de la Ceremonia
                </FormLabel>
                <FormControl>
                  <Input id="ceremonyDate" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ceremonyTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="ceremonyTime">
                  <Clock className="h-4 w-4" />
                  Hora de la Ceremonia
                </FormLabel>
                <FormControl>
                  <Input id="ceremonyTime" type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="ceremonyLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="ceremonyLocation">
                <MapPin className="h-4 w-4" />
                Lugar de la Ceremonia
              </FormLabel>
              <FormControl>
                <Input
                  id="ceremonyLocation"
                  placeholder="Ej: Iglesia San Francisco, Avenida Central 456"
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
