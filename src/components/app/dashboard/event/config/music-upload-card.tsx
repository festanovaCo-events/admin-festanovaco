"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Music } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { FileUploadZone } from "@/components/common";
import { MusicUploadCardProps } from "@/interfaces";
import {
  MUSIC_OPTION_VALUES,
  EVENT_CREATE_FIELD_NAMES,
  INPUT_TYPES,
  FILE_ACCEPT_TYPES,
} from "@/constants";

export const MusicUploadCard: FC<MusicUploadCardProps> = ({ form }) => {
  const t = useTranslations("event.create.music");
  const musicOption = form.watch(EVENT_CREATE_FIELD_NAMES.MUSIC_OPTION);
  const musicFile = form.watch(EVENT_CREATE_FIELD_NAMES.MUSIC_FILE);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" /> {t("title")}
        </CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 mb-4">
          <Button
            type="button"
            variant={musicOption === MUSIC_OPTION_VALUES.URL ? "default" : "outline"}
            onClick={() => {
              form.setValue(EVENT_CREATE_FIELD_NAMES.MUSIC_OPTION, MUSIC_OPTION_VALUES.URL);
              form.setValue(EVENT_CREATE_FIELD_NAMES.MUSIC_FILE, undefined);
            }}
            className="flex-1 cursor-pointer"
          >
            {t("urlOption")}
          </Button>
          <Button
            type="button"
            variant={musicOption === MUSIC_OPTION_VALUES.FILE ? "default" : "outline"}
            onClick={() => {
              form.setValue(EVENT_CREATE_FIELD_NAMES.MUSIC_OPTION, MUSIC_OPTION_VALUES.FILE);
              form.setValue(EVENT_CREATE_FIELD_NAMES.MUSIC_URL, "");
            }}
            className="flex-1 cursor-pointer"
          >
            {t("fileOption")}
          </Button>
        </div>

        {musicOption === MUSIC_OPTION_VALUES.URL ? (
          <FormField
            control={form.control}
            name={EVENT_CREATE_FIELD_NAMES.MUSIC_URL}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={INPUT_TYPES.URL}
                    placeholder={t("urlPlaceholder")}
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name={EVENT_CREATE_FIELD_NAMES.MUSIC_FILE}
            render={() => (
              <FormItem>
                <FormControl>
                  <FileUploadZone
                    id={EVENT_CREATE_FIELD_NAMES.MUSIC_FILE}
                    accept={FILE_ACCEPT_TYPES.AUDIO}
                    icon={<Music className="w-8 h-8" />}
                    label={t("uploadClick")}
                    description={t("uploadDragDrop")}
                    formats={t("uploadFormats")}
                    hasFile={!!musicFile}
                    fileName={musicFile?.name}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        form.setValue(EVENT_CREATE_FIELD_NAMES.MUSIC_FILE, file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};
