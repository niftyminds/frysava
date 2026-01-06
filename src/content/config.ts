import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    order: z.number().optional(),
  }),
});

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    category: z.enum(['exterior', 'interior', 'surroundings', 'activities']),
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  'faq': faqCollection,
  'gallery': galleryCollection,
};
