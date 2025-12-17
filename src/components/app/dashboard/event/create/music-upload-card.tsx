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
import { cn } from "@/lib/utils";
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
            className="flex-1"
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
            className="flex-1"
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
                  <label
                    htmlFor={EVENT_CREATE_FIELD_NAMES.MUSIC_FILE}
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors",
                      musicFile && "border-accent bg-accent/10"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Music className="w-8 h-8 mb-2 text-muted-foreground" />
                      {musicFile ? (
                        <p className="text-sm font-semibold text-foreground">
                          {musicFile.name}
                        </p>
                      ) : (
                        <>
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">
                              {t("uploadClick")}
                            </span>{" "}
                            {t("uploadDragDrop")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("uploadFormats")}
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id={EVENT_CREATE_FIELD_NAMES.MUSIC_FILE}
                      type={INPUT_TYPES.FILE}
                      className="hidden"
                      accept={FILE_ACCEPT_TYPES.AUDIO}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue(EVENT_CREATE_FIELD_NAMES.MUSIC_FILE, file);
                        }
                      }}
                    />
                  </label>
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
