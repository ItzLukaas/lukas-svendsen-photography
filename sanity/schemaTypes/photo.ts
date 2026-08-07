import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Foto",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt-tekst",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orientation",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Landscape / bred", value: "landscape" },
          { title: "Portrait / høj", value: "portrait" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
    }),
    defineField({
      name: "cloudinaryId",
      title: "Cloudinary public ID",
      type: "string",
      description: "Valgfri — bruges når billedet leveres via Cloudinary.",
    }),
  ],
});
