"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { FormField, fieldClass } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  type ContactInput,
} from "@/lib/contact/schema";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Compact contact form — shared field system, clear feedback.
 */
export function HomeCtaForm() {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Contact failed");
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-5 py-2" role="status" aria-live="polite">
        <p className="font-display text-[1.125rem] tracking-[-0.02em] text-ink">
          Tak. Jeg vender tilbage snart.
        </p>
        <button
          type="button"
          className="btn-ghost mt-5"
          onClick={() => setStatus("idle")}
        >
          Send en ny forespørgsel
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 space-y-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
        <FormField
          id={`${formId}-name`}
          label="Navn"
          error={errors.name?.message}
        >
          <Input
            id={`${formId}-name`}
            autoComplete="name"
            placeholder="Dit navn"
            aria-invalid={Boolean(errors.name)}
            className={fieldClass}
            {...register("name")}
          />
        </FormField>

        <FormField
          id={`${formId}-email`}
          label="E-mail"
          error={errors.email?.message}
        >
          <Input
            id={`${formId}-email`}
            type="email"
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
          optional
          error={errors.phone?.message}
        >
          <Input
            id={`${formId}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="Telefon"
            aria-invalid={Boolean(errors.phone)}
            className={fieldClass}
            {...register("phone")}
          />
        </FormField>
      </div>

      <FormField
        id={`${formId}-message`}
        label="Besked"
        error={errors.message?.message}
      >
        <Textarea
          id={`${formId}-message`}
          rows={4}
          placeholder="Fortæl kort om projektet…"
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldClass, "min-h-[6.75rem] resize-y py-2.5")}
          {...register("message")}
        />
      </FormField>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-solid bg-ink text-paper"
        >
          {isSubmitting ? "Sender…" : "Send forespørgsel"}
        </button>
      </div>

      <div aria-live="polite" className="min-h-5 text-[0.8125rem]">
        {status === "error" ? (
          <p className="text-destructive" role="alert">
            Noget gik galt. Prøv igen, eller skriv til{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
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
