export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  audience: string;
  included: string[];
  process: { step: number; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  relatedCaseStudy?: string;
  relatedSlugs: string[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: 'international-shipping',
    title: '1. INTERNATIONAL SHIPPING',
    summary: 'Reliable sea and air freight solutions to destinations worldwide.',
    icon: 'ship',
    audience: 'Businesses looking for global freight solutions.',
    included: ['Sea Freight', 'Air Freight', 'Documentation'],
    process: [],
    faqs: [],
    relatedSlugs: ['customs-clearance', 'end-to-end-logistics'],
    metaDescription: 'Reliable sea and air freight solutions to destinations worldwide.',
  },
  {
    slug: 'customs-clearance',
    title: '2. CUSTOMS CLEARANCE',
    summary: 'Fast and accurate customs clearance ensuring smooth movement of your goods.',
    icon: 'document',
    audience: 'Importers and exporters requiring border clearance.',
    included: ['Customs Declarations', 'Duty Management', 'Regulatory Compliance'],
    process: [],
    faqs: [],
    relatedSlugs: ['hs-code-product-classification', 'saber-saso-compliance-support'],
    metaDescription: 'Fast and accurate customs clearance ensuring smooth movement of your goods.',
  },
  {
    slug: 'hs-code-product-classification',
    title: '3. HS CODE & PRODUCT CLASSIFICATION',
    summary: 'Accurate HS code determination to ensure compliance and minimize delays.',
    icon: 'search',
    audience: 'Businesses needing accurate product classification.',
    included: ['HS Code Determination', 'Compliance Review'],
    process: [],
    faqs: [],
    relatedSlugs: ['customs-clearance'],
    metaDescription: 'Accurate HS code determination to ensure compliance and minimize delays.',
  },
  {
    slug: 'saber-saso-compliance-support',
    title: '4. SABER / SASO COMPLIANCE SUPPORT',
    summary: 'Expert support for SABER (Saudi Arabia) and SASO (GCC) compliance.',
    icon: 'shield',
    audience: 'Exporters shipping to Saudi Arabia and the GCC.',
    included: ['SABER Registration', 'SASO Certification', 'Compliance Audits'],
    process: [],
    faqs: [],
    relatedSlugs: ['certification-coordination'],
    metaDescription: 'Expert support for SABER (Saudi Arabia) and SASO (GCC) compliance.',
  },
  {
    slug: 'certification-coordination',
    title: '5. CERTIFICATION COORDINATION',
    summary: 'We coordinate all required certificates to ensure your shipments meet regulatory requirements.',
    icon: 'certificate',
    audience: 'Shippers needing specialized certifications.',
    included: ['Certificate of Origin', 'Health Certificates', 'Quality Certificates'],
    process: [],
    faqs: [],
    relatedSlugs: ['saber-saso-compliance-support', 'sfda-related-requirements'],
    metaDescription: 'We coordinate all required certificates to ensure your shipments meet regulatory requirements.',
  },
  {
    slug: 'sfda-related-requirements',
    title: '6. SFDA-RELATED REQUIREMENTS',
    summary: 'Professional handling of SFDA related documentation and approvals for regulated products.',
    icon: 'health',
    audience: 'Food, drug, and cosmetic importers into Saudi Arabia.',
    included: ['SFDA Documentation', 'Product Approvals', 'Inspection Coordination'],
    process: [],
    faqs: [],
    relatedSlugs: ['customs-clearance'],
    metaDescription: 'Professional handling of SFDA related documentation and approvals for regulated products.',
  },
  {
    slug: 'procurement-sourcing',
    title: '7. PROCUREMENT & SOURCING',
    summary: 'We help you source quality products from trusted manufacturers globally.',
    icon: 'cart',
    audience: 'Companies looking to optimize their supply chain sourcing.',
    included: ['Supplier Identification', 'Quality Assurance', 'Negotiation'],
    process: [],
    faqs: [],
    relatedSlugs: ['supply-chain-management'],
    metaDescription: 'We help you source quality products from trusted manufacturers globally.',
  },
  {
    slug: 'supply-chain-management',
    title: '8. SUPPLY CHAIN MANAGEMENT',
    summary: 'End-to-end supply chain strategies to improve efficiency, reduce costs and drive growth.',
    icon: 'network',
    audience: 'Enterprises needing comprehensive supply chain solutions.',
    included: ['Supply Chain Strategy', 'Inventory Optimization', 'Cost Reduction'],
    process: [],
    faqs: [],
    relatedSlugs: ['end-to-end-logistics'],
    metaDescription: 'End-to-end supply chain strategies to improve efficiency, reduce costs and drive growth.',
  },
  {
    slug: 'end-to-end-logistics',
    title: '9. END-TO-END LOGISTICS',
    summary: 'Complete logistics solutions covering every step from origin to final delivery.',
    icon: 'truck',
    audience: 'Businesses wanting a single provider for all logistics needs.',
    included: ['Origin Services', 'Freight Forwarding', 'Destination Services', 'Final Delivery'],
    process: [],
    faqs: [],
    relatedSlugs: ['international-shipping', 'supply-chain-management'],
    metaDescription: 'Complete logistics solutions covering every step from origin to final delivery.',
  },
  {
    slug: 'pre-shipment-risk-checking',
    title: '10. PRE-SHIPMENT RISK CHECKING',
    summary: 'We assess and manage risks before shipment to ensure safe and compliant deliveries.',
    icon: 'clipboard',
    audience: 'Shippers needing risk mitigation before export.',
    included: ['Risk Assessment', 'Compliance Checks', 'Safety Inspections'],
    process: [],
    faqs: [],
    relatedSlugs: ['customs-clearance'],
    metaDescription: 'We assess and manage risks before shipment to ensure safe and compliant deliveries.',
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
