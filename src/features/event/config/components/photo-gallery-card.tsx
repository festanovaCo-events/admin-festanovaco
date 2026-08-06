"use client";

import { ImageIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { FILE_ACCEPT_TYPES, PHOTO_UPLOAD_LIMITS } from "@/constants/event-create";
import type { PhotoGalleryCardProps } from "@/interfaces/components/app/dashboard/event/config/photo-gallery-card.interface";
import { FileUploadZone } from "@/shared/ui/common/file-upload/file-upload-zone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";
import { FormField, FormItem, FormMessage } from "@/shared/ui/shadcn/ui/form";

export const PhotoGalleryCard: FC<PhotoGalleryCardProps> = ({
  form,
  name,
  photos,
  title,
  description,
  handlePhotoUpload,
  removePhoto,
}) => {
  const t = useTranslations("event.create.gallery");
  const inputId = title.replace(/\s+/g, "-").toLowerCase();
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" /> {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {photos.length < PHOTO_UPLOAD_LIMITS.GALLERY_MAX && (
                <FileUploadZone
                  id={inputId}
                  accept={FILE_ACCEPT_TYPES.IMAGE}
                  multiple
                  icon={<ImageIcon className="w-8 h-8" />}
                  label={t("uploadClick")}
                  description={t("uploadDragDrop")}
                  formats={t("uploadFormats")}
                  onChange={(e) => {
                    handlePhotoUpload(e);
                    form.setValue(name, [
                      ...photos,
                      ...Array.from(e.target.files ?? []),
                    ]);
                  }}
                />
              )}

              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removePhoto(index);
                          const updated = photos.filter((_, i) => i !== index);
                          form.setValue(name, updated);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FormMessage />
            </CardContent>
          </Card>
        </FormItem>
      )}
    />
  );
};
