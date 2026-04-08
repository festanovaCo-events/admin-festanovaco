import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { hasLocale, NextIntlClientProvider, useMessages } from "next-intl";
import { Nunito } from "next/font/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { OtelProvider } from "@/components/providers/OtelProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Festanova Admin",
    template: "%s | Festanova Admin",
  },
  description:
    "Panel de administración para gestionar eventos, invitados y archivos de Festanova. Uso interno; no indexar en buscadores.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${nunito.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <OtelProvider />
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
