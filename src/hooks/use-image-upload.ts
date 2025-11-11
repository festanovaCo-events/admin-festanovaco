import { useState } from "react";

interface UseImageUploadProps {
  maxPhotos?: number;
  maxPhotoSizeMB?: number;
}

export const useImageUpload = ({
  maxPhotos = 10,
  maxPhotoSizeMB = 5,
}: UseImageUploadProps = {}) => {
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxPhotos - photos.length;

    const validFiles = files.filter((file) => {
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
