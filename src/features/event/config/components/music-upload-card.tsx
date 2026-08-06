"use client";

import { Music } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { EVENT_CREATE_FIELD_NAMES, FILE_ACCEPT_TYPES, INPUT_TYPES, MUSIC_OPTION_VALUES } from "@/constants/event-create";
import type { MusicUploadCardProps } from "@/interfaces/components/app/dashboard/event/config/music-upload-card.interface";
import { FileUploadZone } from "@/shared/ui/common/file-upload/file-upload-zone";
import { Button } from "@/shared/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/shadcn/ui/form";
import { Input } from "@/shared/ui/shadcn/ui/input";

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
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 mb-4">
          <Button
            type="button"
            variant={
              musicOption === MUSIC_OPTION_VALUES.URL ? "default" : "outline"
            }
            onClick={() => {
              form.setValue(
                EVENT_CREATE_FIELD_NAMES.MUSIC_OPTION,
                MUSIC_OPTION_VALUES.URL,
              );
              form.setValue(EVENT_CREATE_FIELD_NAMES.MUSIC_FILE, undefined);
            }}
            className="flex-1 cursor-pointer"
          >
            {t("urlOption")}
          </Button>
          <Button
            type="button"
            variant={
              musicOption === MUSIC_OPTION_VALUES.FILE ? "default" : "outline"
            }
            onClick={() => {
              form.setValue(
                EVENT_CREATE_FIELD_NAMES.MUSIC_OPTION,
                MUSIC_OPTION_VALUES.FILE,
              );
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
                        form.setValue(
                          EVENT_CREATE_FIELD_NAMES.MUSIC_FILE,
                          file,
                        );
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
