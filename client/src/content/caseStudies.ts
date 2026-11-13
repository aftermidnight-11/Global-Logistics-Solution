export type CaseStudy = {
  slug: string;
  title: string;
  cargoType: string;
  challenge: string;
  solution: string;
  result: string;
  excerpt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'middle-east-exhibition-stand',
    title: 'Middle East exhibition stand delivery',
    cargoType: 'Exhibition materials',
    excerpt: 'Delivering a full stand build to a strict venue window during peak show season.',
    challenge:
      'Multiple suppliers shipped to one hub with only a 6-hour install slot before hall opening.',
    solution:
      'Global Logistics Solutions consolidated inbound air freight, managed temporary import docs and sequenced deliveries to the marshalling yard.',
    result: 'Stand completed on schedule with zero customs holds; client reused the playbook for three subsequent shows.',
  },
  {
    slug: 'offshore-module-delivery',
    title: 'Offshore module delivery',
    cargoType: 'Heavy project cargo',
    excerpt: 'Moving an oversized module from fabrication yard to port with road permits.',
    challenge: 'Module exceeded standard road limits and required night-time convoy escorts.',
    solution: 'Route survey, permit bundle, specialized trailers and port lifting plan coordinated with the EPC contractor.',
    result: 'Module loaded onto charter vessel within the contractual laycan without incident.',
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
