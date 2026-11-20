# AroundByte Card Studio

Browser-based ID card studio for student, employee and institutional cards. The application is static and has no application backend or account system.

## Run locally

```bash
node serve.mjs 8080
```

Open `http://localhost:8080`.

## Public pages

- `index.html` — template gallery and card editor
- `about.html` — product information
- `privacy.html` — privacy policy
- `terms.html` — terms of use
- `disclaimer.html` — disclaimer
- `contact.html` — contact information
- `404.html` — branded not-found page

The information pages support English and Arabic and share the application's theme and language preferences.

## Structure

- `css/app.css` — shared AroundByte design system
- `css/studio.css` — Card Studio-specific styles
- `js/render.js` — card renderer used by preview and exports
- `js/templates/` — 15 templates across three categories
- `js/export.js` — PNG, PDF and A4 export
- `js/editor.js` — single-card editor
- `js/store.js` — IndexedDB local design storage
- `js/pages.js` and `js/pages-data.js` — bilingual information pages
- `sw.js` — optional offline shell cache; user data and uploaded content are not cached
- `vendor/` — locally bundled dependencies

## Local data and privacy

Card contents and image processing are handled in the browser. Saved designs and their image data are stored in IndexedDB on the current device. Language and theme preferences are stored in LocalStorage. Clearing browser site data can remove saved designs.

## Current scope

The current release creates one card at a time. Bulk generation from CSV and Excel is intentionally deferred.

## Deployment

Upload the contents of this directory to the Cloudflare Pages project configured for `cardstudio.aroundbyte.com`. No build command is required and the output directory is the project root. After deployment, verify the custom domain, HTTPS, page routes, downloads and service-worker update behavior.

## Tests

The `tests/` directory contains the original Playwright development scripts. Some scripts reference the original development sandbox paths and test fixtures; adjust those paths before running them in a different environment. Do not treat a test as passed unless it has actually been executed.
