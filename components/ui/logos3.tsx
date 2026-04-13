"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
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
  { id: "logo-1", description: "N8N", image: "/logos/n8n_logo.png", className: "h-6 md:h-7 w-auto object-contain" },
  { id: "logo-2", description: "Hostinger", image: "/logos/hostinger.png", className: "h-6 md:h-7 w-auto object-contain" },
  { id: "logo-3", description: "Supabase", image: "/logos/supabase.png", className: "h-6 md:h-7 w-auto object-contain" },
  { id: "logo-4", description: "Twilio", image: "/logos/twilio.png", className: "h-5 md:h-6 w-auto object-contain" },
  { id: "logo-5", description: "Meta", image: "/logos/meta_logo.png", className: "h-5 md:h-6 w-auto object-contain" },
  { id: "logo-6", description: "WordPress", image: "/logos/wordpress.jpg", className: "h-6 md:h-7 w-auto object-contain" },
  { id: "logo-7", description: "WooCommerce", image: "/logos/woocommerce.png", className: "h-6 md:h-7 w-auto object-contain" },
  { id: "logo-8", description: "Vercel", image: "/logos/vercel.png", className: "h-5 md:h-6 w-auto object-contain" },
  { id: "logo-9", description: "GitHub", image: "/logos/github.jpg", className: "h-6 md:h-7 w-auto object-contain" },
  { id: "logo-10", description: "OpenAI", image: "/logos/openAI.jpg", className: "h-5 md:h-6 w-auto object-contain" },
  { id: "logo-11", description: "Claude", image: "/logos/claude.png", className: "h-6 md:h-7 w-auto object-contain" },
  { id: "logo-12", description: "WhatsApp", image: "/logos/whatsapp.png", className: "h-6 md:h-7 w-auto object-contain" },
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
          <Carousel opts={{ loop: true, align: "start" }} plugins={[AutoScroll({ playOnInit: true, speed: 0.7 })]}>
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="kairos-hover-card mx-2 flex min-h-16 min-w-[110px] shrink-0 items-center justify-center rounded-xl border border-kairos-dark bg-kairos-panel/80 px-3 py-3 sm:mx-3 sm:min-h-20 sm:min-w-[130px] sm:px-4">
                    <Image
                      src={logo.image}
                      alt={logo.description}
                      width={160}
                      height={44}
                      className={cn("max-w-full opacity-95", logo.className)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-kairos-bg-deep to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-kairos-bg-deep to-transparent md:w-16" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
