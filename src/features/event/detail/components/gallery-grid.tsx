"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import type { GalleryGridProps } from "@/interfaces/components/app/dashboard/event/detail/gallery-grid.interface";

export const GalleryGrid: FC<GalleryGridProps> = ({
  photos,
  title,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4" aria-label={title}>
      {photos.map((photo, index) => (
        <button
          key={index}
          type="button"
          className="group relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
          onClick={() => onSelect(photo)}
        >
          <Image
            src={photo}
            alt={`${title} - Foto ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white/90 group-hover:cursor-pointer">
              <Eye className="h-16 w-16" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
