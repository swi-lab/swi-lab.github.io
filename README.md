# SWI Lab website

Source for https://swi-lab.github.io/ (Science, World models and Intelligence, Georgia Tech). Built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Editing content

All text lives in `src/content/`. Edit the files there — no code changes needed. Pushing to `main` rebuilds and deploys the site.

| File | What it controls |
| --- | --- |
| `site.toml` | Lab name, contact email, logo path, site description |
| `pages/home.md` | Home page intro (first paragraph is the one-line affiliation) and the "Joining the lab" blurb |
| `pages/research.md` | Intro paragraph at the top of the Research page |
| `pages/join.md` | Body of the Join us page (Markdown) |
| `topics/*.md` | One file per research thrust: `title` and `order` in the `+++` header; descriptions, representative work, and ongoing projects in Markdown |
| `members.toml` | People, grouped by `role`; optional `order` sorts within a role |
| `news.toml` | News items, sorted by `date`; the home page shows the latest five |
| `publications.toml` | Publications, grouped by year on the Publications page |

In the TOML lists every entry is a `[table]` whose name is its id. Each file starts with a commented example showing all fields.

### Publications

A paper appears in these places from one entry:

- **Publications page** — always.
- **Home page** — under "Selected publications" when `selected = true`.

The Research page's representative-work lists and short explanations are edited directly in `topics/*.md`, alongside each thrust's ongoing projects. The three thrusts are `generative-models`, `agentic-systems`, and `science-medicine`.

The supplied root-level `papers.bib` and `preprints.bib` are retained as import references. The live editing source is `src/content/publications.toml`; editing a `.bib` file does not automatically change the website. The initial import includes all 34 active bibliography entries plus the Reward-Free Evolving Agents paper from the updated overview. Disabled examples without an `@` prefix were not imported. Conference acceptance follows each entry's venue, not which BibTeX file contained it.

```toml
[wang2026world]
title = "Paper title"
authors = "A. Author, B. Author, Jiayun Wang"
venue = "CVPR"
year = 2026
url = "https://arxiv.org/abs/..."
code = "https://github.com/..."        # optional
pdf = "https://arxiv.org/pdf/..."      # optional
project = "https://example.com/"       # optional project website
award = "Oral"                        # optional
preprint = false                      # true only for work not yet published/accepted
topics = ["generative-models", "science-medicine"] # optional editorial tags
selected = true
```

`url` is optional when no public paper link is available. Only add PDFs and images that exist; the original bibliography's relative asset names are not bundled with the site. Entries have stable `/publications/#citation-key` links. Corrected metadata is documented beside the relevant TOML entries.

### Members

Roles are shown in a fixed order (set in `src/pages/people.astro`): Principal Investigator, Postdoctoral Researchers, PhD Students, Master’s Students, Undergraduate Students, Visiting Students, Alumni. Optional fields: `order` (position within a role), `bio`, `interests` (up to five keywords), `url` (personal site), `urlLabel` (defaults to "Website"), `image`. Put portraits in `public/people/` and set `image = "/people/<file>.jpg"`. Without an image the People page shows the member's initials. Empty `bio` and `interests` are omitted.

Use a multiline TOML string for `bio`. Each entry has the degree and field on the first line and the institution and year on the second. Separate entries with a blank line:

```toml
bio = """
M.S., Electrical and Computer Engineering
UCLA, 2025.

B.Eng., Communication Engineering
Chongqing University, 2023.
"""
```

Profile sources are recorded in `members.toml`. Tian's supplied personal-site URL returned 404 during this update, so his profile links to GitHub until the site is restored. Wentao's profile and photo come from his supplied personal site, https://zwt.zip/.

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

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, Pages is configured to deploy from GitHub Actions.
