export type GalleryItem = {
  id: string;
  category: 'Port' | 'Warehouse' | 'Air' | 'Heavy lift' | 'Events';
  title: string;
  alt: string;
  image?: string;
};

export const galleryItems: GalleryItem[] = [
  { id: '1', category: 'Port', title: 'Container terminal operations', alt: 'Cranes and containers at terminal', image: '/images/gallery-port.jpg' },
  { id: '2', category: 'Warehouse', title: 'Free-zone warehouse', alt: 'Warehouse shelving and forklift', image: '/images/gallery-warehouse.jpg' },
  { id: '3', category: 'Air', title: 'Air cargo build-up', alt: 'Air freight pallets at gateway', image: '/images/gallery-air.jpg' },
  { id: '4', category: 'Heavy lift', title: 'Heavy lift planning', alt: 'Oversized cargo on specialized trailer', image: '/images/gallery-heavy.jpg' },
  { id: '5', category: 'Events', title: 'Exhibition inbound', alt: 'Exhibition crates arriving at venue', image: '/images/gallery-events.jpg' },
];
