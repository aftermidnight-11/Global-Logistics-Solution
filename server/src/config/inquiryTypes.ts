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

export type InquiryType = (typeof INQUIRY_TYPES)[number];
