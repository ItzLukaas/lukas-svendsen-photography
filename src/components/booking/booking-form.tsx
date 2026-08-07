"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FormField,
  fieldClass,
  selectClass,
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

function getInitialProductionType(searchParams: URLSearchParams) {
  const type = searchParams.get("type");
  return productionTypes.includes(type as (typeof productionTypes)[number])
    ? (type as (typeof productionTypes)[number])
    : "Fotografering";
}

export function BookingForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="grid gap-8 md:grid-cols-2">
        <FormField id="name" label="Navn" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={fieldClass}
            {...register("name")}
          />
        </FormField>
        <FormField
          id="company"
          label="Virksomhed"
          optional
          error={errors.company?.message}
        >
          <Input
            id="company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            className={fieldClass}
            {...register("company")}
          />
        </FormField>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <FormField id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={fieldClass}
            {...register("email")}
          />
        </FormField>
        <FormField id="phone" label="Telefon" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={fieldClass}
            {...register("phone")}
          />
        </FormField>
      </div>

      <FormField
        id="productionType"
        label="Type produktion"
        error={errors.productionType?.message}
      >
        <select
          id="productionType"
          aria-invalid={Boolean(errors.productionType)}
          className={selectClass}
          {...register("productionType")}
        >
          {productionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid gap-8 md:grid-cols-2">
        <FormField
          id="datePeriod"
          label="Dato / periode"
          error={errors.datePeriod?.message}
        >
          <Input
            id="datePeriod"
            placeholder="Fx 12. juni eller uge 24"
            aria-invalid={Boolean(errors.datePeriod)}
            className={fieldClass}
            {...register("datePeriod")}
          />
        </FormField>
        <FormField
          id="location"
          label="Lokation"
          error={errors.location?.message}
        >
          <Input
            id="location"
            placeholder="By / venue"
            aria-invalid={Boolean(errors.location)}
            className={fieldClass}
            {...register("location")}
          />
        </FormField>
      </div>

      <FormField
        id="description"
        label="Beskrivelse af opgaven"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          rows={5}
          placeholder="Hvad skal jeg levere, og hvad er vigtigt for dig?"
          aria-invalid={Boolean(errors.description)}
          className={cn(fieldClass, "min-h-32 resize-y")}
          {...register("description")}
        />
      </FormField>

      <FormField
        id="budget"
        label="Budget"
        optional
        error={errors.budget?.message}
      >
        <Input
          id="budget"
          placeholder="Fx 5–10.000 kr. eller aftales"
          aria-invalid={Boolean(errors.budget)}
          className={fieldClass}
          {...register("budget")}
        />
      </FormField>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-solid bg-ink text-paper"
        >
          {isSubmitting ? "Sender…" : "Send bookingforespørgsel"}
        </button>
        <p className="text-[0.85rem] text-muted-ink">
          Eller start med en{" "}
          <Link href="/kontakt" className="link-quiet underline underline-offset-4">
            kort besked
          </Link>
        </p>
      </div>

      <div aria-live="polite" className="min-h-6 text-[0.95rem]">
        {status === "success" ? (
          <p>
            Tak. Jeg har modtaget din forespørgsel og vender tilbage snarest.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-destructive">
            Noget gik galt. Prøv igen, eller skriv til{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        ) : null}
      </div>
    </form>
  );
}
