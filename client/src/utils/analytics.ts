declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

let consentGranted = false;

export function setAnalyticsConsent(granted: boolean) {
  consentGranted = granted;
  if (granted && typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!consentGranted) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

export function trackCta(label: string) {
  trackEvent('cta_click', { label });
}
