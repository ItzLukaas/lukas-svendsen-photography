"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Loader2,
  X,
} from "lucide-react";
import { inquiryTaskTypes, TOTAL_INQUIRY_STEPS } from "@/data/inquiry-form";
import { InquiryProgress } from "./InquiryProgress";
import { SuccessCheckmark } from "./SuccessCheckmark";
import { btnPrimary } from "@/lib/styles";
import { trackInquirySubmit } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import {
  buildEndTime,
  buildLocation,
  clearInquiryDraft,
  initialInquiryDraft,
  loadInquiryDraft,
  mapTaskTypeToService,
  saveInquiryDraft,
  type InquiryDraft,
  type TaskType,
} from "@/lib/inquiry-draft";

const btnPrimaryCompact =
  "group inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-foreground/20 px-7 py-2.5 text-[10px] tracking-[0.2em] text-foreground uppercase transition-[color,background-color,transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-px hover:border-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-sm)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const sectionBodyCompact =
  "text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-[1.7]";

const inputClass =
  "peer w-full border-b border-border bg-transparent px-0 py-3.5 text-foreground placeholder-white/20 transition-[color,border-color] duration-500 ease-premium focus:border-foreground/20 focus:outline-none";

const textareaClass =
  "w-full resize-none border-0 bg-transparent px-0 py-3.5 text-foreground placeholder-white/20 transition-colors duration-500 ease-premium focus:outline-none";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        className="mb-2.5 block text-xs tracking-widest text-muted uppercase"
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
      return draft.taskType ? undefined : "Vælg en opgavetype";
    case "taskTypeOther":
      return draft.taskType === "Andet" && !draft.taskTypeOther.trim()
        ? "Beskriv din opgave"
        : undefined;
    case "date":
      if (draft.flexibleSchedule) return undefined;
      return draft.date ? undefined : "Vælg en dato";
    case "startTime":
      if (draft.flexibleSchedule) return undefined;
      return draft.startTime ? undefined : "Vælg starttidspunkt";
    case "endTime":
      if (draft.flexibleSchedule || !draft.endTime) return undefined;
      return draft.endTime > draft.startTime
        ? undefined
        : "Sluttidspunkt skal være efter start";
    case "address":
      return draft.address.trim().length >= 2
        ? undefined
        : "Adresse skal udfyldes";
    case "city":
      return draft.city.trim().length >= 2 ? undefined : "By skal udfyldes";
    case "description":
      return draft.description.trim().length >= 20
        ? undefined
        : "Beskriv projektet med mindst 20 tegn";
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

  if (step === 2 && !draft.flexibleSchedule) {
    for (const key of ["date", "startTime", "endTime"] as const) {
      const err = validateField(key, draft);
      if (err) errors[key] = err;
    }
  }

  if (step === 3) {
    for (const key of ["address", "city"] as const) {
      const err = validateField(key, draft);
      if (err) errors[key] = err;
    }
  }

  if (step === 4) {
    const err = validateField("description", draft);
    if (err) errors.description = err;
  }

  if (step === 5) {
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<InquiryDraft>(initialInquiryDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());

  const primaryBtnClass = embedded ? btnPrimaryCompact : btnPrimary;
  const stepHeadingClass = embedded
    ? "font-display text-xl font-light text-foreground md:text-2xl"
    : "font-display text-2xl font-light text-foreground md:text-3xl";
  const bodyClass = embedded ? sectionBodyCompact : "text-base leading-relaxed text-muted md:text-[1.05rem] md:leading-[1.75]";

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

  const handleReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        referenceImage: "Kun billedfiler er tilladt",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        referenceImage: "Billedet må max være 5 MB",
      }));
      return;
    }

    if (referencePreview) URL.revokeObjectURL(referencePreview);
    setReferencePreview(URL.createObjectURL(file));
    update("referenceImageName", file.name);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.referenceImage;
      return next;
    });
  };

  const clearReference = () => {
    if (referencePreview) URL.revokeObjectURL(referencePreview);
    setReferencePreview(null);
    update("referenceImageName", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    const contactErrors = validateStep(5, form);
    if (Object.keys(contactErrors).length > 0) {
      setErrors(contactErrors);
      setStep(5);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const service = mapTaskTypeToService(form.taskType!);
      const location = buildLocation(form);
      let description = form.description.trim();

      if (form.referenceImageName) {
        description += `\n\nReferencebillede: ${form.referenceImageName} (sendes gerne separat på mail ved behov)`;
      }

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
                endTime: buildEndTime(form.startTime, form.endTime),
              },
            ],
        flexibleSchedule: form.flexibleSchedule,
        name: form.name.trim(),
        company: form.company.trim() || undefined,
        email: form.email.trim(),
        phone: form.phone.trim(),
        location,
        description,
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
      clearReference();
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
        className={`flex items-center justify-center ${embedded ? "min-h-[320px]" : "min-h-[420px]"}`}
        aria-hidden="true"
      >
        <Loader2 className="h-5 w-5 animate-spin text-muted" strokeWidth={1.5} />
      </div>
    );
  }

  if (submitted) {
    return (
      <m.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`flex flex-col items-center text-center ${embedded ? "py-12" : "py-16"}`}
      >
        <SuccessCheckmark size={embedded ? "sm" : "md"} />
        <h3
          className={`mt-6 font-display font-light text-foreground ${embedded ? "text-xl" : "text-2xl"}`}
        >
          Tak for din bookingforespørgsel
        </h3>
        <p className={`mt-3 max-w-md ${bodyClass}`}>
          Jeg har modtaget dine informationer og vender tilbage hurtigst muligt —
          typisk inden for 24 timer på hverdage.
        </p>
      </m.div>
    );
  }

  const slideVariants = {
    enter: prefersReducedMotion ? {} : { opacity: 0, x: 24, filter: "blur(4px)" },
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: prefersReducedMotion ? {} : { opacity: 0, x: -24, filter: "blur(4px)" },
  };

  return (
    <div className={embedded ? "p-0" : "border border-border bg-accent/80 p-8 backdrop-blur-sm lg:p-12"}>
      <InquiryProgress currentStep={step} compact={embedded} />

      <div ref={stepRef}>
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: EASE }}
          >
            {step === 1 && (
              <div>
                <h3 className={stepHeadingClass}>Hvilken type opgave drejer det sig om?</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Vælg den kategori der bedst matcher dit projekt.
                </p>
                <div
                  className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${embedded ? "mt-7" : "mt-10"}`}
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
                          if (task.id !== "Andet") update("taskTypeOther", "");
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
                        <span className={`tracking-wide text-foreground ${embedded ? "text-xs" : "text-sm"}`}>
                          {task.label}
                        </span>
                        <span className={`mt-1 leading-relaxed text-muted ${embedded ? "text-[11px]" : "text-xs"}`}>
                          {task.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {form.taskType === "Andet" && (
                  <div className="mt-8">
                    <FormField
                      id="taskTypeOther"
                      label="Beskriv opgaven"
                      error={errors.taskTypeOther}
                    >
                      <input
                        id="taskTypeOther"
                        value={form.taskTypeOther}
                        onChange={(e) => update("taskTypeOther", e.target.value)}
                        onBlur={() => touch("taskTypeOther")}
                        className={inputClass}
                        placeholder="Fortæl kort hvad du har brug for"
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
                <h3 className={stepHeadingClass}>Hvornår skal det ske?</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Vælg dato og tidspunkter — eller marker at du er fleksibel.
                </p>

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-sm border border-border/80 bg-accent/50 px-4 transition-colors hover:border-foreground/15 ${embedded ? "mt-6 min-h-10 py-3" : "mt-8 min-h-11 py-3.5"}`}
                >
                  <input
                    type="checkbox"
                    checked={form.flexibleSchedule}
                    onChange={(e) => update("flexibleSchedule", e.target.checked)}
                    className="h-4 w-4 accent-white"
                  />
                  <span className={`text-foreground/70 ${embedded ? "text-xs" : "text-sm"}`}>
                    Jeg er fleksibel med dato og tidspunkt
                  </span>
                </label>

                {!form.flexibleSchedule && (
                  <div className={`grid gap-6 sm:grid-cols-2 ${embedded ? "mt-7" : "mt-10"}`}>
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
                    <FormField id="startTime" label="Starttidspunkt" error={errors.startTime}>
                      <input
                        id="startTime"
                        type="time"
                        value={form.startTime}
                        onChange={(e) => update("startTime", e.target.value)}
                        onBlur={() => touch("startTime")}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </FormField>
                    <FormField
                      id="endTime"
                      label="Sluttidspunkt"
                      optional
                      error={errors.endTime}
                    >
                      <input
                        id="endTime"
                        type="time"
                        value={form.endTime}
                        onChange={(e) => update("endTime", e.target.value)}
                        onBlur={() => touch("endTime")}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </FormField>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className={stepHeadingClass}>Hvor finder det sted?</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Angiv adresse og by — tilføj eventuelt navnet på arrangementet.
                </p>
                <div className={`space-y-6 ${embedded ? "mt-7" : "mt-10"}`}>
                  <FormField id="address" label="Adresse" error={errors.address}>
                    <input
                      id="address"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      onBlur={() => touch("address")}
                      autoComplete="street-address"
                      className={inputClass}
                      placeholder="Gade og nummer"
                    />
                  </FormField>
                  <FormField id="city" label="By" error={errors.city}>
                    <input
                      id="city"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      onBlur={() => touch("city")}
                      autoComplete="address-level2"
                      className={inputClass}
                      placeholder="Fx Grindsted, Billund, København"
                    />
                  </FormField>
                  <FormField id="eventName" label="Arrangement / event" optional>
                    <input
                      id="eventName"
                      value={form.eventName}
                      onChange={(e) => update("eventName", e.target.value)}
                      className={inputClass}
                      placeholder="Fx DM i håndbold, firmaevent, koncert"
                    />
                  </FormField>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className={stepHeadingClass}>Beskriv dit projekt</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Fortæl hvad du ønsker — jo mere detaljer, desto bedre kan jeg forberede mig.
                </p>
                <div className={`space-y-6 ${embedded ? "mt-7" : "mt-10"}`}>
                  <FormField id="description" label="Beskrivelse" error={errors.description}>
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      onBlur={() => touch("description")}
                      rows={embedded ? 6 : 8}
                      className={textareaClass}
                      placeholder="Hvad skal der fotograferes/filmes? Hvem er målgruppen? Er der særlige ønsker til stil, leverance eller deadline?"
                    />
                  </FormField>

                  <div>
                    <p className="mb-2.5 text-xs tracking-widest text-muted uppercase">
                      Referencebillede
                      <span className="ml-2 normal-case tracking-normal text-muted-subtle">
                        (valgfri)
                      </span>
                    </p>
                    {referencePreview ? (
                      <div className="relative inline-block overflow-hidden rounded-sm border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={referencePreview}
                          alt="Referencebillede preview"
                          className="max-h-40 w-auto object-cover"
                        />
                        <button
                          type="button"
                          onClick={clearReference}
                          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/80 text-muted backdrop-blur-sm transition-colors hover:text-foreground"
                          aria-label="Fjern referencebillede"
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="group flex min-h-24 w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-accent/40 px-4 py-6 transition-all duration-500 ease-premium hover:border-foreground/20 hover:bg-accent/70"
                      >
                        <ImagePlus
                          size={20}
                          strokeWidth={1.5}
                          className="text-muted transition-colors group-hover:text-foreground/70"
                        />
                        <span className="text-xs text-muted transition-colors group-hover:text-foreground/70">
                          Upload referencebillede
                        </span>
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleReferenceChange}
                      className="sr-only"
                      aria-label="Upload referencebillede"
                    />
                    {errors.referenceImage && (
                      <p className="mt-2 text-xs text-red-400/85" role="alert">
                        {errors.referenceImage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className={stepHeadingClass}>Hvordan kan jeg kontakte dig?</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Dine oplysninger deles kun med mig og bruges til at vende tilbage på din forespørgsel.
                </p>
                <div className={`space-y-6 ${embedded ? "mt-7" : "mt-10"}`}>
                  <div className={`grid gap-6 sm:grid-cols-2 ${embedded ? "gap-5" : "gap-8"}`}>
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
                        placeholder="+45 24 46 35 50"
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && form.taskType && (
              <div>
                <h3 className={stepHeadingClass}>Opsummering</h3>
                <p className={`mt-2 ${bodyClass}`}>
                  Gennemgå dine oplysninger inden du sender bookingforespørgslen.
                </p>
                <dl
                  className={`space-y-5 rounded-sm border border-border bg-accent/60 backdrop-blur-sm ${
                    embedded ? "mt-7 p-5 sm:p-6" : "mt-10 p-6 sm:p-8"
                  }`}
                >
                  {[
                    ["Type", form.taskType === "Andet" ? `Andet — ${form.taskTypeOther}` : form.taskType],
                    [
                      "Hvornår",
                      form.flexibleSchedule
                        ? "Fleksibel"
                        : `${formatDateDa(form.date)} · ${form.startTime}${form.endTime ? `–${form.endTime}` : ""}`,
                    ],
                    [
                      "Hvor",
                      buildLocation(form) || "—",
                    ],
                    [
                      "Kontakt",
                      `${form.name}${form.company ? ` · ${form.company}` : ""}\n${form.email} · ${form.phone}`,
                    ],
                  ].map(([label, value]) => (
                    <div key={label} className="grid gap-1 sm:grid-cols-[120px_1fr]">
                      <dt className="text-[10px] tracking-[0.25em] text-muted uppercase">
                        {label}
                      </dt>
                      <dd
                        className={`whitespace-pre-line text-foreground/75 ${embedded ? "text-xs" : "text-sm"}`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                  <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
                    <dt className="text-[10px] tracking-[0.25em] text-muted uppercase">
                      Beskrivelse
                    </dt>
                    <dd className={`leading-relaxed text-foreground/75 ${embedded ? "text-xs" : "text-sm"}`}>
                      {form.description}
                    </dd>
                  </div>
                  {form.referenceImageName && (
                    <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
                      <dt className="text-[10px] tracking-[0.25em] text-muted uppercase">
                        Reference
                      </dt>
                      <dd className={`text-foreground/75 ${embedded ? "text-xs" : "text-sm"}`}>
                        {form.referenceImageName}
                      </dd>
                    </div>
                  )}
                </dl>
                {errors.submit && (
                  <p className="mt-6 text-xs text-red-400/85" role="alert">
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
          embedded ? "mt-8 pt-6" : "mt-12 pt-8"
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
            className={`${primaryBtnClass} ${embedded ? "" : "min-h-14 px-12 text-sm"}`}
          >
            {loading ? (
              <>
                <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
                Sender...
              </>
            ) : (
              "Send bookingforespørgsel"
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
