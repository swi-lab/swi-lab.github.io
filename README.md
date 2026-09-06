# SWI Lab @ Georgia Tech

An Astro website for **Science, World models and Intelligence**, based on the supplied lab overview. Academic navigation and content organization are inspired by the [UVA Computer Vision Lab](https://uva-computer-vision-lab.github.io/); this site uses an independent layout, typography, and Georgia Tech-inspired navy/gold palette.

## Develop

Use Node.js 22.12 or newer (a current LTS release is recommended).

```sh
npm install
npm run dev
```

Astro prints the local preview URL. Astro 7 runs its dev server in the background; stop it with `npx astro dev stop`.

```sh
npm run check
npm run build
npm run preview
```

The production site is static HTML in `dist/`.

## Edit content

- `src/data/lab.ts`: branding, contact email, research areas, member profiles, publications.
- `src/pages/`: Home, Research, People, Publications, Join us, and 404.
- `src/styles/global.css`: responsive layout, colors, typography, print styling.
- `src/components/WorldModel.astro`: original, mathematically generated conceptual wave/forward-inverse diagram. It is an illustration, not an experimental result.

Member names, roles, and emails were provided by the site owner. Jiayun Wang is the PI and the lab contact; Xinsong Feng and Wentao Zhou are PhD students; Tian Xia is a master’s student. Portraits and individual research interests have not been supplied. The publication list is deliberately empty until verified papers are provided. Adding entries to the typed arrays automatically fills the corresponding pages; publications are grouped by year. No papers, recruitment dates, biographies, or photographs have been invented.

The site uses locally served font files (DM Sans and Libre Caslon Display, SIL Open Font License; see `public/fonts/OFL-*.txt`), a compact responsive navigation, keyboard focus styles, reduced-motion support, and a skip link. It has no analytics, trackers, or runtime backend.

## GitHub Pages

Website: https://swi-lab.github.io/

The `dev` branch contains the website source. Pushing to `dev` runs `.github/workflows/deploy.yml`, builds the Astro site, and deploys `dist/` to GitHub Pages. The workflow uses the npm lockfile and Node.js 22.

In repository **Settings → Pages**, the build source is **GitHub Actions**. The `github-pages` environment allows deployments from `dev`.

This organization repository publishes at the root URL, so `astro.config.mjs` sets `site` to `https://swi-lab.github.io` without a `base` path. A successful deployment can be reviewed from the repository’s Actions tab.

Local hosting configuration, internal overview notes, generated output, dependencies, and credentials are excluded from this repository.
