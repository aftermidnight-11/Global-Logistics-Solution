export const topBarContacts = [
  { region: 'Sales', email: 'sales@global-logisticssolution.com', phone: '+971 4 000 0000' },
  { region: 'Import', email: 'import@global-logisticssolution.com', phone: '+971 4 000 0001' },
  { region: 'Accounts', email: 'accounts@global-logisticssolution.com', phone: '+971 4 000 0002' },
  { region: 'Info', email: 'info@global-logisticssolution.com', phone: '+966 50 000 0000' },
];

export type NavItem = {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
};

export const mainNav: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/#about' },
  {
    label: 'Services',
    children: [
      { label: 'All Services', path: '/services' },
      { label: 'Air Freight', path: '/services/air-freight' },
      { label: 'Ocean Freight', path: '/services/ocean-freight' },
      { label: 'Road Freight', path: '/services/road-freight' },
      { label: 'Customs Clearance', path: '/services/customs-clearance' },
      { label: 'Warehousing & 3PL', path: '/services/warehousing' },
    ],
  },
  { label: 'Tracking', path: '/#tracking' },
  { label: 'Case Studies', path: '/#case-studies' },
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
