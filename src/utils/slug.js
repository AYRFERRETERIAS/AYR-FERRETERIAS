// Convierte un titulo de producto en una URL legible: "Fijador Sellador RIoPint 1L"
// + id 5 -> "fijador-sellador-riopint-1l-5". El id al final garantiza que la URL
// sea unica incluso si dos productos tienen titulos parecidos.
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // saca tildes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function productSlug(product) {
  return `${slugify(product.title)}-${product.id}`;
}

// Extrae el id numerico del final de la URL ("...-5" -> 5).
export function idFromSlug(slug) {
  const match = String(slug).match(/-(\d+)$/);
  return match ? Number(match[1]) : NaN;
}
