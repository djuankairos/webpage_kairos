import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://kairoswebpage.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kairos Automatizaciones | Más clientes, menos pérdidas operativas",
  description:
    "Kairos automatiza WhatsApp, agenda y seguimiento para convertir procesos en ingreso medible en Colombia.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Kairos Automatizaciones",
    description:
      "Convierte tu operación en una máquina de clientes: automatización de agenda, WhatsApp y seguimiento.",
    url: siteUrl,
    siteName: "Kairos Automatizaciones",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo-kairos.png`,
        width: 1200,
        height: 1200,
        alt: "Logo de Kairos Automatizaciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairos Automatizaciones",
    description:
      "Automatización operativa con impacto medible en ventas, agenda y retención.",
    images: [
      `${siteUrl}/logo-kairos.png`,
    ],
  },
  category: "B2B Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

