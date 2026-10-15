# Aristeidis Tsaknis — Portfolio

Personal portfolio of Aristeidis Tsaknis, Data & AI Engineer.
Live site: **https://aristeidistsaknis.github.io/**

A static site with no build step: plain HTML, CSS and vanilla JavaScript, hosted on GitHub Pages.

## Features

- Light / dark theme, remembered between visits (dark by default)
- Project cards that expand into detailed case-study dialogs
- Profile dialog ("Beyond The Code") and a downloadable PDF resume
- Collapsible certifications
- Smooth scrolling with [Lenis](https://github.com/darkroomengineering/lenis)
- Responsive layout, keyboard navigation, reduced-motion support

## Project structure

```
.
├── index.html            Page markup, SEO / social metadata, profile dialog template
├── css/style.css         All styles, organised in numbered sections
├── js/
│   ├── main.js           Theme, accordion, dialogs, smooth scrolling
│   └── projects.js       Project case-study content (window.PROJECT_DATA)
├── images/profile.jpg    Profile photo (optimised, no EXIF)
├── AristeidisTsaknis-DE.pdf   Downloadable resume
├── web_preview.png       Social share image (1200×630)
├── favicon.svg
└── robots.txt
```

## Run locally

No dependencies are required. Serve the folder with any static server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly also works, but a local server matches production behaviour.

## Editing content

| To change…                         | Edit                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| Hero, skills bar, cards, experience, certifications, contact | `index.html`                    |
| A project's expanded case study    | its entry in `js/projects.js` (keyed by the card's `data-project`) |
| Profile dialog text                | the `<template id="profile-template">` at the end of `index.html` |
| Colours, spacing, responsive rules | `css/style.css`                                              |

**Adding a project:** add an `<article class="card project-card" data-project="my-id">` to the grid in `index.html`, and a matching `'my-id'` entry in `js/projects.js`. Keep the card title and the entry's `title` identical.

**Conventions**

- Dates use `MMM YYYY — MMM YYYY` (e.g. `JUL 2026 — NOW`), or `YYYY — YYYY` when the month isn't relevant.
- When you change `style.css` or a script, bump the `?v=` query string in `index.html` to bust the cache.

## Deployment

Pushing to `main` publishes the site through GitHub Pages (repository settings → Pages → deploy from branch `main`, root).

## Credits

- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis) (MIT)
