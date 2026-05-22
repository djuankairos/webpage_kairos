import type { Metadata } from "next";
import Image from "next/image";
import { BarChart3, CheckCheck, Globe, MessageCircle, Search, Zap } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { FaqsSection, type FaqItem } from "@/components/ui/faqs-1";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Logos3 } from "@/components/ui/logos3";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
  description:
    "Diseño, desarrollo y optimización de páginas web profesionales con GEO para negocios en Colombia.",
  provider: {
    "@type": "Organization",
    name: "Kairos",
    url: siteUrl,
    telephone: "+57 3151069572",
  },
  areaServed: "CO",
  offers: {
    "@type": "Offer",
    price: "300",
    priceCurrency: "USD",
    description: "Página web profesional desde $300 USD",
  },
};

const webFaqItems: FaqItem[] = [
  {
    id: "web-faq-1",
    title: "¿Qué necesito tener listo antes de empezar?",
    content:
      "Solo necesitas una idea clara de tu negocio, logo (o nos encargamos) y contenido básico (servicios, textos). Te guiamos en cada paso del proceso.",
  },
  {
    id: "web-faq-2",
    title: "¿El precio incluye el hosting?",
    content:
      "El primer año de hosting básico está incluido en el plan Web Básica. Los planes superiores incluyen configuración completa en Vercel o Hostinger.",
  },
  {
    id: "web-faq-3",
    title: "¿Cuánto tarda en estar lista mi página?",
    content:
      "Entre 7 y 14 días hábiles según el plan y las páginas requeridas. Siempre hay una ronda de revisión de diseño antes de publicar.",
  },
  {
    id: "web-faq-4",
    title: "¿Qué es el GEO y por qué importa?",
    content:
      "GEO (Generative Engine Optimization) optimiza tu sitio para aparecer en respuestas de IA como Google AI Overviews, ChatGPT y Perplexity. Más del 30% de las búsquedas ya pasan por estas herramientas.",
  },
  {
    id: "web-faq-5",
    title: "¿Puedo ver ejemplos antes de decidir?",
    content:
      "Sí. En la galería de esta página tienes ejemplos de proyectos reales. Por WhatsApp también te mostramos casos adicionales según tu industria.",
  },
  {
    id: "web-faq-6",
    title: "¿Incluye actualizaciones o mantenimiento?",
    content:
      "Los primeros 30 días incluyen revisiones sin costo adicional. Después ofrecemos planes de mantenimiento para actualizaciones de contenido y soporte técnico.",
  },
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
  {
    src: "/servicios/web-geo/kairos-web-geo-1.png",
    alt: "Página web profesional Kairos con oferta de pago único",
    label: "Landing de alto impacto",
    tag: "Diseño web",
  },
  {
    src: "/servicios/web-geo/kairos-web-geo-2.png",
    alt: "Diseño web enfocado en credibilidad y presentación profesional",
    label: "Credibilidad desde el primer clic",
    tag: "Conversión",
  },
  {
    src: "/servicios/web-geo/kairos-web-geo-3.png",
    alt: "Diseño adaptable para imagen profesional de negocios",
    label: "Adaptable a tu marca",
    tag: "Responsive",
  },
  {
    src: "/servicios/web-geo/kairos-web-geo-4.png",
    alt: "Propuesta de valor digital para negocios sin página web",
    label: "De invisible a irresistible",
    tag: "GEO",
  },
];

const processSteps = [
  { step: "01", title: "Diagnóstico", desc: "Revisamos tu negocio, competencia y objetivos digitales." },
  { step: "02", title: "Diseño", desc: "Creamos el look & feel adaptado a tu marca y audiencia." },
  { step: "03", title: "Desarrollo", desc: "Construimos la web rápida, segura y lista para SEO." },
  { step: "04", title: "Revisión", desc: "Tienes acceso, revisas el diseño y apruebas antes de publicar." },
  { step: "05", title: "Lanzamiento", desc: "Publicamos, conectamos analytics y te acompañamos 30 días." },
];

