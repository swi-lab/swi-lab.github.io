# SWI Lab website

Source for https://swi-lab.github.io/ (Science, World models and Intelligence, Georgia Tech). Built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev      # local preview at http://127.0.0.1:4321/
npm run build    # static output in dist/
npm run preview  # serve dist/
npm run check    # type-check .astro files
```

Astro 7 keeps the dev server running in the background; stop it with `npx astro dev stop`.

## Editing content

Almost all content lives in `src/data/lab.ts`:

- `lab` – name, contact email, logo path
- `research` – the three research topics; set `topics` on a publication to list it under a topic as related work, and `selected` to feature it on the home page
- `news` – home-page news items (newest first)
- `members` – people, grouped by `role`
- `publications` – grouped by year on the Publications page

Pages are in `src/pages/`, shared layout in `src/layouts/Base.astro`, styles in `src/styles/global.css`. The logo is `public/logo.png`; fonts in `public/fonts/` are DM Sans and Libre Caslon Display (SIL Open Font License).

Browser icons are exported from the logo: `public/favicon.ico` (16, 32, and 48 px), `public/favicon-16x16.png`, `public/favicon-32x32.png`, and `public/apple-touch-icon.png` (180 px). These are linked by the shared layout on every page. Update these exports when replacing the logo.

### Research content

Each research area has a `label` for navigation, a `title`, a home-page `short` summary, a `description`, and a list of `directions`. Each direction contains a stable `id`, a `title`, and a `text` description of the research problem. The home page links directly to these directions on the Research page, so keep IDs unique and preserve them when updating the copy.

### Member profiles

Each entry in `members` supports `image`, `bio` (one or two sentences), `interests` (plain text), and an optional `url` for a personal website. Put portraits in `public/people/` and set `image` to the corresponding path, such as `/people/jiayun-wang.jpg`. Portraits display in a 4:5 frame. Empty profile fields retain a labeled placeholder so the photo, biography, and research-interest areas stay visible until content is supplied.

## Deployment

Pushing to `dev` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, Pages is configured to deploy from GitHub Actions.
