/*
  ╔══════════════════════════════════════════════════════════════════════╗
  ║                    ANDRÉ'S BAR — MENU DATA                         ║
  ╚══════════════════════════════════════════════════════════════════════╝

  THIS IS THE FILE YOU NORMALLY EDIT.

  You can add, remove, or change ingredients and cocktails here without
  touching index.html or app.js.

  ----------------------------------------------------------------------
  1. INGREDIENTS
  ----------------------------------------------------------------------

  Every ingredient used by a recipe should have an entry in INGREDIENTS.

    { id: "gin", name: "Gin", group: "Spirits" },

  • id    = short internal name used by recipes. Keep it unique.
  • name  = what guests see.
  • group = where it appears in the stock checklist.

  To show an ingredient in recipes but NEVER track its stock:

    { id: "water", name: "Water", group: "Mixers", trackStock: false },

  TIP: once you have used an ingredient ID, avoid renaming the ID unless
  necessary. The visible name can be changed freely. Stock is saved by ID.

  ----------------------------------------------------------------------
  2. COCKTAILS
  ----------------------------------------------------------------------

  Basic cocktail:

    {
      id: "exampleDrink",
      name: "Example Drink",
      mainSpirit: "Gin",
      mainTaste: "Citrus",
      categories: ["fresh", "sour"],
      ingredients: [
        { ingredient: "gin", amount: 50, unit: "ml" },
        { ingredient: "lemon", amount: 25, unit: "ml" }
      ],
      glass: "Coupe",
      straw: true, // optional: only add this when the drink is normally served with a straw
      ice: "Shaken with ice, served without ice",
      method: "Shake and fine-strain.",
      garnish: "Lemon twist",
      chilledGlass: true
    },

  Straw (optional):

    straw: true,

  Only add `straw: true` when the cocktail is normally served with a straw.
  If the property is missing or false, the page says nothing about straws.

  An ingredient that SHOULD be displayed/crossed out when missing but should
  NOT make the whole cocktail unavailable:

    { ingredient: "eggWhite", amount: 20, unit: "ml", blocksAvailability: false }

  Alternative ingredients — at least ONE option must be in stock:

    {
      label: "Top with one",
      anyOf: [
        { ingredient: "soda", amount: "to top", unit: "" },
        { ingredient: "tonic", amount: "to top", unit: "" }
      ]
    }

  Served separately from the main drink:

    side:  [{ ingredient: "prosecco", amount: 40, unit: "ml" }],
    front: [{ ingredient: "...", amount: 20, unit: "ml" }],
    back:  [{ ingredient: "...", amount: 20, unit: "ml" }],

  Variant — keeps a similar recipe inside ONE cocktail card:

    baseVariantName: "Classic",
    baseVariantEmoji: "🍋",
    variants: [
      {
        id: "passion",
        name: "Passion",
        emoji: "🌺",
        ingredientReplacements: {
          simpleSyrup: {
            ingredient: "passionFruitSyrup",
            amount: 20,
            unit: "ml"
          }
        }
      }
    ],

  A variant can also override complete fields such as ingredients, front,
  side, back, mainTaste, categories, glass, straw, ice, method, garnish,
  or chilledGlass.

  ----------------------------------------------------------------------
  3. CATEGORIES
  ----------------------------------------------------------------------

  CATEGORY_META controls the guest-facing label and emoji for category IDs.
  Add a category here before using its ID in a cocktail's categories array.

  ----------------------------------------------------------------------
  FORMATTING NOTES
  ----------------------------------------------------------------------

  • Keep commas between entries.
  • Ingredient and cocktail IDs must be unique.
  • Recipe ingredient IDs must exactly match an INGREDIENTS id.
  • Measurements can be numbers (which scale with the serving multiplier)
    or text such as "to top" (which stays as text).
*/

