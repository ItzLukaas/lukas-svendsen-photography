import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "discipline",
      title: "Filterkategori",
      type: "string",
      options: {
        list: [
          { title: "Koncerter", value: "koncerter" },
          { title: "Sport", value: "sport" },
          { title: "Events", value: "events" },
          { title: "Erhverv", value: "erhverv" },
          { title: "Portrætter", value: "portraetter" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Visningskategori",
      type: "string",
      description: 'Fx "Festival", "Sport", "Event" eller "Koncert"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "galleryFormat",
      title: "Galleriformat",
      type: "string",
      options: {
        list: [
          { title: "Mixed (portrait + landscape)", value: "mixed" },
          { title: "Wide (primært landscape)", value: "wide" },
          {
            title: "Festival (koncertportrætter + atmosfære)",
            value: "festival",
          },
        ],
        layout: "radio",
      },
      initialValue: "mixed",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "År",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Sted",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Kort tekst",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "Vis på forsiden",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "photo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Billeder",
      type: "array",
      of: [{ type: "photo" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "cover.asset",
    },
  },
});
