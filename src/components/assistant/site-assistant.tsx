"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import {
  AssistantProvider,
  useAssistant,
} from "@/components/assistant/assistant-provider";
import { AssistantLauncher } from "@/components/assistant/assistant-launcher";

const AssistantPanel = dynamic(
  () =>
    import("@/components/assistant/assistant-panel").then(
      (m) => m.AssistantPanel
    ),
  { ssr: false }
);

function AssistantChrome() {
  const { view, conversationKey, close } = useAssistant();

  useEffect(() => {
    if (view !== "open") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, close]);

  useEffect(() => {
    if (view !== "open") return;
    const prev = document.body.style.overflow;
    // Only lock scroll on small screens (bottom sheet)
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => {
      document.body.style.overflow = mq.matches ? "hidden" : prev;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.overflow = prev;
    };
  }, [view]);

  return (
    <>
      {view === "open" ? (
        <button
          type="button"
          aria-label="Luk assistent"
          className="fixed inset-0 z-[65] bg-ink/25 sm:bg-transparent sm:pointer-events-none"
          onClick={close}
        />
      ) : null}

      <AssistantLauncher />

      {view === "open" ? (
        <AssistantPanel conversationKey={conversationKey} />
      ) : null}
    </>
  );
}

/**
 * Floating photography assistant — lazy UI, privacy-first session.
 * Mount once in the site shell; AI SDK loads with the panel only.
 */
export function SiteAssistant() {
  return (
    <AssistantProvider>
      <AssistantChrome />
    </AssistantProvider>
  );
}
