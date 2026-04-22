"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Activity, CalendarCheck2, Clock3, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { FaqsSection } from "@/components/ui/faqs-1";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Logos3 } from "@/components/ui/logos3";
import { MobileNav } from "@/components/ui/mobile-nav";
import PricingSection from "@/components/ui/pricing";
import { trackEvent } from "@/lib/analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kairosautomatizaciones.com";
const whatsappNumber = "573151069572";
const whatsappMessage = "Hola Kairos, quiero una demo de 15 minutos para mejorar la ocupación de mi agenda.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

type CtaVariant = "A" | "B" | "C";

const ctaVariants: Record<CtaVariant, string> = {
  A: "Solicitar demo de 15 minutos",
  B: "Ver cómo Kairos llena tu agenda",
  C: "Calcular cuánto dinero pierde mi agenda",
};

const results = [
  { value: "+30%", label: "Más citas confirmadas" },
  { value: "-40%", label: "Menos ausencias" },
  { value: "24/7", label: "Respuesta automática por WhatsApp" },
];

const problems = [
  "No respondes a tiempo en WhatsApp y el paciente se enfría.",
  "Pierdes citas por falta de confirmación y seguimiento.",
  "Tienes citas vacías por cancelaciones y ausencias.",
  "Tu equipo se satura con tareas repetitivas de agenda.",
];

const solutions = [
  {
    icon: MessageCircle,
    title: "Responde pacientes al instante",
    description: "No dejes mensajes sin atender ni dejes que las oportunidades se enfríen por demora.",
  },
  {
    icon: CalendarCheck2,
    title: "Confirma y protege tu agenda",
    description: "Reduce cancelaciones con confirmación automática y recordatorios inteligentes.",
  },
  {
    icon: Activity,
    title: "Recupera ingresos perdidos",
    description: "Convierte seguimientos manuales en procesos automatizados con impacto medible.",
  },
];

const testimonials = [
  {
    sector: "Clínica Odontológica — Bogotá",
    quote: "Redujimos ausencias y el equipo dejó de perseguir pacientes por WhatsApp.",
  },
  {
    sector: "Centro de Fisioterapia — Medellín",
    quote: "Confirmamos más citas en menos tiempo y mejoramos la ocupación semanal.",
  },
  {
    sector: "Consultorio de Dermatología — Cali",
    quote: "Kairos nos ayudó a responder en segundos y reagendar sin fricción para el paciente.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Kairos reemplaza a mi recepcionista?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Kairos automatiza tareas repetitivas para que tu equipo se enfoque en la atención de mayor valor.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tarda en activarse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Normalmente entre 5 y 10 días hábiles, según la complejidad de tu flujo de agenda y canales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito cambiar de WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No necesariamente. Evaluamos tu operación actual y conectamos Kairos de forma compatible.",
      },
    },
    {
      "@type": "Question",
      name: "¿Funciona con varias especialidades?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Podemos separar flujos por especialidad, tipo de cita y profesional para mantener orden operativo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué resultados puedo esperar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dependiendo de tu punto de partida, buscamos menos ausencias, respuesta más rápida y mejor ocupación de agenda.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hay permanencia mínima?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No trabajamos con permanencias rígidas; priorizamos resultados operativos medibles.",
      },
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kairos Automatizaciones",
  url: siteUrl,
  telephone: "+57 3151069572",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+57 3151069572",
      areaServed: "CO",
      availableLanguage: ["es"],
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Automatización operativa para clínicas y consultorios",
  provider: {
    "@type": "Organization",
    name: "Kairos Automatizaciones",
    url: siteUrl,
  },
  areaServed: ["CO"],
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: siteUrl,
    servicePhone: "+57 3151069572",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kairos Automatizaciones",
  url: siteUrl,
  inLanguage: "es-CO",
};

