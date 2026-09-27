"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FormField,
  fieldClass,
  selectClass,
} from "@/components/forms/form-field";
import { useLocale } from "@/components/i18n/locale-provider";
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
  const { dict } = useLocale();
  const copy = dict.contactPage.form;
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
        <p className="label-meta">{copy.successEyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,1.85rem)] leading-tight tracking-[-0.025em]">
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
          <a href={`mailto:${siteConfig.email}`} className="btn-ghost">
            {dict.shared.sendEmail}
          </a>
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
      <div className="space-y-8">
        <FormField
          id="name"
          label={copy.name}
          error={errors.name?.message}
        >
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={fieldClass}
            {...register("name")}
          />
        </FormField>

        <FormField
          id="email"
          label={copy.email}
          error={errors.email?.message}
        >
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
          label={copy.phone}
          optional
          optionalLabel={copy.optional}
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
          label={copy.company}
          optional
          optionalLabel={copy.optional}
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
          label={copy.projectType}
          optional
          optionalLabel={copy.optional}
          error={errors.projectType?.message}
        >
          <select
            id="projectType"
            aria-invalid={Boolean(errors.projectType)}
            className={selectClass}
            {...register("projectType")}
          >
            <option value="">{copy.projectTypePlaceholder}</option>
            {productionTypes.map((type) => (
              <option key={type} value={type}>
                {copy.types[type]}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="message"
          label={copy.message}
          error={errors.message?.message}
        >
          <Textarea
            id="message"
            rows={5}
            placeholder={copy.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            className={cn(fieldClass, "min-h-32 resize-y")}
            {...register("message")}
          />
        </FormField>
      </div>

      <div className="mt-8 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={isSubmitting} className="btn-solid">
          {isSubmitting ? copy.submitting : copy.submit}
        </button>
        <p className="text-[0.85rem] text-muted-ink">
          {copy.orEmail}{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-quiet underline underline-offset-4"
          >
            {dict.shared.sendEmail}
          </a>
        </p>
      </div>

      <div aria-live="polite" className="min-h-6 text-[0.95rem]">
        {status === "error" ? (
          <p className="text-destructive" role="alert">
            {copy.errorPrefix}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
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
