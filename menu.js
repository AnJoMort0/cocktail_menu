/*
  ╔══════════════════════════════════════════════════════════════════════╗
  ║                    ANDRÉ'S BAR — MENU DATA                           ║
  ╚══════════════════════════════════════════════════════════════════════╝

	This is the file you normally edit.

	INGREDIENT
	----------
	{ id: "gin", name: "Gin", group: "Spirits" }

	Non-stock ingredient:
	{ id: "water", name: "Water", group: "Mixers", trackStock: false }

	STANDARD RECIPE LINE
	--------------------
	{ ingredient: "gin", amount: 50, unit: "ml" }

	Optional ingredient that does NOT make the drink unavailable:
	{ ingredient: "eggWhite", amount: 20, unit: "ml", blocksAvailability: false }

	ALTERNATIVES
	------------
	{
		label: "Top with one",
		anyOf: [
			{ ingredient: "soda",  amount: "to top", unit: "" },
			{ ingredient: "tonic", amount: "to top", unit: "" }
		]
	}

	SEPARATE SERVES
	---------------
	side:  [{ ingredient: "prosecco", amount: 40, unit: "ml" }],
	front: [{ ingredient: "...",      amount: 20, unit: "ml" }],
	back:  [{ ingredient: "...",      amount: 20, unit: "ml" }],

	STRAW
	-----
	Add only when normally served with one:

	straw: true,

	GUEST DESCRIPTION + TASTE PROFILE
	---------------------------------
	description: "Bright, fresh and easy-drinking.",

	// Optional 1–5 guest-friendly taste scales. Add only the ones you want.
	tasteProfile: { sweet: 2, sour: 4, strong: 3 },

	VARIANTS
	--------
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
	]

	A variant may also override presentation/details directly:

	{
		id: "spicy",
		name: "Spicy",
		emoji: "🌶️",
		addIngredients: [{ ingredient: "chiliSyrup", amount: 10, unit: "ml" }],
		description: "A warmer, spicier version.",
		garnish: "Chili + lime",
		glass: "Coupe",
		ice: "Shaken with ice, served without ice"
	}

	Fields such as description, tasteProfile, glass, ice, method, garnish,
	straw, front, side and back can all be different for a variant.
*/


