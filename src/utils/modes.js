// Fisher–Yates (no muta el array original)
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Devuelve n elementos únicos aleatorios del array de entrada, opcionalmente filtrando por predicate
export function sample(arr, n, predicate = null) {
  const pool = predicate ? arr.filter(predicate) : arr.slice();
  const out = [];
  const seen = new Set();
  while (out.length < n && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    const item = pool.splice(idx, 1)[0];
    const key = JSON.stringify(item);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}
