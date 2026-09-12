"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormField, fieldClass } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { productionTypes } from "@/lib/booking/schema";
import {
  contactSchema,
  type ContactInput,
} from "@/lib/contact/schema";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactForm() {
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
      projectType: "",
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
      <div
        className="border border-foreground/10 bg-paper px-6 py-10 md:px-8 md:py-12"
        role="status"
        aria-live="polite"
      >
        <p className="label-meta">Sendt</p>
        <h2 className="mt-3 font-display text-[1.5rem] leading-tight tracking-[-0.025em] md:text-[1.75rem]">
          Tak for din besked
        </h2>
        <p className="text-body mt-4 max-w-md">
          Jeg vender tilbage snart. Har du travlt, kan du ringe eller skrive
          direkte.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-quiet text-[0.9375rem] font-medium underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="link-quiet text-[0.9375rem] font-medium underline underline-offset-4"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
        <button
          type="button"
          className="btn-ghost mt-10"
          onClick={() => setStatus("idle")}
        >
          Send en ny besked
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <FormField id="name" label="Navn" error={errors.name?.message}>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          className={fieldClass}
          {...register("name")}
        />
      </FormField>

      <FormField id="email" label="E-mail" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className={fieldClass}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="phone"
        label="Telefon"
        optional
        error={errors.phone?.message}
      >
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          className={fieldClass}
          {...register("phone")}
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

      <FormField
        id="projectType"
        label="Type af projekt"
        optional
        error={errors.projectType?.message}
      >
        <select
          id="projectType"
          aria-invalid={Boolean(errors.projectType)}
          className={cn(
            fieldClass,
            "h-11 appearance-none bg-[length:0.75rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
            "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 fill=%27none%27%3E%3Cpath stroke=%27%2371716d%27 stroke-width=%271.5%27 d=%27m1 1 5 5 5-5%27/%3E%3C/svg%3E')]"
          )}
          {...register("projectType")}
        >
          <option value="">Vælg type</option>
          {productionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="message" label="Besked" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={5}
          placeholder="Skriv kort om opgaven, dato og hvad materialet skal bruges til…"
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldClass, "min-h-32 resize-y")}
          {...register("message")}
        />
      </FormField>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-solid bg-ink text-paper"
        >
          {isSubmitting ? "Sender…" : "Send besked"}
        </button>
        <p className="text-[0.85rem] text-muted-ink">
          Eller skriv til{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-quiet underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>

      <div aria-live="polite" className="min-h-6 text-[0.95rem]">
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
