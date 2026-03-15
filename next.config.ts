import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Agregar aquí otros dominios de imágenes si es necesario
      // Por ejemplo, si las imágenes se almacenan en otro servicio:
      // {
      //   protocol: "https",
      //   hostname: "tu-dominio.com",
      // },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
