"use client";

import type { FC } from "react";
import type { FileUploadZoneProps } from "@/interfaces/components/common/file-upload/file-upload-zone.interface";
import { cn } from "@/shared/lib/utils";

export const FileUploadZone: FC<FileUploadZoneProps> = ({
  id,
  accept,
  multiple = false,
  icon,
  label,
  description,
  formats,
  onChange,
  className,
  disabled = false,
  hasFile = false,
  fileName,
}) => {
  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <label
        htmlFor={id}
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors",
          hasFile && "border-accent bg-accent/10",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="w-8 h-8 mb-2 text-muted-foreground flex items-center justify-center">
            {icon}
          </div>
          {hasFile && fileName ? (
            <p className="text-sm font-semibold text-foreground">{fileName}</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">{label}</span>
                {description && ` ${description}`}
              </p>
              {formats && (
                <p className="text-xs text-muted-foreground">{formats}</p>
              )}
            </>
          )}
        </div>
        <input
          id={id}
          name={id}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
};
