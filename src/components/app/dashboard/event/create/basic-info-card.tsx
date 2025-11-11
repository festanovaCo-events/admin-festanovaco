"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { SelectOption } from "@/components/common";
import { EVENT_TYPES } from "@/constants";
import { BasicInfoCardProps } from "@/interfaces";

export const BasicInfoCard: FC<BasicInfoCardProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Evento</CardTitle>
        <CardDescription>Información básica sobre tu evento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Título del Evento</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="Ej: Boda de María y Juan"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Describe tu evento especial..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SelectOption
                  eventType={field.value ?? ""}
                  setEventType={field.onChange}
                  options={EVENT_TYPES}
                  label="Tipo de Evento"
                  placeholder="Selecciona el tipo de evento"
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
