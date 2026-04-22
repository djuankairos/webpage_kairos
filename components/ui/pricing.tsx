"use client";

import { useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  whatsappHref: string;
  onPlanClick?: (planName: "start" | "growth" | "scale") => void;
}

type PlanName = "start" | "growth" | "scale";

interface Plan {
  id: PlanName;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  details: string[];
}

const plans: Plan[] = [
  {
    id: "start",
    name: "Kairos Start",
    description: "Ideal para consultorios con una agenda simple.",
    monthlyPrice: 497000,
    yearlyPrice: 4770000,
    details: [
      "Atención inicial automática por WhatsApp.",
      "Confirmación y recordatorios básicos de citas.",
      "Tablero operativo con métricas clave.",
      "Soporte para una operación de agenda simple.",
    ],
  },
  {
    id: "growth",
    name: "Kairos Growth",
    badge: "Más elegido por clínicas activas",
    description: "Para clínicas con agenda en movimiento y foco en ocupación.",
    monthlyPrice: 897000,
    yearlyPrice: 8610000,
    details: [
      "Automatizaciones avanzadas de confirmación y reagendación.",
      "Seguimientos automáticos para reducir ausencias.",
      "Métricas de ocupación y desempeño comercial.",
      "Prioridad en acompañamiento operativo.",
    ],
  },
  {
    id: "scale",
    name: "Kairos Scale",
    description: "Para varias agendas, sedes o alto volumen.",
    monthlyPrice: 1897000,
    yearlyPrice: 18210000,
    details: [
      "Flujos multiagenda y multiprofesional.",
      "Reglas operativas para clínicas con alta demanda.",
      "Visibilidad consolidada por sede y especialidad.",
      "Acompañamiento estratégico de optimización.",
    ],
  },
];

