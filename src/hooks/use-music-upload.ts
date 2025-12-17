import { useState } from "react";
import {
  MUSIC_OPTION_VALUES,
  FILE_SIZE_LIMITS,
  type MusicOptionValue,
} from "@/constants";

interface UseMusicUploadProps {
  maxMusicSizeMB?: number;
}

export const useMusicUpload = ({
  maxMusicSizeMB = FILE_SIZE_LIMITS.MUSIC_MAX_MB,
}: UseMusicUploadProps = {}) => {
  const [musicOption, setMusicOption] = useState<MusicOptionValue>(
    MUSIC_OPTION_VALUES.URL
  );
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicUrl, setMusicUrl] = useState<string>("");

  const handleMusicFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = file.type.startsWith("audio/");
    const isValidSize = file.size / 1024 / 1024 <= maxMusicSizeMB;

    if (isValidType && isValidSize) {
      setMusicFile(file);
    } else {
      alert(`El archivo debe ser de tipo audio y menor a ${maxMusicSizeMB}MB`);
    }
  };

  const resetMusic = () => {
    setMusicOption(MUSIC_OPTION_VALUES.URL);
    setMusicFile(null);
    setMusicUrl("");
  };

  return {
    musicOption,
    musicFile,
    musicUrl,

    setMusicOption,
    setMusicUrl,
    handleMusicFileUpload,
    resetMusic,
  };
};
