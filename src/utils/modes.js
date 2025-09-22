// ----- modes.js -----
// Modos disponibles para la ronda
export const MODES = ["flag", "capital", "region", "currency", "language"];

/**
 * Elige un modo aleatorio para una nueva ronda.
 * Puedes pasar un arreglo de modos para forzar un subconjunto (opcional).
 */
export function pickRandomMode(allowed = MODES) {
  const pool = Array.isArray(allowed) && allowed.length ? allowed : MODES;
  const i = Math.floor(Math.random() * pool.length);
  return pool[i];
}

/**
 * (Compat) Si algún lugar del código aún llama getInitialMode(),
 * devolvemos un modo aleatorio. Así no rompe nada.
 */
export function getInitialMode() {
  return pickRandomMode();
}

/** Opcional: setear modo manualmente si lo necesitas en algún punto. */
export function setMode(mode) {
  if (MODES.includes(mode)) sessionStorage.setItem("quiz.mode", mode);
}

/** Etiqueta legible para UI */
export function labelForMode(mode) {
  switch (mode) {
    case "flag":     return "Banderas";
    case "capital":  return "Capitales";
    case "region":   return "Regiones";
    case "currency": return "Monedas";
    case "language": return "Idiomas";
    default:         return mode;
  }
}
