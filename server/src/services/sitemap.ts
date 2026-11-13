const routes = [
  '',
  'about',
  'vision',
  'contact',
  'privacy',
  'career',
  'gallery',
  'case-studies',
  'blog',
  'services',
  'services/freight-forwarding',
  'services/air-freight',
  'services/ocean-freight',
  'services/customs-clearance',
  'services/vessel-chartering',
  'services/event-exhibition-logistics',
  'services/heavy-cargo',
  'services/warehousing',
  'services/relocation',
  'case-studies/middle-east-exhibition-stand',
  'case-studies/offshore-module-delivery',
  'blog/navigating-red-sea-reroutes',
  'blog/heavy-lift-planning-checklist',
];

export function getSitemapXml(baseUrl: string): string {
  const urls = routes
    .map(
      (path) => `  <url>
    <loc>${baseUrl}/${path}</loc>
    <changefreq>weekly</changefreq>
  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
