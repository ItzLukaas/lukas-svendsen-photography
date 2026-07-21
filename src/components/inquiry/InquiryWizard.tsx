"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { inquiryTaskTypes, TOTAL_INQUIRY_STEPS } from "@/data/inquiry-form";
import { InquiryProgress } from "./InquiryProgress";
import { SuccessCheckmark } from "./SuccessCheckmark";
import { btnPrimary } from "@/lib/styles";
import { trackInquirySubmit } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import {
  buildEndTime,
  clearInquiryDraft,
  initialInquiryDraft,
  loadInquiryDraft,
  mapTaskTypeToService,
  saveInquiryDraft,
  type InquiryDraft,
} from "@/lib/inquiry-draft";

const btnPrimaryCompact =
  "group inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-foreground/20 px-7 py-2.5 text-[10px] tracking-[0.2em] text-foreground uppercase transition-[color,background-color,transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-px hover:border-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-sm)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const sectionBodyCompact =
  "text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-[1.7]";

const inputClass =
  "peer w-full border-b border-border bg-transparent px-0 py-3 text-foreground placeholder-white/20 transition-[color,border-color] duration-500 ease-premium focus:border-foreground/20 focus:outline-none";

const textareaClass =
  "w-full resize-none border-0 bg-transparent px-0 py-3 text-foreground placeholder-white/20 transition-colors duration-500 ease-premium focus:outline-none";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FormField({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase"
      >
        {label}
        {optional && (
          <span className="ml-2 normal-case tracking-normal text-muted-subtle">
            (valgfri)
          </span>
        )}
      </label>
      <div className="field-underline">{children}</div>
      {error && (
        <p className="mt-2 text-xs text-red-400/85" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function validateField(
  key: keyof InquiryDraft,
  draft: InquiryDraft,
): string | undefined {
  switch (key) {
    case "taskType":
      return draft.taskType ? undefined : "Vælg en type";
    case "taskTypeOther":
      return draft.taskType === "Andet" && !draft.taskTypeOther.trim()
        ? "Beskriv kort hvad det drejer sig om"
        : undefined;
    case "date":
      if (draft.flexibleSchedule) return undefined;
      return draft.date ? undefined : "Vælg en dato";
    case "startTime":
      if (draft.flexibleSchedule) return undefined;
      return draft.startTime ? undefined : "Vælg et tidspunkt";
    case "location":
      return draft.location.trim().length >= 2
        ? undefined
        : "Angiv hvor det finder sted";
    case "description":
      return draft.description.trim().length >= 10
        ? undefined
        : "Skriv gerne lidt om opgaven";
    case "name":
      return draft.name.trim().length >= 2 ? undefined : "Navn skal udfyldes";
    case "email":
      if (!draft.email.trim()) return "E-mail skal udfyldes";
      return emailPattern.test(draft.email.trim())
        ? undefined
        : "Ugyldig e-mail";
    case "phone":
      return draft.phone.trim().length >= 6
        ? undefined
        : "Telefon skal udfyldes";
    default:
      return undefined;
  }
}

function validateStep(step: number, draft: InquiryDraft): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 1) {
    const taskError = validateField("taskType", draft);
    if (taskError) errors.taskType = taskError;
    const otherError = validateField("taskTypeOther", draft);
    if (otherError) errors.taskTypeOther = otherError;
  }

  if (step === 2) {
    if (!draft.flexibleSchedule) {
      for (const key of ["date", "startTime"] as const) {
        const err = validateField(key, draft);
        if (err) errors[key] = err;
      }
    }
    const locErr = validateField("location", draft);
    if (locErr) errors.location = locErr;
  }

  if (step === 3) {
    const err = validateField("description", draft);
    if (err) errors.description = err;
  }

  if (step === 4) {
    for (const key of ["name", "email", "phone"] as const) {
      const err = validateField(key, draft);
      if (err) errors[key] = err;
    }
  }

  return errors;
}

export function InquiryWizard({ embedded = false }: { embedded?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const stepRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<InquiryDraft>(initialInquiryDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formStartedAt] = useState(() => Date.now());

  const primaryBtnClass = embedded ? btnPrimaryCompact : btnPrimary;
  const stepHeadingClass = embedded
    ? "font-display text-xl font-light text-foreground md:text-2xl"
    : "font-display text-2xl font-light text-foreground md:text-3xl";
  const bodyClass = embedded
    ? sectionBodyCompact
    : "text-base leading-relaxed text-muted md:text-[1.05rem] md:leading-[1.75]";

  useEffect(() => {
    const saved = loadInquiryDraft();
    if (saved) {
      setForm(saved);
      setStep(Math.min(saved.step, TOTAL_INQUIRY_STEPS));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveInquiryDraft({ ...form, step });
  }, [form, step, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const focusTarget = stepRef.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]):not([type=checkbox]), textarea, button[aria-pressed]",
    );
    focusTarget?.focus({ preventScroll: true });
  }, [step, hydrated]);

  const update = useCallback(
    <K extends keyof InquiryDraft>(key: K, value: InquiryDraft[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (touched[key as string]) {
          const err = validateField(key, next);
          setErrors((prevErrors) => {
            const updated = { ...prevErrors };
            if (err) updated[key as string] = err;
            else delete updated[key as string];
            return updated;
          });
        }
        return next;
      });
    },
    [touched],
  );

  const touch = (key: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => {
      const err = validateField(key as keyof InquiryDraft, form);
      if (!err) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: err };
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setTouched((prev) => ({
        ...prev,
        ...Object.fromEntries(Object.keys(stepErrors).map((k) => [k, true])),
      }));
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_INQUIRY_STEPS));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    const contactErrors = validateStep(4, form);
    if (Object.keys(contactErrors).length > 0) {
      setErrors(contactErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const service = mapTaskTypeToService(form.taskType!);

      const payload = {
        service,
        category: form.taskType!,
        categoryOther:
          form.taskType === "Andet" ? form.taskTypeOther.trim() : undefined,
        schedule: form.flexibleSchedule
          ? []
          : [
              {
                date: form.date,
                startTime: form.startTime,
                endTime: buildEndTime(form.startTime),
              },
            ],
        flexibleSchedule: form.flexibleSchedule,
        name: form.name.trim(),
        company: form.company.trim() || undefined,
        email: form.email.trim(),
        phone: form.phone.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        _honeypot: "",
        _formStartedAt: formStartedAt,
      };

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        error?: string;
        success?: boolean;
        details?: Record<string, string[] | undefined>;
      };

      if (!res.ok) {
        if (data.details) {
          const fieldErrors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(data.details)) {
            if (messages?.[0]) fieldErrors[field] = messages[0];
          }
          if (Object.keys(fieldErrors).length > 0) {
            setErrors({
              ...fieldErrors,
              submit: data.error ?? "Tjek felterne og prøv igen.",
            });
            return;
          }
        }

        setErrors({ submit: data.error ?? "Noget gik galt. Prøv igen." });
        return;
      }

      clearInquiryDraft();
      setSubmitted(true);
      trackInquirySubmit();
    } catch {
      setErrors({ submit: "Kunne ikke sende forespørgslen. Prøv igen." });
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) {
    return (
      <div
        className={`flex items-center justify-center ${embedded ? "min-h-[240px]" : "min-h-[320px]"}`}
        aria-hidden="true"
      >
        <Loader2 className="h-5 w-5 animate-spin text-muted" strokeWidth={1.5} />
      </div>
    );
  }

  if (submitted) {
    return (
      <m.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`flex flex-col items-center text-center ${embedded ? "py-10" : "py-14"}`}
      >
        <SuccessCheckmark size={embedded ? "sm" : "md"} />
        <h3
          className={`mt-5 font-display font-light text-foreground ${embedded ? "text-xl" : "text-2xl"}`}
        >
          Tak for din forespørgsel
        </h3>
        <p className={`mt-3 max-w-md ${bodyClass}`}>
          Jeg vender tilbage hurtigst muligt — typisk inden for 24 timer på
          hverdage.
        </p>
      </m.div>
    );
  }

  const slideVariants = {
    enter: prefersReducedMotion
      ? {}
      : { opacity: 0, y: 14, filter: "blur(3px)" },
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: prefersReducedMotion
      ? {}
      : { opacity: 0, y: -10, filter: "blur(3px)" },
  };

  return (
    <div
      className={
        embedded
          ? "p-0"
          : "border border-border bg-accent/80 p-8 backdrop-blur-sm lg:p-12"
      }
    >
      <InquiryProgress currentStep={step} compact={embedded} />

      <div ref={stepRef}>
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: EASE }}
          >
            {step === 1 && (
              <div>
                <h3 className={stepHeadingClass}>Hvad drejer det sig om?</h3>
                <p className={`mt-2 ${bodyClass}`}>Vælg det der passer bedst.</p>
                <div
                  className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${
                    embedded ? "mt-7" : "mt-9"
                  }`}
                >
                  {inquiryTaskTypes.map((task) => {
                    const Icon = task.icon;
                    const selected = form.taskType === task.id;
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => {
                          update("taskType", task.id);
                          if (task.id !== "Andet") {
                            update("taskTypeOther", "");
                            setErrors({});
                            setStep(2);
                          }
                        }}
                        aria-pressed={selected}
                        className={`group flex flex-col items-start border text-left transition-all duration-500 ease-premium hover:-translate-y-0.5 ${
                          embedded ? "p-4" : "p-5"
                        } ${
                          selected
                            ? "border-foreground/35 bg-primary/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                            : "border-border bg-primary/[0.02] hover:border-foreground/20 hover:bg-accent"
                        }`}
                      >
                        <span
                          className={`mb-3 flex items-center justify-center rounded-full border transition-all duration-500 ease-premium ${
                            embedded ? "h-9 w-9" : "h-10 w-10"
                          } ${
                            selected
                              ? "border-foreground/30 bg-primary/[0.1] text-foreground"
                              : "border-border text-muted group-hover:border-foreground/20 group-hover:text-foreground/70"
                          }`}
                        >
                          <Icon size={embedded ? 16 : 17} strokeWidth={1.5} />
                        </span>
                        <span
                          className={`tracking-wide text-foreground ${
                            embedded ? "text-xs" : "text-sm"
                          }`}
                        >
                          {task.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {form.taskType === "Andet" && (
                  <div className="mt-7">
                    <FormField
                      id="taskTypeOther"
                      label="Kort beskrivelse"
                      error={errors.taskTypeOther}
                    >
                      <input
                        id="taskTypeOther"
                        value={form.taskTypeOther}
                        onChange={(e) => update("taskTypeOther", e.target.value)}
                        onBlur={() => touch("taskTypeOther")}
                        className={inputClass}
                        placeholder="Hvad har du brug for?"
                      />
                    </FormField>
                  </div>
                )}
                {errors.taskType && (
                  <p className="mt-4 text-xs text-red-400/85" role="alert">
                    {errors.taskType}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className={stepHeadingClass}>Hvornår og hvor?</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Bare det vigtigste — resten finder vi ud af.
                </p>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-sm border border-border/70 bg-accent/40 px-4 transition-colors hover:border-foreground/15 ${
                    embedded ? "mt-6 min-h-11 py-3" : "mt-7 min-h-12 py-3.5"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.flexibleSchedule}
                    onChange={(e) =>
                      update("flexibleSchedule", e.target.checked)
                    }
                    className="h-4 w-4 accent-white"
                  />
                  <span
                    className={`text-foreground/70 ${embedded ? "text-xs" : "text-sm"}`}
                  >
                    Jeg er fleksibel med dato og tid
                  </span>
                </label>

                <div className={`space-y-6 ${embedded ? "mt-7" : "mt-9"}`}>
                  {!form.flexibleSchedule && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField id="date" label="Dato" error={errors.date}>
                        <input
                          id="date"
                          type="date"
                          value={form.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => update("date", e.target.value)}
                          onBlur={() => touch("date")}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </FormField>
                      <FormField
                        id="startTime"
                        label="Tidspunkt"
                        error={errors.startTime}
                      >
                        <input
                          id="startTime"
                          type="time"
                          value={form.startTime}
                          onChange={(e) => update("startTime", e.target.value)}
                          onBlur={() => touch("startTime")}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </FormField>
                    </div>
                  )}
                  <FormField
                    id="location"
                    label="Sted"
                    error={errors.location}
                  >
                    <input
                      id="location"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      onBlur={() => touch("location")}
                      autoComplete="street-address"
                      className={inputClass}
                      placeholder="Adresse, by eller lokation"
                    />
                  </FormField>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className={stepHeadingClass}>Fortæl kort om opgaven</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Et par sætninger er nok.
                </p>
                <div className={embedded ? "mt-7" : "mt-9"}>
                  <FormField
                    id="description"
                    label="Beskrivelse"
                    error={errors.description}
                  >
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      onBlur={() => touch("description")}
                      rows={embedded ? 5 : 6}
                      className={textareaClass}
                      placeholder="Hvad skal der fotograferes eller filmes?"
                    />
                  </FormField>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className={stepHeadingClass}>Dine kontaktoplysninger</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Så jeg kan vende tilbage til dig.
                </p>
                <div className={`space-y-6 ${embedded ? "mt-7" : "mt-9"}`}>
                  <FormField id="name" label="Navn" error={errors.name}>
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => touch("name")}
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Dit navn"
                    />
                  </FormField>
                  <FormField id="company" label="Firma" optional>
                    <input
                      id="company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="Valgfrit"
                    />
                  </FormField>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField id="email" label="E-mail" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        onBlur={() => touch("email")}
                        autoComplete="email"
                        className={inputClass}
                        placeholder="din@email.dk"
                      />
                    </FormField>
                    <FormField id="phone" label="Telefon" error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onBlur={() => touch("phone")}
                        autoComplete="tel"
                        className={inputClass}
                        placeholder="+45 …"
                      />
                    </FormField>
                  </div>
                </div>
                {errors.submit && (
                  <p className="mt-5 text-xs text-red-400/85" role="alert">
                    {errors.submit}
                  </p>
                )}
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      <div
        className={`flex items-center justify-between gap-4 border-t border-foreground/[0.08] ${
          embedded ? "mt-8 pt-6" : "mt-11 pt-8"
        }`}
      >
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className={`inline-flex items-center gap-2 uppercase transition-colors hover:text-foreground ${
              embedded
                ? "min-h-9 text-[10px] tracking-[0.2em] text-muted"
                : "min-h-11 text-xs tracking-[0.2em] text-muted"
            }`}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Tilbage
          </button>
        ) : (
          <span />
        )}

        {step < TOTAL_INQUIRY_STEPS ? (
          <button type="button" onClick={goNext} className={primaryBtnClass}>
            Næste
            <ArrowRight size={13} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={primaryBtnClass}
          >
            {loading ? (
              <>
                <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
                Sender...
              </>
            ) : (
              "Send forespørgsel"
            )}
          </button>
        )}
      </div>

      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />
    </div>
  );
}
