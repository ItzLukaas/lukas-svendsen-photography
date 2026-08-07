import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Siteindstillinger",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon (tel-link)",
      type: "string",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Telefon (vist)",
      type: "string",
    }),
    defineField({
      name: "aboutHeadline",
      title: "Om-overskrift",
      type: "string",
    }),
    defineField({
      name: "aboutBody",
      title: "Om-tekst",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
