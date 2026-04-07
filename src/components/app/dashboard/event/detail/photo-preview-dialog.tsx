"use client";

import { FC } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/shadcn/ui/dialog";
import type { PhotoPreviewDialogProps } from "@/interfaces";

export const PhotoPreviewDialog: FC<PhotoPreviewDialogProps> = ({
    open,
    title,
    src,
    onOpenChange,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl" showCloseButton>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {src && (
                    <div className="relative w-full h-[70vh] rounded-md overflow-hidden">
                        <Image
                            src={src}
                            alt="Photo preview"
                            fill
                            className="object-contain bg-black"
                            sizes="100vw"
                            priority
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};