const INGREDIENTS = [

	// -------------------------------------------------------------------
	// SPIRITS
	// -------------------------------------------------------------------

	{ id: "gin",                    name: "Gin",                         group: "Spirits" },
	{ id: "vodka",                  name: "Vodka",                       group: "Spirits" },
	{ id: "vanillaVodka",           name: "Vanilla vodka",               group: "Spirits" },
	{ id: "whiteRum",               name: "White rum",                   group: "Spirits" },
	{ id: "darkRum",                name: "Dark rum",                    group: "Spirits" },
	{ id: "tequila",                name: "Tequila",                     group: "Spirits" },
	{ id: "whisky",                 name: "Whisky",                      group: "Spirits" },
	{ id: "grappa",                 name: "Grappa",                      group: "Spirits" },
	{ id: "vieillePrune",           name: "Vieille prune",               group: "Spirits" },


	// -------------------------------------------------------------------
	// LIQUEURS & FORTIFIED
	// -------------------------------------------------------------------

	{ id: "tripleSec",              name: "Triple sec / Cointreau",      group: "Liqueurs" },
	{ id: "coffeeLiqueur",          name: "Coffee liqueur",              group: "Liqueurs" },
	{ id: "passoa",                 name: "Passion-fruit liqueur",       group: "Liqueurs" },
	{ id: "aperol",                 name: "Aperol",                      group: "Liqueurs" },
	{ id: "malibu",                 name: "Malibu",                      group: "Liqueurs" },
	{ id: "limoncello",             name: "Limoncello",                  group: "Liqueurs" },
	{ id: "pistachioCreamLiqueur",  name: "Pistachio cream liqueur",    group: "Liqueurs" },
	{ id: "port",                   name: "Port wine",                   group: "Liqueurs" },
	{ id: "jagermeister",           name: "Jägermeister",                group: "Liqueurs" },
	{ id: "suze",                   name: "Suze",                        group: "Liqueurs" },
	{ id: "licorBeirao",            name: "Licor Beirão",                group: "Liqueurs" },


	// -------------------------------------------------------------------
	// CITRUS, JUICES & FRUIT
	// -------------------------------------------------------------------

	{ id: "lime",                   name: "Lime juice",                  group: "Juice & fruit" },
	{ id: "lemon",                  name: "Lemon juice",                 group: "Juice & fruit" },
	{ id: "orangeJuice",            name: "Orange juice",                group: "Juice & fruit" },
	{ id: "pineappleJuice",         name: "Pineapple juice",             group: "Juice & fruit" },
	{ id: "cranberryJuice",         name: "Cranberry juice",             group: "Juice & fruit" },
	{ id: "passionFruitPuree",      name: "Passion-fruit purée",         group: "Juice & fruit" },
	{ id: "passionFruitJuice",      name: "Passion-fruit juice",         group: "Juice & fruit" },
	{ id: "mint",                   name: "Fresh mint",                  group: "Juice & fruit" },


	// -------------------------------------------------------------------
	// MIXERS
	// -------------------------------------------------------------------

	{ id: "soda",                   name: "Soda water",                  group: "Mixers" },
	{ id: "tonic",                  name: "Tonic water",                 group: "Mixers" },
	{ id: "gingerBeer",             name: "Ginger beer",                 group: "Mixers" },
	{ id: "cola",                   name: "Cola",                        group: "Mixers" },
	{ id: "lemonade",               name: "Lemonade",                    group: "Mixers" },
	{ id: "prosecco",               name: "Prosecco",                    group: "Mixers" },

	// Water appears in recipes, but never needs stock tracking.
	{ id: "water",                  name: "Water",                       group: "Mixers", trackStock: false },


	// -------------------------------------------------------------------
	// PANTRY
	// -------------------------------------------------------------------

	{ id: "simpleSyrup",            name: "Simple syrup",                group: "Pantry" },
	{ id: "agave",                  name: "Agave syrup",                 group: "Pantry" },
	{ id: "grenadine",              name: "Grenadine",                   group: "Pantry" },
	{ id: "eggWhite",               name: "Egg white",                   group: "Pantry" },
	{ id: "espresso",               name: "Espresso",                    group: "Pantry" },
	{ id: "vanillaSyrup",           name: "Vanilla syrup",               group: "Pantry" },
	{ id: "passionFruitSyrup",      name: "Passion-fruit syrup",         group: "Pantry" },

];


const CATEGORY_META = {

	sweet:       { label: "Sweet",       icon: "🍬" },
	fruity:      { label: "Fruity",      icon: "🍓" },
	strong:      { label: "Strong",      icon: "💪" },
	sour:        { label: "Sour",        icon: "🍋" },
	bitter:      { label: "Bitter",      icon: "🌿" },
	fresh:       { label: "Fresh",       icon: "❄️" },
	bubbly:      { label: "Bubbly",      icon: "🎇" },
	coffee:      { label: "Coffee",      icon: "☕" },
	tropical:    { label: "Tropical",    icon: "🌴" },
	classic:     { label: "Classic",     icon: "🎩" }

};


