# André's Bar 🍸

A small personal cocktail menu project built with **ChatGPT from my own input, recipes, and home bar setup**.

The site is designed both as a quick reference for making drinks and as a simple menu to show guests. It includes ingredient stock tracking, cocktail availability, favorites, filters, serving information, recipe variants, and QR sharing. Stock and favorites are stored locally in the browser using `localStorage`.

The drinks and measurements included here are based on what I personally make at home, so they may differ from official or traditional recipes.

Anyone is free to use, adapt, or modify this project for their own bar.

## Customizing the menu

Most changes only require editing:

`menu.js`

This file contains:

* Ingredients and stock-tracked items
* Cocktail recipes
* Measurements
* Categories and emojis
* Glass, ice, garnish, straw, and serving information
* Alternative ingredients
* Recipe variants
* Side, front, and back serves

The file is intentionally written in a human-readable format with comments and examples, so adding or changing drinks should not require touching the rest of the application.

For example, a normal ingredient looks like:

```js
{ ingredient: "gin", amount: 50, unit: "ml" }
```

and a cocktail is simply added as another object inside the `COCKTAILS` list.

The rest of the files handle the interface and application logic and normally do not need to be changed.

Enjoy, and make it your own. 🍹
