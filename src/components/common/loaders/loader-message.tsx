import { FC } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { LoaderMessageProps } from "@/interfaces";

export const LoaderMessage: FC<LoaderMessageProps> = ({
  title,
  description,
}) => {
  return (
    <div className="fixed inset-0 bg-background/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-[300px]">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
