export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  audience: string;
  included: string[];
  coverage: string;
  transitTime: string;
  process: { step: number; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  relatedCaseStudy?: string;
  relatedSlugs: string[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: 'air-freight',
    title: 'Air Freight Forwarding',
    summary: 'High-priority, scheduled and charter air cargo connecting major international airports worldwide with Saudi Arabia and GCC hubs.',
    icon: 'plane',
    audience: 'Importers and exporters requiring time-critical deliveries, high-value goods, or temperature-sensitive pharmaceutical freight.',
    included: [
      'Express Airport-to-Airport & Door-to-Door Delivery',
      'Scheduled Commercial Airline Cargo Space Allocations & Full Charters',
      'Temperature-Controlled & Cold-Chain Pharma Logistics (Active Envirotainer & Passive)',
      'Dangerous Goods (IATA DGR certified handling & documentation)',
      'Real-Time Flight Manifest Tracking & Pre-Arrival FASAH Customs Entry'
    ],
    coverage: 'Worldwide to/from Saudi Arabia (RUH, JED, DMM), UAE (DXB, DWC), GCC, Asia (China, India, Hong Kong), Europe (FRA, LHR, CDG), and the Americas.',
    transitTime: '1 – 3 business days for Express Priority; 3 – 5 business days for Standard Consolidated Air Cargo.',
    process: [
      { step: 1, title: 'Booking & Air Waybill Issuance', text: 'Cargo reservation, rate confirmation, and master/house air waybill (AWB) generation.' },
      { step: 2, title: 'Origin Terminal Receipt & Security Screening', text: 'Weight verification, IATA security scanning, and pre-flight pallet build-up.' },
      { step: 3, title: 'Direct Flight Departure & En Route Tracking', text: 'Real-time telemetry and flight manifest monitoring across international air corridors.' },
      { step: 4, title: 'Arrival & Rapid Customs Clearance', text: 'Immediate electronic FASAH filing, cargo de-consolidation, and direct dispatch to consignee.' },
    ],
    faqs: [
      { q: 'How is air freight chargeable weight calculated?', a: 'Air cargo is billed on whichever is higher: actual gross weight in kg or volumetric weight calculated as (Length x Width x Height in cm) / 6000.' },
      { q: 'Can you handle temperature-sensitive pharmaceutical shipments?', a: 'Yes. We provide certified cold chain management (+2°C to +8°C, +15°C to +25°C, or dry ice -20°C) with continuous NIST-traceable temperature logging.' },
    ],
    relatedSlugs: ['customs-clearance', 'ocean-freight', 'warehousing'],
    metaDescription: 'Global Air Freight Forwarding with priority transit, charters, cold-chain handling, and rapid Saudi customs clearance.',
  },
  {
    slug: 'ocean-freight',
    title: 'Ocean & Sea Freight (FCL & LCL)',
    summary: 'Full Container Load (FCL) and Less than Container Load (LCL) maritime freight across all prime international shipping lanes.',
    icon: 'ship',
    audience: 'Manufacturers, distributors, and global traders seeking cost-effective maritime volume transportation.',
    included: [
      'FCL (20ft, 40ft, 40ft High Cube, Reefer, Open Top, Flat Rack)',
      'LCL Regular Consolidation & Deconsolidation at Bonded CFS Hubs',
      'Port-to-Port & Door-to-Door Multimodal Bills of Lading',
      'Port Handling, Quay Inspection, Demurrage Monitoring & Container Drayage',
      'Marine Cargo All-Risk Insurance & Risk Mitigation'
    ],
    coverage: 'Connecting Shanghai, Ningbo, Shenzhen, Singapore, Nhava Sheva, Rotterdam, Hamburg, Houston, and Jebel Ali with Jeddah Islamic Port, King Abdulaziz Port Dammam, and King Abdullah Port.',
    transitTime: '14 – 22 days for Asia–Gulf lanes; 18 – 28 days for Europe–Middle East; 28 – 38 days for Trans-Pacific / Americas.',
    process: [
      { step: 1, title: 'Space Booking & Equipment Release', text: 'Securing vessel space allocations and empty container release from carrier depots.' },
      { step: 2, title: 'Container Stuffing & Verified Gross Mass (VGM)', text: 'Factory or warehouse loading, seal verification, and SOLAS VGM compliance submission.' },
      { step: 3, title: 'Ocean Transit & Milestone Tracking', text: 'Continuous voyage monitoring, transshipment updates, and carrier milestone sync.' },
      { step: 4, title: 'Berthing, Discharge & Terminal Delivery', text: 'Vessel discharge, ZATCA customs clearance, terminal payment, and truck delivery to site.' },
    ],
    faqs: [
      { q: 'What is the key difference between FCL and LCL?', a: 'FCL gives you exclusive use of an entire 20ft or 40ft shipping container, offering faster handling and lower per-unit cost. LCL lets you share container space, paying only for the exact volume (CBM) of your cargo.' },
      { q: 'What documents are required to import sea freight into Saudi Arabia?', a: 'You need an Original Bill of Lading, Commercial Invoice, Packing List, Certificate of Origin, and SABER/SASO certification where applicable.' },
    ],
    relatedSlugs: ['air-freight', 'customs-clearance', 'road-freight'],
    metaDescription: 'Reliable FCL and LCL Ocean Freight services connecting worldwide maritime ports with Saudi Arabian and Middle Eastern gateways.',
  },
  {
    slug: 'road-freight',
    title: 'Overland Road Freight (GCC & Domestic)',
    summary: 'Cross-border trucking and domestic haulage across Saudi Arabia, UAE, Bahrain, Kuwait, Oman, and Qatar with full GPS visibility.',
    icon: 'truck',
    audience: 'Regional commercial distributors, construction supply chains, and industrial projects requiring dependable overland transport.',
    included: [
      'Full Truckload (FTL) & Less than Truckload (LTL) Cross-Border Transport',
      'Curtain-Siders, Standard Flatbeds, Low-Bed Trailers & Box Trucks',
      'Temperature-Controlled Reefer Fleet (-20°C to +20°C) with Real-Time Telematics',
      'Border Clearance Support at Al Batha, King Fahd Causeway, Khafji & Salwa',
      'Active GPS Satellite Fleet Tracking & Instant Digital Proof of Delivery (POD)'
    ],
    coverage: 'All provinces of Saudi Arabia (Riyadh, Jeddah, Dammam, Jubail, Neom, Tabuk) and cross-border GCC corridors (UAE, Bahrain, Kuwait, Oman, Qatar).',
    transitTime: '12 – 24 hours for domestic intercity routes; 2 – 4 days for cross-border GCC trucking (including border customs clearance).',
    process: [
      { step: 1, title: 'Fleet Allocation & Dispatch', text: 'Tailored vehicle selection matching payload weight, volume, and temperature specifications.' },
      { step: 2, title: 'Cargo Loading & Lashing Inspection', text: 'Professional tie-down, corner protection, and weight distribution verification.' },
      { step: 3, title: 'Highway Transit & Border Formalities', text: 'Real-time GPS tracking and pre-arranged cross-border customs documentation.' },
      { step: 4, title: 'Final Destination Unloading & Signed POD', text: 'Safe delivery at consignee premises with instant electronic POD confirmation.' },
    ],
    faqs: [
      { q: 'What documentation is required for cross-border GCC road freight?', a: 'Standard requirements include a Commercial Invoice, Packing List, Certificate of Origin, Bayan customs declaration, and authorized vehicle transit manifests.' },
      { q: 'Can you transport heavy equipment or oversized machinery overland?', a: 'Yes. Our specialized heavy-haul fleet includes low-bed and multi-axle hydraulic trailers, accompanied by required road permits and escort vehicles.' },
    ],
    relatedSlugs: ['customs-clearance', 'warehousing', 'heavy-cargo'],
    metaDescription: 'Dependable GCC overland road freight and domestic Saudi trucking with GPS tracking, reefer transport, and border customs support.',
  },
  {
    slug: 'customs-clearance',
    title: 'Customs Clearance & Regulatory Compliance',
    summary: 'Licensed customs brokerage across all Saudi sea ports, airports, and border crossings with FASAH, ZATCA, SABER, and SFDA integration.',
    icon: 'document',
    audience: 'Commercial importers and exporters seeking rapid border release, tariff optimization, and zero regulatory penalties.',
    included: [
      'Immediate FASAH Bayan Declaration Filing & HS Code Classification',
      'ZATCA Duty Calculation, Tax Assessment & Exemption Management',
      'SABER & SASO Product Conformity Certification (PCoC & SCoC)',
      'SFDA Approvals for Food, Pharmaceuticals, Medical Devices & Cosmetics',
      'Physical Port Inspection Assistance, Lab Sample Escort & Gate Pass Release'
    ],
    coverage: 'Jeddah Islamic Port, King Abdulaziz Port Dammam, King Abdullah Port, King Khalid Airport Riyadh (RUH), King Fahd Airport Dammam (DMM), and King Abdulaziz Airport Jeddah (JED).',
    transitTime: '12 – 24 hours standard customs clearance upon receipt of complete and validated documentation.',
    process: [
      { step: 1, title: 'Pre-Arrival Document Audit & HS Tariff Check', text: 'Detailed review of invoices, packing lists, and regulatory certificates prior to cargo berthing.' },
      { step: 2, title: 'FASAH Electronic Declaration & Duty Assessment', text: 'Rapid electronic submission on the Saudi national customs single window.' },
      { step: 3, title: 'Regulatory Inspection & Certification Release', text: 'Coordinating physical examination, x-ray inspection, and SFDA/SABER approvals.' },
      { step: 4, title: 'Duty Settlement & Final Gate Release', text: 'Immediate payment clearance, terminal gate pass generation, and container loading onto transport.' },
    ],
    faqs: [
      { q: 'What is SABER and do all imported products need it?', a: 'SABER is the Saudi electronic platform for product conformity. Regulated consumer goods require a Product Certificate of Conformity (PCoC) issued by an approved body and a Shipment Certificate (SCoC) before arrival.' },
      { q: 'Can you clear cargo arriving under another freight forwarder’s Bill of Lading?', a: 'Yes. Through FASAH electronic broker delegation, our licensed customs brokers can clear your cargo regardless of which shipping line or freight forwarder transported it.' },
    ],
    relatedSlugs: ['saber-saso-compliance-support', 'hs-code-product-classification', 'air-freight'],
    metaDescription: 'Licensed Saudi customs clearance through FASAH, ZATCA, SABER, and SFDA. 12-24h clearance at major ports, airports, and borders.',
  },
  {
    slug: 'warehousing',
    title: 'Warehousing & 3PL Logistics',
    summary: 'Secure warehousing, climate-controlled storage, and bonded facilities in Riyadh, Jeddah, and Dammam with real-time WMS inventory management.',
    icon: 'home',
    audience: 'E-commerce retailers, wholesalers, industrial distributors, and multinational enterprises needing flexible Middle Eastern storage.',
    included: [
      'Climate-Controlled, Ambient & Refrigerated Cold Storage Facilities',
      'Bonded Storage & Free Zone In-Transit Storage (Duty Deferment)',
      'WMS Inventory Tracking with Barcode & Batch Scanning',
      'Value-Added Services: Pick, Pack, Kitting, Repackaging & Custom Arabic Labeling',
      'Cross-Docking, Container De-Stuffing & Last-Mile Domestic Dispatch'
    ],
    coverage: 'Riyadh Logistics Park, Jeddah Industrial City (MODON), Dammam Second Industrial City, with distribution coverage reaching all GCC markets.',
    transitTime: 'Same-day inbound receipt, inspection & putaway; 2 – 4 hour outbound dispatch turnaround upon order receipt.',
    process: [
      { step: 1, title: 'Inbound Receiving & Quality Verification', text: 'Physical count, carton inspection, palletizing, and barcode registration into WMS.' },
      { step: 2, title: 'Safe Storage & Real-Time Stock Tracking', text: 'High-bay racked storage with climate control and 24/7 CCTV security monitoring.' },
      { step: 3, title: 'Order Processing & Custom Labeling', text: 'Pick and pack operations adhering to strict FIFO/FEFO rules, with SASO compliant Arabic labeling.' },
      { step: 4, title: 'Staging, Cross-Docking & Outbound Delivery', text: 'Scheduled dock loading, carrier handover, and real-time electronic dispatch notifications.' },
    ],
    faqs: [
      { q: 'Do you offer bonded storage to defer customs duties?', a: 'Yes. Our bonded warehousing solutions allow clients to store imported commercial goods with deferred customs duties and VAT until items are released into the local market or re-exported.' },
      { q: 'Can your WMS connect with our e-commerce or ERP system?', a: 'Yes. Our WMS integrates seamlessly via secure REST APIs and EDI with Shopify, WooCommerce, SAP, Oracle, and Microsoft Dynamics.' },
    ],
    relatedSlugs: ['road-freight', 'end-to-end-logistics', 'customs-clearance'],
    metaDescription: 'Secure warehousing and 3PL distribution in Riyadh, Jeddah, and Dammam. Climate-controlled, bonded yards, and API-integrated WMS.',
  },
  {
    slug: 'heavy-cargo',
    title: 'Project Cargo & Heavy Lift Logistics',
    summary: 'Engineering-led transport of out-of-gauge (OOG) machinery, transformers, industrial turbines, and oversized construction modules.',
    icon: 'truck',
    audience: 'EPC contractors, energy companies, infrastructure developers, and industrial manufacturers.',
    included: [
      'Engineering Route Surveys, Bridge Load Assessments & Swept Path Analysis',
      'Hydraulic Multi-Axle Modular Trailers (SPMT) & Low-Bed Heavy Transporters',
      'Government Road Permits, Police Escorts & Utility Cable Relocations',
      'Heavy Crane Rigging, Jacking, Skidding & Foundation Placement',
      'On-Site Transport & Marine Survey Engineering Supervision'
    ],
    coverage: 'Global heavy industrial fabrication yards into mega-project sites across Saudi Arabia (NEOM, Red Sea Project, Qiddiya, Royal Commission Jubail/Yanbu).',
    transitTime: 'Custom engineered milestone scheduling aligned with EPC project timetables and marine charter berthing windows.',
    process: [
      { step: 1, title: 'Technical Feasibility & Route Survey', text: 'Bridge structural verification, overhead utility clearances, and road turning radiuses.' },
      { step: 2, title: 'Permitting & Authorities Coordination', text: 'Securing Ministry of Transport permits, traffic police escorts, and utility shutdown windows.' },
      { step: 3, title: 'Rigging, Heavy Lift & Secure Lashing', text: 'Certified crane lifting, multi-point lashing, and dynamic load-cell monitoring.' },
      { step: 4, title: 'Over-the-Road Transport & Final Foundation Jacking', text: 'Precision convoy execution and hydraulic jacking onto final foundations.' },
    ],
    faqs: [
      { q: 'What is classified as Out-of-Gauge (OOG) or Project Cargo?', a: 'Any cargo exceeding standard ISO container dimensions (Length > 12m, Width > 2.4m, Height > 2.6m, or gross weight exceeding 28 metric tons).' },
      { q: 'How far in advance should we plan heavy lift movements?', a: 'We recommend initiating route surveys and permit applications 4 to 8 weeks before anticipated cargo arrival to ensure all governmental approvals.' },
    ],
    relatedSlugs: ['ocean-freight', 'road-freight', 'end-to-end-logistics'],
    metaDescription: 'Specialized Project Cargo and Heavy Lift transport in Saudi Arabia and the GCC. Route surveys, SPMTs, and engineered heavy rigging.',
  },
  {
    slug: 'saber-saso-compliance-support',
    title: 'SABER & SASO Compliance Support',
    summary: 'Dedicated assistance for obtaining Saudi product and shipment conformity certificates (PCoC / SCoC) without port delays.',
    icon: 'shield',
    audience: 'Exporters and local importers bringing technical and consumer goods into the Kingdom of Saudi Arabia.',
    included: [
      'SABER Platform Account Registration & Product Classification',
      'Product Certificate of Conformity (PCoC) Processing via Notified Bodies',
      'Shipment Certificate of Conformity (SCoC) Generation for Port Entry',
      'GCC G-Mark & SASO Quality Mark (SQM) Coordination',
      'Pre-Export Technical File & Test Report Verification'
    ],
    coverage: 'All manufacturing origins globally shipping into all sea, air, and land entry ports of the Kingdom of Saudi Arabia.',
    transitTime: '2 – 3 business days for PCoC issuance (with valid test reports); immediate 24h approval for SCoC shipment release.',
    process: [
      { step: 1, title: 'HS Code & Technical File Review', text: 'Checking test reports against SASO technical regulations and Saudi standards.' },
      { step: 2, title: 'PCoC Issuance via Certification Body', text: 'Submitting application to SASO-accredited notified conformity assessment bodies.' },
      { step: 3, title: 'SCoC Issuance for Specific Shipment', text: 'Linking commercial invoice numbers and issuing shipment release certificates.' },
      { step: 4, title: 'FASAH customs Integration', text: 'Direct digital sync between SABER and the Saudi Customs FASAH portal for instant clearance.' },
    ],
    faqs: [
      { q: 'What happens if a shipment arrives without a SABER SCoC?', a: 'Saudi Customs will reject the customs declaration and withhold the container at the port until conformity documents are completed, resulting in heavy demurrage fees.' },
      { q: 'How long is a SABER PCoC valid?', a: 'A Product Certificate of Conformity (PCoC) is valid for 1 year from the date of issuance for the registered product model.' },
    ],
    relatedSlugs: ['customs-clearance', 'hs-code-product-classification', 'sfda-related-requirements'],
    metaDescription: 'Full SABER and SASO compliance support in Saudi Arabia. Fast PCoC and SCoC certification ensuring zero port clearance delays.',
  },
  {
    slug: 'hs-code-product-classification',
    title: 'HS Code & Tariff Classification',
    summary: 'Accurate World Customs Organization (WCO) and Saudi 12-digit integrated tariff classification to minimize duties and prevent fines.',
    icon: 'search',
    audience: 'Importers seeking to optimize customs duties, prevent classification disputes, and ensure full trade compliance.',
    included: [
      'Saudi Integrated Tariff 12-Digit HS Code Determination',
      'Duty Rate, Trade Agreements & Exemption Evaluation',
      'Customs Advance Ruling Submission & Representation',
      'Free Trade Agreement (FTA) Rules of Origin Audits'
    ],
    coverage: 'Kingdom of Saudi Arabia, GCC Unified Customs Tariff, and World Customs Organization guidelines.',
    transitTime: '24 – 48 hours for standard product portfolio tariff determination.',
    process: [
      { step: 1, title: 'Product Specification Analysis', text: 'Reviewing technical datasheets, composition, and intended industrial application.' },
      { step: 2, title: 'General Interpretive Rules (GIR) Application', text: 'Determining exact heading and subheading in accordance with WCO guidelines.' },
      { step: 3, title: 'Saudi Customs 12-Digit Alignment', text: 'Verifying specific national requirements, duties, and applicable non-tariff restrictions.' },
    ],
    faqs: [
      { q: 'Why is 12-digit HS code accuracy critical in Saudi Arabia?', a: 'Saudi Customs uses a 12-digit integrated tariff. Incorrect classification can result in severe fines, confiscation, or retroactive duty assessments from ZATCA.' },
    ],
    relatedSlugs: ['customs-clearance', 'saber-saso-compliance-support'],
    metaDescription: 'Expert HS Code and Saudi 12-digit tariff classification. Minimize customs duties, ensure compliance, and avoid port penalties.',
  },
  {
    slug: 'sfda-related-requirements',
    title: 'SFDA Regulatory Approvals',
    summary: 'Professional handling of Saudi Food & Drug Authority (SFDA) licensing, product registration, and port clearance approvals.',
    icon: 'health',
    audience: 'Importers and distributors of food products, pharmaceuticals, medical devices, cosmetics, and animal feed.',
    included: [
      'SFDA Importer Warehouse Licensing & System Registration',
      'Product Listing & Registration (FIRS, eCosma, MDMA)',
      'Arabic Nutritional & Ingredients Labeling Compliance Checks',
      'Port Physical Inspection, Sampling & Lab Escort Assistance'
    ],
    coverage: 'All entry ports into Saudi Arabia across maritime, air cargo, and overland border terminals.',
    transitTime: 'Expedited port clearance upon vessel discharge; 3 – 5 days for standard SFDA product approvals with complete dossiers.',
    process: [
      { step: 1, title: 'Dossier & Formulation Pre-Audit', text: 'Verifying permitted ingredients, halal certifications, and shelf-life parameters.' },
      { step: 2, title: 'Electronic SFDA Portal Submission', text: 'Filing registration on relevant SFDA electronic gateways.' },
      { step: 3, title: 'Port Arrival Inspection Coordination', text: 'Representing client during official port sampling, inspection, and lab testing.' },
      { step: 4, title: 'Final Unconditional Release', text: 'Issuance of SFDA customs release certificate and immediate transport dispatch.' },
    ],
    faqs: [
      { q: 'Can imported food or cosmetics be cleared without Arabic labels?', a: 'No. The SFDA strictly mandates bilingual or Arabic labeling covering ingredients, manufacturer, origin, and expiry dates before port release.' },
    ],
    relatedSlugs: ['customs-clearance', 'air-freight', 'warehousing'],
    metaDescription: 'SFDA regulatory approvals in Saudi Arabia for food, medical devices, pharma, and cosmetics. Smooth customs clearance and registration.',
  },
  {
    slug: 'end-to-end-logistics',
    title: 'End-to-End Multimodal Logistics',
    summary: 'Single-source supply chain management uniting international freight, customs clearance, bonded warehousing, and last-mile delivery.',
    icon: 'network',
    audience: 'Multinational corporations, industrial projects, and high-volume importers wanting a single point of accountability.',
    included: [
      'Single Point of Contact Logistics Account Manager',
      'Origin Cargo Collection & Export Freight Forwarding',
      'Destination Customs Clearance & Regulatory Filings',
      '3PL Warehousing, Inventory Management & Final Mile Delivery',
      'Consolidated Billing, KPI Dashboards & Real-Time Tracking'
    ],
    coverage: 'Worldwide origin collection to final destination across Saudi Arabia, UAE, and GCC countries.',
    transitTime: 'Optimized per chosen multimodal route with guaranteed service-level agreements (SLAs).',
    process: [
      { step: 1, title: 'Supply Chain Diagnostic & Rate Optimization', text: 'Custom routing designed for the balance of transit velocity and freight economics.' },
      { step: 2, title: 'Origin Execution & International Forwarding', text: 'Pickup, packing verification, export clearance, and departure on optimal carriers.' },
      { step: 3, title: 'Import Brokerage & Port Handling', text: 'Electronic FASAH clearance, duty settlement, and secure port terminal pickup.' },
      { step: 4, title: 'Warehousing, Fulfillment & Final Mile Delivery', text: 'Putaway into storage or direct trucking delivery to end consignee facility.' },
    ],
    faqs: [
      { q: 'What is the main advantage of an end-to-end logistics contract?', a: 'Eliminating finger-pointing between multiple freight brokers, shipping lines, and truckers. You enjoy one SLA, one point of contact, and full accountability.' },
    ],
    relatedSlugs: ['air-freight', 'ocean-freight', 'road-freight', 'customs-clearance', 'warehousing'],
    metaDescription: 'End-to-end turnkey logistics solutions with one accountable team across global origins, Saudi customs, warehousing, and delivery.',
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
