import { FC } from "react";
import { Music } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { cn } from "@/lib/utils";
import { MusicUploadCardProps } from "@/interfaces";

export const MusicUploadCard: FC<MusicUploadCardProps> = ({ form }) => {
  const musicOption = form.watch("musicOption");
  const musicFile = form.watch("musicFile");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" /> Música del Evento
        </CardTitle>
        <CardDescription>
          Agrega una canción especial para tu evento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 mb-4">
          <Button
            type="button"
            variant={musicOption === "url" ? "default" : "outline"}
            onClick={() => {
              form.setValue("musicOption", "url");
              form.setValue("musicFile", undefined);
            }}
            className="flex-1"
          >
            URL de Canción
          </Button>
          <Button
            type="button"
            variant={musicOption === "file" ? "default" : "outline"}
            onClick={() => {
              form.setValue("musicOption", "file");
              form.setValue("musicUrl", "");
            }}
            className="flex-1"
          >
            Subir Archivo
          </Button>
        </div>

        {musicOption === "url" ? (
          <FormField
            control={form.control}
            name="musicUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="musicFile"
            render={() => (
              <FormItem>
                <FormControl>
                  <label
                    htmlFor="musicFile"
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors",
                      musicFile && "border-accent bg-accent/10"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Music className="w-8 h-8 mb-2 text-muted-foreground" />
                      {musicFile ? (
                        <p className="text-sm font-semibold text-foreground">
                          {musicFile.name}
                        </p>
                      ) : (
                        <>
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">
                              Click para subir
                            </span>{" "}
                            o arrastra y suelta
                          </p>
                          <p className="text-xs text-muted-foreground">
                            MP3, WAV, OGG (MAX. 10MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="musicFile"
                      type="file"
                      className="hidden"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue("musicFile", file);
                        }
                      }}
                    />
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};