const COCKTAILS = [

	// ===================================================================
	// MOJITO
	// ===================================================================

	{
		id: "mojito",
		name: "Mojito",

		mainSpirit: "White rum",
		mainTaste: "Lime",
		categories: ["fresh", "sour", "classic"],

		description: "Fresh mint, lime and rum lengthened with cold soda.",
		tasteProfile: { sweet: 2, sour: 4, strong: 2 },

		ingredients: [
			{ ingredient: "whiteRum",       amount: 50,    unit: "ml" },
			{ ingredient: "lime",           amount: 25,    unit: "ml" },
			{ ingredient: "simpleSyrup",    amount: 15,    unit: "ml" },
			{ ingredient: "mint",           amount: 8,     unit: "leaves" },
			{ ingredient: "soda",           amount: 60,    unit: "ml" }
		],

		glass: "Highball",
		straw: true,
		ice: "Crushed ice",
		method: "Build in the glass, churn, then top with soda.",
		garnish: "Mint bouquet + lime wedge",
		chilledGlass: false
	},


	// ===================================================================
	// MARGARITA
	// ===================================================================

	{
		id: "margarita",
		name: "Margarita",

    baseVariantName: "Classic",
		baseVariantEmoji: "🌵",

		mainSpirit: "Tequila",
		mainTaste: "Lime",
		categories: ["sour", "strong", "classic"],

		description: "Sharp lime, tequila and orange with a clean, punchy finish.",
		tasteProfile: { sweet: 2, sour: 5, strong: 4 },

		ingredients: [
			{ ingredient: "tequila",        amount: 50,    unit: "ml" },
			{ ingredient: "tripleSec",      amount: 25,    unit: "ml" },
			{ ingredient: "lime",           amount: 25,    unit: "ml" },
			{ ingredient: "agave",          amount: 5,     unit: "ml" }
		],

    variants: [
			{
				id: "poor",
				name: "Poor Version",
				emoji: "🥈",

				ingredientReplacements: {
					agave: {
						ingredient: "simpleSyrup",
						amount: 5,
						unit: "ml"
					}
				}
			}
		],

		glass: "Coupe / Margarita glass",
		ice: "Shaken with ice, served without ice",
		method: "Shake hard and fine-strain.",
		garnish: "Half salt rim + lime wheel",
		chilledGlass: true
	},


	// ===================================================================
	// ESPRESSO MARTINI
	// ===================================================================

	{
		id: "espressoMartini",
		name: "Espresso Martini",

		baseVariantName: "Classic",
		baseVariantEmoji: "☕",

		mainSpirit: "Vodka",
		mainTaste: "Coffee",
		categories: ["coffee", "sweet", "strong"],

		description: "Silky espresso, vodka and coffee liqueur with a rich roasted finish.",
		tasteProfile: { sweet: 3, sour: 1, strong: 4 },

		ingredients: [
			{ ingredient: "vodka",           amount: 40,    unit: "ml" },
			{ ingredient: "coffeeLiqueur",   amount: 20,    unit: "ml" },
			{ ingredient: "espresso",        amount: 30,    unit: "ml" },
			{ ingredient: "simpleSyrup",     amount: 10,    unit: "ml" }
		],

    variants: [
			{
				id: "pistachio",
				name: "Pistachio",
				emoji: "🥜",

				description: "Espresso with a nutty pistachio twist and a rich, dessert-like finish.",

				ingredientReplacements: {
					coffeeLiqueur: {
						ingredient: "pistachioCreamLiqueur",
						amount: 20,
						unit: "ml"
					}
				}
			}
		],

		glass: "Coupe / Martini",
		ice: "Shaken with ice, served without ice",
		method: "Shake very hard for a foamy head; fine-strain.",
		garnish: "3 coffee beans",
		chilledGlass: true
	},


	// ===================================================================
	// PORNSTAR MARTINI
	// ===================================================================

	{
		id: "pornstarMartini",
		name: "Pornstar Martini",

		mainSpirit: "Vanilla vodka",
		mainTaste: "Passion fruit",
		categories: ["fruity", "sweet", "tropical"],

		description: "Tropical passion fruit and vanilla, with a sparkling sip on the side.",
		tasteProfile: { sweet: 4, sour: 3, strong: 3 },

		ingredients: [
			{
				label: "Choose what is available",

				anyOf: [
					{ ingredient: "passionFruitPuree",       amount: 30,    unit: "ml" },
					{ ingredient: "passionFruitSyrup",       amount: 30,    unit: "ml" }
				]
			},
			{ ingredient: "lime",                amount: 15,    unit: "ml" },
			{ ingredient: "vanillaVodka",        amount: 45,    unit: "ml" },
			{ ingredient: "passoa",              amount: 20,    unit: "ml" },
      { ingredient: "eggWhite",            amount: 20,    unit: "ml", blocksAvailability: false},

      {
				label: "Twist with one or multiple",

				anyOf: [
					{ ingredient: "malibu",            amount: 15,    unit: "ml", blocksAvailability: false },
					{ ingredient: "limoncello",        amount: 15,    unit: "ml", blocksAvailability: false }
				]
			}
		],

		side: [
			{ ingredient: "prosecco",            amount: 40,    unit: "ml", blocksAvailability: false }
		],

		glass: "Coupe / Martini + shot glass",
		ice: "Shaken with ice, served without ice",
		method: "Shake with ice and fine-strain.",
		garnish: "Half passion fruit",
		chilledGlass: true
	},


	// ===================================================================
	// GIN & TONIC
	// ===================================================================

	{
		id: "ginTonic",
		name: "Gin & Tonic",

		mainSpirit: "Gin",
		mainTaste: "Tonic",
		categories: ["fresh", "bitter", "bubbly"],

		description: "Crisp gin and tonic: dry, botanical and very refreshing.",
		tasteProfile: { sweet: 1, sour: 1, strong: 3 },

		ingredients: [
			{ ingredient: "gin",      amount: 50,     unit: "ml" },
			{ ingredient: "tonic",    amount: 120,    unit: "ml" }
		],

		glass: "Highball / Copa",
		ice: "Plenty of large ice",
		method: "Build over ice and stir gently.",
		garnish: "Lime wheel or grapefruit peel",
		chilledGlass: false
	},


	// ===================================================================
	// COSMOPOLITAN
	// ===================================================================

	{
		id: "cosmopolitan",
		name: "Cosmopolitan",

    baseVariantName: "Classic",
		baseVariantEmoji: "🍋",

		mainSpirit: "Vodka",
		mainTaste: "Citrus",
		categories: ["fruity", "sour", "classic"],

		description: "Bright citrus and cranberry with a clean vodka backbone.",
		tasteProfile: { sweet: 3, sour: 4, strong: 3 },

		ingredients: [
			{ ingredient: "vodka",             amount: 40,    unit: "ml" },
			{ ingredient: "tripleSec",         amount: 20,    unit: "ml" },
			{ ingredient: "cranberryJuice",    amount: 30,    unit: "ml" },
			{ ingredient: "lime",              amount: 15,    unit: "ml" }
		],

    variants: [
			{
				id: "fruity",
				name: "Fruity",
				emoji: "🍎",

				description: "A softer, juicier Cosmopolitan with extra tropical fruit.",

				ingredientReplacements: {
          cranberryJuice: {
            label: "Choose one",
            anyOf: [
              { ingredient: "orangeJuice",        amount: 30, unit: "ml" },
              { ingredient: "pineappleJuice",     amount: 30, unit: "ml" },
              { ingredient: "passionFruitJuice",  amount: 30, unit: "ml" },
            ]
          }
        }
			}
		],

		glass: "Coupe / Martini",
		ice: "Shaken with ice, served without ice",
		method: "Shake and fine-strain.",
		garnish: "Orange twist",
		chilledGlass: true
	},


	// ===================================================================
	// APEROL SPRITZ
	// ===================================================================

	{
		id: "aperolSpritz",
		name: "Aperol Spritz",

		mainSpirit: "Aperol",
		mainTaste: "Orange",
		categories: ["bubbly", "bitter", "fresh"],

		description: "Light, bittersweet orange and bubbles made for slow sipping.",
		tasteProfile: { sweet: 3, sour: 1, strong: 2 },

		ingredients: [
			{ ingredient: "aperol",      amount: 60,    unit: "ml" },
			{ ingredient: "prosecco",    amount: 90,    unit: "ml" },
			{ ingredient: "soda",        amount: 30,    unit: "ml" }
		],

		glass: "Large wine glass",
		ice: "Cubed ice",
		method: "Build over ice and stir gently.",
		garnish: "Orange slice",
		chilledGlass: false
	},


	// ===================================================================
	// HOUSE RUM PUNCH
	// ===================================================================

	{
		id: "rumPunch",
		name: "House Rum Punch",

		mainSpirit: "Rum",
		mainTaste: "Fruit juice",
		categories: ["fruity", "sweet", "tropical"],

		description: "Juicy tropical fruit, two rums and a touch of grenadine.",
		tasteProfile: { sweet: 4, sour: 3, strong: 3 },

		ingredients: [
			{ ingredient: "whiteRum",      amount: 30,    unit: "ml" },
			{ ingredient: "darkRum",       amount: 20,    unit: "ml" },
			{ ingredient: "lime",          amount: 15,    unit: "ml" },
			{ ingredient: "grenadine",     amount: 10,    unit: "ml" },

			{
				label: "Choose at least one juice",

				anyOf: [
					{ ingredient: "orangeJuice",       amount: 70,    unit: "ml" },
					{ ingredient: "pineappleJuice",    amount: 70,    unit: "ml" }
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


	// ===================================================================
	// EASY COLLINS
	// ===================================================================

	{
		id: "collinsFlexible",
		name: "Easy Collins",

		mainSpirit: "Gin",
		mainTaste: "Alcool",
		categories: ["fresh", "sour", "bubbly"],

		description: "A long, fizzy gin sour finished with whichever mixer suits the mood.",
		tasteProfile: { sweet: 2, sour: 4, strong: 3 },

		ingredients: [
			{ ingredient: "gin",             amount: 45,    unit: "ml" },
			{ ingredient: "lemon",           amount: 25,    unit: "ml" },
			{ ingredient: "simpleSyrup",     amount: 15,    unit: "ml" },

			{
				label: "Top with one",

				anyOf: [
					{ ingredient: "soda",          amount: 80,    unit: "ml" },
					{ ingredient: "tonic",         amount: 80,    unit: "ml" },
					{ ingredient: "gingerBeer",    amount: 80,    unit: "ml" }
				]
			}
		],

		glass: "Collins / Highball",
		ice: "Cubed ice",
		method: "Build over ice; top with the available mixer.",
		garnish: "Lemon wheel",
		chilledGlass: false
	},


	// ===================================================================
	// RUM & PASSION
	// ===================================================================

	{
		id: "rumPassion",
		name: "Rum & Passion",

		baseVariantName: "Classic",
		baseVariantEmoji: "⚪",

		mainSpirit: "White rum",
		mainTaste: "Passion fruit",
		categories: ["fruity", "sour", "tropical"],

		description: "Passion fruit, lime and rum in a flexible long tropical drink.",
		tasteProfile: { sweet: 4, sour: 3, strong: 3 },

		ingredients: [
			{ ingredient: "whiteRum",        amount: 40,    unit: "ml" },
			{ ingredient: "passoa",          amount: 30,    unit: "ml" },
			{ ingredient: "lime",            amount: 20,    unit: "ml" },
			{ ingredient: "simpleSyrup",     amount: 10,    unit: "ml" },

			{
				label: "Top with one",

				anyOf: [
					{ ingredient: "water",             amount: null,    unit: "to top" },
					{ ingredient: "soda",              amount: null,    unit: "to top" },
					{ ingredient: "tonic",             amount: null,    unit: "to top" },
					{ ingredient: "orangeJuice",       amount: null,    unit: "to top" },
					{ ingredient: "pineappleJuice",    amount: null,    unit: "to top" },
					{ ingredient: "cranberryJuice",    amount: null,    unit: "to top" }
				]
			}
		],

    variants: [
			{
				id: "dark",
				name: "Dark",
				emoji: "🟤",

				description: "The same passion-fruit idea with darker, richer rum notes.",

				ingredientReplacements: {
					whiteRum: {
						ingredient: "darkRum",
						amount: 40,
						unit: "ml"
					}
				}
			}
		],

		glass: "Highball",
		straw: true,
		ice: "Cubed ice",
		method: "Build over ice and top with your preferred mixer.",
		garnish: "Mint + passion fruit",
		chilledGlass: false
	},


	// ===================================================================
	// APEROL GIN SPRITZ
	// ===================================================================

	{
		id: "aperolGinSpritz",
		name: "Aperol Gin Spritz",

		mainSpirit: "Gin",
		mainTaste: "Orange",
		categories: ["bitter", "fresh", "bubbly"],

		description: "A drier, stronger spritz pairing gin with bittersweet Aperol.",
		tasteProfile: { sweet: 3, sour: 1, strong: 3 },

		ingredients: [
			{ ingredient: "gin",       amount: 40,    unit: "ml" },
			{ ingredient: "aperol",    amount: 60,    unit: "ml" },

			{
				label: "Top with one",

				anyOf: [
					{ ingredient: "soda",     amount: null,    unit: "to top" },
					{ ingredient: "tonic",    amount: null,    unit: "to top" }
				]
			}
		],

		glass: "Large wine glass",
		ice: "Cubed ice",
		method: "Build over ice and stir gently.",
		garnish: "Orange slice",
		chilledGlass: false
	},


	// ===================================================================
	// MALIBU SUNSET
	// ===================================================================

	{
		id: "malibuSunset",
		name: "Malibu Sunset",

		mainSpirit: "Malibu",
		mainTaste: "Passion fruit",
		categories: ["fruity", "sweet", "tropical"],

		description: "Sweet coconut, passion fruit and orange with a sunset of grenadine.",
		tasteProfile: { sweet: 5, sour: 1, strong: 2 },

		ingredients: [
			{ ingredient: "malibu",          amount: 40,      unit: "ml" },
			{ ingredient: "passoa",          amount: 20,      unit: "ml" },
			{ ingredient: "orangeJuice",     amount: null,    unit: "to top" },
			{ ingredient: "grenadine",       amount: null,    unit: "splash" }
		],

		glass: "Highball",
		straw: true,
		ice: "Cubed ice",
		method: "Build over ice; finish with a splash of grenadine.",
		garnish: "Cherry and pineaple slice",
		chilledGlass: false
	},


	// ===================================================================
	// GRAPPA SPRITZ
	// ===================================================================

	{
		id: "grappaSpritz",
		name: "Grappa Spritz",

		mainSpirit: "Grappa",
		mainTaste: "Citrus",
		categories: ["bitter", "strong", "bubbly"],

		description: "A bold, aromatic spritz with grappa and bittersweet citrus.",
		tasteProfile: { sweet: 3, sour: 1, strong: 4 },

		ingredients: [
			{ ingredient: "grappa",    amount: 40,    unit: "ml" },
			{ ingredient: "aperol",    amount: 60,    unit: "ml" },

			{
				label: "Top with one",

				anyOf: [
					{ ingredient: "soda",     amount: null,    unit: "to top" },
					{ ingredient: "tonic",    amount: null,    unit: "to top" }
				]
			}
		],

		glass: "Large wine glass",
		ice: "Cubed ice",
		method: "Build over ice and stir gently.",
		garnish: "Lemon slice",
		chilledGlass: false
	},


	// ===================================================================
	// VANILLA RUM OLD FASHIONED
	// ===================================================================

	{
		id: "vanillaRumOldFashioned",
		name: "Vanilla Rum Old Fashioned",

		mainSpirit: "Dark rum",
		mainTaste: "Vanilla",
		categories: ["sweet", "strong", "classic"],

		description: "Dark rum, vanilla and a bitter accent in a rich spirit-forward serve.",
		tasteProfile: { sweet: 3, sour: 1, strong: 5 },

		ingredients: [
			{ ingredient: "darkRum",         amount: 40,    unit: "ml" },
			{ ingredient: "vanillaVodka",    amount: 20,    unit: "ml" },
			{ ingredient: "simpleSyrup",     amount: 10,    unit: "ml" },

			{
				label: "Choose a bitter accent",

				anyOf: [
					{ ingredient: "jagermeister",    amount: 2,    unit: "dashes" },
					{ ingredient: "aperol",           amount: 2,    unit: "dashes" },
					{ ingredient: "tripleSec",        amount: 2,    unit: "dashes" },
					{ ingredient: "suze",             amount: 2,    unit: "dashes" }
				]
			}
		],

		glass: "Old Fashioned",
		ice: "One large cube",
		method: "Stir with ice and serve over fresh ice.",
		garnish: "Orange peel",
		chilledGlass: false
	},


	// ===================================================================
	// VANILLA ESPRESSO MARTINI
	// ===================================================================

	{
		id: "vanillaEspressoMartini",
		name: "Vanilla Espresso Martini",

		mainSpirit: "Vanilla vodka",
		mainTaste: "Coffee",
		categories: ["coffee", "sweet", "strong"],

		description: "Smooth coffee and vanilla with a sweeter, softer espresso-martini profile.",
		tasteProfile: { sweet: 4, sour: 1, strong: 4 },

		ingredients: [
			{ ingredient: "vanillaVodka",    amount: 40,    unit: "ml" },
			{ ingredient: "tripleSec",       amount: 20,    unit: "ml" },
			{ ingredient: "espresso",        amount: 30,    unit: "ml" },
			{ ingredient: "simpleSyrup",     amount: 10,    unit: "ml" }
		],

		glass: "Coupe / Martini",
		ice: "Shaken with ice, served without ice",
		method: "Shake hard with ice and fine-strain.",
		garnish: "Coffee beans",
		chilledGlass: true
	},


	// ===================================================================
	// PISTACHIO MARTINI
	// ===================================================================

	{
		id: "pistachioMartini",
		name: "Pistachio Martini",

		mainSpirit: "Vodka",
		mainTaste: "Pistachio",
		categories: ["sweet", "strong"],

		description: "Creamy pistachio and vanilla wrapped around a vodka base.",
		tasteProfile: { sweet: 5, sour: 1, strong: 4 },

		ingredients: [
			{ ingredient: "vodka",                    amount: 40,    unit: "ml" },
			{ ingredient: "pistachioCreamLiqueur",    amount: 30,    unit: "ml" },
			{ ingredient: "vanillaVodka",             amount: 10,    unit: "ml" }
		],

		glass: "Coupe / Martini",
		ice: "Shaken with ice, served without ice",
		method: "Shake with ice and fine-strain.",
		garnish: "Pistachios",
		chilledGlass: true
	},


	// ===================================================================
	// PRUNE OLD FASHIONED
	// ===================================================================

	{
		id: "pruneOldFashioned",
		name: "Prune Old Fashioned",

		mainSpirit: "Whisky",
		mainTaste: "Alcool",
		categories: ["fruity", "strong", "classic"],

		description: "Whisky and vieille prune: deep, fruity and unapologetically spirit-forward.",
		tasteProfile: { sweet: 3, sour: 1, strong: 5 },

		ingredients: [
			{ ingredient: "whisky",          amount: 50,    unit: "ml" },
			{ ingredient: "vieillePrune",    amount: 15,    unit: "ml" },
			{ ingredient: "simpleSyrup",     amount: 10,    unit: "ml" }
		],

		glass: "Old Fashioned",
		ice: "One large cube",
		method: "Stir with ice and serve over fresh ice.",
		garnish: "Orange peel",
		chilledGlass: false
	},


	// ===================================================================
	// WHITE NEGRONI TWIST
	// ===================================================================

	{
		id: "whiteNegroniTwist",
		name: "White Negroni Twist",

		mainSpirit: "Gin",
		mainTaste: "Lemon",
		categories: ["bitter", "fruity", "strong"],

		description: "Gin, lemon and bittersweet orange in a bright Negroni-style twist.",
		tasteProfile: { sweet: 3, sour: 2, strong: 4 },

		ingredients: [
			{ ingredient: "gin",           amount: 30,    unit: "ml" },
			{ ingredient: "limoncello",    amount: 30,    unit: "ml" },
			{ ingredient: "aperol",        amount: 30,    unit: "ml" }
		],

		glass: "Old Fashioned",
		ice: "One large cube",
		method: "Stir with ice and serve over fresh ice.",
		garnish: "Lemon peel",
		chilledGlass: false
	},


	// ===================================================================
	// PORTO TEQUILA SOUR
	// ===================================================================

	{
		id: "portoTequilaSour",
		name: "Porto Tequila Sour",

		mainSpirit: "Tequila",
		mainTaste: "Porto",
		categories: ["sour", "strong"],

		description: "Tequila and port sharpened with lemon into a rich, fruity sour.",
		tasteProfile: { sweet: 3, sour: 4, strong: 4 },

		ingredients: [
			{ ingredient: "tequila",        amount: 40,    unit: "ml" },
			{ ingredient: "port",           amount: 20,    unit: "ml" },
			{ ingredient: "lemon",          amount: 20,    unit: "ml" },
			{ ingredient: "simpleSyrup",    amount: 15,    unit: "ml" }
		],

		glass: "Coupe",
		ice: "Shaken with ice, served without ice",
		method: "Shake with ice and fine-strain.",
		garnish: "Lemon peel",
		chilledGlass: true
	},


	// ===================================================================
	// DAIQUIRI
	// ===================================================================

	{
		id: "daiquiri",
		name: "Daiquiri",

		baseVariantName: "Classic",
		baseVariantEmoji: "🍋",

		mainSpirit: "White rum",
		mainTaste: "Lime",
		categories: ["sour", "strong", "classic", "fruity"],

		description: "Crisp rum, bright lime and just enough sweetness.",
		tasteProfile: { sweet: 2, sour: 5, strong: 4 },

		ingredients: [
			{ ingredient: "whiteRum",       amount: 30,    unit: "ml" },
			{ ingredient: "simpleSyrup",    amount: 20,    unit: "ml" },
			{ ingredient: "lime",           amount: 20,    unit: "ml" }
		],

		variants: [
			{
				id: "passion",
				name: "Passion",
				emoji: "🌺",

				description: "A tropical Daiquiri where passion-fruit syrup replaces the classic sugar.",

				ingredientReplacements: {
					simpleSyrup: {
						ingredient: "passionFruitSyrup",
						amount: 20,
						unit: "ml"
					}
				}
			},

      {
				id: "dark",
				name: "Dark",
				emoji: "🟤",

				description: "A deeper Daiquiri with dark rum replacing the white rum.",

				ingredientReplacements: {
					whiteRum: {
						ingredient: "darkRum",
						amount: 30,
						unit: "ml"
					}
				}
			},

      {
				id: "darkPassion",
				name: "Dark Passion",
				emoji: "🥀",

				description: "Dark rum and passion fruit together in the richest Daiquiri variation.",

				ingredientReplacements: {
					whiteRum: {
						ingredient: "darkRum",
						amount: 30,
						unit: "ml"
					},
          simpleSyrup: {
						ingredient: "passionFruitSyrup",
						amount: 20,
						unit: "ml"
					}
				}
			}
		],

		glass: "Coupe",
		ice: "Shaken with ice, served without ice",
		method: "Shake with ice and fine-strain.",
		garnish: "Lemon slice",
		chilledGlass: true
	},


	// ===================================================================
	// MARACUJÃO
	// ===================================================================

	{
		id: "maracujao",
		name: "Maracujão",

		mainSpirit: "Licor Beirão",
		mainTaste: "Passion fruit",
		categories: ["fruity", "sweet", "tropical", "fresh"],

		description: "Licor Beirão and passion fruit: juicy, aromatic and easy-drinking.",
		tasteProfile: { sweet: 4, sour: 3, strong: 2 },

		ingredients: [
			{ ingredient: "passionFruitJuice",    amount: 100,    unit: "ml" },
			{ ingredient: "licorBeirao",          amount: 60,     unit: "ml" },
			{ ingredient: "lemon",                amount: 30,     unit: "ml" }
		],

		glass: "Highball / Large glass",
		straw: true,
		ice: "Cubed ice",
		method: "Build over plenty of ice and stir well.",
		garnish: "Mint + passion fruit",
		chilledGlass: false
	},


  // ===================================================================
	// MIMOSA
	// ===================================================================

	{
		id: "mimosa",
		name: "Mimosa",

		mainSpirit: "Prosecco",
		mainTaste: "Orange",
		categories: ["fruity", "bubbly", "fresh", "classic"],

		description: "Cold Prosecco and orange juice: simple, bright and bubbly.",
		tasteProfile: { sweet: 3, sour: 1, strong: 1 },

		ingredients: [
			{ ingredient: "prosecco",       amount: 75,    unit: "ml" },
			{ ingredient: "orangeJuice",    amount: 75,    unit: "ml" }
		],

		glass: "Champagne flute",
		ice: "No ice",
		method: "Pour the orange juice into the glass, then gently top with Prosecco.",
		garnish: "Orange slice",
		chilledGlass: true
	},


	// ===================================================================
	// MOSCOW MULE
	// ===================================================================

	{
		id: "moscowMule",
		name: "Moscow Mule",

		mainSpirit: "Vodka",
		mainTaste: "Ginger",
		categories: ["fresh", "sour", "bubbly", "classic"],

		description: "Vodka, lime and spicy ginger beer served long and ice-cold.",
		tasteProfile: { sweet: 2, sour: 3, strong: 3 },

		ingredients: [
			{ ingredient: "vodka",          amount: 50,     unit: "ml" },
			{ ingredient: "lime",           amount: 15,     unit: "ml" },
			{ ingredient: "gingerBeer",     amount: 100,    unit: "ml" }
		],

		glass: "Copper mug / Highball",
		straw: true,
		ice: "Cubed ice",
		method: "Build over ice and gently stir.",
		garnish: "Lime wedge",
		chilledGlass: false
	},

];