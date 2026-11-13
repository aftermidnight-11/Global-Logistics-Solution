type Props = { variant: 'port' | 'warehouse' | 'air' | 'truck' | 'hero'; className?: string };

export function LogisticsIllustration({ variant, className }: Props) {
  const accent = 'var(--accent)';
  const secondary = 'var(--secondary)';
  const maps = {
    hero: (
      <svg viewBox="0 0 480 280" className={className} aria-hidden>
        <rect width="480" height="280" fill="transparent" />
        <rect x="40" y="180" width="400" height="8" fill={secondary} opacity="0.4" />
        <rect x="80" y="120" width="120" height="60" fill={accent} rx="4" />
        <rect x="210" y="100" width="140" height="80" fill={secondary} rx="4" />
        <path d="M360 140 L420 140 L440 180 L360 180 Z" fill={accent} opacity="0.85" />
        <rect x="60" y="60" width="8" height="120" fill={secondary} />
        <rect x="52" y="50" width="24" height="12" fill={accent} />
      </svg>
    ),
    port: (
      <svg viewBox="0 0 320 200" className={className} aria-hidden>
        <rect x="20" y="150" width="280" height="6" fill={secondary} opacity="0.5" />
        <rect x="40" y="90" width="60" height="40" fill={accent} />
        <rect x="110" y="80" width="60" height="50" fill={secondary} />
        <rect x="180" y="95" width="60" height="35" fill={accent} opacity="0.8" />
      </svg>
    ),
    warehouse: (
      <svg viewBox="0 0 320 200" className={className} aria-hidden>
        <polygon points="160,30 280,80 40,80" fill={secondary} />
        <rect x="60" y="80" width="200" height="100" fill={accent} opacity="0.7" />
        <rect x="130" y="120" width="60" height="60" fill="#fff" opacity="0.3" />
      </svg>
    ),
    air: (
      <svg viewBox="0 0 320 200" className={className} aria-hidden>
        <path d="M40 100 L280 100" stroke={secondary} strokeWidth="4" />
        <path d="M120 100 L200 70 L200 130 Z" fill={accent} />
        <rect x="200" y="85" width="80" height="30" fill={secondary} rx="4" />
      </svg>
    ),
    truck: (
      <svg viewBox="0 0 320 200" className={className} aria-hidden>
        <rect x="40" y="90" width="140" height="50" fill={secondary} rx="6" />
        <rect x="180" y="100" width="80" height="40" fill={accent} rx="4" />
        <circle cx="80" cy="145" r="18" fill="#0b2530" />
        <circle cx="220" cy="145" r="18" fill="#0b2530" />
      </svg>
    ),
  };
  return maps[variant];
}
