# André's Bar 🍸

A guest-facing home cocktail menu and bartender reference.

Most menu changes only require editing `menu.js`. It contains ingredients, recipes, measurements, descriptions, taste profiles, categories, variants, glass/ice/garnish/straw details, alternatives, and side/front/back serves.

## New menu fields

```js
description: "Bright, fresh and easy-drinking.",
tasteProfile: { sweet: 2, sour: 4, strong: 3 },
```

Taste profile values are optional and use a 1–5 scale.

Variants can replace or add ingredients, and can also directly override `description`, `tasteProfile`, `glass`, `ice`, `method`, `garnish`, `straw`, `front`, `side`, or `back`.

## Guest / Bartender view

A new browser starts in Guest view. It hides stock controls, exact measurements, preparation instructions, service details and copy-recipe buttons. Tap **🍸 Bartender** to reveal them. The preferred view is saved locally on that browser.


## Favorites and QR sharing

Favorites are deliberately split in two:

- **Guest favorites** are the hearts a person adds in Guest view. They stay private in that browser's `localStorage` and are never sent by QR.
- **André's picks** are the hearts added in Bartender view. They are included in the QR snapshot together with current stock availability.

Scanning a QR updates the shared stock snapshot and André's picks, but it **does not overwrite the guest's own favorites**. In Guest view, a shared recommendation is shown as **★ André's pick**, while the heart remains available for that guest's personal preference.

## Install as an app

The project now includes `manifest.webmanifest`, `service-worker.js`, and app icons. When hosted on GitHub Pages, supported browsers can install it to the home screen and reopen the cached site offline.

- Chrome / Edge / Android: use the **Install app** button when it appears, or the browser's Install/Add to Home Screen command.
- iPhone / iPad: open the GitHub Pages site in Safari → Share → Add to Home Screen.

GitHub Pages already provides HTTPS, which is required for service workers. The service worker is network-first, so online visits fetch the latest GitHub Pages files while offline visits use the most recently cached version.

## Files

- `menu.js` — normally the only file you edit
- `app.js` — application behavior
- `styles.css` — design
- `index.html` — page structure
- `qr.js` — QR generator
- `manifest.webmanifest` — install metadata
- `service-worker.js` — offline cache
- `icons/` — app icons
