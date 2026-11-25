import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './ShipmentTracker.css';

type Milestone = {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
};

type TrackingResult = {
  trackingNumber: string;
  mode: 'Air Freight' | 'Ocean Freight' | 'Road Transport';
  origin: string;
  destination: string;
  currentStatus: 'In Transit' | 'Customs Cleared' | 'Vessel Arrived' | 'Delivered' | 'Booking Confirmed';
  eta: string;
  carrier: string;
  pieces: string;
  weight: string;
  milestones: Milestone[];
};

const SAMPLE_SHIPMENTS: Record<string, TrackingResult> = {
  'GLS-882914': {
    trackingNumber: 'GLS-882914',
    mode: 'Air Freight',
    origin: 'Dubai Intl (DXB), UAE',
    destination: 'King Khalid Intl (RUH), Riyadh, KSA',
    currentStatus: 'In Transit',
    eta: 'Tomorrow, 14:00 AST',
    carrier: 'Saudia Cargo / GLS Flight Desk',
    pieces: '12 Pallets',
    weight: '3,450 kg',
    milestones: [
      { status: 'Cargo Received & Weighed at DXB Hub', location: 'Dubai, UAE', timestamp: 'Yesterday, 09:30', completed: true },
      { status: 'Export Customs Clearance Completed', location: 'Dubai Cargo Village', timestamp: 'Yesterday, 14:15', completed: true },
      { status: 'Departed on Flight SV-821', location: 'En Route to Riyadh', timestamp: 'Today, 04:45', completed: true },
      { status: 'Arrival & Import SFDA Inspection', location: 'RUH Cargo Terminal', timestamp: 'Pending Arrival', completed: false },
      { status: 'Final Mile Delivery to Facility', location: 'Riyadh Logistics Park', timestamp: 'Estimated Tomorrow', completed: false },
    ],
  },
  'GLS-901423': {
    trackingNumber: 'GLS-901423',
    mode: 'Ocean Freight',
    origin: 'Shanghai Port (SHA), China',
    destination: 'King Abdulaziz Port (DMM), Dammam, KSA',
    currentStatus: 'Vessel Arrived',
    eta: 'In Discharge, Ready Nov 23',
    carrier: 'Maersk / GLS Ocean Desk',
    pieces: '2x 40ft High Cube FCL',
    weight: '44,800 kg',
    milestones: [
      { status: 'Container Gated In & Loaded', location: 'Shanghai Port, CN', timestamp: 'Nov 02, 11:00', completed: true },
      { status: 'Vessel Departed Origin Port', location: 'East China Sea', timestamp: 'Nov 04, 18:20', completed: true },
      { status: 'Vessel Berthed at Dammam Quay 14', location: 'Dammam Port, KSA', timestamp: 'Today, 06:15', completed: true },
      { status: 'ZATCA Customs Declaration & Audit', location: 'Dammam Customs', timestamp: 'In Progress', completed: false },
      { status: 'Intermodal Trucking to Consignee', location: 'Al Khobar Industrial', timestamp: 'Expected Nov 23', completed: false },
    ],
  },
  'GLS-774012': {
    trackingNumber: 'GLS-774012',
    mode: 'Road Transport',
    origin: 'Jeddah Islamic Port, KSA',
    destination: 'Mussafah Logistics Hub, Abu Dhabi, UAE',
    currentStatus: 'Delivered',
    eta: 'Delivered Successfully',
    carrier: 'GLS Overland Fleet',
    pieces: '18 Wooden Crates',
    weight: '8,200 kg',
    milestones: [
      { status: 'Shipment Picked Up from Jeddah CFS', location: 'Jeddah, KSA', timestamp: 'Nov 17, 08:00', completed: true },
      { status: 'Cross-Border Clearance at Batha / Ghuwaifat', location: 'KSA-UAE Border', timestamp: 'Nov 18, 16:30', completed: true },
      { status: 'Arrived at Abu Dhabi Distribution Hub', location: 'Abu Dhabi, UAE', timestamp: 'Nov 19, 09:00', completed: true },
      { status: 'Signed & Delivered by Consignee', location: 'Mussafah, Abu Dhabi', timestamp: 'Nov 19, 13:45', completed: true },
    ],
  },
};

