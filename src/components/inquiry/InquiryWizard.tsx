"use client";

import { useCallback, useMemo, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import {
  inquiryCategories,
  inquiryServices,
  serviceLabels,
} from "@/data/inquiry-form";
import { InquiryProgress } from "./InquiryProgress";
import { btnPrimary, sectionBody } from "@/lib/styles";
import { trackInquirySubmit } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import type { ScheduleSlot, ServiceType } from "@/types/inquiry";

const btnPrimaryCompact =
  "group inline-flex min-h-10 items-center justify-center gap-2 border border-white px-7 py-2.5 text-[10px] tracking-[0.2em] text-white uppercase transition-all duration-500 ease-premium hover:bg-white hover:text-black active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const sectionBodyCompact =
  "text-sm leading-relaxed text-white/55 md:text-[0.95rem] md:leading-[1.7]";

const inputClass =
  "peer w-full border-b border-white/10 bg-transparent px-0 py-3.5 text-white placeholder-white/20 transition-colors duration-500 ease-premium focus:border-transparent focus:outline-none";

const TOTAL_STEPS = 5;

interface FormState {
  service: ServiceType | null;
  category: string;
  categoryOther: string;
  schedule: ScheduleSlot[];
  flexibleSchedule: boolean;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  description: string;
}

const initialState: FormState = {
  service: null,
  category: "",
  categoryOther: "",
  schedule: [{ date: "", startTime: "17:00", endTime: "23:00" }],
  flexibleSchedule: false,
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  description: "",
};

function formatDateDa(date: string) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function FormField({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-xs tracking-widest text-white/40 uppercase"
      >
        {label}
        {optional && (
          <span className="ml-2 normal-case tracking-normal text-white/25">
            (valgfri)
          </span>
        )}
      </label>
      <div className="field-underline">{children}</div>
    </div>
  );
}

const textareaClass =
  "w-full resize-none border-0 bg-transparent px-0 py-3.5 text-white placeholder-white/20 transition-colors duration-500 ease-premium focus:outline-none";

export function InquiryWizard({ embedded = false }: { embedded?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const bodyClass = embedded ? sectionBodyCompact : sectionBody;
  const primaryBtnClass = embedded ? btnPrimaryCompact : btnPrimary;
  const stepHeadingClass = embedded
    ? "font-display text-xl font-light text-white md:text-2xl"
    : "font-display text-2xl font-light text-white md:text-3xl";
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formStartedAt] = useState(() => Date.now());

  const categories = useMemo(
    () => (form.service ? inquiryCategories[form.service] : []),
    [form.service],
  );

  const update = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    },
    [],
  );

  const validateStep = (current: number): boolean => {
    const nextErrors: Record<string, string> = {};

    if (current === 1 && !form.service) {
      nextErrors.service = "Vælg en ydelse";
    }

    if (current === 2) {
      if (!form.category) nextErrors.category = "Vælg en kategori";
      if (form.category === "Andet" && !form.categoryOther.trim()) {
        nextErrors.categoryOther = "Beskriv din kategori";
      }
    }

    if (current === 3 && !form.flexibleSchedule) {
      const validSlots = form.schedule.filter((s) => s.date);
      if (validSlots.length === 0) {
        nextErrors.schedule = "Vælg mindst én dato";
      }
      for (const slot of validSlots) {
        if (slot.startTime >= slot.endTime) {
          nextErrors.schedule = "Sluttidspunkt skal være efter start";
          break;
        }
      }
    }

    if (current === 4) {
      if (!form.name.trim()) nextErrors.name = "Navn skal udfyldes";
      if (!form.email.trim()) nextErrors.email = "E-mail skal udfyldes";
      if (!form.phone.trim()) nextErrors.phone = "Telefon skal udfyldes";
      if (!form.location.trim()) nextErrors.location = "Lokation skal udfyldes";
      if (form.description.trim().length < 20) {
        nextErrors.description = "Beskriv projektet med mindst 20 tegn";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      setStep(4);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const payload = {
        service: form.service!,
        category: form.category,
        categoryOther: form.categoryOther || undefined,
        schedule: form.flexibleSchedule
          ? []
          : form.schedule.filter((s) => s.date),
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

      setSubmitted(true);
      trackInquirySubmit();
    } catch {
      setErrors({ submit: "Kunne ikke sende forespørgslen. Prøv igen." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <m.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`flex flex-col items-center text-center ${embedded ? "py-12" : "py-16"}`}
      >
        <div
          className={`mb-5 flex items-center justify-center rounded-full border border-white/25 bg-white/[0.06] shadow-[0_0_40px_rgba(255,255,255,0.06)] ${
            embedded ? "h-14 w-14" : "h-16 w-16"
          }`}
        >
          <Check size={embedded ? 20 : 24} strokeWidth={1.5} className="text-white" />
        </div>
        <h3
          className={`font-display font-light text-white ${embedded ? "text-xl" : "text-2xl"}`}
        >
          Tak for din forespørgsel
        </h3>
        <p className={`mt-3 max-w-md ${bodyClass}`}>
          Jeg har modtaget dine informationer og vender tilbage hurtigst muligt.
        </p>
      </m.div>
    );
  }

  return (
    <div
      className={
        embedded ? "p-0" : "border border-white/8 bg-white/[0.02] p-8 lg:p-12"
      }
    >
      <InquiryProgress currentStep={step} compact={embedded} />

      <AnimatePresence mode="wait">
        <m.div
          key={step}
          initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {step === 1 && (
            <div>
              <h3 className={stepHeadingClass}>
                Hvad kan jeg hjælpe dig med?
              </h3>
              <p className={`mt-2 ${bodyClass}`}>
                Vælg den ydelse der passer bedst til dit projekt.
              </p>
              <div className={`grid gap-3 sm:grid-cols-3 ${embedded ? "mt-7" : "mt-10"}`}>
                {inquiryServices.map((service) => {
                  const Icon = service.icon;
                  const selected = form.service === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        update("service", service.id);
                        update("category", "");
                        update("categoryOther", "");
                      }}
                      aria-pressed={selected}
                      className={`group flex flex-col items-start border text-left transition-all duration-500 ease-premium hover:-translate-y-0.5 ${
                        embedded ? "p-4" : "p-6"
                      } ${
                        selected
                          ? "border-white/35 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center rounded-full border transition-all duration-500 ease-premium ${
                          embedded ? "mb-3 h-9 w-9" : "mb-5 h-11 w-11"
                        } ${
                          selected
                            ? "border-white/30 bg-white/[0.08] text-white"
                            : "border-white/10 text-white/40 group-hover:border-white/20 group-hover:text-white/70"
                        }`}
                      >
                        <Icon size={embedded ? 16 : 18} strokeWidth={1.5} />
                      </span>
                      <span className={`tracking-wide text-white ${embedded ? "text-xs" : "text-sm"}`}>
                        {service.label}
                      </span>
                      <span className={`mt-1.5 leading-relaxed text-white/40 ${embedded ? "text-[11px]" : "text-xs"}`}>
                        {service.description}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.service && (
                <p className="mt-4 text-xs text-red-400/80">{errors.service}</p>
              )}
            </div>
          )}

          {step === 2 && form.service && (
            <div>
              <h3 className={stepHeadingClass}>
                Vælg kategori
              </h3>
              <p className={`mt-2 ${bodyClass}`}>
                Hvilken type {serviceLabels[form.service].toLowerCase()} drejer det sig om?
              </p>
              <div className={`flex flex-wrap gap-2.5 ${embedded ? "mt-7" : "mt-10"}`}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => update("category", cat)}
                    aria-pressed={form.category === cat}
                    className={`rounded-full border uppercase transition-all duration-500 ease-premium hover:-translate-y-px ${
                      embedded
                        ? "min-h-9 px-4 py-2 text-[10px] tracking-[0.15em]"
                        : "min-h-11 px-5 py-2.5 text-xs tracking-[0.15em]"
                    } ${
                      form.category === cat
                        ? "border-white/40 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                        : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {form.category === "Andet" && (
                <div className="mt-8">
                  <FormField id="categoryOther" label="Beskriv kategori">
                    <input
                      id="categoryOther"
                      value={form.categoryOther}
                      onChange={(e) => update("categoryOther", e.target.value)}
                      className={inputClass}
                      placeholder="Fortæl kort hvad du har brug for"
                    />
                  </FormField>
                </div>
              )}
              {(errors.category || errors.categoryOther) && (
                <p className="mt-4 text-xs text-red-400/80">
                  {errors.category ?? errors.categoryOther}
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className={stepHeadingClass}>
                Hvornår?
              </h3>
              <p className={`mt-2 ${bodyClass}`}>
                Vælg ønskede datoer og tidspunkter — eller marker fleksibel.
              </p>

              <label
                className={`flex cursor-pointer items-center gap-3 ${embedded ? "mt-6 min-h-9" : "mt-8 min-h-11"}`}
              >
                <input
                  type="checkbox"
                  checked={form.flexibleSchedule}
                  onChange={(e) => update("flexibleSchedule", e.target.checked)}
                  className="h-4 w-4 accent-white"
                />
                <span className={`text-white/60 ${embedded ? "text-xs" : "text-sm"}`}>
                  Jeg er fleksibel med dato og tidspunkt
                </span>
              </label>

              {!form.flexibleSchedule && (
                <div className="mt-8 space-y-6">
                  {form.schedule.map((slot, index) => (
                    <div
                      key={index}
                      className="grid gap-4 rounded-sm border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-[1fr_auto_auto_auto]"
                    >
                      <FormField id={`date-${index}`} label="Dato">
                        <input
                          id={`date-${index}`}
                          type="date"
                          value={slot.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            const next = [...form.schedule];
                            next[index] = { ...slot, date: e.target.value };
                            update("schedule", next);
                          }}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </FormField>
                      <FormField id={`start-${index}`} label="Fra">
                        <input
                          id={`start-${index}`}
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => {
                            const next = [...form.schedule];
                            next[index] = { ...slot, startTime: e.target.value };
                            update("schedule", next);
                          }}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </FormField>
                      <FormField id={`end-${index}`} label="Til">
                        <input
                          id={`end-${index}`}
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => {
                            const next = [...form.schedule];
                            next[index] = { ...slot, endTime: e.target.value };
                            update("schedule", next);
                          }}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </FormField>
                      {form.schedule.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            update(
                              "schedule",
                              form.schedule.filter((_, i) => i !== index),
                            )
                          }
                          className="flex h-11 w-11 self-end items-center justify-center text-white/30 transition-colors hover:text-white/60"
                          aria-label="Fjern dato"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      update("schedule", [
                        ...form.schedule,
                        { date: "", startTime: "17:00", endTime: "23:00" },
                      ])
                    }
                    className="inline-flex min-h-11 items-center gap-2 text-xs tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-white"
                  >
                    <Plus size={14} strokeWidth={1.5} />
                    Tilføj dato
                  </button>
                </div>
              )}
              {errors.schedule && (
                <p className="mt-4 text-xs text-red-400/80">{errors.schedule}</p>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className={stepHeadingClass}>
                Projektinformation
              </h3>
              <p className={`mt-2 ${bodyClass}`}>
                Fortæl mig lidt om dig og dit projekt.
              </p>
              <div className={`space-y-6 ${embedded ? "mt-7" : "mt-10"}`}>
                <div className={`grid gap-6 sm:grid-cols-2 ${embedded ? "gap-5" : "gap-8"}`}>
                  <FormField id="name" label="Navn">
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Dit navn"
                    />
                  </FormField>
                  <FormField id="company" label="Virksomhed" optional>
                    <input
                      id="company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="Valgfrit"
                    />
                  </FormField>
                </div>
                <div className={`grid sm:grid-cols-2 ${embedded ? "gap-5" : "gap-8"}`}>
                  <FormField id="email" label="E-mail">
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      autoComplete="email"
                      className={inputClass}
                      placeholder="din@email.dk"
                    />
                  </FormField>
                  <FormField id="phone" label="Telefon">
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+45 24 46 35 50"
                    />
                  </FormField>
                </div>
                <FormField id="location" label="Lokation">
                  <input
                    id="location"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className={inputClass}
                    placeholder="By, adresse eller område"
                  />
                </FormField>
                <FormField id="description" label="Fortæl lidt om dit projekt">
                  <textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={5}
                    className={textareaClass}
                    placeholder="Beskriv hvad du ønsker billeder/video til, størrelse på projektet og andre relevante detaljer."
                  />
                </FormField>
                {Object.entries(errors)
                  .filter(([key]) =>
                    ["name", "email", "phone", "location", "description"].includes(key),
                  )
                  .map(([, msg]) => (
                    <p key={msg} className="text-xs text-red-400/80">
                      {msg}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {step === 5 && form.service && (
            <div>
              <h3 className={stepHeadingClass}>
                Din forespørgsel
              </h3>
              <p className={`mt-2 ${bodyClass}`}>
                Gennemgå dine oplysninger inden afsendelse.
              </p>
              <dl
                className={`space-y-4 rounded-sm border border-white/10 bg-white/[0.02] ${
                  embedded ? "mt-7 p-5 sm:p-6" : "mt-10 p-6 sm:p-8"
                }`}
              >
                {[
                  ["Ydelse", serviceLabels[form.service]],
                  [
                    "Kategori",
                    form.category === "Andet"
                      ? `Andet — ${form.categoryOther}`
                      : form.category,
                  ],
                  [
                    "Dato",
                    form.flexibleSchedule
                      ? "Fleksibel"
                      : form.schedule
                          .filter((s) => s.date)
                          .map((s) => formatDateDa(s.date))
                          .join(", ") || "—",
                  ],
                  [
                    "Tid",
                    form.flexibleSchedule
                      ? "Fleksibel"
                      : form.schedule
                          .filter((s) => s.date)
                          .map((s) => `${s.startTime}–${s.endTime}`)
                          .join(", ") || "—",
                  ],
                  ["Lokation", form.location || "—"],
                  [
                    "Kontakt",
                    `${form.name}${form.company ? ` · ${form.company}` : ""}\n${form.email} · ${form.phone}`,
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 sm:grid-cols-[140px_1fr]">
                    <dt className="text-[10px] tracking-[0.25em] text-white/35 uppercase">
                      {label}
                    </dt>
                    <dd className={`whitespace-pre-line text-white/70 ${embedded ? "text-xs" : "text-sm"}`}>{value}</dd>
                  </div>
                ))}
                <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-[10px] tracking-[0.25em] text-white/35 uppercase">
                    Beskrivelse
                  </dt>
                  <dd className={`leading-relaxed text-white/70 ${embedded ? "text-xs" : "text-sm"}`}>
                    {form.description}
                  </dd>
                </div>
              </dl>
              {errors.submit && (
                <p className="mt-6 text-xs text-red-400/80">{errors.submit}</p>
              )}
            </div>
          )}
        </m.div>
      </AnimatePresence>

      <div
        className={`flex items-center justify-between gap-4 border-t border-white/[0.08] ${
          embedded ? "mt-8 pt-6" : "mt-12 pt-8"
        }`}
      >
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className={`inline-flex items-center gap-2 uppercase transition-colors hover:text-white ${
              embedded
                ? "min-h-9 text-[10px] tracking-[0.2em] text-white/45"
                : "min-h-11 text-xs tracking-[0.2em] text-white/45"
            }`}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Tilbage
          </button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
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

      {/* Honeypot — hidden from users */}
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
