# SWI Lab website

Source for https://swi-lab.github.io/ (Science, World models and Intelligence, Georgia Tech). Built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Editing content

All text lives in `src/content/`. Edit the files there — no code changes needed. Pushing to `dev` rebuilds and deploys the site.

| File | What it controls |
| --- | --- |
| `site.toml` | Lab name, contact email, logo path, site description |
| `pages/home.md` | Home page intro (first paragraph is the one-line affiliation) and the "Joining the lab" blurb |
| `pages/research.md` | Intro paragraph at the top of the Research page |
| `pages/join.md` | Body of the Join us page (Markdown) |
| `topics/*.md` | One file per research topic: `title`, `order`, `tags` in the `+++` header, the paragraph as the body |
| `members.toml` | People, grouped by `role`; optional `order` sorts within a role |
| `news.toml` | News items, sorted by `date`; the home page shows the latest five |
| `publications.toml` | Publications, grouped by year on the Publications page |

In the TOML lists every entry is a `[table]` whose name is its id. Each file starts with a commented example showing all fields.

### Publications

A paper appears in three places from one entry:

- **Publications page** — always.
- **Research page** — under each topic listed in `topics` (`generative-models`, `science`, `health`) as related work.
- **Home page** — under "Selected publications" when `selected = true`.

```toml
[wang2026world]
title = "Paper title"
authors = "A. Author, B. Author, Jiayun Wang"
venue = "CVPR"
year = 2026
url = "https://arxiv.org/abs/..."
code = "https://github.com/..."        # optional
topics = ["generative-models", "health"]
selected = true
```

### Members

Roles are shown in a fixed order (set in `src/pages/people.astro`): Principal Investigator, Postdoctoral Researchers, PhD Students, Master’s Students, Undergraduate Students, Visiting Students, Alumni. Optional fields: `order` (position within a role), `bio`, `interests`, `url` (personal site), `image`. Put portraits in `public/people/` and set `image = "/people/<file>.jpg"`. Without an image the People page shows the member's initials. Empty `bio` and `interests` show a placeholder until filled in.

### Logo and icons

The logo is `public/logo.png`. Browser icons are exported from it: `public/favicon.ico` (16, 32, 48 px), `public/favicon-16x16.png`, `public/favicon-32x32.png`, and `public/apple-touch-icon.png` (180 px). Regenerate these when replacing the logo.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev      # local preview at http://127.0.0.1:4321/
npm run build    # static output in dist/
npm run preview  # serve dist/
npm run check    # validate content and type-check
```

Astro 7 keeps the dev server running in the background; stop it with `npx astro dev stop`.

Content schemas are defined in `src/content.config.ts`; a missing or mistyped field fails `npm run check` and `npm run build` with a message naming the file. Pages are in `src/pages/`, the shared layout in `src/layouts/Base.astro`, styles in `src/styles/global.css`. Fonts in `public/fonts/` are DM Sans and Libre Caslon Display (SIL Open Font License).

## Deployment

Pushing to `dev` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, Pages is configured to deploy from GitHub Actions.
