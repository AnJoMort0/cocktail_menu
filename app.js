/*
  ANDRÉ'S BAR — APPLICATION LOGIC
  Normally you do not need to edit this file.
  Edit menu.js to change ingredients, recipes, categories, variants,
  serving components, measurements, and cocktail descriptions.
*/

const STORAGE_KEYS = {
  stock: "homeCocktailBar.stock.v1",

  // Personal favorites belong only to this browser/device.
  // They are NEVER imported from or exported into the QR share link.
  favorites: "homeCocktailBar.favorites.v1",

  // Bartender favorites are André's shared recommendations.
  // These ARE included in QR snapshots.
  bartenderFavorites: "homeCocktailBar.bartenderFavorites.v1",

  mode: "homeCocktailBar.mode.v1"
};

const ingredientMap = new Map(INGREDIENTS.map(item => [item.id, item]));

const els = {
  stockGroups: document.getElementById("stockGroups"),
  stockAllBtn: document.getElementById("stockAllBtn"),
  stockNoneBtn: document.getElementById("stockNoneBtn"),
  readyCount: document.getElementById("readyCount"),
  search: document.getElementById("searchInput"),
  availability: document.getElementById("availabilityFilter"),
  category: document.getElementById("categoryFilter"),
  spirit: document.getElementById("spiritFilter"),
  taste: document.getElementById("tasteFilter"),
  sort: document.getElementById("sortSelect"),
  minus: document.getElementById("minusBtn"),
  plus: document.getElementById("plusBtn"),
  multiplier: document.getElementById("multiplierOutput"),
  shareQrBtn: document.getElementById("shareQrBtn"),
  shareQrDialog: document.getElementById("shareQrDialog"),
  closeQrBtn: document.getElementById("closeQrBtn"),
  qrCodeWrap: document.getElementById("qrCodeWrap"),
  qrStatus: document.getElementById("qrStatus"),
  copyShareLinkBtn: document.getElementById("copyShareLinkBtn"),
  importToast: document.getElementById("importToast"),
  activeFilters: document.getElementById("activeFilters"),
  resultsCount: document.getElementById("resultsCount"),
  grid: document.getElementById("cocktailGrid"),
  modeToggleBtn: document.getElementById("modeToggleBtn"),
  installBtn: document.getElementById("installBtn"),
  surpriseBtn: document.getElementById("surpriseBtn"),
  quickFilters: document.getElementById("quickFilters"),
  clearFiltersBtn: document.getElementById("clearFiltersBtn")
};

const sharedStateImported = importSharedStateFromUrl();
let stock = loadStock();
let favorites = loadFavorites();               // personal, device-only hearts
let bartenderFavorites = loadBartenderFavorites(); // André's shared picks
let appMode = loadMode();
let drinkMultiplier = 1;
let currentShareUrl = "";
let highlightedIngredientId = null;
let deferredInstallPrompt = null;
let surpriseFocusedDrinkId = null;
const selectedVariants = new Map(); // intentionally session-only, not localStorage

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - value.length % 4) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function encodeShareState(value) {
  return bytesToBase64Url(new TextEncoder().encode(JSON.stringify(value)));
}

function decodeShareState(value) {
  return JSON.parse(new TextDecoder().decode(base64UrlToBytes(value)));
}

function importSharedStateFromUrl() {
  if (!location.hash.startsWith("#bar=")) return false;

  try {
    const payload = decodeShareState(location.hash.slice(5));

    // v2 separates André's shared picks from each guest's private favorites.
    // For backwards compatibility, a v1 QR's old `fav` field is interpreted
    // as bartender favorites rather than overwriting the guest's own hearts.
    const sharedBartenderFavorites = Array.isArray(payload?.barFav)
      ? payload.barFav
      : (Array.isArray(payload?.fav) ? payload.fav : null);

    if (!payload || ![1, 2].includes(payload.v) || !Array.isArray(payload.out) || !sharedBartenderFavorites) return false;

    const knownIngredients = new Set(INGREDIENTS.map(item => item.id));
    const unavailable = new Set(payload.out.filter(id => knownIngredients.has(id)));
    const importedStock = Object.fromEntries(INGREDIENTS.map(item => [item.id, !unavailable.has(item.id)]));

    const knownDrinks = new Set(COCKTAILS.map(drink => drink.id));
    const importedBartenderFavorites = sharedBartenderFavorites.filter(id => knownDrinks.has(id));

    localStorage.setItem(STORAGE_KEYS.stock, JSON.stringify(importedStock));
    localStorage.setItem(STORAGE_KEYS.bartenderFavorites, JSON.stringify(importedBartenderFavorites));

    // Deliberately do NOT touch STORAGE_KEYS.favorites here.
    // A guest keeps their own hearts even after scanning a new QR snapshot.

    const cleanUrl = new URL(location.href);
    cleanUrl.hash = "";
    history.replaceState(null, "", cleanUrl.href);
    return true;
  } catch (error) {
    console.warn("Could not import shared bar status", error);
    return false;
  }
}

