"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Minus, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { useAssistant } from "@/components/assistant/assistant-provider";
import {
  ASSISTANT_NAME,
  ASSISTANT_TAGLINE,
  quickActions,
} from "@/lib/assistant/types";
import { suggestionsForPath } from "@/lib/assistant/suggestions";
import { cn } from "@/lib/utils";

function messageText(parts: { type: string; text?: string }[] | undefined) {
  if (!parts?.length) return "";
  return parts
    .filter((p) => p.type === "text" && typeof p.text === "string")
    .map((p) => p.text as string)
    .join("\n")
    .trim();
}

function showBookingCta(text: string) {
  return /\/booking|book|forespørg|kontakt lukas|fortæl om dit projekt/i.test(
    text
  );
}

type AssistantPanelProps = {
  conversationKey: number;
};

export function AssistantPanel({ conversationKey }: AssistantPanelProps) {
  const { minimize, close, restartConversation } = useAssistant();
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/assistant",
        prepareSendMessagesRequest: ({ messages, id, body }) => ({
          body: {
            ...body,
            id,
            messages,
            pagePath:
              typeof window !== "undefined" ? window.location.pathname : "/",
          },
        }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- remount via conversationKey parent
    [conversationKey]
  );

  const { messages, sendMessage, status, error, setMessages, stop } = useChat({
    id: `assistant-${conversationKey}`,
    transport,
  });

  const busy = status === "submitted" || status === "streaming";
  const suggestions = suggestionsForPath(pathname);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [conversationKey]);

  async function submitText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setStarted(true);
    setInput("");
    await sendMessage({ text: trimmed });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void submitText(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitText(input);
    }
  }

  function handleRestart() {
    stop();
    setMessages([]);
    setStarted(false);
    setInput("");
    restartConversation();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-title"
      className={cn(
        "pointer-events-auto fixed inset-x-0 bottom-0 z-[70] flex max-h-[min(92dvh,40rem)] flex-col border border-foreground/12 bg-paper shadow-[0_24px_80px_rgb(14_14_13/0.22)]",
        "sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[min(36rem,calc(100dvh-3rem))] sm:w-[min(100vw-3rem,24.5rem)] sm:max-h-none"
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b border-foreground/10 px-4 py-3.5 sm:px-5">
        <div className="min-w-0 pt-0.5">
          <h2
            id="assistant-title"
            className="font-display text-[1.05rem] tracking-[-0.02em] text-ink"
          >
            {ASSISTANT_NAME}
          </h2>
          <p className="mt-0.5 text-[0.75rem] text-muted-ink">{ASSISTANT_TAGLINE}</p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex size-10 items-center justify-center text-muted-ink transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            aria-label="Ny samtale"
            title="Ny samtale"
          >
            <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            onClick={minimize}
            className="inline-flex size-10 items-center justify-center text-muted-ink transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            aria-label="Minimer"
          >
            <Minus className="size-4" strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            onClick={close}
            className="inline-flex size-10 items-center justify-center text-muted-ink transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            aria-label="Luk assistent"
          >
            <X className="size-4" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </header>

      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
      >
        {!started && messages.length === 0 ? (
          <div>
            <p className="font-display text-[1.25rem] tracking-[-0.02em] text-ink">
              Hej! 👋
            </p>
            <p className="mt-1.5 text-[0.9375rem] text-muted-ink">
              Hvad kan jeg hjælpe dig med?
            </p>

            <div className="mt-5 grid gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  disabled={busy}
                  onClick={() => void submitText(action.prompt)}
                  className="border border-foreground/12 bg-mist/40 px-3.5 py-3 text-left text-[0.875rem] leading-snug text-ink transition-[background-color,border-color] duration-300 hover:border-foreground/25 hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <p className="mt-5 text-[0.75rem] text-muted-ink">
              Eller skriv bare frit, hvad du har i tankerne…
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item.prompt}
                  type="button"
                  disabled={busy}
                  onClick={() => void submitText(item.prompt)}
                  className="border border-foreground/10 px-2.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.02em] text-muted-ink transition-colors hover:border-foreground/25 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((message) => {
          const text = messageText(message.parts);
          if (!text) return null;
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={cn("flex", isUser ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[92%] whitespace-pre-wrap px-3.5 py-2.5 text-[0.875rem] leading-[1.55]",
                  isUser
                    ? "bg-ink text-paper"
                    : "border border-foreground/10 bg-mist/50 text-ink"
                )}
              >
                {text}
                {!isUser && showBookingCta(text) ? (
                  <div className="mt-3 border-t border-foreground/10 pt-3">
                    <Link
                      href="/booking"
                      className="btn-solid bg-ink text-paper"
                      onClick={minimize}
                    >
                      Fortæl om dit projekt
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}

        {busy ? (
          <p className="text-[0.75rem] text-muted-ink" aria-live="polite">
            Skriver…
          </p>
        ) : null}

        {error ? (
          <div
            className="border border-foreground/12 bg-mist/40 px-3.5 py-3 text-[0.875rem] text-ink"
            role="alert"
          >
            <p className="font-medium">Ups — jeg kan ikke svare lige nu.</p>
            <p className="mt-1.5 text-muted-ink">
              Du kan stadig kontakte Lukas direkte, så hjælper han dig videre.
            </p>
            <Link
              href="/kontakt"
              className="btn-ghost mt-3 inline-flex"
              onClick={minimize}
            >
              Kontakt Lukas →
            </Link>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={onSubmit}
        className="border-t border-foreground/10 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4"
      >
        <div className="flex items-end gap-2 border border-foreground/12 bg-paper focus-within:border-foreground/28">
          <label htmlFor="assistant-input" className="sr-only">
            Skriv til assistenten
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Fortæl mig om dit projekt…"
            disabled={busy}
            className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-[0.875rem] text-ink outline-none placeholder:text-muted-ink/70 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send"
            className="m-1.5 inline-flex size-9 shrink-0 items-center justify-center bg-ink text-paper transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-35"
          >
            <ArrowUp className="size-4" strokeWidth={1.6} aria-hidden />
          </button>
        </div>
        <p className="mt-2 px-0.5 text-[0.625rem] leading-snug text-muted-ink/80">
          Ingen konto kræves. Samtalen gemmes ikke permanent.
        </p>
      </form>
    </div>
  );
}
