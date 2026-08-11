"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { FormField, fieldClass } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  bookingSchema,
  productionTypes,
  type BookingInput,
} from "@/lib/booking/schema";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const productionHints: Record<(typeof productionTypes)[number], string> = {
  Fotografering: "Koncert, event, sport eller brand",
  Videoproduktion: "Aftermovie, eventfilm, korte klip",
  Droneproduktion: "Luftfoto og video",
  Content: "Sociale medier, web, kampagner",
  Andet: "Fortæl gerne mere nedenfor",
};

const STEPS = [
  {
    id: "type",
    title: "Type",
    fields: ["productionType"] as const,
  },
  {
    id: "job",
    title: "Opgave",
    fields: ["description"] as const,
  },
  {
    id: "when",
    title: "Tid & sted",
    fields: ["datePeriod", "location"] as const,
  },
  {
    id: "contact",
    title: "Kontakt",
    fields: ["name", "email", "phone", "company"] as const,
  },
  {
    id: "budget",
    title: "Afslut",
    fields: ["budget"] as const,
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

function getInitialProductionType(searchParams: URLSearchParams) {
  const type = searchParams.get("type");
  return productionTypes.includes(type as (typeof productionTypes)[number])
    ? (type as (typeof productionTypes)[number])
    : "Fotografering";
}

export function BookingForm() {
  const searchParams = useSearchParams();
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      productionType: getInitialProductionType(searchParams),
      datePeriod: "",
      location: "",
      description: "",
      budget: "",
    },
  });

  const productionType = watch("productionType");
  const step = STEPS[stepIndex];
  const totalSteps = STEPS.length;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  async function goNext() {
    const valid = await trigger([...step.fields]);
    if (!valid) return;
    setStepIndex((current) => Math.min(current + 1, totalSteps - 1));
  }

  function goBack() {
    setStatus("idle");
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  async function onSubmit(values: BookingInput) {
    setStatus("idle");
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Booking failed");
      reset({
        name: "",
        company: "",
        email: "",
        phone: "",
        productionType: getInitialProductionType(searchParams),
        datePeriod: "",
        location: "",
        description: "",
        budget: "",
      });
      setStepIndex(0);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="border border-foreground/10 bg-[color-mix(in_srgb,var(--ink)_2.5%,var(--paper))] px-6 py-10 md:px-8 md:py-12"
        role="status"
        aria-live="polite"
      >
        <p className="label-meta">Modtaget</p>
        <h2 className="mt-3 font-display text-[clamp(1.65rem,3vw,2.1rem)] leading-[1.05] tracking-[-0.025em]">
          Tak for din forespørgsel.
        </h2>
        <p className="text-body mt-4 max-w-md">
          Jeg har modtaget din bookingforespørgsel og vender tilbage snarest —
          typisk inden for 1–2 hverdage.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <button
            type="button"
            className="btn-solid bg-ink text-paper"
            onClick={() => setStatus("idle")}
          >
            Send en ny forespørgsel
          </button>
          <Link href="/arbejde" className="btn-ghost">
            Se portfolio
          </Link>
        </div>
      </div>
    );
  }

  const stepTitles: Record<StepId, string> = {
    type: "Hvad skal du bruge?",
    job: "Fortæl om opgaven",
    when: "Hvornår og hvor?",
    contact: "Hvordan når jeg dig?",
    budget: "Budget og afslut",
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-foreground/10 bg-paper px-5 py-8 md:px-8 md:py-10"
      noValidate
    >
      <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-5">
        <p className="label-meta" aria-live="polite">
          Trin {stepIndex + 1} af {totalSteps}
        </p>
        <ol className="m-0 flex list-none items-center gap-1.5 p-0" aria-hidden>
          {STEPS.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                "h-1 w-5 transition-[background-color,width] duration-300 sm:w-6",
                index <= stepIndex ? "bg-ink" : "bg-foreground/15",
                index === stepIndex && "w-7 sm:w-8"
              )}
            />
          ))}
        </ol>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-7 font-display text-[clamp(1.35rem,2.6vw,1.75rem)] leading-[1.1] tracking-[-0.025em] outline-none"
      >
        {stepTitles[step.id]}
      </h2>

      <div className="mt-7 min-h-[14rem]">
        {step.id === "type" ? (
          <fieldset className="space-y-3">
            <legend className="sr-only">Type produktion</legend>
            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              role="radiogroup"
              aria-label="Type produktion"
            >
              {productionTypes.map((type) => {
                const selected = productionType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      setValue("productionType", type, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={cn(
                      "flex min-h-14 flex-col items-start justify-center border px-4 py-3 text-left transition-[border-color,background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                      selected
                        ? "border-ink bg-ink text-paper"
                        : "border-foreground/15 bg-transparent hover:border-foreground/30"
                    )}
                  >
                    <span className="text-[0.875rem] font-medium tracking-[-0.01em]">
                      {type}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 text-[0.75rem] leading-snug",
                        selected ? "text-paper/65" : "text-muted-ink"
                      )}
                    >
                      {productionHints[type]}
                    </span>
                  </button>
                );
              })}
            </div>
            <input type="hidden" {...register("productionType")} />
            {errors.productionType?.message ? (
              <p className="text-sm text-destructive" role="alert">
                {errors.productionType.message}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {step.id === "job" ? (
          <FormField
            id={`${formId}-description`}
            label="Om opgaven"
            error={errors.description?.message}
          >
            <Textarea
              id={`${formId}-description`}
              rows={6}
              placeholder="Hvad skal jeg levere, og hvad er vigtigt for dig?"
              aria-invalid={Boolean(errors.description)}
              className={cn(fieldClass, "min-h-36 resize-y")}
              {...register("description")}
            />
          </FormField>
        ) : null}

        {step.id === "when" ? (
          <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
            <FormField
              id={`${formId}-date`}
              label="Dato / periode"
              error={errors.datePeriod?.message}
            >
              <Input
                id={`${formId}-date`}
                placeholder="Fx 12. juni eller uge 24"
                aria-invalid={Boolean(errors.datePeriod)}
                className={fieldClass}
                {...register("datePeriod")}
              />
            </FormField>
            <FormField
              id={`${formId}-location`}
              label="Lokation"
              error={errors.location?.message}
            >
              <Input
                id={`${formId}-location`}
                placeholder="Fx Grindsted, Esbjerg eller venue"
                aria-invalid={Boolean(errors.location)}
                className={fieldClass}
                {...register("location")}
              />
            </FormField>
          </div>
        ) : null}

        {step.id === "contact" ? (
          <div className="space-y-7">
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
              <FormField
                id={`${formId}-name`}
                label="Navn"
                error={errors.name?.message}
              >
                <Input
                  id={`${formId}-name`}
                  autoComplete="name"
                  placeholder="Dit fulde navn"
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass}
                  {...register("name")}
                />
              </FormField>
              <FormField
                id={`${formId}-company`}
                label="Virksomhed / organisation"
                optional
                error={errors.company?.message}
              >
                <Input
                  id={`${formId}-company`}
                  autoComplete="organization"
                  placeholder="Fx festival, brand eller firma"
                  aria-invalid={Boolean(errors.company)}
                  className={fieldClass}
                  {...register("company")}
                />
              </FormField>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
              <FormField
                id={`${formId}-email`}
                label="E-mail"
                error={errors.email?.message}
              >
                <Input
                  id={`${formId}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="dig@email.dk"
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass}
                  {...register("email")}
                />
              </FormField>
              <FormField
                id={`${formId}-phone`}
                label="Telefon"
                error={errors.phone?.message}
              >
                <Input
                  id={`${formId}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="8-cifret nummer"
                  aria-invalid={Boolean(errors.phone)}
                  className={fieldClass}
                  {...register("phone")}
                />
              </FormField>
            </div>
          </div>
        ) : null}

        {step.id === "budget" ? (
          <div className="space-y-6">
            <FormField
              id={`${formId}-budget`}
              label="Budget"
              optional
              error={errors.budget?.message}
            >
              <Input
                id={`${formId}-budget`}
                placeholder="Fx 5–10.000 kr. eller aftales"
                aria-invalid={Boolean(errors.budget)}
                className={fieldClass}
                {...register("budget")}
              />
            </FormField>
            <p className="text-[0.875rem] leading-relaxed text-muted-ink">
              Ingen binding — jeg vender tilbage med afklaring. Hellere starte
              blødt?{" "}
              <Link
                href="/kontakt"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Send en kort besked
              </Link>
              .
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {!isFirst ? (
            <button
              type="button"
              className="btn-ghost"
              onClick={goBack}
              disabled={isSubmitting}
            >
              Tilbage
            </button>
          ) : null}
          {!isLast ? (
            <button
              type="button"
              className="btn-solid bg-ink text-paper"
              onClick={goNext}
            >
              Fortsæt
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-solid bg-ink text-paper"
            >
              {isSubmitting ? "Sender…" : "Send bookingforespørgsel"}
            </button>
          )}
        </div>
        {status === "error" ? (
          <p
            className="text-sm text-destructive sm:max-w-xs sm:text-right"
            role="alert"
            aria-live="assertive"
          >
            Noget gik galt. Prøv igen, eller skriv til{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