function buildShareState() {
  return {
    v: 2,
    out: INGREDIENTS
      .filter(item => item.trackStock !== false && !isInStock(item.id))
      .map(item => item.id),
    barFav: [...bartenderFavorites]
  };
}

function buildShareUrl() {
  const url = new URL(location.href);
  url.hash = `bar=${encodeShareState(buildShareState())}`;
  return url.href;
}

function renderQrCode(text) {
  const { QRCode, ErrorCorrectLevel } = window.BarQRCodeEngine;
  const qr = new QRCode(-1, ErrorCorrectLevel.M);
  qr.addData(text);
  qr.make();

  const quiet = 4;
  const modules = qr.getModuleCount();
  const cell = Math.max(3, Math.floor(248 / (modules + quiet * 2)));
  const size = (modules + quiet * 2) * cell;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  canvas.setAttribute("aria-label", "QR code for André's Bar");

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#111416";

  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillRect((col + quiet) * cell, (row + quiet) * cell, cell, cell);
      }
    }
  }

  els.qrCodeWrap.replaceChildren(canvas);
}

function openShareQr() {
  els.qrCodeWrap.textContent = "";

  if (location.protocol === "file:") {
    currentShareUrl = "";
    els.qrCodeWrap.innerHTML = '<div class="empty-state" style="padding:28px 18px"><strong>Open the GitHub Pages version first.</strong><br>A local file cannot be opened by a guest phone.</div>';
    els.qrStatus.textContent = "Once published, this button will generate the live share QR.";
    els.copyShareLinkBtn.hidden = true;
    els.shareQrDialog.showModal();
    return;
  }

  currentShareUrl = buildShareUrl();
  renderQrCode(currentShareUrl);
  const shareState = buildShareState();
  const unavailableCount = shareState.out.length;
  const pickCount = shareState.barFav.length;
  const availabilityText = unavailableCount
    ? `${unavailableCount} unavailable ingredient${unavailableCount === 1 ? "" : "s"}`
    : "Everything marked available";
  const picksText = `${pickCount} André's pick${pickCount === 1 ? "" : "s"}`;
  els.qrStatus.textContent = `${availabilityText} · ${picksText}. Guest hearts stay private on their device.`;
  els.copyShareLinkBtn.hidden = false;
  els.shareQrDialog.showModal();
}

async function copyShareLink() {
  if (!currentShareUrl) return;
  try {
    await navigator.clipboard.writeText(currentShareUrl);
    const original = els.copyShareLinkBtn.textContent;
    els.copyShareLinkBtn.textContent = "Copied ✓";
    setTimeout(() => { els.copyShareLinkBtn.textContent = original; }, 1400);
  } catch {
    const input = document.createElement("textarea");
    input.value = currentShareUrl;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    els.copyShareLinkBtn.textContent = "Copied ✓";
    setTimeout(() => { els.copyShareLinkBtn.textContent = "Copy link"; }, 1400);
  }
}

function showToast(message, duration = 2200) {
  els.importToast.textContent = message;
  els.importToast.classList.remove("show");
  requestAnimationFrame(() => {
    els.importToast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => els.importToast.classList.remove("show"), duration);
  });
}

function showImportedToast() {
  if (sharedStateImported) showToast("Fresh bar status & André's picks loaded ✓", 2800);
}

function loadStock() {
  const defaults = Object.fromEntries(INGREDIENTS.map(i => [i.id, true]));
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.stock) || "{}");
    return { ...defaults, ...saved };
  } catch {
    return defaults;
  }
}

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveStock() {
  localStorage.setItem(STORAGE_KEYS.stock, JSON.stringify(stock));
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...favorites]));
}

function loadBartenderFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.bartenderFavorites) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveBartenderFavorites() {
  localStorage.setItem(STORAGE_KEYS.bartenderFavorites, JSON.stringify([...bartenderFavorites]));
}

function activeFavoriteSet() {
  return appMode === "bartender" ? bartenderFavorites : favorites;
}

function loadMode() {
  try {
    return localStorage.getItem(STORAGE_KEYS.mode) === "bartender" ? "bartender" : "guest";
  } catch {
    return "guest";
  }
}

function saveMode() {
  try { localStorage.setItem(STORAGE_KEYS.mode, appMode); } catch {}
}

function ingredientName(id) {
  return ingredientMap.get(id)?.name || id;
}

function isInStock(id) {
  const ingredient = ingredientMap.get(id);
  if (ingredient?.trackStock === false) return true;
  return stock[id] !== false;
}

