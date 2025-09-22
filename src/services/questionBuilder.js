import { shuffle, sample } from "/src/utils/shuffle.js";

/**
 * buildByType(countries, mode, total)
 * Genera preguntas según el modo:
 * - flag:     "¿De qué país es esta bandera?"         (opciones: nombres de países)
 * - capital:  "¿Cuál es la capital de X?"             (opciones: capitales)
 * - region:   "¿A qué región pertenece X?"            (opciones: regiones)
 * - currency: "¿Cuál es una moneda oficial de X?"     (opciones: nombres de monedas)
 * - language: "¿Cuál es un idioma oficial de X?"      (opciones: nombres de idiomas)
 */
export function buildByType(countries, mode = "capital", total = 10) {
  const clean = countries.filter(Boolean);

  const builders = {
    flag: makeFlagQuestion,
    capital: makeCapitalQuestion,
    region: makeRegionQuestion,
    currency: makeCurrencyQuestion,
    language: makeLanguageQuestion,
  };

  const fn = builders[mode] || builders.capital;

  // Intentamos más de 'total' por si algunos países no tienen datos suficientes
  const pool = shuffle(clean);
  const out = [];

  for (const c of pool) {
    const q = fn(c, clean);
    if (q) out.push(q);
    if (out.length >= total) break;
  }

  // Fallback: si no alcanzó total (por datos incompletos), rellena con otras modalidades
  if (out.length < total) {
    for (const c of pool) {
      if (out.length >= total) break;
      const q = builders.capital(c, clean) || builders.flag(c, clean) || builders.region(c, clean);
      if (q && !out.find(x => x.id === q.id)) out.push(q);
    }
  }

  // Asegura unicidad por id (país) y recorta a total
  const uniq = [];
  const seen = new Set();
  for (const q of out) {
    if (!seen.has(q.id)) {
      seen.add(q.id);
      uniq.push(q);
    }
    if (uniq.length >= total) break;
  }

  return uniq;
}

/* ===== Constructores por modo ===== */

function makeFlagQuestion(c, all) {
  if (!c.flagSvg || !c.name) return null;

  // opciones: nombres de países
  const distractors = sample(all.filter(x => x.name !== c.name && x.flagSvg), 3)
    .map(x => x.name);
  if (distractors.length < 3) return null;

  const options = shuffle([c.name, ...distractors]);

  return {
    id: c.id,
    type: "flag",
    prompt: "¿De qué país es esta bandera?",
    options,
    answer: c.name,
    flagUrl: c.flagSvg,
  };
}

function makeCapitalQuestion(c, all) {
  if (!c.name || !c.capital) return null;

  // opciones: capitales
  const distractors = sample(
    all.filter(x => x.capital && x.capital !== c.capital),
    3
  ).map(x => x.capital);
  if (distractors.length < 3) return null;

  const options = shuffle([c.capital, ...distractors]);

  return {
    id: c.id,
    type: "capital",
    prompt: `¿Cuál es la capital de ${c.name}?`,
    options,
    answer: c.capital,
  };
}

function makeRegionQuestion(c, all) {
  if (!c.name || !c.region) return null;

  // opciones: regiones (únicas)
  const regions = Array.from(new Set(all.map(x => x.region).filter(Boolean)));
  if (regions.length < 4) return null;

  const wrongs = sample(regions.filter(r => r !== c.region), 3);
  const options = shuffle([c.region, ...wrongs]);

  return {
    id: c.id,
    type: "region",
    prompt: `¿A qué región pertenece ${c.name}?`,
    options,
    answer: c.region,
  };
}

function makeCurrencyQuestion(c, all) {
  const cur = Array.isArray(c.currencyNames) ? c.currencyNames[0] : null;
  if (!c.name || !cur) return null;

  // opciones: nombres de monedas
  const currencyPool = Array.from(
    new Set(
      all.flatMap(x => x.currencyNames || []).filter(Boolean)
    )
  );
  if (currencyPool.length < 4) return null;

  const wrongs = sample(currencyPool.filter(x => x !== cur), 3);
  const options = shuffle([cur, ...wrongs]);

  return {
    id: c.id,
    type: "currency",
    prompt: `¿Cuál es una moneda oficial de ${c.name}?`,
    options,
    answer: cur,
  };
}

function makeLanguageQuestion(c, all) {
  const lang = Array.isArray(c.languageNames) ? c.languageNames[0] : null;
  if (!c.name || !lang) return null;

  const langPool = Array.from(
    new Set(
      all.flatMap(x => x.languageNames || []).filter(Boolean)
    )
  );
  if (langPool.length < 4) return null;

  const wrongs = sample(langPool.filter(x => x !== lang), 3);
  const options = shuffle([lang, ...wrongs]);

  return {
    id: c.id,
    type: "language",
    prompt: `¿Cuál es un idioma oficial de ${c.name}?`,
    options,
    answer: lang,
  };
}
