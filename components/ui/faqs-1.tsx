"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

interface FaqsSectionProps {
  onOpenFaq?: (faqId: string) => void;
  items?: FaqItem[];
}

const defaultQuestions: FaqItem[] = [
  {
    id: "faq-1",
    title: "¿Kairos reemplaza a mi recepcionista?",
    content:
      "No. Kairos automatiza lo repetitivo para que tu recepcionista se enfoque en casos de mayor valor y en la atención humana cuando se necesita.",
  },
  {
    id: "faq-2",
    title: "¿Cuánto tarda en activarse?",
    content:
      "Normalmente entre 5 y 10 días hábiles, según tu flujo de citas y canales actuales. Arrancamos con una implementación guiada.",
  },
  {
    id: "faq-3",
    title: "¿Necesito cambiar de WhatsApp?",
    content:
      "No necesariamente. Revisamos tu operación actual y conectamos Kairos con tu proceso para mantener continuidad con pacientes.",
  },
  {
    id: "faq-4",
    title: "¿Funciona con varias especialidades?",
    content:
      "Sí. Se pueden configurar rutas por especialidad, profesional y tipo de cita para responder y confirmar cada caso de forma correcta.",
  },
  {
    id: "faq-5",
    title: "¿Qué resultados puedo esperar?",
    content:
      "Depende de tu punto de partida, pero el objetivo es reducir ausencias, responder más rápido y mejorar la ocupación de agenda con seguimiento automático.",
  },
  {
    id: "faq-6",
    title: "¿Hay permanencia mínima?",
    content:
      "No trabajamos con contratos rígidos de largo plazo. Definimos metas operativas claras y medimos resultados desde el primer mes.",
  },
];

export function FaqsSection({ onOpenFaq, items = defaultQuestions }: FaqsSectionProps) {
  const [openedItem, setOpenedItem] = useState("faq-1");

  const handleOpen = (value: string) => {
    setOpenedItem(value);
    if (value) {
      onOpenFaq?.(value);
    }
  };

  return (
    <section id="faq" className="kairos-section">
      <div className="kairos-container mx-auto w-full max-w-4xl space-y-7">
        <div className="space-y-3 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-kairos-green">FAQ</p>
          <h2 className="text-3xl font-light text-kairos-white md:text-5xl">Preguntas frecuentes</h2>
          <p className="mx-auto max-w-2xl text-kairos-gray-mid">
            Resolvemos las objeciones más comunes antes de implementar Kairos en tu clínica.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          value={openedItem}
          onValueChange={handleOpen}
          className="w-full rounded-2xl border border-kairos-dark bg-kairos-panel/85 px-4 md:px-6"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