function replaceIngredientsInLines(lines, replacements = {}) {
	return (lines || []).flatMap(line => {

		// ---------------------------------------------------------------
		// EXISTING "CHOOSE ONE" / anyOf GROUP
		// ---------------------------------------------------------------
		if (line.anyOf) {
			const options = line.anyOf.flatMap(option => {
				const replacement = replacements[option.ingredient];

				// No replacement for this ingredient
				if (replacement === undefined) {
					return [option];
				}

				// null means remove this ingredient completely
				if (replacement === null) {
					return [];
				}

				// Replace one option with several alternative options
				if (replacement.anyOf) {
					return replacement.anyOf.map(newOption => ({
						...option,
						...newOption
					}));
				}

				// Normal one-for-one replacement
				return [{
					...option,
					...replacement
				}];
			});

			return options.length
				? [{
					...line,
					anyOf: options
				}]
				: [];
		}


		// ---------------------------------------------------------------
		// NORMAL INGREDIENT
		// ---------------------------------------------------------------
		const replacement = replacements[line.ingredient];

		// No replacement
		if (replacement === undefined) {
			return [line];
		}

		// null removes the ingredient
		if (replacement === null) {
			return [];
		}


		// ---------------------------------------------------------------
		// REPLACE ONE INGREDIENT WITH A CHOICE OF INGREDIENTS
		// ---------------------------------------------------------------
		if (replacement.anyOf) {

			// Remove properties that only belong to the old ingredient.
			// Keep things such as blocksAvailability.
			const {
				ingredient,
				amount,
				unit,
				...lineOptions
			} = line;

			return [{
				...lineOptions,
				...replacement
			}];
		}


		// ---------------------------------------------------------------
		// NORMAL ONE-FOR-ONE REPLACEMENT
		// ---------------------------------------------------------------
		return [{
			...line,
			...replacement
		}];
	});
}

function resolveDrinkVariant(drink, variantId = "base") {
  const variant = variantId === "base"
    ? null
    : (drink.variants || []).find(item => item.id === variantId) || null;

  const resolved = { ...drink };
  delete resolved.variants;
  delete resolved.baseVariantName;

  if (variant) {
    // Any top-level field supplied by a variant can override the base recipe.
    for (const [key, value] of Object.entries(variant)) {
      if (["id", "name", "ingredientReplacements", "addIngredients", "addFront", "addSide", "addBack"].includes(key)) continue;
      resolved[key] = value;
    }

    const replacements = variant.ingredientReplacements || {};
    for (const section of ["ingredients", "front", "side", "back"]) {
      if (Object.prototype.hasOwnProperty.call(variant, section)) {
        resolved[section] = variant[section];
      } else {
        resolved[section] = replaceIngredientsInLines(drink[section] || [], replacements);
      }

      const addKey = `add${section[0].toUpperCase()}${section.slice(1)}`;
      if (Array.isArray(variant[addKey]) && variant[addKey].length) {
        resolved[section] = [...(resolved[section] || []), ...variant[addKey]];
      }
    }
  }

  resolved.id = drink.id; // favorites always belong to the whole cocktail card
  resolved.variantId = variant?.id || "base";
  resolved.variantName = variant?.name || drink.baseVariantName || "Classic";
  resolved.variantEmoji = variant?.emoji || drink.baseVariantEmoji || (variant ? "✨" : "🍸");
  return resolved;
}

function drinkVersions(drink) {
  return [
    resolveDrinkVariant(drink, "base"),
    ...(drink.variants || []).map(variant => resolveDrinkVariant(drink, variant.id))
  ];
}

function getActiveDrink(drink) {
  const explicitlySelected = selectedVariants.get(drink.id);
  if (explicitlySelected) return resolveDrinkVariant(drink, explicitlySelected);

  // On first load, prefer a makeable version so a ready variant does not hide behind an unavailable base.
  return drinkVersions(drink).find(version => evaluateDrink(version).available)
    || resolveDrinkVariant(drink, "base");
}

function lineBlocksAvailability(line) {
  return line.blocksAvailability !== false;
}

function drinkIngredientSections(drink) {
  return [
    { key: "ingredients", lines: drink.ingredients || [] },
    { key: "front", lines: drink.front || [] },
    { key: "side", lines: drink.side || [] },
    { key: "back", lines: drink.back || [] }
  ];
}

function allDrinkLines(drink) {
  return drinkIngredientSections(drink).flatMap(section => section.lines);
}

function evaluateDrink(drink) {
  let missingBlocking = 0;
  let missingNonblocking = 0;

  for (const line of allDrinkLines(drink)) {
    if (line.anyOf) {
      const availableOptions = line.anyOf.filter(opt => isInStock(opt.ingredient));
      const groupBlocks = line.blocksAvailability !== false;
      if (availableOptions.length === 0) {
        if (groupBlocks) missingBlocking += 1;
        else missingNonblocking += 1;
      }
      continue;
    }

    if (!isInStock(line.ingredient)) {
      if (lineBlocksAvailability(line)) missingBlocking += 1;
      else missingNonblocking += 1;
    }
  }

  return {
    available: missingBlocking === 0,
    missingBlocking,
    missingNonblocking
  };
}

function formatAmount(amount, unit) {
  if (amount == null || amount === "") return unit || "";
  if (typeof amount !== "number") return `${amount}${unit ? ` ${unit}` : ""}`;
  const scaled = amount * drinkMultiplier;
  const rounded = Math.round(scaled * 100) / 100;
  const pretty = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/\.0+$/, "");
  return `${pretty}${unit ? ` ${unit}` : ""}`;
}

