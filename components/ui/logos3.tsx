"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface LogoItem {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: LogoItem[];
  className?: string;
}

const defaultLogos: LogoItem[] = [
  { id: "logo-1", description: "Clinica Nova", image: "/logos/clinica-nova.svg", className: "h-8 w-auto" },
  { id: "logo-2", description: "Meditech Plus", image: "/logos/meditech-plus.svg", className: "h-8 w-auto" },
  { id: "logo-3", description: "OptiCare", image: "/logos/opticare.svg", className: "h-8 w-auto" },
  { id: "logo-4", description: "Vital Group", image: "/logos/vital-group.svg", className: "h-8 w-auto" },
  { id: "logo-5", description: "Centro BioSalud", image: "/logos/biosalud.svg", className: "h-8 w-auto" },
  { id: "logo-6", description: "Atlas Dental", image: "/logos/atlas-dental.svg", className: "h-8 w-auto" },
  { id: "logo-7", description: "Salud Prime", image: "/logos/salud-prime.svg", className: "h-8 w-auto" },
  { id: "logo-8", description: "Nexo Care", image: "/logos/nexo-care.svg", className: "h-8 w-auto" },
];

const Logos3 = ({ heading = "Empresas con las que trabajamos", logos = defaultLogos, className }: Logos3Props) => {
  return (
    <section className={cn("kairos-section", className)}>
      <div className="kairos-container flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Confianza</p>
        <h2 className="my-5 text-3xl font-light text-kairos-white lg:text-5xl">{heading}</h2>
      </div>
      <div className="pt-8 md:pt-12 lg:pt-16">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true, speed: 0.7 })]}>
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="kairos-hover-card mx-4 flex min-h-20 min-w-28 shrink-0 items-center justify-center rounded-xl border border-kairos-dark bg-kairos-panel/80 px-4 py-3">
                    <img src={logo.image} alt={logo.description} className={cn("max-w-full opacity-90", logo.className)} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-kairos-bg-deep to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-kairos-bg-deep to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
