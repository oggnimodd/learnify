import { defineField, defineType } from "sanity";

export default defineType({
  name: "chapter",
  title: "Chapter",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required().min(1).max(5000),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["http", "https"],
        }),
    }),
  ],
});
