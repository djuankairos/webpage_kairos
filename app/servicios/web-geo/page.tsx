import Image from "next/image";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const whatsappNumber = "573151069572";
const whatsappMessage =
  "Hola Kairos, quiero conocer el servicio web y GEO para mejorar la captación digital de mi clínica.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const creatives = [
  {
    src: "/servicios/web-geo/kairos-web-geo-1.png",
    alt: "Pieza promocional Kairos de página web profesional con oferta de pago único",
  },
  {
    src: "/servicios/web-geo/kairos-web-geo-2.png",
    alt: "Pieza Kairos enfocada en credibilidad y presentación profesional online",
  },
  {
    src: "/servicios/web-geo/kairos-web-geo-3.png",
    alt: "Pieza Kairos sobre diseño adaptable e imagen profesional para negocios",
  },
  {
    src: "/servicios/web-geo/kairos-web-geo-4.png",
    alt: "Pieza Kairos para negocios sin página web con propuesta de valor digital",
  },
];

export default function ServicioWebGeoPage() {
  return (
    <main className="min-h-screen bg-kairos-bg-deep py-16">
      <section className="kairos-container space-y-8">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Servicio web y GEO</p>
          <h1 className="max-w-4xl text-4xl font-light text-kairos-white md:text-6xl">
            Lanzamos tu presencia digital con piezas de alto impacto para vender más
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-kairos-gray-mid md:text-lg">
            Estas creatividades están listas para campañas, WhatsApp y pauta. Si aún no tienes una web
            profesional o quieres mejorar conversión, Kairos diseña, implementa y optimiza tu presencia online.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {creatives.map((creative, index) => (
            <article
              key={creative.src}
              className="kairos-hover-card overflow-hidden rounded-2xl border border-kairos-dark bg-kairos-panel/80"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={creative.src}
                  alt={creative.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index < 2}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-kairos-green/30 bg-kairos-panel/85 p-6 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.14em] text-kairos-green">Siguiente paso</p>
          <h2 className="text-2xl font-medium text-kairos-white md:text-3xl">
            Solicita tu página web y activemos tu proyecto esta semana
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-kairos-gray-mid">
            Te acompañamos desde el diseño hasta la publicación, con enfoque en visibilidad, confianza y conversión.
          </p>
          <div className="mt-6 flex justify-center">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <HoverBorderGradient className="px-6 py-3 text-sm md:text-base">
                Quiero mi página web
              </HoverBorderGradient>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
