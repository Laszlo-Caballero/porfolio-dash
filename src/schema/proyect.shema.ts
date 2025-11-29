import { z } from "zod";

const ImageSchema = z.object({
  file: z.instanceof(File),
  alt: z.string(),
});

const KeyValueSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

const DetailsSchema = z.object({
  role: z.string(),
  time: z.string(),
  status: z.string(),
  team: z.string().optional(),
});

const ArquitectureSchema = z.object({
  title: z.string().min(1),
  badges: z.array(z.string().min(1)).optional().default([]),
  detail: z.array(KeyValueSchema).optional().default([]),
  colSpan: z.number().optional().default(1),
});

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  urlImage: ImageSchema,
  images: z.array(ImageSchema),
  githubUrl: z.string().url(),
  githubBackendUrl: z.string().url().optional(),
  tecnologies: z.array(z.string()),
  details: DetailsSchema,
  resume: z.string(),
  objectives: z.array(z.string()),
  learnings: z.array(z.string()),
  outStanding: z.boolean().optional().default(false),
  arquitecture: z.array(ArquitectureSchema).min(2),
});

export type Project = z.infer<typeof ProjectSchema>;
