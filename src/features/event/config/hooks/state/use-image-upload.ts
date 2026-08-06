import { useState } from "react";
import { FILE_SIZE_LIMITS, PHOTO_UPLOAD_LIMITS } from "@/constants/event-create";
import type { UseImageUploadProps } from "@/interfaces/hooks/use-image-upload.interface";

export const useImageUpload = ({
  maxPhotos = PHOTO_UPLOAD_LIMITS.GALLERY_MAX,
  maxPhotoSizeMB = FILE_SIZE_LIMITS.IMAGE_MAX_MB,
}: UseImageUploadProps = {}) => {
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxPhotos - photos.length;

    const _validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size / 1024 / 1024 <= maxPhotoSizeMB;
      return isValidType && isValidSize;
    });

    setPhotos((prev) => [...prev, ...files.slice(0, remainingSlots)]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const resetPhotos = () => setPhotos([]);

  return {
    photos,
    handlePhotoUpload,
    removePhoto,
    resetPhotos,
  };
};
