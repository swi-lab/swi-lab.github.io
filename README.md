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
| `topics/*.md` | One file per research thrust on the Research page: a one-line description in Markdown, everything else in the `+++` header (see below) |
| `members.toml` | People, grouped by `role`; optional `order` sorts within a role |
| `news.toml` | News items, sorted by `date`; the home page shows the latest five |
| `courses.toml` | Courses on the Courses page, newest `term` first (e.g. `term = "Spring 2027"`); optional `code`, `description`, `url` |
| `publications.toml` | Publications, grouped by research category on the Publications page |

In the TOML lists every entry is a `[table]` whose name is its id. Each file starts with a commented example showing all fields.

### Publications

The Publications page has one section per `category`, newest first within each. The categories are the three Research page thrusts (`generative-models`, `agentic-systems`, `science-medicine`) plus `vision` for representation learning and computer vision. Section titles and order are set in `src/pages/publications.astro`. Lab members listed in `members.toml` are shown in bold in author lists.

### Research thrusts

Each `topics/*.md` file is one thrust. The file name is its id and must match a publication `category`; the thrust then links to its filtered publication list. Representative work is listed by citation key from `publications.toml`, so titles, venues, and links come from there; an unknown key fails the build. Optional `[[areas]]` split a thrust into sub-areas, each with its own `summary`, `tags`, `figure`, and `papers` (see `science-medicine.md`).

An optional `[figure]` shows one paper figure. Put the image in `src/assets/research/` (a WebP about 1600 px wide is plenty; the build optimizes it) and give its path relative to the topic file. `paper` names the paper the figure comes from; if that paper is not in the list below the figure, a caption credits it.

```toml
+++
title = "Generative and World Models"
order = 1                                  # position on the Research page
tags = ["Latent diffusion and flow models", "Video and 3D synthesis"]
papers = ["wang2026unified", "wang2024pose"]   # representative work
ongoing = ["Agentic physics-aware world models"]

[figure]
src = "../../assets/research/univl.webp"
alt = "What the figure shows, for screen readers"
paper = "wang2026unified"
+++
We learn priors over images, video, 3D, and language.
```

The live editing source is `src/content/publications.toml`. The root-level `papers.bib` and `preprints.bib` are kept only as the original import; editing them does not change the website.

```toml
[wang2026world]
title = "Paper title"
authors = "A. Author, B. Author, Jiayun Wang"
venue = "CVPR"
year = 2026
category = "generative-models"
url = "https://arxiv.org/abs/..."      # optional; the title links here
pdf = "https://arxiv.org/pdf/..."      # optional
code = "https://github.com/..."        # optional
project = "https://example.com/"       # optional project website
award = "Oral"                        # optional
preprint = true                       # only for work not yet published/accepted
```

Entries have stable `/publications/#citation-key` links. Metadata that differs from the `.bib` files is documented beside the relevant TOML entries.

### Members

Roles are shown in a fixed order (set in `src/pages/people.astro`): Principal Investigator, Postdoctoral Researchers, PhD Students, Master’s Students, Undergraduate Students, Visiting Students, Undergrads/Visitors, Alumni. Optional fields: `order` (position within a role), `bio`, `interests` (up to five keywords), `url` (personal site, linked from the member's name), `image`. Put portraits in `src/assets/people/` and set `image = "../assets/people/<file>.jpg"` (relative to `members.toml`). The build crops them to 4:5 around the centre and resizes them, so any reasonably sized photo works. Without an image the People page shows the member's initials. Empty `bio` and `interests` are omitted.

Alumni (`role = "Alumni"`) appear as a compact list without photos or email: a one-line `bio` (their position while in the lab), plus optional `coadvisors` (shown as "co-advised with …") and `now` (current position, shown as "Now: …"). Like current members, alumni names are shown in bold in publication author lists.

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

The logo is `src/assets/logo.png` (set in `site.toml`); the build makes small WebP copies for the header and a PNG copy for link previews. Browser icons are exported from it: `public/favicon.ico` (16, 32, 48 px), `public/favicon-16x16.png`, `public/favicon-32x32.png`, and `public/apple-touch-icon.png` (180 px). Regenerate these when replacing the logo.

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

Content schemas are defined in `src/content.config.ts`; a missing or mistyped field fails `npm run check` and `npm run build` with a message naming the file. Pages are in `src/pages/`, the shared layout in `src/layouts/Base.astro`, styles in `src/styles/global.css`. Fonts in `public/fonts/` are DM Sans and Libre Caslon Display (SIL Open Font License), converted to WOFF2.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, Pages is configured to deploy from GitHub Actions.