const webPlans = [
  {
    id: "basica",
    name: "Web Básica",
    price: "$300 USD",
    badge: undefined as string | undefined,
    description: "Para negocios que necesitan presencia profesional rápida.",
    cta: "Quiero mi Web Básica",
    details: [
      "Landing page de una sola página",
      "Diseño responsive (mobile-first)",
      "Formulario de contacto + botón WhatsApp",
      "SEO básico on-page",
      "Analytics con GA4",
      "Hosting primer año incluido",
    ],
  },
  {
    id: "profesional",
    name: "Web Profesional",
    price: "$600 USD",
    badge: "Más elegida por negocios activos",
    description: "Para empresas que quieren captar clientes online y aparecer en IA.",
    cta: "Quiero mi Web Profesional",
    details: [
      "Hasta 5 páginas + blog",
      "GEO: schema markup + llms.txt",
      "SEO avanzado on-page",
      "GA4 + Meta Pixel integrado",
      "Core Web Vitals optimizado",
      "Soporte técnico 60 días",
    ],
  },
  {
    id: "automatizacion",
    name: "Web + Automatización",
    price: "$900 USD",
    badge: undefined,
    description: "Página web + Kairos para captar y confirmar leads por WhatsApp.",
    cta: "Quiero Web + Automatización",
    details: [
      "Todo de Web Profesional",
      "Integración con Kairos Automatizaciones",
      "WhatsApp automático para leads del sitio",
      "Formularios conectados a flujos de atención",
      "Reportes de captación mensual",
      "Acompañamiento prioritario",
    ],
  },
];

