# André's Bar

This folder is ready to publish directly with **GitHub Pages**.

## The file you normally edit

Open **`menu.js`** whenever you want to add, remove, or change:

- ingredients and their stock groups;
- cocktails and measurements;
- cocktail categories and emojis;
- variants such as Classic / Passion;
- front / side / back serves;
- glass, ice, method and garnish information.

`menu.js` starts with commented examples for every supported recipe format.

## Other files

- `index.html` — page structure; normally leave it alone.
- `styles.css` — all visual styling.
- `app.js` — stock, filters, favorites, variants, serving multiplier, availability and localStorage logic.
- `qr.js` — bundled QR-code engine used by the Share button.

## GitHub Pages

Upload all five site files to the same folder in your repository. `index.html`
must stay beside the four `.js` / `.css` files so the relative paths work.

Stock and favorites continue to use browser localStorage exactly as before.

### Straw service

If a cocktail is normally served with a straw, add this to that cocktail in `menu.js`:

```js
straw: true,
```

The menu will show **“with straw”** beside the glass. If `straw` is omitted or false, it shows nothing about straws.
