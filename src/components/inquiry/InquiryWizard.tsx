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

export function InquiryWizard() {
  const prefersReducedMotion = useReducedMotion();
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
        className="flex flex-col items-center py-16 text-center"
      >
        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <Check size={24} strokeWidth={1.5} className="text-white" />
        </div>
        <h3 className="font-display text-2xl font-light text-white">
          Tak for din forespørgsel
        </h3>
        <p className={`mt-4 max-w-md ${sectionBody}`}>
          Jeg har modtaget dine informationer og vender tilbage hurtigst muligt.
        </p>
      </m.div>
    );
  }

  return (
    <div className="border border-white/8 bg-white/[0.02] p-8 lg:p-12">
      <InquiryProgress currentStep={step} />

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
              <h3 className="font-display text-2xl font-light text-white md:text-3xl">
                Hvad kan jeg hjælpe dig med?
              </h3>
              <p className={`mt-3 ${sectionBody}`}>
                Vælg den ydelse der passer bedst til dit projekt.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
                      className={`group flex flex-col items-start border p-6 text-left transition-all duration-500 ease-premium hover:-translate-y-0.5 ${
                        selected
                          ? "border-white/30 bg-white/[0.04]"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={`mb-5 transition-colors duration-500 ${
                          selected ? "text-white" : "text-white/40 group-hover:text-white/70"
                        }`}
                      />
                      <span className="text-sm tracking-wide text-white">
                        {service.label}
                      </span>
                      <span className="mt-2 text-xs leading-relaxed text-white/40">
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
              <h3 className="font-display text-2xl font-light text-white md:text-3xl">
                Vælg kategori
              </h3>
              <p className={`mt-3 ${sectionBody}`}>
                Hvilken type {serviceLabels[form.service].toLowerCase()} drejer det sig om?
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => update("category", cat)}
                    className={`border px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-500 ease-premium hover:-translate-y-px ${
                      form.category === cat
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
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
              <h3 className="font-display text-2xl font-light text-white md:text-3xl">
                Hvornår?
              </h3>
              <p className={`mt-3 ${sectionBody}`}>
                Vælg ønskede datoer og tidspunkter — eller marker fleksibel.
              </p>

              <label className="mt-8 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.flexibleSchedule}
                  onChange={(e) => update("flexibleSchedule", e.target.checked)}
                  className="h-4 w-4 accent-white"
                />
                <span className="text-sm text-white/60">
                  Jeg er fleksibel med dato og tidspunkt
                </span>
              </label>

              {!form.flexibleSchedule && (
                <div className="mt-8 space-y-6">
                  {form.schedule.map((slot, index) => (
                    <div
                      key={index}
                      className="grid gap-4 border border-white/8 p-5 sm:grid-cols-[1fr_auto_auto_auto]"
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
                          className="self-end pb-3 text-white/30 transition-colors hover:text-white/60"
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
                    className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-white"
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
              <h3 className="font-display text-2xl font-light text-white md:text-3xl">
                Projektinformation
              </h3>
              <p className={`mt-3 ${sectionBody}`}>
                Fortæl mig lidt om dig og dit projekt.
              </p>
              <div className="mt-10 space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
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
                <div className="grid gap-8 sm:grid-cols-2">
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
              <h3 className="font-display text-2xl font-light text-white md:text-3xl">
                Din forespørgsel
              </h3>
              <p className={`mt-3 ${sectionBody}`}>
                Gennemgå dine oplysninger inden afsendelse.
              </p>
              <dl className="mt-10 space-y-5 border-t border-white/8 pt-8">
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
                    <dd className="whitespace-pre-line text-sm text-white/70">{value}</dd>
                  </div>
                ))}
                <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-[10px] tracking-[0.25em] text-white/35 uppercase">
                    Beskrivelse
                  </dt>
                  <dd className="text-sm leading-relaxed text-white/70">
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

      <div className="mt-12 flex items-center justify-between gap-4 pt-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-white/45 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Tilbage
          </button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <button type="button" onClick={goNext} className={btnPrimary}>
            Næste
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={btnPrimary}
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
