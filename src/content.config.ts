// Content collections. Everything editable lives under src/content/ — see README.md.
import { defineCollection } from 'astro:content';
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

// Research topics (Markdown, one file per topic). The body is the paragraph shown on the Research page.
const topics = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    tags: z.array(z.string()).default([]),
  }),
});

// Lab members: src/content/members.toml, one [table] per member keyed by id.
// Grouped by `role` on the People page; roles appear in the order listed in
// src/pages/people.astro, members within a role by `order`, then name.
const members = defineCollection({
  loader: file('src/content/members.toml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    order: z.number().optional(),
    bio: z.string().optional(),
    interests: z.string().optional(),
    image: z.string().optional(),   // portrait under public/, e.g. /people/jiayun-wang.jpg
    url: z.string().optional(),     // personal website
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

// Publications: src/content/publications.toml, one [table] per paper keyed by a BibTeX-style id.
const publications = defineCollection({
  loader: file('src/content/publications.toml'),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    url: z.string(),
    code: z.string().optional(),
    image: z.string().optional(),
    topics: z.array(z.string()).default([]),  // topic ids: listed as related work under each on the Research page
    selected: z.boolean().default(false),     // featured on the home page
  }),
});

export const collections = { site, pages, topics, members, news, publications };
