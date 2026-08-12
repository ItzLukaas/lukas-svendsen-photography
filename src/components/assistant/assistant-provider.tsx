"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AssistantView = "closed" | "minimized" | "open";

type AssistantContextValue = {
  view: AssistantView;
  open: () => void;
  minimize: () => void;
  close: () => void;
  toggle: () => void;
  conversationKey: number;
  restartConversation: () => void;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

const STORAGE_KEY = "ls-assistant-view";

function readStoredView(): AssistantView {
  if (typeof window === "undefined") return "minimized";
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === "closed" || raw === "minimized" || raw === "open") return raw;
  } catch {
    /* ignore */
  }
  return "minimized";
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<AssistantView>("minimized");
  const [hydrated, setHydrated] = useState(false);
  const [conversationKey, setConversationKey] = useState(0);

  useEffect(() => {
    setView(readStoredView());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, view);
    } catch {
      /* ignore */
    }
  }, [view, hydrated]);

  const open = useCallback(() => setView("open"), []);
  const minimize = useCallback(() => setView("minimized"), []);
  const close = useCallback(() => setView("closed"), []);
  const toggle = useCallback(() => {
    setView((current) => (current === "open" ? "minimized" : "open"));
  }, []);
  const restartConversation = useCallback(() => {
    setConversationKey((k) => k + 1);
    setView("open");
  }, []);

  const value = useMemo(
    () => ({
      view: hydrated ? view : "minimized",
      open,
      minimize,
      close,
      toggle,
      conversationKey,
      restartConversation,
    }),
    [
      hydrated,
      view,
      open,
      minimize,
      close,
      toggle,
      conversationKey,
      restartConversation,
    ]
  );

  return (
    <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>
  );
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) {
    throw new Error("useAssistant must be used within AssistantProvider");
  }
  return ctx;
}
