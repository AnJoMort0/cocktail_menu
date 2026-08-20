# André's Bar 🍸

A guest-facing home cocktail menu and bartender reference.

Most menu changes only require editing `menu.js`. It contains ingredients, recipes, measurements, descriptions, taste profiles, categories, variants, glass/ice/garnish/straw details, alternatives, and side/front/back serves.

## Stock groups

The stock panel is intentionally split into these groups:

- Spirits
- Liqueurs
- Wines
- Juice and Purées
- Fresh Ingredients
- Mixers
- Syrups
- Pantry

New ingredients default to available the first time the updated menu is opened.

## Taste profiles

Every drink uses the same four 1–5 guest-friendly scales:

```js
tasteProfile: { sweet: 2, sour: 4, strong: 3, bubbly: 1 },
```

The four displayed scales are **Sweet, Sour, Strong, and Bubbly**. Sangria variants that materially change the taste can override their own profile; other variants inherit the base profile.

## Sangria

`menu.js` includes Sangria as one cocktail card with many variants rather than many duplicate cards. It uses `scaleLabel: "jug"`, so Bartender view scales it as 1 jug, 2 jugs, etc. The variants can replace wines/spirits, replace ingredients inside `anyOf` groups, add ingredients, and override descriptions, taste profiles, garnish, and other presentation fields.

## Packed cocktail wall

Cocktail cards use a masonry-style packed wall. The app still sorts the cocktail array first (including availability/favorite priority) and then places each sorted card into the shortest current column. This keeps large cards such as Sangria from creating empty grid rows.


## Light / dark theme

Use the **🌙 Dark / ☀️ Light** button in the header to switch appearance. The preference is saved locally on that browser/device and is intentionally not included in QR sharing. The saved theme is applied before the stylesheet paints, avoiding a bright flash when reopening the installed app in dark mode.

## Guest / Bartender view

A new browser starts in Guest view. It hides stock controls, exact measurements, preparation instructions, service details and copy-recipe buttons. Tap **🍸 Bartender** to reveal them. The preferred view is saved locally on that browser.

## Favorites and QR sharing

Favorites are deliberately split in two:

- **Guest favorites** are hearts a person adds in Guest view. They stay private in that browser's `localStorage` and are never sent by QR.
- **André's picks** are hearts added in Bartender view. They are included in the QR snapshot together with current stock availability.

Scanning a QR updates the shared stock snapshot and André's picks, but it **does not overwrite the guest's own favorites**.

## Install as an app

The project includes `manifest.webmanifest`, `service-worker.js`, and app icons. When hosted on GitHub Pages, supported browsers can install it to the home screen and reopen the cached site offline.

- Chrome / Edge / Android: use the **Install app** button when it appears, or the browser's Install/Add to Home Screen command.
- iPhone / iPad: open the GitHub Pages site in Safari → Share → Add to Home Screen.

The service worker is network-first, so online visits fetch the latest GitHub Pages files while offline visits use the most recently cached version.

## Files

- `menu.js` — normally the only file you edit
- `app.js` — application behavior
- `styles.css` — design
- `index.html` — page structure
- `qr.js` — QR generator
- `manifest.webmanifest` — install metadata
- `service-worker.js` — offline cache
- `icons/` — app icons


## Neon dark theme

The device-local dark mode uses a night-city palette with sunset orange, hot pink, neon purple and electric cyan accents. The light theme is unchanged.

## Living day/night transition

The theme button no longer covers the page with a transition overlay. Cocktail cards, text and controls stay visible while the actual palette interpolates. The warm daylight background sinks and fades while the neon city background rises in; switching back reverses the movement into sunrise. Reduced-motion preferences still switch themes without animation.

## Theme fade

The Light/Dark button uses a short 280 ms fade between the warm light palette and the neon dark palette. It avoids moving gradients, filters and large animations for smoother performance on phones. The preference remains device-local.
