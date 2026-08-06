import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/shared/i18n/routing";
import { OtelProvider } from "@/shared/ui/providers/OtelProvider";
import { Toaster } from "@/shared/ui/shadcn/ui/sonner";

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
