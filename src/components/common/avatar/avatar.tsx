import { FC } from "react";
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { AvatarProps } from "@/interfaces";

export const Avatar: FC<AvatarProps> = ({ src, alt, fallback, className }) => {
  return (
    <ShadcnAvatar {...(className && { className })}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadcnAvatar>
  );
};
