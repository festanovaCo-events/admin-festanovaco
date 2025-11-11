"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shadcn/ui/button";
import { Form } from "@/components/shadcn/ui/form";
import { MusicUploadCard } from "@/components/app/dashboard/event/create/music-upload-card";
import { PhotoGalleryCard } from "@/components/app/dashboard/event/create/photo-gallery-card";
import { CeremonyDetailsCard } from "@/components/app/dashboard/event/create/ceremony-details-card";
import { DateLocationCard } from "@/components/app/dashboard/event/create/date-location-card";
import { BasicInfoCard } from "@/components/app/dashboard/event/create/basic-info-card";
import { useImageUpload } from "@/hooks";
import { createEventFormSchema, CreateEventFormValues } from "@/schema";

const CreateEventPage = () => {
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      eventType: undefined,
      gallery: [],
      bannerPhoto: [],
      footerPhoto: [],
      date: "",
      time: "",
      location: "",
      musicOption: "url",
      musicUrl: "",
      musicFile: undefined,
      ceremonyDate: "",
      ceremonyTime: "",
      ceremonyLocation: "",
    },
  });

  const selectedType = useWatch({ control: form.control, name: "eventType" });

  const {
    photos: bannerPhotos,
    handlePhotoUpload: handleBannerUpload,
    removePhoto: removeBannerPhoto,
    resetPhotos: resetBannerPhotos,
  } = useImageUpload({ maxPhotos: 1 });

  const {
    photos: galleryPhotos,
    handlePhotoUpload: handleGalleryUpload,
    removePhoto: removeGalleryPhoto,
    resetPhotos: resetGalleryPhotos,
  } = useImageUpload({ maxPhotos: 10 });

  const {
    photos: footerPhotos,
    handlePhotoUpload: handleFooterUpload,
    removePhoto: removeFooterPhoto,
    resetPhotos: resetFooterPhotos,
  } = useImageUpload({ maxPhotos: 1 });

  const onSubmit = (data: CreateEventFormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mx-auto 2xl:w-2/4"
      >
        <BasicInfoCard form={form} />

        <DateLocationCard form={form} />

        {selectedType === "boda" && <CeremonyDetailsCard form={form} />}

        <PhotoGalleryCard
          form={form}
          name="bannerPhoto"
          title="Banner del Evento"
          description="Sube una foto de banner para tu evento"
          photos={bannerPhotos}
          handlePhotoUpload={handleBannerUpload}
          removePhoto={removeBannerPhoto}
        />

        <PhotoGalleryCard
          form={form}
          name="gallery"
          title="Galería de Fotos"
          description={`Sube hasta 10 fotos para tu evento (${galleryPhotos.length}/10)`}
          photos={galleryPhotos}
          handlePhotoUpload={handleGalleryUpload}
          removePhoto={removeGalleryPhoto}
        />

        <PhotoGalleryCard
          form={form}
          name="footerPhoto"
          title="Pie de Foto del Evento"
          description={`Sube una foto para el pie de foto de tu evento`}
          photos={footerPhotos}
          handlePhotoUpload={handleFooterUpload}
          removePhoto={removeFooterPhoto}
        />

        <MusicUploadCard form={form} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit" size="lg" className="min-w-[200px]">
            Crear Evento
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEventPage;
