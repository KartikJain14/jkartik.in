import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // '_'-prefixed files (e.g. _template.md, _draft.md) are ignored — never published
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tag: z.string().default('Notes'),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tag: z.string().default('Project'),
    cover: z.string().optional(),
    live: z.string().url().optional(),
    source: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
    year: z.union([z.string(), z.number()]).optional(),
    role: z.string().optional(),
    status: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { blog, projects };
