"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import {
  FormField,
  fieldClass,
} from "@/components/forms/form-field";
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
  Videoproduktion: "Aftermovie, eventfilm, content",
  Droneproduktion: "Luftfoto og video fra oven",
  Andet: "Fortæl mig gerne mere nedenfor",
};

function getInitialProductionType(searchParams: URLSearchParams) {
  const type = searchParams.get("type");
  return productionTypes.includes(type as (typeof productionTypes)[number])
    ? (type as (typeof productionTypes)[number])
    : "Fotografering";
}

export function BookingForm() {
  const searchParams = useSearchParams();
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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
            Se mit arbejde
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-foreground/10 bg-paper px-5 py-8 md:px-8 md:py-10"
      noValidate
    >
      <div className="space-y-9">
        <fieldset className="space-y-3">
          <legend className="label-meta">Type produktion</legend>
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
                    "flex min-h-14 flex-col items-start justify-center border px-4 py-3 text-left transition-[border-color,background-color] duration-300",
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
            label="Email"
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

        <FormField
          id={`${formId}-description`}
          label="Om opgaven"
          error={errors.description?.message}
        >
          <Textarea
            id={`${formId}-description`}
            rows={5}
            placeholder="Hvad skal jeg levere, og hvad er vigtigt for dig?"
            aria-invalid={Boolean(errors.description)}
            className={cn(fieldClass, "min-h-32 resize-y")}
            {...register("description")}
          />
        </FormField>

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
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-foreground/10 pt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-solid w-full justify-center bg-ink text-paper sm:w-auto"
        >
          {isSubmitting ? "Sender…" : "Send bookingforespørgsel"}
        </button>
        <p className="text-[0.8125rem] leading-relaxed text-muted-ink">
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
        {status === "error" ? (
          <p className="text-sm text-destructive" role="alert" aria-live="assertive">
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
