// Obtiene países desde RestCountries y normaliza datos necesarios para el quiz.
// Usamos sessionStorage como cache simple para evitar múltiples fetch entre vistas.

const BASE = "https://restcountries.com/v3.1/all";
const FIELDS = "name,capital,flags,region,currencies,languages,cca3";

function normalizeCountry(c) {
  const id = c.cca3 || crypto.randomUUID();
  const name = c?.name?.common || "Unknown";
  const capital = Array.isArray(c?.capital) ? c.capital[0] : (c?.capital || null);
  const region = c?.region || null;
  const flagSvg = c?.flags?.svg || c?.flags?.png || null;

  let currencyNames = [];
  if (c?.currencies && typeof c.currencies === "object") {
    currencyNames = Object.values(c.currencies)
      .map(x => x?.name)
      .filter(Boolean);
  }

  let languageNames = [];
  if (c?.languages && typeof c.languages === "object") {
    languageNames = Object.values(c.languages).filter(Boolean);
  }

  return { id, name, capital, region, flagSvg, currencyNames, languageNames };
}

// 🟣 Full (para capital/region/currency/language/flag)
export async function fetchCountries() {
  const KEY = "rc.countries.full";
  const cached = sessionStorage.getItem(KEY);
  if (cached) return JSON.parse(cached);

  const res = await fetch(`${BASE}?fields=${FIELDS}`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  const data = await res.json();

  const normalized = data.map(normalizeCountry);
  sessionStorage.setItem(KEY, JSON.stringify(normalized));
  return normalized;
}

// 🟡 Light (banderas rápidas). La misma llamada pero puedes cambiar si quisieras reducir campos.
export async function fetchCountriesLight() {
  const KEY = "rc.countries.light";
  const cached = sessionStorage.getItem(KEY);
  if (cached) return JSON.parse(cached);

  const res = await fetch(`${BASE}?fields=${FIELDS}`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  const data = await res.json();

  const normalized = data.map(normalizeCountry);
  sessionStorage.setItem(KEY, JSON.stringify(normalized));
  return normalized;
}