const navLinks = [
  { href: "#servicio", label: "Qué incluye" },
  { href: "#proceso", label: "Proceso" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#planes", label: "Planes" },
  { href: "#faq", label: "FAQ" },
];

export default function ServicioWebGeoPage() {
  return (
    <BeamsBackground intensity="medium">
      <a href="#inicio" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <main className="relative" id="inicio">
        {/* ─── HEADER ─── */}
        <header className="sticky top-0 z-30 border-b border-kairos-dark/80 bg-black/40 backdrop-blur-xl">
          <div className="kairos-container relative flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-3" aria-label="Kairos Inicio">
              <Image src="/logo-kairos.png" alt="Logo Kairos" width={36} height={36} priority />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-kairos-green">Páginas Web</p>
                <p className="text-sm font-medium tracking-[0.06em] text-kairos-white">KAIROS</p>
              </div>
            </a>

            <nav className="hidden gap-6 text-sm text-kairos-gray-light md:flex" aria-label="Navegación">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-kairos-green">
                  {link.label}
                </a>
              ))}
            </nav>

            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <HoverBorderGradient className="px-4 py-2 text-xs md:text-sm">
                Hablar por WhatsApp
              </HoverBorderGradient>
            </a>
          </div>
        </header>

        {/* ─── HERO ─── */}
        <section className="kairos-section pt-16 md:pt-24">
          <div className="kairos-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Servicio web y GEO</p>
              <h1 className="max-w-2xl text-4xl font-light leading-tight text-kairos-white md:text-6xl">
                Tu negocio necesita una web que venda, no solo que exista
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-kairos-gray-mid md:text-lg">
                Diseñamos, desarrollamos y optimizamos tu presencia digital para que captes más clientes,
                generes confianza y aparezcas en Google y en IA.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-kairos-green/30 bg-kairos-green/10 px-3 py-1.5 text-kairos-green">
                  Desde $300 USD
                </span>
                <span className="rounded-full border border-kairos-dark px-3 py-1.5 text-kairos-gray-mid">
                  Entrega en 7–14 días
                </span>
                <span className="rounded-full border border-kairos-dark px-3 py-1.5 text-kairos-gray-mid">
                  Incluye GEO
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <HoverBorderGradient className="px-5 py-3">Quiero mi página web</HoverBorderGradient>
                </a>
                <a
                  href="#portafolio"
                  className="inline-flex items-center gap-2 rounded-full border border-kairos-green/25 px-5 py-3 text-sm text-kairos-gray-light transition-colors hover:border-kairos-green hover:text-kairos-green"
                >
                  Ver ejemplos
                </a>
              </div>
            </div>

            <article className="kairos-hover-card rounded-2xl border border-kairos-dark bg-kairos-panel/85 p-6 shadow-glow">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-kairos-green">Lo que Kairos entrega</p>
              <div className="mt-5 space-y-4">
                {[
                  { Icon: Globe, text: "Página web rápida, segura y profesional." },
                  { Icon: Search, text: "SEO + GEO: visible en Google y en IA." },
                  { Icon: Zap, text: "Formularios y WhatsApp para captar leads." },
                  { Icon: BarChart3, text: "Analytics para medir resultados desde el día 1." },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 min-w-8 place-content-center rounded-xl border border-kairos-green/40 bg-kairos-green/10">
                      <Icon className="h-4 w-4 text-kairos-green" />
                    </span>
                    <p className="text-sm leading-relaxed text-kairos-gray-light">{text}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* ─── TRUST BAR ─── */}
        <Logos3 heading="Stack que usamos para construir tu web" />

        {/* ─── PROBLEMS ─── */}
        <section className="kairos-section">
          <div className="kairos-container">
            <div className="mb-12 space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">El problema</p>
              <h2 className="max-w-2xl text-3xl font-light text-kairos-white md:text-5xl">
                Sin una web que funcione, tu negocio es invisible
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "No apareces en Google ni en IA",
                  desc: "Más del 30% de búsquedas ya pasan por ChatGPT, Perplexity o Google AI Overviews. Si no estás optimizado, no existes.",
                },
                {
                  num: "02",
                  title: "Tu web no convierte visitantes",
                  desc: "Una web lenta, sin CTA claro o sin credibilidad convierte menos del 1% de los visitantes. Eso es dinero dejado sobre la mesa.",
                },
                {
                  num: "03",
                  title: "Sin presencia, pierdes frente a la competencia",
                  desc: "El 81% de los compradores investigan online antes de contactar. Si tu competencia tiene web y tú no, ya perdiste el lead.",
                },
              ].map((item, i) => (
                <TimelineContent key={item.num} animationNum={i}>
                  <div className="border-t-2 border-kairos-green/40 pt-6">
                    <p className="mb-4 font-mono text-4xl font-light text-kairos-green/30">{item.num}</p>
                    <h3 className="mb-2 text-xl font-medium text-kairos-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-kairos-gray-mid">{item.desc}</p>
                  </div>
                </TimelineContent>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT'S INCLUDED ─── */}
        <section id="servicio" className="kairos-section">
          <div className="kairos-container space-y-16">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Qué incluye</p>
              <h2 className="max-w-2xl text-3xl font-light text-kairos-white md:text-5xl">
                Diseño web + GEO: dos servicios, un solo resultado
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-5">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-kairos-green">
                  Diseño & Desarrollo
                </p>
                <h3 className="text-2xl font-light text-kairos-white md:text-3xl">
                  Una web profesional construida para vender
                </h3>
                <p className="text-kairos-gray-mid">
                  Diseñamos desde cero con foco en conversión: que el visitante entienda qué haces, confíe en ti
                  y te contacte. Responsive, rápida y segura.
                </p>
                <ul className="space-y-2">
                  {[
                    "Diseño a medida (no plantillas genéricas)",
                    "Mobile-first y velocidad optimizada",
                    "SEO técnico y on-page",
                    "Integración WhatsApp, GA4 y Meta Pixel",
                    "Formularios y CTAs de conversión",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-kairos-gray-light">
                      <CheckCheck className="h-4 w-4 flex-none text-kairos-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="kairos-hover-card overflow-hidden rounded-2xl border border-kairos-dark bg-kairos-bg-deep">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/servicios/web-geo/kairos-web-geo-1.png"
                    alt="Ejemplo de diseño web profesional Kairos"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="order-2 kairos-hover-card overflow-hidden rounded-2xl border border-kairos-dark bg-kairos-bg-deep lg:order-1">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/servicios/web-geo/kairos-web-geo-3.png"
                    alt="Optimización GEO para aparecer en IA y Google"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="order-1 space-y-5 lg:order-2">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-kairos-green">
                  GEO — Generative Engine Optimization
                </p>
                <h3 className="text-2xl font-light text-kairos-white md:text-3xl">
                  Visible en Google, visible en IA
                </h3>
                <p className="text-kairos-gray-mid">
                  GEO es la nueva frontera del SEO: optimizar tu contenido para que ChatGPT, Perplexity y
                  Google AI Overviews te citen como fuente relevante. Tu competencia aún no lo está haciendo.
                </p>
                <ul className="space-y-2">
                  {[
                    "Schema markup estructurado (FAQPage, Service, LocalBusiness)",
                    "llms.txt para crawlers de IA",
                    "Contenido optimizado para ser citado",
                    "Core Web Vitals: LCP, CLS e INP",
                    "Open Graph y Twitter Card para redes",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-kairos-gray-light">
                      <CheckCheck className="h-4 w-4 flex-none text-kairos-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section id="proceso" className="kairos-section">
          <div className="kairos-container">
            <div className="mb-12 space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Proceso</p>
              <h2 className="max-w-2xl text-3xl font-light text-kairos-white md:text-5xl">
                De idea a web en vivo en 5 pasos
              </h2>
              <p className="max-w-xl text-kairos-gray-mid">En 7 a 14 días hábiles, sin vueltas interminables.</p>
            </div>
            <div className="grid gap-px bg-kairos-dark md:grid-cols-5">
              {processSteps.map((s, i) => (
                <TimelineContent key={s.step} animationNum={i}>
                  <div className="flex flex-col gap-4 bg-kairos-bg-deep p-6">
                    <p className="font-mono text-3xl font-light text-kairos-green/40">{s.step}</p>
                    <h3 className="text-base font-medium text-kairos-white">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-kairos-gray-mid">{s.desc}</p>
                  </div>
                </TimelineContent>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PORTFOLIO ─── */}
        <section id="portafolio" className="kairos-section">
          <div className="kairos-container space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Portafolio</p>
              <h2 className="max-w-2xl text-3xl font-light text-kairos-white md:text-5xl">
                Ejemplos de lo que construimos
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {creatives.map((creative, index) => (
                <article
                  key={creative.src}
                  className="kairos-hover-card group overflow-hidden rounded-2xl border border-kairos-dark bg-kairos-panel/80"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-kairos-bg-deep">
                    <Image
                      src={creative.src}
                      alt={creative.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      priority={index < 2}
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <p className="text-sm font-medium text-kairos-white">{creative.label}</p>
                    <span className="rounded-full border border-kairos-green/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-kairos-green">
                      {creative.tag}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="planes" className="kairos-section">
          <div className="kairos-container">
            <div className="mb-10 space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Planes</p>
              <h2 className="max-w-2xl text-3xl font-light text-kairos-white md:text-5xl">
                Elige el plan ideal para tu negocio
              </h2>
              <p className="max-w-xl text-kairos-gray-mid">Precios en pago único. Sin suscripciones, sin sorpresas.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {webPlans.map((plan) =>
                plan.badge ? (
                  <HoverBorderGradient
                    key={plan.id}
                    as="div"
                    shape="card"
                    duration={1.25}
                    containerClassName="w-full"
                    className="w-full rounded-[inherit] bg-transparent p-0"
                  >
                    <Card className="h-full border-kairos-dark bg-kairos-panel/90">
                      <CardHeader>
                        <h3 className="text-2xl font-semibold text-kairos-white">{plan.name}</h3>
                        <span className="mt-2 inline-flex w-fit rounded-full border border-kairos-green/50 bg-kairos-green/20 px-4 py-1.5 text-xs font-semibold text-kairos-green">
                          {plan.badge}
                        </span>
                        <p className="mt-3 text-sm text-kairos-gray-mid">{plan.description}</p>
                        <p className="mt-2 text-3xl font-semibold text-kairos-white">{plan.price}</p>
                        <p className="text-xs text-kairos-gray-mid">pago único</p>
                      </CardHeader>
                      <CardContent>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-6 block w-full cursor-pointer rounded-xl border border-kairos-green bg-kairos-green p-4 text-center text-sm font-medium text-kairos-bg-deep transition-colors hover:bg-kairos-green-dark hover:text-kairos-white"
                        >
                          {plan.cta}
                        </a>
                        <ul className="space-y-2 border-t border-kairos-dark pt-4">
                          {plan.details.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <span className="mt-0.5 grid h-5 w-5 min-w-5 place-content-center rounded-full border border-kairos-green/55 bg-kairos-green/10">
                                <CheckCheck className="h-3 w-3 text-kairos-green" />
                              </span>
                              <span className="text-sm text-kairos-gray-light">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </HoverBorderGradient>
                ) : (
                  <Card key={plan.id} className="h-full border-kairos-dark bg-kairos-panel/90">
                    <CardHeader>
                      <h3 className="text-2xl font-semibold text-kairos-white">{plan.name}</h3>
                      <div className="mt-2 h-[34px]" />
                      <p className="mt-3 text-sm text-kairos-gray-mid">{plan.description}</p>
                      <p className="mt-2 text-3xl font-semibold text-kairos-white">{plan.price}</p>
                      <p className="text-xs text-kairos-gray-mid">pago único</p>
                    </CardHeader>
                    <CardContent>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-6 block w-full cursor-pointer rounded-xl border border-kairos-green/35 bg-black/35 p-4 text-center text-sm font-medium text-kairos-white transition-colors hover:border-kairos-green hover:text-kairos-green"
                      >
                        {plan.cta}
                      </a>
                      <ul className="space-y-2 border-t border-kairos-dark pt-4">
                        {plan.details.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="mt-0.5 grid h-5 w-5 min-w-5 place-content-center rounded-full border border-kairos-green/55 bg-kairos-green/10">
                              <CheckCheck className="h-3 w-3 text-kairos-green" />
                            </span>
                            <span className="text-sm text-kairos-gray-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <FaqsSection items={webFaqItems} />

        {/* ─── FINAL CTA ─── */}
        <section className="kairos-section pb-24">
          <div className="kairos-container kairos-hover-card rounded-3xl border border-kairos-green/35 bg-kairos-panel/90 p-10 text-center">
            <h2 className="text-3xl font-light text-kairos-white md:text-5xl">
              Tu web podría estar en vivo en 7 días
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-kairos-gray-mid">
              Escríbenos hoy por WhatsApp y te mostramos cómo podemos construir tu presencia digital con
              diseño profesional y GEO desde $300 USD.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <HoverBorderGradient className="px-6 py-3 text-base">Quiero mi página web</HoverBorderGradient>
              </a>
              <a
                href="tel:+573151069572"
                className="rounded-full border border-kairos-green/30 px-6 py-3 text-sm text-kairos-gray-light transition-colors hover:border-kairos-green hover:text-kairos-green"
              >
                +57 315 106 9572
              </a>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-kairos-dark/90 py-10 text-xs text-kairos-gray-mid">
          <div className="kairos-container">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2 text-center md:text-left">
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-kairos-green">
                  Kairos Automatizaciones
                </p>
                <p className="text-kairos-gray-mid">Páginas web profesionales y GEO para negocios en Colombia.</p>
                <p className="text-kairos-gray-mid">
                  <a href="tel:+573151069572" className="transition-colors hover:text-kairos-green">
                    +57 315 106 9572
                  </a>
                </p>
              </div>
              <nav aria-label="Pie de página" className="flex flex-col items-center gap-2 md:items-end">
                <a href="/" className="transition-colors hover:text-kairos-green">
                  Inicio
                </a>
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="transition-colors hover:text-kairos-green">
                    {link.label}
                  </a>
                ))}
                <a href="/servicios/web-geo" className="transition-colors hover:text-kairos-green">
                  Servicio web y GEO
                </a>
              </nav>
            </div>
            <p className="mt-8 border-t border-kairos-dark/60 pt-6 text-center text-kairos-gray-mid">
              © {new Date().getFullYear()} Kairos Automatizaciones. Todos los derechos reservados. Colombia.
            </p>
          </div>
        </footer>
      </main>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex cursor-pointer items-center gap-2 rounded-full border border-kairos-green/40 bg-kairos-panel px-4 py-3 text-sm text-kairos-green shadow-glow"
        aria-label="Abrir WhatsApp de Kairos"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </BeamsBackground>
  );
}