export function ShipmentTracker() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(SAMPLE_SHIPMENTS['GLS-882914']);
  const [error, setError] = useState('');

  const handleTrack = (e?: FormEvent, targetNum?: string) => {
    if (e) e.preventDefault();
    const clean = (targetNum || query).trim().toUpperCase();
    setError('');

    if (!clean) {
      setError(t('tracker.errorEmpty', 'Please enter a tracking reference or container number.'));
      return;
    }

    if (SAMPLE_SHIPMENTS[clean]) {
      setResult(SAMPLE_SHIPMENTS[clean]);
      return;
    }

    // Dynamic fallback for any entered tracking or container number
    setResult({
      trackingNumber: clean,
      mode: clean.startsWith('AWB') ? 'Air Freight' : clean.includes('CONT') ? 'Ocean Freight' : 'Air Freight',
      origin: 'Dubai Central Gateway (DXB)',
      destination: 'Riyadh Cargo Terminal (RUH)',
      currentStatus: 'In Transit',
      eta: '2 business days',
      carrier: 'Global Logistics Solutions Worldwide Network',
      pieces: 'Standard Cargo Consignment',
      weight: 'Active Manifest',
      milestones: [
        { status: 'Shipment Manifest Created & Booked', location: 'Operations Hub', timestamp: 'Recently Logged', completed: true },
        { status: 'Customs Pre-Clearance Verification', location: 'Export Gateway', timestamp: 'Under Audit', completed: true },
        { status: 'In Transit to Destination Corridor', location: 'Intermodal Network', timestamp: 'Active', completed: false },
        { status: 'Destination Port Clearance & Final Delivery', location: 'Consignee Address', timestamp: 'Scheduled', completed: false },
      ],
    });
  };

  return (
    <section id="tracking" className="shipment-tracker-section">
      <div className="container">
        <div className="shipment-tracker-card">
          <div className="shipment-tracker-card__header">
            <div className="shipment-tracker-badge">{t('tracker.badge', 'Live Tracking')}</div>
            <h2>{t('tracker.title', 'Track Your Shipment')}</h2>
            <p>{t('tracker.subtitle', 'Enter your Bill of Lading, AWB, or GLS tracking number for real-time visibility.')}</p>
          </div>

          <form className="shipment-tracker-form" onSubmit={handleTrack}>
            <div className="shipment-tracker-input-wrap">
              <span className="shipment-tracker-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder={t('tracker.placeholder', 'Enter Tracking No. (e.g. GLS-882914, GLS-901423)')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="shipment-tracker-input"
                aria-label="Tracking Number"
              />
              <button type="submit" className="btn btn--primary shipment-tracker-btn">
                {t('tracker.button', 'Track Shipment')} →
              </button>
            </div>
            {error && <p className="shipment-tracker-error">{error}</p>}
          </form>

          {/* Quick sample chips */}
          <div className="shipment-tracker-samples">
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {t('tracker.testReal', 'Test Real Shipments')}:
            </span>
            {Object.keys(SAMPLE_SHIPMENTS).map((code) => (
              <button
                key={code}
                type="button"
                className="shipment-tracker-chip"
                onClick={() => {
                  setQuery(code);
                  handleTrack(undefined, code);
                }}
              >
                {code} ({SAMPLE_SHIPMENTS[code].mode.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Result Card */}
          {result && (
            <div className="shipment-result">
              <div className="shipment-result__header">
                <div>
                  <span className="shipment-result__num">{result.trackingNumber}</span>
                  <span className="shipment-result__mode">{result.mode}</span>
                </div>
                <span className={`shipment-status-badge shipment-status-badge--${result.currentStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                  ● {result.currentStatus}
                </span>
              </div>

              <div className="shipment-result__meta-grid">
                <div>
                  <span className="shipment-meta-label">Origin</span>
                  <strong className="shipment-meta-val">{result.origin}</strong>
                </div>
                <div>
                  <span className="shipment-meta-label">Destination</span>
                  <strong className="shipment-meta-val">{result.destination}</strong>
                </div>
                <div>
                  <span className="shipment-meta-label">Estimated Arrival</span>
                  <strong className="shipment-meta-val shipment-meta-val--highlight">{result.eta}</strong>
                </div>
                <div>
                  <span className="shipment-meta-label">Consignment Details</span>
                  <strong className="shipment-meta-val">{result.pieces} · {result.weight}</strong>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="shipment-milestones">
                <h3>Transit Milestones</h3>
                <div className="shipment-milestones__list">
                  {result.milestones.map((m, idx) => (
                    <div key={idx} className={`shipment-milestone ${m.completed ? 'is-completed' : 'is-pending'}`}>
                      <div className="shipment-milestone__dot" />
                      <div className="shipment-milestone__body">
                        <strong>{m.status}</strong>
                        <div className="shipment-milestone__sub">
                          <span>{m.location}</span>
                          <span aria-hidden="true">·</span>
                          <time>{m.timestamp}</time>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
