import { z } from "zod";

const ImageSchema = z.object({
  file: z.instanceof(File),
  alt: z.string(),
});

const DetailsSchema = z.object({
  role: z.string(),
  time: z.string(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  urlImage: ImageSchema,
  images: z.array(ImageSchema),
  githubUrl: z.string().url(),
  tecnologies: z.array(z.string()),
  details: DetailsSchema,
  resume: z.string(),
  objectives: z.array(z.string()),
  learnings: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;