const INGREDIENTS = [
  // Spirits
  { id: "gin", name: "Gin", group: "Spirits" },
  { id: "vodka", name: "Vodka", group: "Spirits" },
  { id: "vanillaVodka", name: "Vanilla vodka", group: "Spirits" },
  { id: "whiteRum", name: "White rum", group: "Spirits" },
  { id: "darkRum", name: "Dark rum", group: "Spirits" },
  { id: "tequila", name: "Tequila", group: "Spirits" },
  { id: "bourbon", name: "Bourbon", group: "Spirits" },
  { id: "rye", name: "Rye whiskey", group: "Spirits" },
  { id: "whisky", name: "Whisky", group: "Spirits" },
  { id: "cognac", name: "Cognac", group: "Spirits" },
  { id: "grappa", name: "Grappa", group: "Spirits" },
  { id: "vieillePrune", name: "Vieille prune", group: "Spirits" },

  // Liqueurs & fortified
  { id: "tripleSec", name: "Triple sec / Cointreau", group: "Liqueurs" },
  { id: "campari", name: "Campari", group: "Liqueurs" },
  { id: "sweetVermouth", name: "Sweet vermouth", group: "Liqueurs" },
  { id: "dryVermouth", name: "Dry vermouth", group: "Liqueurs" },
  { id: "coffeeLiqueur", name: "Coffee liqueur", group: "Liqueurs" },
  { id: "passoa", name: "Passion-fruit liqueur", group: "Liqueurs" },
  { id: "aperol", name: "Aperol", group: "Liqueurs" },
  { id: "malibu", name: "Malibu", group: "Liqueurs" },
  { id: "limoncello", name: "Limoncello", group: "Liqueurs" },
  { id: "pistachioCreamLiqueur", name: "Pistachio cream liqueur", group: "Liqueurs" },
  { id: "port", name: "Port wine", group: "Liqueurs" },
  { id: "jagermeister", name: "Jägermeister", group: "Liqueurs" },
  { id: "suze", name: "Suze", group: "Liqueurs" },

  // Citrus, juices & fruit
  { id: "lime", name: "Lime juice", group: "Juice & fruit" },
  { id: "lemon", name: "Lemon juice", group: "Juice & fruit" },
  { id: "orangeJuice", name: "Orange juice", group: "Juice & fruit" },
  { id: "pineappleJuice", name: "Pineapple juice", group: "Juice & fruit" },
  { id: "cranberryJuice", name: "Cranberry juice", group: "Juice & fruit" },
  { id: "passionFruitPuree", name: "Passion-fruit purée", group: "Juice & fruit" },
  { id: "mint", name: "Fresh mint", group: "Juice & fruit" },

  // Mixers
  { id: "soda", name: "Soda water", group: "Mixers" },
  { id: "tonic", name: "Tonic water", group: "Mixers" },
  { id: "gingerBeer", name: "Ginger beer", group: "Mixers" },
  { id: "cola", name: "Cola", group: "Mixers" },
  { id: "prosecco", name: "Prosecco", group: "Mixers" },
  { id: "water", name: "Water", group: "Mixers", trackStock: false },

  // Pantry
  { id: "simpleSyrup", name: "Simple syrup", group: "Pantry" },
  { id: "agave", name: "Agave syrup", group: "Pantry" },
  { id: "grenadine", name: "Grenadine", group: "Pantry" },
  { id: "angostura", name: "Angostura bitters", group: "Pantry" },
  { id: "eggWhite", name: "Egg white", group: "Pantry" },
  { id: "espresso", name: "Espresso", group: "Pantry" },
  { id: "vanillaSyrup", name: "Vanilla syrup", group: "Pantry" },
  { id: "passionFruitSyrup", name: "Passion-fruit syrup", group: "Pantry" },
  { id: "salt", name: "Salt", group: "Pantry" }
];

