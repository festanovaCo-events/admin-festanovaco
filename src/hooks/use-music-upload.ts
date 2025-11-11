import { useState } from "react";

interface UseMusicUploadProps {
  maxMusicSizeMB?: number;
}

export const useMusicUpload = ({
  maxMusicSizeMB = 10,
}: UseMusicUploadProps = {}) => {
  const [musicOption, setMusicOption] = useState<"url" | "file">("url");
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
    setMusicOption("url");
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
