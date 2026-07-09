import Script from "next/script";

const COOKIEBOT_ID = "69a0d227-45e7-4a78-b03a-fcf886d1d45f";

export function Cookiebot() {
  return (
    // Cookiebot skal loades før andre scripts for auto-blocking (GDPR).
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={COOKIEBOT_ID}
      data-blockingmode="auto"
      strategy="beforeInteractive"
    />
  );
}
