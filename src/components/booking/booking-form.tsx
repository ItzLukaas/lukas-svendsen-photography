"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { FormField, fieldClass } from "@/components/forms/form-field";
import { useLocale } from "@/components/i18n/locale-provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createBookingSchema,
  productionTypes,
  type BookingInput,
} from "@/lib/booking/schema";
import { localizedHref } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "type",
    fields: ["productionType"] as const,
  },
  {
    id: "job",
    fields: ["description"] as const,
  },
  {
    id: "when",
    fields: ["datePeriod", "location"] as const,
  },
  {
    id: "contact",
    fields: ["name", "email", "phone", "company"] as const,
  },
  {
    id: "budget",
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
  const { locale, dict } = useLocale();
  const copy = dict.bookingPage.form;
  const schema = useMemo(
    () => createBookingSchema(dict.shared.validation),
    [dict.shared.validation]
  );
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
    resolver: zodResolver(schema),
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
        className="border border-foreground/10 bg-paper px-6 py-10 md:px-8 md:py-12"
        role="status"
        aria-live="polite"
      >
        <p className="label-meta">{copy.successEyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,1.85rem)] leading-[1.05] tracking-[-0.025em]">
          {copy.successTitle}
        </h2>
        <p className="text-body mt-4 max-w-md">{copy.successBody}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <button
            type="button"
            className="btn-solid"
            onClick={() => setStatus("idle")}
          >
            {copy.successAgain}
          </button>
          <Link href={localizedHref("/arbejde", locale)} className="btn-ghost">
            {copy.successPortfolio}
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
      <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-5">
        <p className="label-meta" aria-live="polite">
          {copy.stepOf
            .replace("{current}", String(stepIndex + 1))
            .replace("{total}", String(totalSteps))}
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
        {copy.stepTitles[step.id as StepId]}
      </h2>

      <div className="mt-7 min-h-[14rem]">
        {step.id === "type" ? (
          <fieldset className="space-y-3">
            <legend className="sr-only">{copy.productionTypeLegend}</legend>
            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              role="radiogroup"
              aria-label={copy.productionTypeLegend}
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
                      {copy.types[type]}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 text-[0.75rem] leading-snug",
                        selected ? "text-paper/65" : "text-muted-ink"
                      )}
                    >
                      {copy.productionHints[type]}
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
            label={copy.description}
            error={errors.description?.message}
          >
            <Textarea
              id={`${formId}-description`}
              rows={6}
              placeholder={copy.descriptionPlaceholder}
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
              label={copy.datePeriod}
              error={errors.datePeriod?.message}
            >
              <Input
                id={`${formId}-date`}
                placeholder={copy.datePeriodPlaceholder}
                aria-invalid={Boolean(errors.datePeriod)}
                className={fieldClass}
                {...register("datePeriod")}
              />
            </FormField>
            <FormField
              id={`${formId}-location`}
              label={copy.location}
              error={errors.location?.message}
            >
              <Input
                id={`${formId}-location`}
                placeholder={copy.locationPlaceholder}
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
                label={copy.name}
                error={errors.name?.message}
              >
                <Input
                  id={`${formId}-name`}
                  autoComplete="name"
                  placeholder={copy.namePlaceholder}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass}
                  {...register("name")}
                />
              </FormField>
              <FormField
                id={`${formId}-company`}
                label={copy.company}
                optional
                optionalLabel={dict.shared.optional}
                error={errors.company?.message}
              >
                <Input
                  id={`${formId}-company`}
                  autoComplete="organization"
                  placeholder={copy.companyPlaceholder}
                  aria-invalid={Boolean(errors.company)}
                  className={fieldClass}
                  {...register("company")}
                />
              </FormField>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
              <FormField
                id={`${formId}-email`}
                label={copy.email}
                error={errors.email?.message}
              >
                <Input
                  id={`${formId}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={copy.emailPlaceholder}
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass}
                  {...register("email")}
                />
              </FormField>
              <FormField
                id={`${formId}-phone`}
                label={copy.phone}
                error={errors.phone?.message}
              >
                <Input
                  id={`${formId}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={copy.phonePlaceholder}
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
              label={copy.budget}
              optional
              optionalLabel={dict.shared.optional}
              error={errors.budget?.message}
            >
              <Input
                id={`${formId}-budget`}
                placeholder={copy.budgetPlaceholder}
                aria-invalid={Boolean(errors.budget)}
                className={fieldClass}
                {...register("budget")}
              />
            </FormField>
            <p className="text-[0.875rem] leading-relaxed text-muted-ink">
              {copy.budgetNote}{" "}
              <Link
                href={localizedHref("/kontakt", locale)}
                className="font-medium text-foreground underline underline-offset-4"
              >
                {copy.budgetNoteLink}
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
              {copy.back}
            </button>
          ) : null}
          {!isLast ? (
            <button
              type="button"
              className="btn-solid"
              onClick={goNext}
            >
              {copy.continue}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-solid"
            >
              {isSubmitting ? copy.submitting : copy.submit}
            </button>
          )}
        </div>
        {status === "error" ? (
          <p
            className="text-sm text-destructive sm:max-w-xs sm:text-right"
            role="alert"
            aria-live="assertive"
          >
            {copy.errorPrefix}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4"
            >
              {dict.shared.sendEmail}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
