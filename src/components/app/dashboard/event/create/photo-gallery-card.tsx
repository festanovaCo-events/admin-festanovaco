import { FC } from "react";
import { ImageIcon, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { FormField, FormItem, FormMessage } from "@/components/shadcn/ui/form";
import { PhotoGalleryCardProps } from "@/interfaces";

export const PhotoGalleryCard: FC<PhotoGalleryCardProps> = ({
  form,
  name,
  photos,
  title,
  description,
  handlePhotoUpload,
  removePhoto,
}) => {
  const inputId = title.replace(/\s+/g, "-").toLowerCase();
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" /> {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {photos.length < 10 && (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor={inputId}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click para subir</span>{" "}
                        o arrastra y suelta
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id={inputId}
                      name={inputId}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        handlePhotoUpload(e);
                        form.setValue(name, [
                          ...photos,
                          ...Array.from(e.target.files ?? []),
                        ]);
                      }}
                    />
                  </label>
                </div>
              )}

              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removePhoto(index);
                          const updated = photos.filter((_, i) => i !== index);
                          form.setValue(name, updated);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FormMessage />
            </CardContent>
          </Card>
        </FormItem>
      )}
    />
  );
};
