// Genera public/sitemap.xml a partir de src/data/products.js, incluyendo la
// home y la URL de cada producto. Corre antes del build (no depende de un
// navegador, solo lee datos), asi el sitemap nunca queda desactualizado
// cuando cargamos productos nuevos.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const { products } = await import('../src/data/products.js');

const BASE_URL = 'https://ferreteriaayr.com';

const urls = [
  { loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  ...products.map((p) => ({
    loc: `${BASE_URL}/producto/${slugify(p.title)}-${p.id}`,
    changefreq: 'weekly',
    priority: '0.7',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml generado con ${urls.length} URLs (${products.length} productos).`);
