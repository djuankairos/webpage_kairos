import Image from "next/image";
import {
  Activity,
  Bot,
  CalendarCheck2,
  ChartNoAxesCombined,
  Clock3,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Logos3 } from "@/components/ui/logos3";
import { TestimonialsColumn, type TestimonialItem } from "@/components/ui/testimonials-columns-1";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kairosautomatizaciones.com";
const whatsappNumber = "573151069572";
const whatsappMessage =
  "Hola Kairos, quiero analizar mi negocio gratis para automatizar WhatsApp, agenda y seguimiento.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const results = [
  { value: "+30%", label: "Mas citas agendadas" },
  { value: "-40%", label: "Menos no-shows" },
  { value: "24/7", label: "Respuesta automatica en WhatsApp" },
];

const problems = [
  "No respondes a tiempo en WhatsApp.",
  "Pierdes citas por falta de seguimiento.",
  "Tu web recibe trafico pero no convierte.",
  "Tu equipo se satura en tareas repetitivas.",
];

const solutions = [
  {
    icon: Bot,
    title: "Atencion Automatica",
    description: "Responde clientes en segundos y clasifica intenciones sin friccion.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda Inteligente",
    description: "Agenda, confirma y recuerda citas con logica de disponibilidad real.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Seguimiento Medible",
    description: "Convierte interesados en clientes con secuencias y reportes accionables.",
  },
];

const testimonialItems: TestimonialItem[] = [
  {
    text: "En 5 semanas pasamos de responder tarde a atender en menos de un minuto por WhatsApp. Subieron las citas efectivas sin sumar personal.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    name: "Laura Cardenas",
    role: "Gerente Operativa - Clinica estetica",
  },
  {
    text: "Kairos nos dio control real de agenda. Confirmaciones y recordatorios automaticos redujeron ausencias y mejoraron caja semanal.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    name: "Sofia Martinez",
    role: "Directora Administrativa - Centro medico",
  },
  {
    text: "La implementacion fue rapida y con impacto medible desde el primer mes. Hoy tenemos trazabilidad de cada lead y de cada cita.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    name: "Andres Mejia",
    role: "CEO - Red de consultorios",
  },
  {
    text: "Antes perdiamos oportunidades por seguimiento manual. Con Kairos activamos mensajes en momentos clave y mejoro la conversion.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    name: "Natalia Rios",
    role: "Lider Comercial - Salud integral",
  },
  {
    text: "La agenda se estabilizo y el equipo dejo de apagar incendios. Ahora sabemos donde se cae el embudo y que accion tomar.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    name: "Julian Fajardo",
    role: "COO - Grupo odontologico",
  },
  {
    text: "Nos gustaron dos cosas: velocidad y claridad. En pocas semanas vimos mejoras en ocupacion y en tiempo de respuesta.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    name: "Paula Vera",
    role: "Coordinadora de operaciones - Clinica especializada",
  },
  {
    text: "Con automatizacion de recordatorios y reprogramacion, recuperamos citas que antes se perdian. Es ingreso directo.",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80",
    name: "Camilo Torres",
    role: "Director - Centro de bienestar",
  },
  {
    text: "La experiencia para el paciente mejoro mucho: respuestas claras, confirmaciones a tiempo y menos friccion para agendar.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    name: "Valeria Leon",
    role: "Gestora de experiencia - Clinica privada",
  },
  {
    text: "Kairos nos ayudo a dejar de operar a ciegas. Hoy cada automatizacion tiene KPI y podemos medir retorno con precision.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    name: "Miguel Ospina",
    role: "Gerente general - Red de salud",
  },
];

const firstColumn = testimonialItems.slice(0, 3);
const secondColumn = testimonialItems.slice(3, 6);
const thirdColumn = testimonialItems.slice(6, 9);

