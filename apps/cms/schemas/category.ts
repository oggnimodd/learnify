import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "courses",
      title: "Courses",
      type: "array",
      of: [{ type: "reference", to: { type: "course" } }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