function renderStock() {
  const grouped = new Map();
  for (const item of INGREDIENTS) {
    if (item.trackStock === false) continue;
    if (!grouped.has(item.group)) grouped.set(item.group, []);
    grouped.get(item.group).push(item);
  }

  els.stockGroups.innerHTML = [...grouped.entries()].map(([group, items]) => `
    <div class="stock-group">
      <h3 class="stock-group-title">${escapeHtml(group)}</h3>
      <div class="stock-list">
        ${items.map(item => `
          <label class="stock-item ${isInStock(item.id) ? "" : "off"}" data-stock-label="${item.id}">
            <input type="checkbox" data-stock-id="${item.id}" ${isInStock(item.id) ? "checked" : ""} />
            <span>${escapeHtml(item.name)}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `).join("");

  els.stockGroups.querySelectorAll("[data-stock-id]").forEach(input => {
    input.addEventListener("change", e => {
      const id = e.currentTarget.dataset.stockId;
      stock[id] = e.currentTarget.checked;
      saveStock();
      e.currentTarget.closest(".stock-item").classList.toggle("off", !stock[id]);
      renderCocktails();
    });
  });
}

function populateFilters() {
  const categories = [...new Set(COCKTAILS.flatMap(c => c.categories))]
    .sort((a, b) => (CATEGORY_META[a]?.label || a).localeCompare(CATEGORY_META[b]?.label || b));
  const spirits = [...new Set(COCKTAILS.map(c => c.mainSpirit))].sort();
  const tastes = [...new Set(COCKTAILS.map(c => c.mainTaste))].sort();

  els.category.insertAdjacentHTML("beforeend", categories.map(id => {
    const meta = CATEGORY_META[id] || { icon: "•", label: id };
    return `<option value="${escapeAttr(id)}">${meta.icon} ${escapeHtml(meta.label)}</option>`;
  }).join(""));
  els.spirit.insertAdjacentHTML("beforeend", spirits.map(v => `<option value="${escapeAttr(v)}">${escapeHtml(v)}</option>`).join(""));
  els.taste.insertAdjacentHTML("beforeend", tastes.map(v => `<option value="${escapeAttr(v)}">${escapeHtml(v)}</option>`).join(""));
}

function searchableText(drink) {
  const versions = drinkVersions(drink);
  const versionText = versions.flatMap(version => {
    const ingredientNames = allDrinkLines(version).flatMap(line =>
      line.anyOf ? line.anyOf.map(o => ingredientName(o.ingredient)) : [ingredientName(line.ingredient)]
    );
    const categories = (version.categories || []).map(c => CATEGORY_META[c]?.label || c);
    return [version.variantName, version.name, version.mainSpirit, version.mainTaste, version.description || "", ...ingredientNames, ...categories];
  });
  return versionText.join(" ").toLowerCase();
}

function getFilteredAndSortedDrinks() {
  const q = els.search.value.trim().toLowerCase();
  let list = COCKTAILS.filter(drink => {
    const activeDrink = getActiveDrink(drink);
    const ev = evaluateDrink(activeDrink);
    if (q && !searchableText(drink).includes(q)) return false;
    if (els.category.value !== "all" && !activeDrink.categories.includes(els.category.value)) return false;
    if (els.spirit.value !== "all" && activeDrink.mainSpirit !== els.spirit.value) return false;
    if (els.taste.value !== "all" && activeDrink.mainTaste !== els.taste.value) return false;
    if (els.availability.value === "ready" && !ev.available) return false;
    if (els.availability.value === "missing" && ev.available) return false;
    if (els.availability.value === "favorites" && !activeFavoriteSet().has(drink.id)) return false;
    return true;
  });

  const sortMode = els.sort.value;
  list.sort((a, b) => {
    const activeA = getActiveDrink(a);
    const activeB = getActiveDrink(b);

    // Availability comes first: unavailable favorites never sit above makeable drinks.
    const availabilityDiff = Number(evaluateDrink(activeB).available) - Number(evaluateDrink(activeA).available);
    if (availabilityDiff) return availabilityDiff;

    // The favorites relevant to the current mode float within the same availability group:
    // guest mode = this guest's private hearts; bartender mode = André's shared picks.
    const modeFavorites = activeFavoriteSet();
    const favDiff = Number(modeFavorites.has(b.id)) - Number(modeFavorites.has(a.id));
    if (favDiff) return favDiff;

    // In guest mode, André's picks still get a secondary recommendation boost
    // after the guest's own favorites.
    if (appMode === "guest") {
      const bartenderFavDiff = Number(bartenderFavorites.has(b.id)) - Number(bartenderFavorites.has(a.id));
      if (bartenderFavDiff) return bartenderFavDiff;
    }

    if (sortMode === "spirit") return activeA.mainSpirit.localeCompare(activeB.mainSpirit) || a.name.localeCompare(b.name);
    if (sortMode === "category") {
      const ac = CATEGORY_META[activeA.categories[0]]?.label || activeA.categories[0] || "";
      const bc = CATEGORY_META[activeB.categories[0]]?.label || activeB.categories[0] || "";
      return ac.localeCompare(bc) || a.name.localeCompare(b.name);
    }
    if (sortMode === "taste") return activeA.mainTaste.localeCompare(activeB.mainTaste) || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
  return list;
}

function drinkUsesIngredient(drink, ingredientId) {
  return drinkVersions(drink).some(version =>
    allDrinkLines(version).some(line => line.anyOf
      ? line.anyOf.some(option => option.ingredient === ingredientId)
      : line.ingredient === ingredientId)
  );
}

function renderIngredientLine(line) {
  const available = isInStock(line.ingredient);
  const missingClass = available ? "" : (lineBlocksAvailability(line) ? "missing" : "nonblocking-missing");
  const note = line.blocksAvailability === false ? ' <span title="Does not block cocktail availability">◌</span>' : "";
  const amount = appMode === "bartender" ? `<span class="amount">${escapeHtml(formatAmount(line.amount, line.unit))}</span>` : "";
  const activeClass = highlightedIngredientId === line.ingredient ? "active" : "";
  return `
    <div class="ingredient-line ${missingClass}">
      <button class="ingredient-name-btn ${activeClass}" type="button" data-highlight-ingredient="${escapeAttr(line.ingredient)}" title="Highlight other cocktails using ${escapeAttr(ingredientName(line.ingredient))}">${escapeHtml(ingredientName(line.ingredient))}${note}</button>
      ${amount}
    </div>
  `;
}

function renderChoiceGroup(line) {
  return `
    <div class="choice-group">
      <div class="choice-label">${escapeHtml(line.label || "Choose one")}</div>
      ${line.anyOf.map(renderIngredientLine).join("")}
    </div>
  `;
}

const TASTE_PROFILE_META = {
  sweet: { label: "Sweet", icon: "🍬" },
  sour: { label: "Sour", icon: "🍋" },
  strong: { label: "Strong", icon: "💪" },
  bitter: { label: "Bitter", icon: "🌿" },
  fruity: { label: "Fruity", icon: "🍓" },
  fresh: { label: "Fresh", icon: "❄️" }
};

function renderTasteProfile(drink) {
  if (!drink.tasteProfile || typeof drink.tasteProfile !== "object") return "";
  const entries = Object.entries(drink.tasteProfile)
    .filter(([, value]) => Number.isFinite(Number(value)))
    .map(([key, value]) => [key, Math.max(0, Math.min(5, Math.round(Number(value))))]);
  if (!entries.length) return "";
  return `
    <div class="taste-profile" aria-label="Taste profile">
      ${entries.map(([key, value]) => {
        const meta = TASTE_PROFILE_META[key] || { label: key, icon: "•" };
        const dots = Array.from({ length: 5 }, (_, index) => `<span class="taste-dot ${index < value ? "filled" : ""}"></span>`).join("");
        return `<div class="taste-row" title="${escapeAttr(meta.label)}: ${value} out of 5"><span class="taste-label">${meta.icon} ${escapeHtml(meta.label)}</span><span class="taste-dots" aria-hidden="true">${dots}</span></div>`;
      }).join("")}
    </div>
  `;
}

function renderVariantPicker(drink, activeDrink) {
  if (!Array.isArray(drink.variants) || !drink.variants.length) return "";

  const options = drinkVersions(drink);
  return `
    <div class="variant-picker">
      <p class="variant-picker-label">✨ Choose your version <span class="variant-picker-hint">· tap to explore</span></p>
      <div class="variant-options" role="group" aria-label="${escapeAttr(drink.name)} variant">
        ${options.map(version => {
          const ready = evaluateDrink(version).available;
          const active = version.variantId === activeDrink.variantId;
          return `
            <button
              class="variant-btn ${active ? "active" : ""} ${ready ? "" : "unavailable"}"
              type="button"
              data-variant-drink="${escapeAttr(drink.id)}"
              data-variant-id="${escapeAttr(version.variantId)}"
              aria-pressed="${active ? "true" : "false"}"
              title="${ready ? "Ready to make" : "Missing ingredients"}"
            ><span class="variant-emoji" aria-hidden="true">${escapeHtml(version.variantEmoji)}</span>${escapeHtml(version.variantName)}</button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

const SERVE_COMPONENT_META = {
  front: { label: "Front", icon: "↗" },
  side: { label: "On the side", icon: "◫" },
  back: { label: "Back", icon: "↘" }
};

function renderServeComponents(drink) {
  const sections = ["front", "side", "back"]
    .filter(key => Array.isArray(drink[key]) && drink[key].length);

  if (!sections.length) return "";

  return `
    <div class="serve-components">
      ${sections.map(key => {
        const meta = SERVE_COMPONENT_META[key];
        return `
          <div class="serve-component">
            <p class="serve-component-title"><span>${meta.icon}</span><span>${escapeHtml(meta.label)}</span></p>
            <div class="ingredient-lines">
              ${drink[key].map(line => line.anyOf ? renderChoiceGroup(line) : renderIngredientLine(line)).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderCocktailCard(drink) {
  const activeDrink = getActiveDrink(drink);
  const ev = evaluateDrink(activeDrink);
  const isPersonalFavorite = favorites.has(drink.id);
  const isBartenderFavorite = bartenderFavorites.has(drink.id);
  const isFavorite = appMode === "bartender" ? isBartenderFavorite : isPersonalFavorite;
  const favoriteLabel = appMode === "bartender"
    ? (isFavorite ? "Remove from André's picks" : "Add to André's picks")
    : (isFavorite ? "Remove from my favorites" : "Add to my favorites");
  const statusText = ev.available
    ? (ev.missingNonblocking ? `Ready · ${ev.missingNonblocking} optional item missing` : "Ready to make")
    : `Missing ${ev.missingBlocking} required ${ev.missingBlocking === 1 ? "item" : "items"}`;
  const highlightClass = highlightedIngredientId ? (drinkUsesIngredient(drink, highlightedIngredientId) ? "ingredient-match" : "ingredient-dim") : "";
  const description = activeDrink.description ? `<p class="cocktail-description">${escapeHtml(activeDrink.description)}</p>` : "";

  return `
    <article class="cocktail-card ${ev.available ? "" : "unavailable"} ${highlightClass}" data-drink-id="${escapeAttr(drink.id)}">
      <div class="accent-line"></div>
      <div class="card-body">
        <div class="card-top">
          <div>
            <h3 class="cocktail-name">${escapeHtml(drink.name)}</h3>
            <p class="spirit-line">${escapeHtml(activeDrink.mainSpirit)} · ${escapeHtml(activeDrink.mainTaste)}</p>
            ${isBartenderFavorite ? `<span class="bartender-pick" title="Recommended by André">★ André's pick</span>` : ""}
          </div>
          <div class="card-actions">
            ${appMode === "bartender" ? `<button class="copy-recipe-btn" type="button" data-copy-recipe="${escapeAttr(drink.id)}" aria-label="Copy scaled recipe" title="Copy scaled recipe">📋</button>` : ""}
            <button class="heart ${isFavorite ? "active" : ""}" type="button" data-favorite-id="${escapeAttr(drink.id)}" aria-label="${escapeAttr(favoriteLabel)}" title="${escapeAttr(favoriteLabel)}">${isFavorite ? "♥" : "♡"}</button>
          </div>
        </div>
        ${description}
        <div class="tags">
          ${activeDrink.categories.map(cat => {
            const meta = CATEGORY_META[cat] || { label: cat, icon: "•" };
            return `<span class="tag" title="${escapeAttr(meta.label)}">${meta.icon} ${escapeHtml(meta.label)}</span>`;
          }).join("")}
        </div>
        ${renderTasteProfile(activeDrink)}
        ${renderVariantPicker(drink, activeDrink)}
        <div class="availability ${ev.available ? "good" : "bad"}">${ev.available ? "●" : "○"} ${escapeHtml(statusText)}</div>
        <div class="recipe-block">
          ${appMode === "bartender" ? `<p class="recipe-title">For ${drinkMultiplier} ${drinkMultiplier === 1 ? "drink" : "drinks"}</p>` : `<p class="recipe-title">Ingredients</p>`}
          <div class="ingredient-lines">
            ${(activeDrink.ingredients || []).map(line => line.anyOf ? renderChoiceGroup(line) : renderIngredientLine(line)).join("")}
          </div>
        </div>
        ${renderServeComponents(activeDrink)}
        ${appMode === "bartender" ? `
          <div class="service">
            <div class="service-row"><span>🥃</span><span><strong>Glass:</strong> ${escapeHtml(activeDrink.glass)}${activeDrink.chilledGlass ? " · chilled" : ""}${activeDrink.straw ? " · with straw" : ""}</span></div>
            <div class="service-row"><span>🧊</span><span><strong>Ice:</strong> ${escapeHtml(activeDrink.ice)}</span></div>
            <div class="service-row"><span>↻</span><span><strong>Method:</strong> ${escapeHtml(activeDrink.method)}</span></div>
            <div class="service-row"><span>🍊</span><span><strong>Garnish:</strong> ${escapeHtml(activeDrink.garnish)}</span></div>
          </div>` : ""}
      </div>
    </article>
  `;
}

function renderCocktails() {
  const allReady = COCKTAILS.filter(c => evaluateDrink(getActiveDrink(c)).available).length;
  els.readyCount.textContent = allReady;
  const list = getFilteredAndSortedDrinks();
  els.resultsCount.textContent = appMode === "bartender" ? `${list.length} of ${COCKTAILS.length} shown · ${drinkMultiplier}× recipe` : `${list.length} of ${COCKTAILS.length} shown`;
  els.multiplier.value = `${drinkMultiplier}×`;
  els.multiplier.textContent = `${drinkMultiplier}×`;
  els.grid.innerHTML = list.length ? list.map(renderCocktailCard).join("") : `<div class="empty-state"><strong>No cocktails match these filters.</strong><br>Try clearing a filter or restocking an ingredient.</div>`;

  els.grid.querySelectorAll("[data-favorite-id]").forEach(button => button.addEventListener("click", e => {
    const id = e.currentTarget.dataset.favoriteId;

    if (appMode === "bartender") {
      bartenderFavorites.has(id) ? bartenderFavorites.delete(id) : bartenderFavorites.add(id);
      saveBartenderFavorites();
    } else {
      favorites.has(id) ? favorites.delete(id) : favorites.add(id);
      saveFavorites();
    }

    renderCocktails();
  }));
  els.grid.querySelectorAll("[data-variant-drink]").forEach(button => button.addEventListener("click", e => {
    selectedVariants.set(e.currentTarget.dataset.variantDrink, e.currentTarget.dataset.variantId); renderCocktails();
  }));
  els.grid.querySelectorAll("[data-highlight-ingredient]").forEach(button => button.addEventListener("click", e => {
    const id = e.currentTarget.dataset.highlightIngredient;
    highlightedIngredientId = highlightedIngredientId === id ? null : id; renderCocktails();
  }));
  els.grid.querySelectorAll("[data-copy-recipe]").forEach(button => button.addEventListener("click", e => copyScaledRecipe(e.currentTarget.dataset.copyRecipe)));
  renderActiveFilters();
  updateQuickFilterState();
}

function renderActiveFilters() {
  const chips = [];
  if (els.search.value.trim()) chips.push({ key: "search", label: `Search: ${els.search.value.trim()}` });
  if (els.availability.value !== "all") chips.push({ key: "availability", label: els.availability.options[els.availability.selectedIndex].text });
  if (els.category.value !== "all") chips.push({ key: "category", label: els.category.options[els.category.selectedIndex].text });
  if (els.spirit.value !== "all") chips.push({ key: "spirit", label: els.spirit.value });
  if (els.taste.value !== "all") chips.push({ key: "taste", label: els.taste.value });
  if (highlightedIngredientId) chips.push({ key: "ingredientHighlight", label: `Highlight: ${ingredientName(highlightedIngredientId)}` });
  els.activeFilters.innerHTML = chips.map(chip => `<button class="filter-chip" type="button" data-clear-filter="${chip.key}">${escapeHtml(chip.label)} ×</button>`).join("");
  els.activeFilters.querySelectorAll("[data-clear-filter]").forEach(btn => btn.addEventListener("click", () => {
    const key = btn.dataset.clearFilter;
    if (key === "search") els.search.value = "";
    if (key === "availability") els.availability.value = "all";
    if (key === "category") els.category.value = "all";
    if (key === "spirit") els.spirit.value = "all";
    if (key === "taste") els.taste.value = "all";
    if (key === "ingredientHighlight") highlightedIngredientId = null;
    renderCocktails();
  }));
}

function clearFilters() {
  els.search.value = ""; els.availability.value = "all"; els.category.value = "all"; els.spirit.value = "all"; els.taste.value = "all";
  highlightedIngredientId = null; renderCocktails();
}

function updateQuickFilterState() {
  els.quickFilters.querySelectorAll("[data-quick-category]").forEach(button => {
    const category = button.dataset.quickCategory;
    const active = category === "all" ? els.category.value === "all" : els.category.value === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function chooseQuickCategory(category) { els.category.value = category === "all" ? "all" : category; renderCocktails(); }

function clearSurpriseFocus() {
  document.querySelector(".surprise-backdrop")?.remove();
  document.querySelectorAll(".cocktail-card.surprise-focus").forEach(card => card.classList.remove("surprise-focus"));
  surpriseFocusedDrinkId = null;
  document.removeEventListener("pointerdown", dismissSurpriseOnInteraction, true);
  document.removeEventListener("keydown", dismissSurpriseOnInteraction, true);
}

function dismissSurpriseOnInteraction() {
  clearSurpriseFocus();
}

function focusSurpriseCard(card, drinkId) {
  clearSurpriseFocus();
  surpriseFocusedDrinkId = drinkId;

  const backdrop = document.createElement("div");
  backdrop.className = "surprise-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.appendChild(backdrop);

  card.classList.add("surprise-focus");

  // pointerdown is used instead of click so the click that triggered Surprise Me
  // cannot immediately dismiss the newly-created focus state.
  document.addEventListener("pointerdown", dismissSurpriseOnInteraction, true);
  document.addEventListener("keydown", dismissSurpriseOnInteraction, true);
}

function surpriseMe() {
  const candidates = getFilteredAndSortedDrinks().filter(drink => evaluateDrink(getActiveDrink(drink)).available);
  if (!candidates.length) { showToast("No ready cocktails match those filters."); return; }

  const drink = candidates[Math.floor(Math.random() * candidates.length)];
  const readyVersion = drinkVersions(drink).find(version => evaluateDrink(version).available);
  if (readyVersion) selectedVariants.set(drink.id, readyVersion.variantId);

  renderCocktails();

  requestAnimationFrame(() => {
    const card = els.grid.querySelector(`[data-drink-id="${CSS.escape(drink.id)}"]`);
    if (!card) return;

    card.scrollIntoView({ behavior: "smooth", block: "center" });
    focusSurpriseCard(card, drink.id);
  });
}

function recipeLineToText(line) {
  if (line.anyOf) {
    const options = line.anyOf.map(option => `  - ${ingredientName(option.ingredient)} — ${formatAmount(option.amount, option.unit)}`).join("\n");
    return `${line.label || "Choose one"}:\n${options}`;
  }
  return `${ingredientName(line.ingredient)} — ${formatAmount(line.amount, line.unit)}`;
}

function buildRecipeText(drink) {
  const activeDrink = getActiveDrink(drink);
  const variantSuffix = Array.isArray(drink.variants) && drink.variants.length ? ` — ${activeDrink.variantName}` : "";
  const lines = [`${drink.name}${variantSuffix}`, `For ${drinkMultiplier} ${drinkMultiplier === 1 ? "drink" : "drinks"}`, "", "Ingredients:"];
  (activeDrink.ingredients || []).forEach(line => lines.push(recipeLineToText(line)));
  for (const section of ["front", "side", "back"]) {
    if (!Array.isArray(activeDrink[section]) || !activeDrink[section].length) continue;
    lines.push("", `${SERVE_COMPONENT_META[section].label}:`);
    activeDrink[section].forEach(line => lines.push(recipeLineToText(line)));
  }
  lines.push("", `Glass: ${activeDrink.glass}${activeDrink.chilledGlass ? " · chilled" : ""}${activeDrink.straw ? " · with straw" : ""}`, `Ice: ${activeDrink.ice}`, `Method: ${activeDrink.method}`, `Garnish: ${activeDrink.garnish}`);
  return lines.join("\n");
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const textarea = document.createElement("textarea"); textarea.value = text; textarea.style.position = "fixed"; textarea.style.opacity = "0";
    document.body.appendChild(textarea); textarea.select(); document.execCommand("copy"); textarea.remove();
  }
}
async function copyScaledRecipe(drinkId) {
  const drink = COCKTAILS.find(item => item.id === drinkId); if (!drink) return;
  await copyText(buildRecipeText(drink)); showToast(`${drink.name} recipe copied ✓`);
}

function applyMode() {
  document.body.classList.toggle("guest-mode", appMode === "guest");
  document.body.classList.toggle("bartender-mode", appMode === "bartender");
  els.modeToggleBtn.textContent = appMode === "guest" ? "🍸 Bartender" : "👥 Guest view";
  els.modeToggleBtn.setAttribute("aria-pressed", appMode === "bartender" ? "true" : "false");

  const favoritesOption = els.availability.querySelector('option[value="favorites"]');
  if (favoritesOption) {
    favoritesOption.textContent = appMode === "bartender" ? "André's picks only" : "My favorites only";
  }
}
function toggleMode() { appMode = appMode === "guest" ? "bartender" : "guest"; saveMode(); applyMode(); renderCocktails(); }

function registerPwa() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(error => console.warn("Service worker registration failed", error)));
  window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); deferredInstallPrompt = event; els.installBtn.hidden = false; });
  window.addEventListener("appinstalled", () => { deferredInstallPrompt = null; els.installBtn.hidden = true; showToast("André's Bar installed ✓"); });
}
async function installPwa() { if (!deferredInstallPrompt) return; deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; els.installBtn.hidden = true; }

function setAllStock(value) {
  for (const item of INGREDIENTS) stock[item.id] = value;
  saveStock();
  renderStock();
  renderCocktails();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) { return escapeHtml(value); }

[els.search, els.availability, els.category, els.spirit, els.taste, els.sort].forEach(el => {
  el.addEventListener(el === els.search ? "input" : "change", renderCocktails);
});
els.stockAllBtn.addEventListener("click", () => setAllStock(true));
els.stockNoneBtn.addEventListener("click", () => setAllStock(false));
els.shareQrBtn.addEventListener("click", openShareQr);
els.closeQrBtn.addEventListener("click", () => els.shareQrDialog.close());
els.copyShareLinkBtn.addEventListener("click", copyShareLink);
els.clearFiltersBtn.addEventListener("click", clearFilters);
els.surpriseBtn.addEventListener("click", surpriseMe);
els.modeToggleBtn.addEventListener("click", toggleMode);
els.installBtn.addEventListener("click", installPwa);
els.quickFilters.querySelectorAll("[data-quick-category]").forEach(button => button.addEventListener("click", () => chooseQuickCategory(button.dataset.quickCategory)));
els.shareQrDialog.addEventListener("click", event => { if (event.target === els.shareQrDialog) els.shareQrDialog.close(); });
els.minus.addEventListener("click", () => { drinkMultiplier = Math.max(1, drinkMultiplier - 1); renderCocktails(); });
els.plus.addEventListener("click", () => { drinkMultiplier = Math.min(20, drinkMultiplier + 1); renderCocktails(); });

applyMode();
populateFilters();
renderStock();
renderCocktails();
showImportedToast();
registerPwa();
