"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

      <FormField id="message" label="Besked" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={5}
          placeholder="Hvad kan jeg hjælpe med?"
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
        {status === "success" ? (
          <p>Tak for din besked — jeg vender tilbage snart.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-destructive">
            Noget gik galt. Prøv igen, eller send mig en mail.
          </p>
        ) : null}
      </div>
    </form>
  );
}
