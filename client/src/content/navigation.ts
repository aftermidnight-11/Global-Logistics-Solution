export const topBarContacts = [
  { region: 'Saudi Arabia', email: 'info@global-logisticssolution.com', phone: '+966 50 000 0000' },
  { region: 'UAE', email: 'uae@global-logisticssolution.com', phone: '+971 4 000 0000' },
];

export type NavItem = {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
};

export const mainNav: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/#about' },
  { label: 'Vision', path: '/#vision' },
  { label: 'Services', path: '/#services' },
  { label: 'Gallery', path: '/#gallery' },
  { label: 'Case Studies', path: '/#case-studies' },
  { label: 'Blog', path: '/#blog' },
  { label: 'Career', path: '/#career' },
  { label: 'Contact', path: '/contact' },
];

export const INQUIRY_TYPES = [
  'Freight forwarding',
  'Air freight',
  'Ocean freight',
  'Customs clearance',
  'Warehousing',
  'Heavy cargo',
  'Career',
  'Other',
] as const;
