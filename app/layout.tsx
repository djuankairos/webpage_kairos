import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import Script from "next/script";
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
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kairoswebpage.vercel.app");

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kairos Automatizaciones | Menos cancelaciones, agenda más llena",
  description:
    "Kairos ayuda a clínicas y consultorios en Colombia a responder pacientes por WhatsApp, confirmar citas y reducir ausencias.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
      "Reduce cancelaciones y responde pacientes 24/7 por WhatsApp con automatización para clínicas y consultorios.",
    url: siteUrl,
    siteName: "Kairos Automatizaciones",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Kairos Automatizaciones - Automatización para clínicas y consultorios en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairos Automatizaciones",
    description:
      "Mejora la ocupación de agenda con confirmaciones, recordatorios y seguimiento por WhatsApp.",
    images: [`${siteUrl}/og-image.png`],
  },
  category: "Automatización B2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}

        {metaPixelId ? (
          <>
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}
      </head>
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