const CATEGORY_META = {
  sweet:   { label: "Sweet", icon: "🍬" },
  fruity:  { label: "Fruity", icon: "🍓" },
  strong:  { label: "Strong", icon: "💪" },
  sour:    { label: "Sour", icon: "🍋" },
  bitter:  { label: "Bitter", icon: "🌿" },
  fresh:   { label: "Fresh", icon: "❄️" },
  bubbly:  { label: "Bubbly", icon: "🫧" },
  coffee:  { label: "Coffee", icon: "☕" },
  tropical:{ label: "Tropical", icon: "🌴" },
  classic: { label: "Classic", icon: "🎩" }
};

const COCKTAILS = [
  {
    id: "mojito",
    name: "Mojito",
    mainSpirit: "White rum",
    mainTaste: "Soda & lime",
    categories: ["fresh", "sour", "classic"],
    ingredients: [
      { ingredient: "whiteRum", amount: 50, unit: "ml" },
      { ingredient: "lime", amount: 25, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 15, unit: "ml" },
      { ingredient: "mint", amount: 8, unit: "leaves" },
      { ingredient: "soda", amount: 60, unit: "ml" }
    ],
    glass: "Highball",
    straw: true,
    ice: "Crushed ice",
    method: "Build in the glass, churn, then top with soda.",
    garnish: "Mint bouquet + lime wedge",
    chilledGlass: false
  },
  {
    id: "margarita",
    name: "Margarita",
    mainSpirit: "Tequila",
    mainTaste: "Lime",
    categories: ["sour", "strong", "classic"],
    ingredients: [
      { ingredient: "tequila", amount: 50, unit: "ml" },
      { ingredient: "tripleSec", amount: 25, unit: "ml" },
      { ingredient: "lime", amount: 25, unit: "ml" },
      { ingredient: "agave", amount: 5, unit: "ml" }
    ],
    glass: "Coupe / Margarita glass",
    ice: "Shaken with ice, served without ice",
    method: "Shake hard and fine-strain.",
    garnish: "Half salt rim + lime wheel",
    chilledGlass: true
  },
  {
    id: "negroni",
    name: "Negroni",
    mainSpirit: "Gin",
    mainTaste: "Bitter orange",
    categories: ["bitter", "strong", "classic"],
    ingredients: [
      { ingredient: "gin", amount: 30, unit: "ml" },
      { ingredient: "campari", amount: 30, unit: "ml" },
      { ingredient: "sweetVermouth", amount: 30, unit: "ml" }
    ],
    glass: "Old Fashioned",
    ice: "One large cube",
    method: "Stir with ice and strain over a large cube.",
    garnish: "Orange peel",
    chilledGlass: false
  },
  {
    id: "espressoMartini",
    name: "Espresso Martini",
    mainSpirit: "Vodka",
    mainTaste: "Coffee",
    categories: ["coffee", "sweet", "strong"],
    ingredients: [
      { ingredient: "vodka", amount: 40, unit: "ml" },
      { ingredient: "coffeeLiqueur", amount: 20, unit: "ml" },
      { ingredient: "espresso", amount: 30, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 10, unit: "ml" }
    ],
    glass: "Coupe / Martini",
    ice: "Shaken with ice, served without ice",
    method: "Shake very hard for a foamy head; fine-strain.",
    garnish: "3 coffee beans",
    chilledGlass: true
  },
  {
    id: "pornstarMartini",
    name: "Pornstar Martini",
    mainSpirit: "Vanilla vodka",
    mainTaste: "Passion fruit",
    categories: ["fruity", "sweet", "tropical"],
    ingredients: [
      { ingredient: "passionFruitPuree", amount: 30, unit: "ml" },
      { ingredient: "lime", amount: 15, unit: "ml" },
      { ingredient: "vanillaVodka", amount: 45, unit: "ml" },
      { ingredient: "passoa", amount: 20, unit: "ml" }
    ],
    side: [
      { ingredient: "prosecco", amount: 40, unit: "ml" }
    ],
    glass: "Coupe / Martini + shot glass",
    ice: "Shaken with ice, served without ice",
    method: "Shake with ice and fine-strain.",
    garnish: "Half passion fruit",
    chilledGlass: true
  },
  {
    id: "ginTonic",
    name: "Gin & Tonic",
    mainSpirit: "Gin",
    mainTaste: "Tonic",
    categories: ["fresh", "bitter", "bubbly"],
    ingredients: [
      { ingredient: "gin", amount: 50, unit: "ml" },
      { ingredient: "tonic", amount: 120, unit: "ml" }
    ],
    glass: "Highball / Copa",
    ice: "Plenty of large ice",
    method: "Build over ice and stir gently.",
    garnish: "Lime wheel or grapefruit peel",
    chilledGlass: false
  },
  {
    id: "darkStormy",
    name: "Dark ’n’ Stormy",
    mainSpirit: "Dark rum",
    mainTaste: "Ginger beer",
    categories: ["fresh", "strong", "bubbly"],
    ingredients: [
      { ingredient: "darkRum", amount: 50, unit: "ml" },
      { ingredient: "lime", amount: 15, unit: "ml" },
      { ingredient: "gingerBeer", amount: 100, unit: "ml" }
    ],
    glass: "Highball",
    ice: "Cubed ice",
    method: "Build over ice; float rum last if you like the layered look.",
    garnish: "Lime wedge",
    chilledGlass: false
  },
  {
    id: "whiskeySour",
    name: "Whiskey Sour",
    mainSpirit: "Bourbon",
    mainTaste: "Lemon",
    categories: ["sour", "strong", "classic"],
    ingredients: [
      { ingredient: "bourbon", amount: 50, unit: "ml" },
      { ingredient: "lemon", amount: 25, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 15, unit: "ml" },
      { ingredient: "eggWhite", amount: 20, unit: "ml", blocksAvailability: false },
      { ingredient: "angostura", amount: 3, unit: "dashes", blocksAvailability: false }
    ],
    glass: "Old Fashioned / Coupe",
    ice: "Large cube, or served up",
    method: "Dry shake, then shake with ice and strain.",
    garnish: "Bitters drops + lemon peel",
    chilledGlass: false
  },
  {
    id: "oldFashioned",
    name: "Old Fashioned",
    mainSpirit: "Bourbon / Rye",
    mainTaste: "Spirit-forward",
    categories: ["strong", "classic"],
    ingredients: [
      {
        label: "Choose a whiskey",
        anyOf: [
          { ingredient: "bourbon", amount: 60, unit: "ml" },
          { ingredient: "rye", amount: 60, unit: "ml" }
        ]
      },
      { ingredient: "simpleSyrup", amount: 7.5, unit: "ml" },
      { ingredient: "angostura", amount: 3, unit: "dashes" }
    ],
    glass: "Old Fashioned",
    ice: "One large cube",
    method: "Stir with ice and strain over a large cube.",
    garnish: "Orange peel",
    chilledGlass: false
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    mainSpirit: "Vodka",
    mainTaste: "Cranberry & citrus",
    categories: ["fruity", "sour", "classic"],
    ingredients: [
      { ingredient: "vodka", amount: 40, unit: "ml" },
      { ingredient: "tripleSec", amount: 20, unit: "ml" },
      { ingredient: "cranberryJuice", amount: 30, unit: "ml" },
      { ingredient: "lime", amount: 15, unit: "ml" }
    ],
    glass: "Coupe / Martini",
    ice: "Shaken with ice, served without ice",
    method: "Shake and fine-strain.",
    garnish: "Orange twist",
    chilledGlass: true
  },
  {
    id: "aperolSpritz",
    name: "Aperol Spritz",
    mainSpirit: "Aperol",
    mainTaste: "Orange & bubbles",
    categories: ["bubbly", "bitter", "fresh"],
    ingredients: [
      { ingredient: "aperol", amount: 60, unit: "ml" },
      { ingredient: "prosecco", amount: 90, unit: "ml" },
      { ingredient: "soda", amount: 30, unit: "ml" }
    ],
    glass: "Large wine glass",
    ice: "Cubed ice",
    method: "Build over ice and stir gently.",
    garnish: "Orange slice",
    chilledGlass: false
  },
  {
    id: "rumPunch",
    name: "House Rum Punch",
    mainSpirit: "Rum",
    mainTaste: "Fruit juice",
    categories: ["fruity", "sweet", "tropical"],
    ingredients: [
      { ingredient: "whiteRum", amount: 30, unit: "ml" },
      { ingredient: "darkRum", amount: 20, unit: "ml" },
      { ingredient: "lime", amount: 15, unit: "ml" },
      { ingredient: "grenadine", amount: 10, unit: "ml" },
      {
        label: "Choose at least one juice",
        anyOf: [
          { ingredient: "orangeJuice", amount: 70, unit: "ml" },
          { ingredient: "pineappleJuice", amount: 70, unit: "ml" }
        ]
      }
    ],
    glass: "Highball / Tiki mug",
    straw: true,
    ice: "Cubed or crushed ice",
    method: "Shake briefly and pour over fresh ice.",
    garnish: "Orange slice + mint",
    chilledGlass: false
  },
  {
    id: "collinsFlexible",
    name: "Easy Collins",
    mainSpirit: "Gin",
    mainTaste: "Long & refreshing",
    categories: ["fresh", "sour", "bubbly"],
    ingredients: [
      { ingredient: "gin", amount: 45, unit: "ml" },
      { ingredient: "lemon", amount: 25, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 15, unit: "ml" },
      {
        label: "Top with one",
        anyOf: [
          { ingredient: "soda", amount: 80, unit: "ml" },
          { ingredient: "tonic", amount: 80, unit: "ml" },
          { ingredient: "gingerBeer", amount: 80, unit: "ml" }
        ]
      }
    ],
    glass: "Collins / Highball",
    ice: "Cubed ice",
    method: "Build over ice; top with the available mixer.",
    garnish: "Lemon wheel",
    chilledGlass: false
  },
  {
    id: "rumPassion",
    name: "Rum & Passion",
    mainSpirit: "White rum",
    mainTaste: "Passion fruit & lime",
    categories: ["fruity", "sour", "tropical"],
    ingredients: [
      { ingredient: "whiteRum", amount: 40, unit: "ml" },
      { ingredient: "passoa", amount: 30, unit: "ml" },
      { ingredient: "lime", amount: 20, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 10, unit: "ml" },
      {
        label: "Top with one",
        anyOf: [
          { ingredient: "water", amount: null, unit: "to top" },
          { ingredient: "soda", amount: null, unit: "to top" },
          { ingredient: "tonic", amount: null, unit: "to top" },
          { ingredient: "orangeJuice", amount: null, unit: "to top" },
          { ingredient: "pineappleJuice", amount: null, unit: "to top" },
          { ingredient: "cranberryJuice", amount: null, unit: "to top" }
        ]
      }
    ],
    glass: "Highball",
    straw: true,
    ice: "Cubed ice",
    method: "Build over ice and top with your preferred mixer.",
    garnish: "—",
    chilledGlass: false
  },
  {
    id: "aperolGinSpritz",
    name: "Aperol Gin Spritz",
    mainSpirit: "Gin",
    mainTaste: "Orange & bubbles",
    categories: ["bitter", "fresh", "bubbly"],
    ingredients: [
      { ingredient: "gin", amount: 40, unit: "ml" },
      { ingredient: "aperol", amount: 60, unit: "ml" },
      {
        label: "Top with one",
        anyOf: [
          { ingredient: "soda", amount: null, unit: "to top" },
          { ingredient: "tonic", amount: null, unit: "to top" }
        ]
      }
    ],
    glass: "Large wine glass",
    ice: "Cubed ice",
    method: "Build over ice and stir gently.",
    garnish: "Orange slice",
    chilledGlass: false
  },
  {
    id: "malibuSunset",
    name: "Malibu Sunset",
    mainSpirit: "Malibu",
    mainTaste: "Orange & passion fruit",
    categories: ["fruity", "sweet", "tropical"],
    ingredients: [
      { ingredient: "malibu", amount: 40, unit: "ml" },
      { ingredient: "passoa", amount: 20, unit: "ml" },
      { ingredient: "orangeJuice", amount: null, unit: "to top" },
      { ingredient: "grenadine", amount: null, unit: "splash" }
    ],
    glass: "Highball",
    straw: true,
    ice: "Cubed ice",
    method: "Build over ice; finish with a splash of grenadine.",
    garnish: "—",
    chilledGlass: false
  },
  {
    id: "grappaSpritz",
    name: "Grappa Spritz",
    mainSpirit: "Grappa",
    mainTaste: "Bitter citrus & bubbles",
    categories: ["bitter", "strong", "bubbly"],
    ingredients: [
      { ingredient: "grappa", amount: 40, unit: "ml" },
      { ingredient: "aperol", amount: 60, unit: "ml" },
      {
        label: "Top with one",
        anyOf: [
          { ingredient: "soda", amount: null, unit: "to top" },
          { ingredient: "tonic", amount: null, unit: "to top" }
        ]
      }
    ],
    glass: "Large wine glass",
    ice: "Cubed ice",
    method: "Build over ice and stir gently.",
    garnish: "Lemon slice",
    chilledGlass: false
  },
  {
    id: "vanillaRumOldFashioned",
    name: "Vanilla Rum Old Fashioned",
    mainSpirit: "Dark rum",
    mainTaste: "Vanilla & bitters",
    categories: ["sweet", "strong", "classic"],
    ingredients: [
      { ingredient: "darkRum", amount: 40, unit: "ml" },
      { ingredient: "vanillaVodka", amount: 20, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 10, unit: "ml" },
      {
        label: "Choose a bitter accent",
        anyOf: [
          { ingredient: "jagermeister", amount: 2, unit: "dashes" },
          { ingredient: "aperol", amount: 2, unit: "dashes" },
          { ingredient: "tripleSec", amount: 2, unit: "dashes" },
          { ingredient: "suze", amount: 2, unit: "dashes" }
        ]
      }
    ],
    glass: "Old Fashioned",
    ice: "One large cube",
    method: "Stir with ice and serve over fresh ice.",
    garnish: "Orange peel",
    chilledGlass: false
  },
  {
    id: "vanillaEspressoMartini",
    name: "Vanilla Espresso Martini",
    mainSpirit: "Vanilla vodka",
    mainTaste: "Coffee & vanilla",
    categories: ["coffee", "sweet", "strong"],
    ingredients: [
      { ingredient: "vanillaVodka", amount: 40, unit: "ml" },
      { ingredient: "tripleSec", amount: 20, unit: "ml" },
      { ingredient: "espresso", amount: 30, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 10, unit: "ml" }
    ],
    glass: "Coupe / Martini",
    ice: "Shaken with ice, served without ice",
    method: "Shake hard with ice and fine-strain.",
    garnish: "—",
    chilledGlass: true
  },
  {
    id: "pistachioMartini",
    name: "Pistachio Martini",
    mainSpirit: "Vodka",
    mainTaste: "Pistachio & vanilla",
    categories: ["sweet", "strong"],
    ingredients: [
      { ingredient: "vodka", amount: 40, unit: "ml" },
      { ingredient: "pistachioCreamLiqueur", amount: 30, unit: "ml" },
      { ingredient: "vanillaVodka", amount: 10, unit: "ml" }
    ],
    glass: "Coupe / Martini",
    ice: "Shaken with ice, served without ice",
    method: "Shake with ice and fine-strain.",
    garnish: "—",
    chilledGlass: true
  },
  {
    id: "pruneOldFashioned",
    name: "Prune Old Fashioned",
    mainSpirit: "Whisky",
    mainTaste: "Whisky & plum",
    categories: ["fruity", "strong", "classic"],
    ingredients: [
      { ingredient: "whisky", amount: 50, unit: "ml" },
      { ingredient: "vieillePrune", amount: 15, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 10, unit: "ml" }
    ],
    glass: "Old Fashioned",
    ice: "One large cube",
    method: "Stir with ice and serve over fresh ice.",
    garnish: "Orange peel",
    chilledGlass: false
  },
  {
    id: "pistachioEspressoMartini",
    name: "Pistachio Espresso Martini",
    mainSpirit: "Vodka",
    mainTaste: "Coffee & pistachio",
    categories: ["coffee", "sweet", "strong"],
    ingredients: [
      { ingredient: "vodka", amount: 40, unit: "ml" },
      { ingredient: "pistachioCreamLiqueur", amount: 20, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 20, unit: "ml" },
      { ingredient: "espresso", amount: 30, unit: "ml" }
    ],
    glass: "Coupe / Martini",
    ice: "Shaken with ice, served without ice",
    method: "Shake hard with ice and fine-strain.",
    garnish: "—",
    chilledGlass: true
  },
  {
    id: "whiteNegroniTwist",
    name: "White Negroni Twist",
    mainSpirit: "Gin",
    mainTaste: "Lemon & bitter orange",
    categories: ["bitter", "fruity", "strong"],
    ingredients: [
      { ingredient: "gin", amount: 30, unit: "ml" },
      { ingredient: "limoncello", amount: 30, unit: "ml" },
      { ingredient: "aperol", amount: 30, unit: "ml" }
    ],
    glass: "Old Fashioned",
    ice: "One large cube",
    method: "Stir with ice and serve over fresh ice.",
    garnish: "Lemon peel",
    chilledGlass: false
  },
  {
    id: "portoTequilaSour",
    name: "Porto Tequila Sour",
    mainSpirit: "Tequila",
    mainTaste: "Port & lemon",
    categories: ["sour", "fruity", "strong"],
    ingredients: [
      { ingredient: "tequila", amount: 40, unit: "ml" },
      { ingredient: "port", amount: 20, unit: "ml" },
      { ingredient: "lemon", amount: 20, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 15, unit: "ml" }
    ],
    glass: "Coupe",
    ice: "Shaken with ice, served without ice",
    method: "Shake with ice and fine-strain.",
    garnish: "—",
    chilledGlass: true
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    baseVariantName: "Classic",
    baseVariantEmoji: "🍋",
    mainSpirit: "White rum",
    mainTaste: "Lime / passion fruit",
    categories: ["sour", "strong", "classic", "fruity"],
    ingredients: [
      { ingredient: "whiteRum", amount: 30, unit: "ml" },
      { ingredient: "simpleSyrup", amount: 20, unit: "ml" },
      { ingredient: "lime", amount: 20, unit: "ml" }
    ],
    variants: [
      {
        id: "passion",
        name: "Passion",
        emoji: "🌺",
        ingredientReplacements: {
          simpleSyrup: { ingredient: "passionFruitSyrup", amount: 20, unit: "ml" }
        }
      }
    ],
    glass: "Coupe",
    ice: "Shaken with ice, served without ice",
    method: "Shake with ice and fine-strain.",
    garnish: "—",
    chilledGlass: true
  },
  {
    id: "sidecar",
    name: "Sidecar",
    mainSpirit: "Cognac",
    mainTaste: "Orange & lemon",
    categories: ["sour", "strong", "classic"],
    ingredients: [
      { ingredient: "cognac", amount: 50, unit: "ml" },
      { ingredient: "tripleSec", amount: 25, unit: "ml" },
      { ingredient: "lemon", amount: 25, unit: "ml" }
    ],
    glass: "Coupe",
    ice: "Shaken with ice, served without ice",
    method: "Shake and fine-strain.",
    garnish: "Orange twist; optional sugar rim",
    chilledGlass: true
  }
];
