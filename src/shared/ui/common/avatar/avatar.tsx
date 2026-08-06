import type { FC } from "react";
import type { AvatarProps } from "@/interfaces/components/common/avatar/avatar.interface";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as ShadcnAvatar,
} from "@/shared/ui/shadcn/ui/avatar";

export const Avatar: FC<AvatarProps> = ({ src, alt, fallback, className }) => {
  return (
    <ShadcnAvatar {...(className && { className })}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadcnAvatar>
  );
};
