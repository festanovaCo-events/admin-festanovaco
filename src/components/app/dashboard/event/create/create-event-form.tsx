"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Form } from "@/components/shadcn/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Button } from "@/components/shadcn/ui/button";
import { createSimpleEventFormSchema, type SimpleCreateEventFormValues } from "@/schema";
import { EVENT_TYPES, EVENT_MODES } from "@/constants";
import type { CreateEventFormProps } from "@/interfaces/components/app/dashboard/event/create/create-event-form.interface";
import { toLocalInputValue } from "@/lib/utils";

export const CreateEventForm = ({ onSubmit, isLoading }: CreateEventFormProps) => {
  const t = useTranslations("event.create");
  const tTypes = useTranslations("event.types");
  const tValidation = useTranslations("event.create.simple.validation");
  const tCommon = useTranslations("common.actions");
  const router = useRouter();

  const form = useForm<SimpleCreateEventFormValues>({
    resolver: zodResolver(createSimpleEventFormSchema(tValidation)),
    defaultValues: {
      title: "Boda de Juan y María",
      type: EVENT_TYPES.WEDDING,
      mode: EVENT_MODES.ON_SITE,
      address: "",
      isPublic: true,
      capacity: 150,
      startAt: new Date(),
      endAt: new Date(),
    },
  });

  // Usa utilidad compartida toLocalInputValue

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("simple.title")}</CardTitle>
            <CardDescription>{t("simple.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("simple.fields.title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("simple.fields.titlePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("simple.fields.type")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("simple.fields.typePlaceholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={EVENT_TYPES.WEDDING}>{tTypes("wedding")}</SelectItem>
                      <SelectItem value={EVENT_TYPES.BIRTHDAY}>{tTypes("birthday")}</SelectItem>
                      <SelectItem value={EVENT_TYPES.ANNIVERSARY}>{tTypes("anniversary")}</SelectItem>
                      <SelectItem value={EVENT_TYPES.GRADUATION}>{tTypes("graduation")}</SelectItem>
                      <SelectItem value={EVENT_TYPES.CORPORATE}>{tTypes("corporate")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("simple.fields.mode")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("simple.fields.modePlaceholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={EVENT_MODES.ON_SITE}>{t("simple.modes.onSite")}</SelectItem>
                      <SelectItem value={EVENT_MODES.ONLINE}>{t("simple.modes.online")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha y hora de inicio</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={toLocalInputValue(field.value)}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha y hora de fin</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={toLocalInputValue(field.value)}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("simple.fields.address")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("simple.fields.addressPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("simple.fields.isPublic")}</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("simple.fields.capacity")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("simple.fields.capacityPlaceholder")}
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = value === "" ? 0 : parseInt(value, 10);
                        field.onChange(isNaN(numValue) ? 0 : numValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.back()}
          >
            {tCommon("cancel")}
          </Button>
          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading ? t("actions.creating") : t("actions.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
