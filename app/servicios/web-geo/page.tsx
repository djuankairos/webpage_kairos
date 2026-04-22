import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const whatsappNumber = "573151069572";
const whatsappMessage =
  "Hola Kairos, quiero conocer el servicio web y GEO para mejorar la captación digital de mi clínica.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export default function ServicioWebGeoPage() {
  return (
    <main className="min-h-screen bg-kairos-bg-deep py-16">
      <section className="kairos-container space-y-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Servicio complementario</p>
        <h1 className="max-w-3xl text-4xl font-light text-kairos-white md:text-6xl">
          Web y GEO para clínicas que quieren crecer su captación digital
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-kairos-gray-mid md:text-lg">
          Este servicio es complementario a la automatización operativa de Kairos. Te ayudamos a mejorar tu
          presencia digital y atraer pacientes con una estrategia orientada a conversión.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Diagnóstico de conversión de sitio web y formularios.",
            "Optimización de presencia local para búsquedas clave.",
            "Estrategia GEO para captar demanda de mercados objetivo.",
            "Integración con WhatsApp y flujos de seguimiento comercial.",
          ].map((item) => (
            <article
              key={item}
              className="rounded-xl border border-kairos-dark bg-kairos-panel/85 p-4 text-kairos-gray-light"
            >
              {item}
            </article>
          ))}
        </div>

        <div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <HoverBorderGradient className="px-6 py-3 text-sm md:text-base">
              Solicitar diagnóstico web y GEO
            </HoverBorderGradient>
          </a>
        </div>
      </section>
    </main>
  );
}
