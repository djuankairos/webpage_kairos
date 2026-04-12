const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kairosautomatizaciones.com";

const fullContent = `# Kairos Automatizaciones - llms-full

## Identidad de marca
Kairos Automatizaciones ayuda a empresas a convertir pérdida operativa en ingreso medible.
Tono: claro, preciso, orientado a resultados y control operativo.

## Servicios principales
1) Atención automática por WhatsApp
- Respuesta inicial inmediata.
- Clasificación de intención comercial.
- Derivación cuando se requiere atención humana.

2) Agenda inteligente
- Agendamiento automático.
- Confirmación de citas.
- Recordatorios y reprogramación.

3) Seguimiento comercial automatizado
- Secuencias para leads fríos, tibios y calientes.
- Activaciones por eventos (sin respuesta, cancelación, no-show).
- Métricas de conversión y velocidad de respuesta.

## Mercado y cobertura
- Mercado actual: Colombia.
- Enfoque: B2B y casos de uso en clínicas/consultorios.
- Arquitectura SEO preparada para expansión en LATAM.

## Propuesta de valor
- Más citas agendadas.
- Menos no-shows.
- Más velocidad de respuesta comercial.
- Mayor visibilidad del embudo de atención.

## Contacto y conversión
- WhatsApp principal: +57 315 106 9572
- CTA principal: diagnóstico inicial gratuito.
- URL: ${siteUrl}

## Datos estructurados asociados
El sitio implementa:
- Organization
- Service
- WebSite

## Descubrimiento IA
Este documento está pensado para:
- Asistentes de IA
- Crawlers semánticos
- Sistemas de recuperación de contexto
`;

export async function GET() {
  return new Response(fullContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