const geoCountries = ["CO", "MX", "CL", "PE"];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kairos Automatizaciones",
  url: siteUrl,
  telephone: "+57 3151069572",
  sameAs: [siteUrl],
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
  serviceType: "Automatizacion operativa y comercial B2B",
  provider: {
    "@type": "Organization",
    name: "Kairos Automatizaciones",
    url: siteUrl,
  },
  areaServed: geoCountries,
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: siteUrl,
    servicePhone: "+57 3151069572",
  },
  offers: {
    "@type": "Offer",
    name: "Diagnostico operativo inicial",
    description: "Evaluacion por WhatsApp para identificar perdidas y oportunidades.",
    price: "0",
    priceCurrency: "COP",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kairos Automatizaciones",
  url: siteUrl,
  inLanguage: "es-CO",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <BeamsBackground intensity="strong">
      <main className="relative">
        <header className="sticky top-0 z-30 border-b border-kairos-dark/80 bg-black/40 backdrop-blur-xl">
          <div className="kairos-container flex items-center justify-between py-4">
            <a href="#inicio" className="flex items-center gap-3" aria-label="Kairos Inicio">
              <Image src="/logo-kairos.png" alt="Logo Kairos" width={36} height={36} />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-kairos-green">
                  Automatizaciones
                </p>
                <p className="text-sm font-medium tracking-[0.06em] text-kairos-white">KAIROS</p>
              </div>
            </a>
            <nav className="hidden gap-6 text-sm text-kairos-gray-light md:flex">
              <a href="#solucion" className="hover:text-kairos-green">
                Solucion
              </a>
              <a href="#resultados" className="hover:text-kairos-green">
                Resultados
              </a>
              <a href="#testimonios" className="hover:text-kairos-green">
                Testimonios
              </a>
              <a href="#geo" className="hover:text-kairos-green">
                Cobertura
              </a>
            </nav>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <HoverBorderGradient className="px-4 py-2 text-xs md:text-sm">
                Hablar por WhatsApp
              </HoverBorderGradient>
            </a>
          </div>
        </header>

        <section id="inicio" className="kairos-section pt-16 md:pt-24">
          <div className="kairos-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">
                Automatizacion inteligente
              </p>
              <h1 className="max-w-2xl text-4xl font-light leading-tight text-kairos-white md:text-6xl">
                Convierte tu operacion en una maquina de clientes automatica.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-kairos-gray-mid md:text-lg">
                Kairos automatiza WhatsApp, agenda y seguimiento para que vendas mas sin inflar
                nomina ni perder control operativo.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <HoverBorderGradient className="px-5 py-3">
                    Analizar mi negocio gratis
                  </HoverBorderGradient>
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-kairos-green/25 px-5 py-3 text-sm text-kairos-gray-light hover:border-kairos-green hover:text-kairos-green"
                >
                  <PhoneCall className="h-4 w-4" />
                  Ver demo en WhatsApp
                </a>
              </div>
            </div>

            <article className="kairos-hover-card rounded-2xl border border-kairos-dark bg-kairos-panel/85 p-6 shadow-glow">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-kairos-green">
                Flujo operativo Kairos
              </p>
              <div className="mt-5 space-y-4">
                {[
                  { icon: MessageCircle, step: "1", text: "Cliente escribe por WhatsApp." },
                  { icon: CalendarCheck2, step: "2", text: "Kairos agenda y confirma en segundos." },
                  { icon: Clock3, step: "3", text: "Recordatorio y reprogramacion automatica." },
                  { icon: Activity, step: "4", text: "Tablero con metricas de ocupacion y cierre." },
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

        <Logos3 />

        <section className="kairos-section">
          <div className="kairos-container">
            <div className="kairos-hover-card rounded-2xl border border-kairos-red/30 bg-kairos-panel/80 p-7">
              <h2 className="text-2xl font-medium text-kairos-white md:text-3xl">
                Estas perdiendo clientes todos los dias (y no lo sabes)
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
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">
                Solucion Kairos
              </p>
              <h2 className="text-3xl font-light text-kairos-white md:text-5xl">
                Kairos trabaja por ti 24/7
              </h2>
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
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">
                Impacto medible
              </p>
              <h2 className="mt-4 text-3xl font-light text-kairos-white md:text-5xl">
                Resultados que si se sienten en caja y agenda.
              </h2>
              <p className="mt-4 max-w-xl text-base text-kairos-gray-mid">
                Medimos cada automatizacion por su efecto en ocupacion, velocidad de respuesta y
                conversion comercial.
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
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">
                Testimonios
              </p>
              <h2 className="mt-5 text-3xl font-light text-kairos-white md:text-5xl">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mt-4 text-kairos-gray-mid">
                Historias reales de equipos que mejoraron su ocupacion y su conversion con
                automatizacion operativa.
              </p>
            </div>
            <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]">
              <TestimonialsColumn testimonials={firstColumn} duration={15} />
              <TestimonialsColumn
                testimonials={secondColumn}
                className="hidden md:block"
                duration={19}
              />
              <TestimonialsColumn
                testimonials={thirdColumn}
                className="hidden lg:block"
                duration={17}
              />
            </div>
          </div>
        </section>

        <section className="kairos-section">
          <div className="kairos-container grid gap-8 rounded-2xl border border-kairos-dark bg-kairos-panel/85 p-8 lg:grid-cols-2 lg:items-center kairos-hover-card">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">
                Especializado para clinicas
              </p>
              <h2 className="text-3xl font-light text-kairos-white md:text-4xl">
                Tu WhatsApp se vuelve una recepcionista 24/7
              </h2>
              <p className="text-kairos-gray-mid">
                Perfecto para clinicas y consultorios que necesitan reducir no-show, mantener la
                agenda llena y sostener seguimiento sin saturar al equipo.
              </p>
              <ul className="space-y-3 text-sm text-kairos-gray-light">
                {[
                  "Paciente escribe y recibe respuesta inmediata.",
                  "Agenda y confirmacion automatica segun disponibilidad.",
                  "Recordatorios inteligentes con opciones de reprogramacion.",
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
                alt="Equipo de salud revisando atencion digital"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="geo" className="kairos-section">
          <div className="kairos-container kairos-hover-card rounded-2xl border border-kairos-dark bg-black/20 p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">
              GEO SEO
            </p>
            <h2 className="mt-3 text-3xl font-light text-kairos-white md:text-4xl">
              Atrae mas clientes en Colombia y acelera tu expansion en LATAM
            </h2>
            <p className="mt-4 max-w-3xl text-kairos-gray-mid">
              Convertimos trafico regional en oportunidades comerciales reales. Kairos te ayuda a
              posicionarte en mercados clave de LATAM para captar mas leads calificados, cerrar mas
              ventas y crecer con una operacion automatizada.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {geoCountries.map((countryCode) => (
                <span
                  key={countryCode}
                  className="kairos-hover-card rounded-full border border-kairos-green/30 px-4 py-2 font-mono text-kairos-green"
                >
                  {countryCode}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="kairos-section pb-24">
          <div className="kairos-container kairos-hover-card rounded-3xl border border-kairos-green/35 bg-kairos-panel/90 p-10 text-center">
            <h2 className="text-3xl font-light text-kairos-white md:text-5xl">
              Deja de perder clientes. Empieza a automatizar hoy.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-kairos-gray-mid">
              Recibe un diagnostico inicial por WhatsApp y descubre en minutos donde estas perdiendo
              ingresos operativos.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <HoverBorderGradient className="px-6 py-3 text-base">
                  Agendar diagnostico gratis
                </HoverBorderGradient>
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

        <footer className="border-t border-kairos-dark/90 py-8 text-center text-xs text-kairos-gray-mid">
          <p>Kairos Automatizaciones · Colombia · SEO GEO ready para LATAM</p>
        </footer>
      </main>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-kairos-green/40 bg-kairos-panel px-4 py-3 text-sm text-kairos-green shadow-glow"
        aria-label="Abrir WhatsApp de Kairos"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </BeamsBackground>
  );
}
