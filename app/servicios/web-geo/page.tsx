import type { Metadata } from "next";
import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import { CheckCheck, MessageCircle } from "lucide-react";
import { FaqsSection, type FaqItem } from "@/components/ui/faqs-1";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TimelineContent } from "@/components/ui/timeline-animation";

/* ── Bricolage Grotesque: variable font, NO está en la reflex-reject list ── */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kairospro.online";
const whatsappNumber = "573151069572";
const whatsappMessage =
  "Hola Kairos, quiero conocer el servicio web y GEO para mejorar la captación digital de mi negocio.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Páginas Web Profesionales desde $300 USD | Kairos",
  description:
    "Diseñamos, desarrollamos y optimizamos tu presencia digital con páginas web de alto impacto y GEO para aparecer en Google y en IA. Desde $300 USD. Entrega en 7 días.",
  alternates: { canonical: "/servicios/web-geo" },
  openGraph: {
    title: "Páginas Web Profesionales desde $300 USD | Kairos",
    description: "Tu negocio necesita una web que venda, no solo que exista. Diseño web + GEO desde $300 USD.",
    url: `${siteUrl}/servicios/web-geo`,
    siteName: "Kairos",
    locale: "es_CO",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Kairos — Páginas Web y GEO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas Web Profesionales desde $300 USD | Kairos",
    description: "Diseño web + GEO desde $300 USD. Entrega en 7 días.",
    images: [`${siteUrl}/og-image.png`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Diseño Web y GEO",
  description: "Diseño, desarrollo y optimización de páginas web profesionales con GEO para negocios en Colombia.",
  provider: { "@type": "Organization", name: "Kairos", url: siteUrl, telephone: "+57 3151069572" },
  areaServed: "CO",
  offers: { "@type": "Offer", price: "300", priceCurrency: "USD", description: "Página web profesional desde $300 USD" },
};

const webFaqItems: FaqItem[] = [
  { id: "wf-1", title: "¿Qué necesito antes de empezar?", content: "Una idea de tu negocio, logo (o lo hacemos nosotros) y el contenido básico. Te guiamos en cada paso." },
  { id: "wf-2", title: "¿El precio incluye el hosting?", content: "El primer año de hosting está incluido en Web Básica. Los planes superiores incluyen configuración completa en Vercel o Hostinger." },
  { id: "wf-3", title: "¿Cuánto tarda en estar lista?", content: "Entre 7 y 14 días hábiles según el plan. Siempre hay una ronda de revisión antes de publicar." },
  { id: "wf-4", title: "¿Qué es el GEO y por qué importa?", content: "GEO (Generative Engine Optimization) optimiza tu sitio para aparecer en ChatGPT, Perplexity y Google AI Overviews. Más del 30% de las búsquedas ya pasan por IA." },
  { id: "wf-5", title: "¿Puedo ver ejemplos antes de decidir?", content: "Sí. En el portafolio de esta página hay ejemplos reales. Por WhatsApp también mostramos casos por industria." },
  { id: "wf-6", title: "¿Incluye mantenimiento?", content: "Los primeros 30 días incluyen revisiones sin costo. Después ofrecemos planes de mantenimiento mensual." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: webFaqItems.map((q) => ({
    "@type": "Question",
    name: q.title,
    acceptedAnswer: { "@type": "Answer", text: q.content },
  })),
};

const creatives = [
  { src: "/servicios/web-geo/kairos-web-geo-1.png", alt: "Landing de alto impacto Kairos" },
  { src: "/servicios/web-geo/kairos-web-geo-2.png", alt: "Diseño web con foco en credibilidad" },
  { src: "/servicios/web-geo/kairos-web-geo-3.png", alt: "Web adaptable para imagen profesional" },
  { src: "/servicios/web-geo/kairos-web-geo-4.png", alt: "Propuesta de valor digital Kairos" },
];

const processSteps = [
  { step: "01", title: "Diagnóstico", desc: "Revisamos negocio, competencia y objetivos digitales." },
  { step: "02", title: "Diseño", desc: "Look & feel adaptado a tu marca y audiencia." },
  { step: "03", title: "Desarrollo", desc: "Web rápida, segura y lista para SEO." },
  { step: "04", title: "Revisión", desc: "Accedes, revisas y apruebas antes de publicar." },
  { step: "05", title: "Lanzamiento", desc: "Publicamos, analytics activo, 30 días de acompañamiento." },
];

const problems = [
  {
    num: "01",
    title: "Google y la IA no te encuentran.",
    desc: "Más del 30% de búsquedas ya pasan por ChatGPT, Perplexity o Google AI Overviews. Sin GEO, no apareces.",
  },
  {
    num: "02",
    title: "Tu web no convierte visitantes en clientes.",
    desc: "Una web lenta o sin CTA claro convierte menos del 1% de visitas. Eso es dinero sobre la mesa, cada día.",
  },
  {
    num: "03",
    title: "Tu competencia ya tiene ventaja digital.",
    desc: "El 81% de compradores investigan online antes de contactar. Si ellos tienen web y tú no, ya perdiste el lead.",
  },
];

const webFeatures = [
  "Diseño a medida — sin plantillas genéricas",
  "Mobile-first y velocidad optimizada",
  "SEO técnico y on-page",
  "Integración WhatsApp, GA4 y Meta Pixel",
  "Formularios y CTAs de conversión",
];

const geoFeatures = [
  "Schema markup: FAQPage, Service, LocalBusiness",
  "llms.txt para crawlers de IA",
  "Contenido estructurado para ser citado",
  "Core Web Vitals: LCP, CLS e INP",
  "Open Graph y Twitter Card",
];

/* ── Pricing table data ── */
const plans = [
  { id: "basica", name: "WEB BÁSICA", price: "$300", cta: "Empezar" },
  { id: "pro", name: "WEB PRO", price: "$600", cta: "Empezar", highlight: true },
  { id: "auto", name: "WEB + AUTO", price: "$900", cta: "Empezar" },
];

const pricingRows: { feature: string; values: (boolean | string)[] }[] = [
  { feature: "Páginas incluidas", values: ["1 landing", "Hasta 5 + blog", "Hasta 5 + blog"] },
  { feature: "Diseño a medida", values: [true, true, true] },
  { feature: "SEO on-page", values: ["Básico", "Avanzado", "Avanzado"] },
  { feature: "GEO (schema + llms.txt)", values: [false, true, true] },
  { feature: "GA4 + Meta Pixel", values: [true, true, true] },
  { feature: "Core Web Vitals", values: [false, true, true] },
  { feature: "Hosting primer año", values: [true, false, false] },
  { feature: "Soporte técnico", values: ["—", "60 días", "90 días"] },
  { feature: "Automatización WhatsApp", values: [false, false, true] },
];

const navLinks = [
  { href: "#servicio", label: "Servicio" },
  { href: "#proceso", label: "Proceso" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#planes", label: "Planes" },
  { href: "#faq", label: "FAQ" },
];

export default function ServicioWebGeoPage() {
  return (
    <div className={`${bricolage.variable} min-h-screen bg-kairos-bg-deep`}>
      {/* ── Global styles: font alias + animations ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .font-display { font-family: var(--font-display), var(--font-sans); }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-word { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}} />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 border-b border-kairos-dark/50 bg-kairos-bg-deep/90 backdrop-blur-xl">
        <div className="kairos-container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3" aria-label="Kairos Inicio">
            <Image src="/logo-kairos.png" alt="Logo Kairos" width={30} height={30} priority />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-white">Kairos</span>
          </a>
          <nav className="hidden gap-8 text-xs uppercase tracking-[0.12em] text-kairos-gray-mid md:flex" aria-label="Navegación">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-kairos-white">
                {l.label}
              </a>
            ))}
          </nav>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <HoverBorderGradient className="px-4 py-2 text-xs">Hablar por WhatsApp</HoverBorderGradient>
          </a>
        </div>
      </header>

      <main>
        {/* ══ 01 HERO ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen overflow-hidden border-b border-kairos-dark/40 flex items-center">
          {/* Image bleeds into viewport — no card, no border */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] lg:block">
            <div className="relative h-full w-full">
              <Image
                src={creatives[1].src}
                alt={creatives[1].alt}
                fill
                sizes="44vw"
                className="object-contain object-right-center"
                priority
              />
              <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-kairos-bg-deep to-transparent" />
            </div>
          </div>

          <div className="kairos-container relative z-10 py-28 lg:py-0">
            <div style={{ maxWidth: "min(56%, 680px)" }} className="max-w-full lg:max-w-[56%]">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-14">
                <span className="h-px w-8 bg-kairos-green flex-none" />
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-kairos-green">
                  Servicio 01 — Web & GEO
                </p>
              </div>

              {/* Headline: weight 200 vs 700, 3×–5× contrast ── Impeccable bolder.md */}
              <h1 className="font-display leading-[0.88] tracking-[-0.02em]" style={{ textWrap: "balance" } as React.CSSProperties}>
                <span
                  className="hero-word block"
                  style={{
                    fontSize: "clamp(3.5rem,11vw,8.5rem)",
                    fontWeight: 200,
                    color: "rgba(249,250,251,0.45)",
                    animation: "fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both",
                  }}
                >
                  PÁGINAS
                </span>
                <span
                  className="hero-word block"
                  style={{
                    fontSize: "clamp(3.5rem,11vw,8.5rem)",
                    fontWeight: 200,
                    color: "rgba(249,250,251,0.45)",
                    animation: "fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s both",
                  }}
                >
                  QUE
                </span>
                <span
                  className="hero-word block"
                  style={{
                    fontSize: "clamp(3.5rem,11vw,8.5rem)",
                    fontWeight: 700,
                    color: "#6FC2A8",
                    animation: "fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both",
                  }}
                >
                  VENDEN.
                </span>
              </h1>

              {/* Metadata strip */}
              <div
                className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-kairos-dark/50 pt-6 text-sm text-kairos-gray-mid"
                style={{ animation: "fadeSlideUp 0.8s ease-out 0.7s both" } as React.CSSProperties}
              >
                <span>desde <strong className="text-kairos-white font-medium">$300 USD</strong></span>
                <span className="text-kairos-dark">·</span>
                <span>entrega <strong className="text-kairos-white font-medium">7–14 días</strong></span>
                <span className="text-kairos-dark">·</span>
                <span>Colombia</span>
                <span className="text-kairos-dark">·</span>
                <span><strong className="text-kairos-white font-medium">GEO incluido</strong></span>
              </div>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap gap-5"
                style={{ animation: "fadeSlideUp 0.8s ease-out 0.85s both" } as React.CSSProperties}
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <HoverBorderGradient className="px-6 py-3 text-base">Quiero mi página web</HoverBorderGradient>
                </a>
                <a
                  href="#portafolio"
                  className="inline-flex items-center text-sm text-kairos-gray-mid transition-colors hover:text-kairos-white"
                >
                  ver ejemplos&nbsp;→
                </a>
              </div>
            </div>

            {/* Image on mobile — below text */}
            <div className="relative mt-12 aspect-square w-full overflow-hidden rounded-xl bg-kairos-panel/30 lg:hidden">
              <Image src={creatives[1].src} alt={creatives[1].alt} fill className="object-contain" priority />
            </div>
          </div>
        </section>

        {/* ══ 02 PROBLEMAS — index editorial ══════════════════════════════════ */}
        <section className="border-b border-kairos-dark/40">
          <div className="kairos-container py-24 lg:py-32">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-kairos-green/60 mb-16">
              — El problema
            </p>
            <div className="divide-y divide-kairos-dark/40">
              {problems.map((p, i) => (
                <TimelineContent key={p.num} animationNum={i}>
                  <div className="flex gap-8 py-10 lg:gap-16 lg:py-12">
                    <span
                      className="font-display w-16 shrink-0 leading-none text-kairos-green/20"
                      style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 200 }}
                    >
                      {p.num}
                    </span>
                    <div className="space-y-2 pt-1">
                      <h3
                        className="font-display text-kairos-white"
                        style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 300, textWrap: "balance" } as React.CSSProperties}
                      >
                        {p.title}
                      </h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-kairos-gray-mid lg:text-base">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </TimelineContent>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 03 DISEÑO WEB — imagen full-bleed, sin card ══════════════════════ */}
        <section id="servicio" className="border-b border-kairos-dark/40">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[440px] bg-kairos-panel/20 lg:min-h-[600px]">
              <Image
                src={creatives[0].src}
                alt={creatives[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center space-y-8 p-10 lg:p-16">
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-kairos-green">
                  Diseño & Desarrollo
                </p>
                <h2
                  className="font-display text-kairos-white"
                  style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 200, lineHeight: 1.15, textWrap: "balance" } as React.CSSProperties}
                >
                  Una web construida<br />para vender.
                </h2>
              </div>
              <ul className="space-y-3">
                {webFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-kairos-gray-light">
                    <CheckCheck className="h-4 w-4 shrink-0 text-kairos-green" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="w-fit">
                <HoverBorderGradient className="px-5 py-2.5 text-sm">Quiero mi web</HoverBorderGradient>
              </a>
            </div>
          </div>
        </section>

        {/* ══ 04 GEO — art direction: fondo verde ultra-oscuro ═════════════════ */}
        <section className="border-b border-kairos-dark/40" style={{ backgroundColor: "#071410" }}>
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8 p-10 lg:p-16">
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-kairos-green/60">
                  GEO — Generative Engine Optimization
                </p>
                <h2
                  className="font-display text-kairos-white"
                  style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 200, lineHeight: 1.15, textWrap: "balance" } as React.CSSProperties}
                >
                  Visible en Google.<br />
                  <span className="text-kairos-green">Visible en IA.</span>
                </h2>
                <p className="text-sm leading-relaxed text-kairos-white/50 max-w-md">
                  GEO optimiza tu contenido para que ChatGPT, Perplexity y Google AI Overviews te citen
                  como fuente relevante. Tu competencia aún no lo hace.
                </p>
              </div>
              <ul className="space-y-3">
                {geoFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-kairos-white/70">
                    <CheckCheck className="h-4 w-4 shrink-0 text-kairos-green" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="w-fit">
                <HoverBorderGradient className="px-5 py-2.5 text-sm">Quiero GEO para mi web</HoverBorderGradient>
              </a>
            </div>
            <div className="relative min-h-[440px] lg:min-h-[600px]" style={{ backgroundColor: "#050e0b" }}>
              <Image
                src={creatives[2].src}
                alt={creatives[2].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* ══ 05 PROCESO — tabla editorial horizontal ═══════════════════════════ */}
        <section id="proceso" className="border-b border-kairos-dark/40">
          <div className="kairos-container py-24 lg:py-32">
            <div className="mb-14 flex items-end justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-kairos-green/60">
                — Proceso
              </p>
              <p className="text-sm text-kairos-gray-mid font-mono">7–14 días hábiles</p>
            </div>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-5" style={{ backgroundColor: "rgba(46,50,54,0.4)" }}>
              {processSteps.map((s, i) => (
                <TimelineContent key={s.step} animationNum={i}>
                  <div className="flex flex-col gap-5 bg-kairos-bg-deep p-8">
                    <span
                      className="font-display leading-none text-kairos-green/15"
                      style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 200 }}
                    >
                      {s.step}
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="font-display text-base font-[500] text-kairos-white">{s.title}</h3>
                      <p className="text-xs leading-relaxed text-kairos-gray-mid">{s.desc}</p>
                    </div>
                  </div>
                </TimelineContent>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 06 PORTAFOLIO — grid asimétrico ══════════════════════════════════ */}
        <section id="portafolio" className="border-b border-kairos-dark/40">
          <div className="kairos-container py-24 lg:py-32">
            <div className="mb-10 flex items-end justify-between">
              <h2
                className="font-display text-kairos-white"
                style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 200 }}
              >
                Portafolio
              </h2>
              <p className="font-mono text-xs text-kairos-gray-mid">4 proyectos</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="kairos-hover-card group relative col-span-2 overflow-hidden rounded-xl bg-kairos-panel/40" style={{ aspectRatio: "16/9" }}>
                <Image src={creatives[0].src} alt={creatives[0].alt} fill sizes="66vw" className="object-contain transition-transform duration-700 group-hover:scale-105" priority />
              </div>
              <div className="kairos-hover-card group relative overflow-hidden rounded-xl bg-kairos-panel/40" style={{ aspectRatio: "1/1" }}>
                <Image src={creatives[1].src} alt={creatives[1].alt} fill sizes="33vw" className="object-contain transition-transform duration-700 group-hover:scale-105" priority />
              </div>
              <div className="kairos-hover-card group relative overflow-hidden rounded-xl bg-kairos-panel/40" style={{ aspectRatio: "1/1" }}>
                <Image src={creatives[2].src} alt={creatives[2].alt} fill sizes="33vw" className="object-contain transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="kairos-hover-card group relative col-span-2 overflow-hidden rounded-xl bg-kairos-panel/40" style={{ aspectRatio: "16/9" }}>
                <Image src={creatives[3].src} alt={creatives[3].alt} fill sizes="66vw" className="object-contain transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ 07 PRECIOS — tabla comparativa, precio como tipografía ═══════════ */}
        <section id="planes" className="border-b border-kairos-dark/40">
          <div className="kairos-container py-24 lg:py-32">
            <div className="mb-14 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-kairos-green/60">— Planes</p>
              <h2
                className="font-display text-kairos-white"
                style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 200, textWrap: "balance" } as React.CSSProperties}
              >
                Sin suscripciones.<br />Sin sorpresas.
              </h2>
              <p className="text-sm text-kairos-gray-mid">Pago único. El precio que ves es el que pagas.</p>
            </div>

            {/* Scrollable on mobile */}
            <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
              <div style={{ minWidth: "560px" }}>
                {/* Header row — plan names + price as giant type */}
                <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-px mb-px" style={{ backgroundColor: "rgba(46,50,54,0.4)" }}>
                  <div className="bg-kairos-bg-deep p-6" />
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`bg-kairos-bg-deep p-6 ${plan.highlight ? "relative" : ""}`}
                    >
                      {plan.highlight && (
                        <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-kairos-green border border-kairos-green/40 rounded-full px-2 py-0.5">
                          Popular
                        </span>
                      )}
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-kairos-gray-mid mb-3">
                        {plan.name}
                      </p>
                      <p
                        className="font-display text-kairos-white leading-none"
                        style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 200 }}
                      >
                        {plan.price}
                        <span className="text-sm text-kairos-gray-mid font-sans font-normal ml-1">USD</span>
                      </p>
                      <p className="text-xs text-kairos-gray-mid mt-1">pago único</p>
                    </div>
                  ))}
                </div>

                {/* Feature rows */}
                {pricingRows.map((row, ri) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-px mb-px"
                    style={{ backgroundColor: "rgba(46,50,54,0.4)" }}
                  >
                    <div className="bg-kairos-bg-deep px-6 py-4 text-sm text-kairos-gray-mid">{row.feature}</div>
                    {row.values.map((v, ci) => (
                      <div
                        key={ci}
                        className={`bg-kairos-bg-deep px-6 py-4 ${ri % 2 === 0 ? "" : "bg-kairos-panel/20"}`}
                      >
                        {v === true ? (
                          <CheckCheck className="h-4 w-4 text-kairos-green" />
                        ) : v === false ? (
                          <span className="text-kairos-dark/60 text-sm">—</span>
                        ) : (
                          <span className="text-xs text-kairos-gray-light">{v as string}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                {/* CTA row */}
                <div
                  className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-px"
                  style={{ backgroundColor: "rgba(46,50,54,0.4)" }}
                >
                  <div className="bg-kairos-bg-deep p-6" />
                  {plans.map((plan) => (
                    <div key={plan.id} className="bg-kairos-bg-deep p-5">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full cursor-pointer rounded-lg py-3 text-center text-sm font-medium transition-colors ${
                          plan.highlight
                            ? "border border-kairos-green bg-kairos-green text-kairos-bg-deep hover:bg-kairos-green-dark hover:text-kairos-white"
                            : "border border-kairos-green/30 text-kairos-white hover:border-kairos-green hover:text-kairos-green"
                        }`}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 08 FAQs ══════════════════════════════════════════════════════════ */}
        <FaqsSection items={webFaqItems} />

        {/* ══ 09 CTA FINAL — texto enorme, sin card-box ════════════════════════ */}
        <section className="border-t border-kairos-dark/40">
          <div className="kairos-container py-40 lg:py-56">
            <h2 className="font-display leading-[0.9] tracking-[-0.02em] mb-14">
              <span
                className="block text-kairos-white/50"
                style={{ fontSize: "clamp(2.5rem,8vw,6.5rem)", fontWeight: 200 }}
              >
                Tu web podría estar
              </span>
              <span
                className="block text-kairos-green"
                style={{ fontSize: "clamp(2.5rem,8vw,6.5rem)", fontWeight: 700 }}
              >
                en vivo en 7 días.
              </span>
            </h2>
            <div className="flex flex-wrap gap-5">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <HoverBorderGradient className="px-8 py-4 text-base">Quiero mi página web</HoverBorderGradient>
              </a>
              <a
                href="tel:+573151069572"
                className="inline-flex items-center rounded-full border border-kairos-dark px-8 py-4 text-sm text-kairos-gray-mid transition-colors hover:border-kairos-green/50 hover:text-kairos-white"
              >
                +57 315 106 9572
              </a>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
        <footer className="border-t border-kairos-dark/50 py-12 text-xs text-kairos-gray-mid">
          <div className="kairos-container">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-kairos-green">Kairos</p>
                <p>Páginas web profesionales y GEO — Colombia.</p>
                <a href="tel:+573151069572" className="block transition-colors hover:text-kairos-green">
                  +57 315 106 9572
                </a>
              </div>
              <nav aria-label="Pie de página" className="flex flex-col gap-2 md:items-end">
                <a href="/" className="transition-colors hover:text-kairos-white">Inicio</a>
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="transition-colors hover:text-kairos-white">{l.label}</a>
                ))}
              </nav>
            </div>
            <p className="mt-8 border-t border-kairos-dark/40 pt-6 text-center">
              © {new Date().getFullYear()} Kairos Automatizaciones. Todos los derechos reservados. Colombia.
            </p>
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex cursor-pointer items-center gap-2 rounded-full border border-kairos-green/40 bg-kairos-bg-deep px-4 py-3 text-sm text-kairos-green shadow-glow"
        aria-label="Abrir WhatsApp de Kairos"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
