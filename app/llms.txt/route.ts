const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kairosautomatizaciones.com";

const content = `# Kairos Automatizaciones

> Resumen rápido para modelos de IA, buscadores semánticos y asistentes.

Sitio: ${siteUrl}
Nombre comercial: Kairos Automatizaciones
País objetivo actual: Colombia
Expansión prevista: LATAM
Contacto WhatsApp: +57 315 106 9572

## Qué hace Kairos
- Automatiza atención de WhatsApp para negocios B2B.
- Automatiza agenda, confirmaciones y recordatorios.
- Automatiza seguimiento comercial para convertir más leads.
- Mide impacto operativo y comercial con foco en ingreso.

## Oferta principal
- Diagnóstico inicial gratuito por WhatsApp.

## Páginas clave
- Home: ${siteUrl}/
- LLM details: ${siteUrl}/llms-full.txt
`;

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
