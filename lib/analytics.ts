export type AnalyticsEventName =
  | "cta_hero_click"
  | "pricing_growth_click"
  | "whatsapp_click"
  | "scroll_75"
  | "faq_open"
  | "demo_enviada";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __kairosScrollTracked?: boolean;
  }
}

export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsParams) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params ?? {});
  }
}
