// Content collections. Everything editable lives under src/content/ — see README.md.
import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

// Site-wide settings: src/content/site.toml, a single [site] table.
const site = defineCollection({
  loader: file('src/content/site.toml'),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    expansion: z.string(),
    university: z.string(),
    universityUrl: z.string(),
    logo: z.string(),
    description: z.string(),
    email: z.string(),
    pi: z.string(),
  }),
});

// Free-text pages (Markdown): home intro, Research page intro, Join us page.
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    joinBlurb: z.string().optional(), // home.md only: the "Joining the lab" paragraph
  }),
});

// Research thrusts: a one-line description in Markdown, the rest in the +++ header.
// `papers` are citation keys from publications.toml; an unknown key fails the build.
// `figure.src` is a path relative to the topic file, e.g. "../../assets/research/univl.webp";
// `figure.paper` is the paper it comes from, credited in a caption unless it is listed in `papers`.
const papers = z.array(reference('publications')).default([]);
const topics = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/topics' }),
  schema: ({ image }) => {
    const figure = z.object({ src: image(), alt: z.string(), paper: reference('publications') }).optional();
    return z.object({
      title: z.string(),
      order: z.number(),
      tags: z.array(z.string()).default([]),
      figure,
      papers,                                     // representative work
      ongoing: z.array(z.string()).default([]),
      areas: z.array(z.object({                   // optional sub-areas, each with its own figure, tags and papers
        title: z.string(),
        summary: z.string().optional(),
        tags: z.array(z.string()).default([]),
        figure,
        papers,
      })).default([]),
    });
  },
});

// Lab members: src/content/members.toml, one [table] per member keyed by id.
// Grouped by `role` on the People page; roles appear in the order listed in
// src/pages/people.astro, members within a role by `order`, then name.
const members = defineCollection({
  loader: file('src/content/members.toml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string().optional(),
    order: z.number().optional(),
    bio: z.string().optional(),
    interests: z.string().optional(),
    image: z.string().optional(),   // portrait under public/, e.g. /people/jiayun-wang.jpg
    url: z.string().optional(),     // personal website
    now: z.string().optional(),         // Alumni only: current position, e.g. "CS PhD at Stanford"
    coadvisors: z.string().optional(),  // Alumni only: e.g. "A. Anandkumar"
  }),
});

// News: src/content/news.toml, one [table] per item. Sorted by date, newest first.
const news = defineCollection({
  loader: file('src/content/news.toml'),
  schema: z.object({
    date: z.string(),               // e.g. "2026-09"
    text: z.string(),
    url: z.string().optional(),
  }),
});

// Teaching: src/content/teaching.toml, one [table] per course. Sorted by `term`, newest first.
const teaching = defineCollection({
  loader: file('src/content/teaching.toml'),
  schema: z.object({
    title: z.string(),
    term: z.string().regex(/^(Spring|Summer|Fall) \d{4}$/, 'term must look like "Spring 2027"'),
    code: z.string().optional(),            // e.g. "CS 8803"
    description: z.string().optional(),
    url: z.string().optional(),             // course website
  }),
});

// Publications: src/content/publications.toml, one [table] per paper keyed by a BibTeX-style id.
// Grouped by `category` on the Publications page; section titles and order are set in
// src/pages/publications.astro.
const publications = defineCollection({
  loader: file('src/content/publications.toml'),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    category: z.enum(['generative-models', 'agentic-systems', 'science-medicine', 'vision']),
    url: z.string().optional(),     // landing page, linked from the title
    code: z.string().optional(),
    pdf: z.string().optional(),
    project: z.string().optional(),
    award: z.string().optional(),
    preprint: z.boolean().default(false),
  }),
});

export const collections = { site, pages, topics, members, news, teaching, publications };