function formatCop(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function randomVariant(): CtaVariant {
  const variants: CtaVariant[] = ["A", "B", "C"];
  return variants[Math.floor(Math.random() * variants.length)];
}

export default function HomePage() {
  const [ctaVariant, setCtaVariant] = useState<CtaVariant>("A");
  const [citasPerdidas, setCitasPerdidas] = useState(12);
  const [ticketPromedio, setTicketPromedio] = useState(200000);

  useEffect(() => {
    const key = "kairos_cta_variant";
    const stored = sessionStorage.getItem(key) as CtaVariant | null;

    if (stored && ["A", "B", "C"].includes(stored)) {
      setCtaVariant(stored);
      return;
    }

    const variant = randomVariant();
    sessionStorage.setItem(key, variant);
    setCtaVariant(variant);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.__kairosScrollTracked) {
        return;
      }

      const currentScroll = window.scrollY + window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const progress = fullHeight > 0 ? currentScroll / fullHeight : 0;

      if (progress >= 0.75) {
        window.__kairosScrollTracked = true;
        trackEvent("scroll_75");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const perdidaMensual = useMemo(() => {
    const citas = Number.isFinite(citasPerdidas) ? Math.max(0, citasPerdidas) : 0;
    const ticket = Number.isFinite(ticketPromedio) ? Math.max(0, ticketPromedio) : 0;
    return citas * ticket;
  }, [citasPerdidas, ticketPromedio]);

  const ctaLabel = ctaVariants[ctaVariant];
  const heroPrimaryHref = ctaVariant === "C" ? "#calculadora" : whatsappHref;
  const heroSecondaryHref = ctaVariant === "C" ? whatsappHref : "#solucion";

  const handleHeroPrimaryClick = () => {
    trackEvent("cta_hero_click", { variante: ctaVariant });

    if (ctaVariant !== "C") {
      trackEvent("whatsapp_click", { origen: "hero_principal", variante: ctaVariant });
      trackEvent("demo_enviada", { origen: "hero_principal", variante: ctaVariant });
    }
  };

  const handleSecondaryClick = () => {
    if (ctaVariant === "C") {
      trackEvent("whatsapp_click", { origen: "hero_secundario", variante: ctaVariant });
      trackEvent("demo_enviada", { origen: "hero_secundario", variante: ctaVariant });
    }
  };

  const handleWhatsAppClick = (origen: string) => {
    trackEvent("whatsapp_click", { origen });
  };

  return (
    <BeamsBackground intensity="strong">
      <a href="#inicio" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <main className="relative">
        <header className="sticky top-0 z-30 border-b border-kairos-dark/80 bg-black/40 backdrop-blur-xl">
          <div className="kairos-container relative flex items-center justify-between py-4">
            <a href="#inicio" className="flex items-center gap-3" aria-label="Kairos Inicio">
              <Image src="/logo-kairos.png" alt="Logo Kairos" width={36} height={36} priority />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-kairos-green">Automatizaciones</p>
                <p className="text-sm font-medium tracking-[0.06em] text-kairos-white">KAIROS</p>
              </div>
            </a>

            <nav className="hidden gap-6 text-sm text-kairos-gray-light md:flex" aria-label="Navegación principal">
              <a href="#solucion" className="transition-colors hover:text-kairos-green">
                Solución
              </a>
              <a href="#resultados" className="transition-colors hover:text-kairos-green">
                Resultados
              </a>
              <a href="#testimonios" className="transition-colors hover:text-kairos-green">
                Testimonios
              </a>
              <a href="#planes" className="transition-colors hover:text-kairos-green">
                Planes
              </a>
              <a href="#faq" className="transition-colors hover:text-kairos-green">
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <MobileNav />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleWhatsAppClick("header");
                  trackEvent("demo_enviada", { origen: "header" });
                }}
              >
                <HoverBorderGradient className="px-4 py-2 text-xs md:text-sm">
                  Hablar por WhatsApp
                </HoverBorderGradient>
              </a>
            </div>
          </div>
        </header>

        <section id="inicio" className="kairos-section pt-16 md:pt-24">
          <div className="kairos-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Especializado en salud</p>
              <h1 className="max-w-2xl text-4xl font-light leading-tight text-kairos-white md:text-6xl">
                Reduce cancelaciones y responde pacientes 24/7 por WhatsApp
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-kairos-gray-mid md:text-lg">
                Kairos ayuda a clínicas y consultorios a confirmar citas, reagendar pacientes y mejorar la
                ocupación de agenda sin contratar más personal.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={heroPrimaryHref}
                  target={ctaVariant === "C" ? undefined : "_blank"}
                  rel={ctaVariant === "C" ? undefined : "noopener noreferrer"}
                  onClick={handleHeroPrimaryClick}
                >
                  <HoverBorderGradient className="px-5 py-3">{ctaLabel}</HoverBorderGradient>
                </a>
                <a
                  href={heroSecondaryHref}
                  target={ctaVariant === "C" ? "_blank" : undefined}
                  rel={ctaVariant === "C" ? "noopener noreferrer" : undefined}
                  onClick={handleSecondaryClick}
                  className="inline-flex items-center gap-2 rounded-full border border-kairos-green/25 px-5 py-3 text-sm text-kairos-gray-light hover:border-kairos-green hover:text-kairos-green"
                >
                  <PhoneCall className="h-4 w-4" />
                  {ctaVariant === "C" ? "Solicitar demo de 15 minutos" : "Ver cómo funciona"}
                </a>
              </div>
            </div>

            <article className="kairos-hover-card rounded-2xl border border-kairos-dark bg-kairos-panel/85 p-6 shadow-glow">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-kairos-green">Flujo operativo Kairos</p>
              <div className="mt-5 space-y-4">
                {[
                  { icon: MessageCircle, step: "1", text: "Paciente escribe y recibe respuesta inmediata." },
                  { icon: CalendarCheck2, step: "2", text: "Kairos confirma la cita automáticamente." },
                  { icon: Clock3, step: "3", text: "Envía recordatorios y facilita reagendación." },
                  { icon: Activity, step: "4", text: "Tu clínica reduce ausencias y mejora ocupación." },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="kairos-hover-card flex items-center gap-4 rounded-xl border border-kairos-dark/80 bg-black/20 p-3"
                  >
                    <item.icon className="h-5 w-5 text-kairos-green" />
                    <p className="text-sm text-kairos-gray-light">
                      <span className="mr-2 font-mono text-kairos-green">{item.step}.</span>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <Logos3 heading="Tecnología y plataformas que impulsan nuestra operación" />

        <section className="kairos-section">
          <div className="kairos-container">
            <div className="kairos-hover-card rounded-2xl border border-kairos-red/30 bg-kairos-panel/80 p-7">
              <h2 className="text-2xl font-medium text-kairos-white md:text-3xl">
                Estás perdiendo citas todos los días (y no siempre lo notas)
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {problems.map((problem) => (
                  <p
                    key={problem}
                    className="kairos-hover-card rounded-xl border border-kairos-dark/80 bg-black/25 px-4 py-4 text-sm text-kairos-gray-light"
                  >
                    <span className="mr-2 text-kairos-red">x</span>
                    {problem}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="solucion" className="kairos-section">
          <div className="kairos-container">
            <div className="mb-8 max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Solución Kairos</p>
              <h2 className="text-3xl font-light text-kairos-white md:text-5xl">Kairos trabaja por ti 24/7</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {solutions.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="kairos-hover-card rounded-2xl border border-kairos-dark bg-kairos-panel/85 p-6"
                >
                  <Icon className="h-8 w-8 text-kairos-green" />
                  <h3 className="mt-5 text-xl text-kairos-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-kairos-gray-mid">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="resultados" className="kairos-section">
          <div className="kairos-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Impacto medible</p>
              <h2 className="mt-4 text-3xl font-light text-kairos-white md:text-5xl">
                Resultados que se sienten en caja y agenda.
              </h2>
              <p className="mt-4 max-w-xl text-base text-kairos-gray-mid">
                Resultados observados en pilotos y automatizaciones activas con clínicas y consultorios.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {results.map((item) => (
                <article
                  key={item.label}
                  className="kairos-hover-card rounded-2xl border border-kairos-green/20 bg-black/25 p-5 text-center"
                >
                  <p className="text-3xl font-semibold text-kairos-green-bright">{item.value}</p>
                  <p className="mt-2 text-sm text-kairos-gray-light">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonios" className="kairos-section">
          <div className="kairos-container">
            <div className="mx-auto max-w-[640px] text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Testimonios</p>
              <h2 className="mt-5 text-3xl font-light text-kairos-white md:text-5xl">Historias reales en salud</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.sector}
                  className="kairos-hover-card rounded-2xl border border-kairos-dark bg-kairos-panel/85 p-6"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-kairos-green">{testimonial.sector}</p>
                  <p className="mt-4 text-sm leading-relaxed text-kairos-gray-light">&quot;{testimonial.quote}&quot;</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="calculadora" className="kairos-section">
          <div className="kairos-container rounded-2xl border border-kairos-green/30 bg-kairos-panel/90 p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Calculadora</p>
            <h2 className="mt-3 text-3xl font-light text-kairos-white md:text-4xl">
              ¿Cuánto te cuesta una cita vacía al mes?
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-kairos-gray-light">
                Citas perdidas al mes
                <input
                  type="number"
                  min={0}
                  value={citasPerdidas}
                  onChange={(event) => setCitasPerdidas(Number(event.target.value) || 0)}
                  className="w-full rounded-xl border border-kairos-dark bg-black/30 px-4 py-3 text-kairos-white focus:border-kairos-green focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-kairos-gray-light">
                Ticket promedio (COP)
                <input
                  type="number"
                  min={0}
                  step={10000}
                  value={ticketPromedio}
                  onChange={(event) => setTicketPromedio(Number(event.target.value) || 0)}
                  className="w-full rounded-xl border border-kairos-dark bg-black/30 px-4 py-3 text-kairos-white focus:border-kairos-green focus:outline-none"
                />
              </label>
            </div>
            <p className="mt-6 text-lg text-kairos-white md:text-2xl">
              Estás perdiendo <span className="font-semibold text-kairos-green">{formatCop(perdidaMensual)}</span> al mes.
            </p>
            <div className="mt-6">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleWhatsAppClick("calculadora");
                  trackEvent("demo_enviada", { origen: "calculadora" });
                }}
              >
                <HoverBorderGradient className="px-6 py-3 text-sm md:text-base">
                  Solicitar demo de 15 minutos
                </HoverBorderGradient>
              </a>
            </div>
          </div>
        </section>

        <PricingSection
          whatsappHref={whatsappHref}
          onPlanClick={(planName) => {
            if (planName === "growth") {
              trackEvent("pricing_growth_click", { plan: "growth" });
            }
            handleWhatsAppClick(`pricing_${planName}`);
            trackEvent("demo_enviada", { origen: `pricing_${planName}` });
          }}
        />

        <section className="kairos-section">
          <div className="kairos-container grid gap-8 rounded-2xl border border-kairos-dark bg-kairos-panel/85 p-8 lg:grid-cols-2 lg:items-center kairos-hover-card">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Especializado para clínicas</p>
              <h2 className="text-3xl font-light text-kairos-white md:text-4xl">
                Tu WhatsApp se vuelve una recepcionista 24/7
              </h2>
              <p className="text-kairos-gray-mid">
                Perfecto para clínicas y consultorios que necesitan reducir ausencias, mantener la agenda llena y
                sostener seguimiento sin saturar al equipo.
              </p>
              <ul className="space-y-3 text-sm text-kairos-gray-light">
                {[
                  "Paciente escribe y recibe respuesta inmediata.",
                  "Agenda y confirmación automática según disponibilidad.",
                  "Recordatorios inteligentes con opciones de reagendación.",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-kairos-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="kairos-hover-card overflow-hidden rounded-2xl border border-kairos-dark">
              <Image
                src="https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80"
                alt="Equipo de salud revisando atención digital"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <FaqsSection
          onOpenFaq={(faqId) => {
            trackEvent("faq_open", { faq_id: faqId });
          }}
        />

        <section className="kairos-section pb-24">
          <div className="kairos-container kairos-hover-card rounded-3xl border border-kairos-green/35 bg-kairos-panel/90 p-10 text-center">
            <h2 className="text-3xl font-light text-kairos-white md:text-5xl">
              Deja de perder citas por demoras, cancelaciones y seguimiento manual
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-kairos-gray-mid">
              Descubre en una demo de 15 minutos cómo Kairos puede ayudarte a responder pacientes,
              confirmar citas y proteger tu agenda.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleWhatsAppClick("cta_final");
                  trackEvent("demo_enviada", { origen: "cta_final" });
                }}
              >
                <HoverBorderGradient className="px-6 py-3 text-base">Solicitar demo de 15 minutos</HoverBorderGradient>
              </a>
              <a
                href="tel:+573151069572"
                className="rounded-full border border-kairos-green/30 px-6 py-3 text-sm text-kairos-gray-light hover:border-kairos-green hover:text-kairos-green"
              >
                +57 315 106 9572
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-kairos-dark/90 py-10 text-xs text-kairos-gray-mid">
          <div className="kairos-container">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2 text-center md:text-left">
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-kairos-green">Kairos Automatizaciones</p>
                <p className="text-kairos-gray-mid">Automatización operativa para clínicas en Colombia.</p>
                <p className="text-kairos-gray-mid">
                  <a href="tel:+573151069572" className="transition-colors hover:text-kairos-green">
                    +57 315 106 9572
                  </a>
                </p>
              </div>

              <nav aria-label="Pie de página" className="flex flex-col items-center gap-2 md:items-end">
                <a href="#inicio" className="transition-colors hover:text-kairos-green">
                  Inicio
                </a>
                <a href="#solucion" className="transition-colors hover:text-kairos-green">
                  Solución
                </a>
                <a href="#resultados" className="transition-colors hover:text-kairos-green">
                  Resultados
                </a>
                <a href="#planes" className="transition-colors hover:text-kairos-green">
                  Planes
                </a>
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
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-kairos-green/40 bg-kairos-panel px-4 py-3 text-sm text-kairos-green shadow-glow"
        aria-label="Abrir WhatsApp de Kairos"
        onClick={() => {
          handleWhatsAppClick("floating_whatsapp");
          trackEvent("demo_enviada", { origen: "floating_whatsapp" });
        }}
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </BeamsBackground>
  );
}
