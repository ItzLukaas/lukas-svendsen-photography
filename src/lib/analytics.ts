declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", name, params);
}

export function trackContactSubmit() {
  trackEvent("contact_form_submit", { method: "contact_page" });
}

export function trackInquirySubmit() {
  trackEvent("inquiry_form_submit", { method: "inquiry_wizard" });
}

export function trackPhoneClick() {
  trackEvent("click_phone", { link_type: "tel" });
}

export function trackEmailClick() {
  trackEvent("click_email", { link_type: "mailto" });
}