function PricingSwitch({
  onSwitch,
  className,
}: {
  onSwitch: (value: "mensual" | "anual") => void;
  className?: string;
}) {
  const [selected, setSelected] = useState<"mensual" | "anual">("mensual");

  const handleSwitch = (value: "mensual" | "anual") => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative z-10 mx-auto flex w-fit rounded-xl border border-kairos-dark bg-black/30 p-1">
        <button
          onClick={() => handleSwitch("mensual")}
          className={cn(
            "relative z-10 h-11 cursor-pointer rounded-xl px-4 py-1 text-sm font-medium transition-colors md:px-6 md:text-base",
            selected === "mensual" ? "text-kairos-white" : "text-kairos-gray-mid hover:text-kairos-white"
          )}
        >
          {selected === "mensual" && (
            <motion.span
              layoutId="switch-pricing"
              className="absolute left-0 top-0 h-11 w-full rounded-xl border border-kairos-green/50 bg-kairos-green-dark/80 shadow-lg shadow-kairos-green/25"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Pago mensual</span>
        </button>

        <button
          onClick={() => handleSwitch("anual")}
          className={cn(
            "relative z-10 h-11 cursor-pointer rounded-xl px-4 py-1 text-sm font-medium transition-colors md:px-6 md:text-base",
            selected === "anual" ? "text-kairos-white" : "text-kairos-gray-mid hover:text-kairos-white"
          )}
        >
          {selected === "anual" && (
            <motion.span
              layoutId="switch-pricing"
              className="absolute left-0 top-0 h-11 w-full rounded-xl border border-kairos-green/50 bg-kairos-green-dark/80 shadow-lg shadow-kairos-green/25"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Pago anual
            <span className="rounded-full border border-kairos-green/30 bg-kairos-green/10 px-2 py-0.5 text-xs text-kairos-green">
              Ahorra 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function PricingSection({ whatsappHref, onPlanClick }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <section id="planes" className="kairos-section">
      <div className="kairos-container relative mx-auto max-w-7xl px-0" ref={pricingRef}>
        <article className="mb-8 space-y-4 text-left">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Planes</p>
          <h2 className="text-4xl font-light text-kairos-white md:text-6xl">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.08}
              staggerFrom="first"
              reverse
              containerClassName="justify-start"
            >
              Elige el plan ideal para tu operación clínica
            </VerticalCutReveal>
          </h2>
          <TimelineContent
            animationNum={0}
            timelineRef={pricingRef}
            className="max-w-2xl text-sm text-kairos-gray-mid md:text-base"
          >
            Todos los planes están diseñados para reducir cancelaciones, mejorar respuesta por WhatsApp y
            proteger tu agenda.
          </TimelineContent>

          <TimelineContent animationNum={1} timelineRef={pricingRef}>
            <PricingSwitch onSwitch={(value) => setIsYearly(value === "anual")} className="w-fit" />
          </TimelineContent>
        </article>

        <div className="grid gap-4 py-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <TimelineContent key={plan.id} animationNum={2 + index} timelineRef={pricingRef}>
              {plan.id === "growth" ? (
                <HoverBorderGradient
                  as="div"
                  shape="card"
                  duration={1.25}
                  containerClassName="w-full"
                  className="w-full rounded-[inherit] bg-transparent p-0"
                >
                  <Card className="relative border-kairos-dark bg-kairos-panel/90">
                    <CardHeader>
                      <h3 className="text-3xl font-semibold text-kairos-white">{plan.name}</h3>
                      <div className="mb-3 mt-3 flex justify-center">
                        <span className="inline-flex items-center justify-center rounded-full border border-kairos-green/50 bg-kairos-green/20 px-5 py-2 text-center text-sm font-semibold leading-tight text-kairos-green shadow-[0_0_20px_rgba(111,194,168,0.22)]">
                          {plan.badge}
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-kairos-gray-mid">{plan.description}</p>
                      <div className="flex items-baseline">
                        <span className="text-base text-kairos-gray-mid">COP</span>
                        <NumberFlow
                          value={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                          format={{ notation: "compact", compactDisplay: "long" }}
                          className="ml-2 text-3xl font-semibold text-kairos-white"
                        />
                      </div>
                      <span className="text-sm text-kairos-gray-mid">/{isYearly ? "año" : "mes"}</span>
                    </CardHeader>

                    <CardContent>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-6 block w-full rounded-xl border border-kairos-green bg-kairos-green p-4 text-center text-base font-medium text-kairos-bg-deep transition-colors hover:bg-kairos-green-dark hover:text-kairos-white"
                        onClick={() => onPlanClick?.(plan.id)}
                      >
                        Solicitar demo de 15 minutos
                      </a>

                      <div className="space-y-3 border-t border-kairos-dark pt-4">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-kairos-gray-light">
                          Incluye
                        </h4>
                        <ul className="space-y-2">
                          {plan.details.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <span className="mt-0.5 grid h-6 w-6 min-h-6 min-w-6 flex-none place-content-center rounded-full border border-kairos-green/55 bg-kairos-green/10">
                                <CheckCheck className="h-3.5 w-3.5 text-kairos-green" />
                              </span>
                              <span className="text-sm text-kairos-gray-light">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </HoverBorderGradient>
              ) : (
                <Card className="relative border-kairos-dark bg-kairos-panel/90">
                  <CardHeader>
                    <h3 className="text-3xl font-semibold text-kairos-white">{plan.name}</h3>
                    <div className="mb-3 mt-3 h-[42px]" />
                    <p className="mb-4 text-sm text-kairos-gray-mid">{plan.description}</p>
                    <div className="flex items-baseline">
                      <span className="text-base text-kairos-gray-mid">COP</span>
                      <NumberFlow
                        value={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        format={{ notation: "compact", compactDisplay: "long" }}
                        className="ml-2 text-3xl font-semibold text-kairos-white"
                      />
                    </div>
                    <span className="text-sm text-kairos-gray-mid">/{isYearly ? "año" : "mes"}</span>
                  </CardHeader>

                  <CardContent>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-6 block w-full rounded-xl border border-kairos-green/35 bg-black/35 p-4 text-center text-base font-medium text-kairos-white transition-colors hover:border-kairos-green hover:text-kairos-green"
                      onClick={() => onPlanClick?.(plan.id)}
                    >
                      Solicitar demo de 15 minutos
                    </a>

                    <div className="space-y-3 border-t border-kairos-dark pt-4">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-kairos-gray-light">
                        Incluye
                      </h4>
                      <ul className="space-y-2">
                        {plan.details.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="mt-0.5 grid h-6 w-6 min-h-6 min-w-6 flex-none place-content-center rounded-full border border-kairos-green/55 bg-kairos-green/10">
                              <CheckCheck className="h-3.5 w-3.5 text-kairos-green" />
                            </span>
                            <span className="text-sm text-kairos-gray-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TimelineContent>
          ))}
        </div>

        <HoverBorderGradient
          as="div"
          shape="card"
          duration={1.25}
          containerClassName="mx-auto mt-8 w-full max-w-4xl"
          className="w-full rounded-[inherit] bg-transparent p-0"
        >
          <article className="kairos-hover-card rounded-[inherit] border border-kairos-green/45 bg-gradient-to-r from-kairos-green/15 via-kairos-green/10 to-kairos-green/15 px-6 py-6 text-center shadow-[0_0_24px_rgba(111,194,168,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-kairos-green hover:shadow-[0_0_30px_rgba(111,194,168,0.35)]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">Nuestra garantía</p>
            <h3 className="mt-2 text-2xl font-medium text-kairos-white">Implementación con riesgo compartido</h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-kairos-gray-light md:text-base">
              Si implementamos Kairos y no ves una mejora operativa medible en 30 días, el siguiente mes
              va por nuestra cuenta.
            </p>
          </article>
        </HoverBorderGradient>
      </div>
    </section>
  );
}
