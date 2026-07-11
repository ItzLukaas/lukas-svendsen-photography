"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { btnPrimary } from "@/lib/styles";
import { trackContactSubmit } from "@/lib/analytics";
import { EASE } from "@/lib/motion";

function FormField({
  id,
  label,
  children,
  error,
}: {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-xs tracking-widest text-muted uppercase transition-colors duration-500 ease-premium peer-focus:text-foreground/60"
      >
        {label}
      </label>
      <div className="field-underline">{children}</div>
      {error && (
        <p className="mt-2 text-xs text-red-400/80" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "peer w-full border-b border-border bg-transparent px-0 py-3.5 text-foreground placeholder-white/20 transition-[color,border-color] duration-500 ease-premium focus:border-foreground/20 focus:outline-none";

const textareaClass =
  "w-full resize-none border-0 bg-transparent px-0 py-3.5 text-foreground placeholder-white/20 transition-[color] duration-500 ease-premium focus:outline-none";

export function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const formStartedAt = useMemo(() => Date.now(), []);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          _honeypot: formData.get("_honeypot"),
          _formStartedAt: formStartedAt,
        }),
      });

      const data = (await res.json()) as { error?: string; success?: boolean };

      if (!res.ok) {
        setError(data.error ?? "Kunne ikke sende beskeden. Prøv igen.");
        return;
      }

      setSubmitted(true);
      trackContactSubmit();
      form.reset();
      setMessage("");
    } catch {
      setError("Kunne ikke sende beskeden. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <m.div
          key="success"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center justify-center py-20 text-center will-change-transform"
        >
          <m.div
            initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 bg-accent will-change-transform"
          >
            <Check size={24} strokeWidth={1.5} className="text-foreground" />
          </m.div>
          <h3 className="font-display text-2xl text-foreground">Tak for din besked!</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Jeg vender tilbage til dig hurtigst muligt. Glæder mig til at høre fra dig.
          </p>
        </m.div>
      ) : (
        <ScrollReveal key="form">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <input
              type="text"
              name="_honeypot"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <FormField id="name" label="Navn">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Dit navn"
                />
              </FormField>
              <FormField id="email" label="E-mail">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  placeholder="din@email.dk"
                />
              </FormField>
            </div>

            <FormField id="subject" label="Emne">
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className={inputClass}
                placeholder="Hvad handler det om?"
              />
            </FormField>

            <FormField id="message" label="Fortæl lidt om dit projekt">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={textareaClass}
                placeholder="Fortæl mig om dit projekt eller dine ønsker..."
              />
            </FormField>

            {error && (
              <p className="text-xs text-red-400/80" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={btnPrimary}>
              {loading ? (
                <>
                  <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
                  Sender...
                </>
              ) : (
                <>
                  Send besked
                  <Send
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </>
              )}
            </button>
          </form>
        </ScrollReveal>
      )}
    </AnimatePresence>
  );
}
