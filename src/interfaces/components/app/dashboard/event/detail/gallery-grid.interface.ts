export interface GalleryGridProps {
  photos: string[];
  title: string;
  onSelect: (src: string) => void;
}
