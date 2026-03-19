type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

const defaults = { size: 20, color: "currentColor", strokeWidth: 1.75 };

/* ── Logo / Brand ─────────────────────────────────────────── */

export function CrossedSwordsIcon({ size = 24, color = "currentColor", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {/* Sword 1: top-left to bottom-right */}
      <line x1="3" y1="3" x2="14" y2="14" />
      <polyline points="14 8 14 14 8 14" />
      <line x1="3" y1="21" x2="8.5" y2="15.5" />
      {/* Sword 2: top-right to bottom-left */}
      <line x1="21" y1="3" x2="10" y2="14" />
      <polyline points="10 8 10 14 16 14" />
      <line x1="21" y1="21" x2="15.5" y2="15.5" />
    </svg>
  );
}

/** Simpler, cleaner crossed swords for the logo mark */
export function LogoSwordIcon({ size = 20, color = "white" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />
      <path d="M19.375 8.625L8.375 19.625" />
      <path d="M3 21l9.5-9.5" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

/* ── Navigation ───────────────────────────────────────────── */

export function MenuIcon({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function XIcon({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── Trust / Badge icons ──────────────────────────────────── */

export function ShieldCheckIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export function PackageIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ── How-it-works icons ───────────────────────────────────── */

export function SearchIcon({ size = defaults.size, color = defaults.color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={defaults.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ShieldIcon({ size = defaults.size, color = defaults.color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={defaults.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function TruckIcon({ size = defaults.size, color = defaults.color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={defaults.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

export function BanknoteIcon({ size = defaults.size, color = defaults.color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={defaults.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

/* ── Listing card / faction placeholder icons ─────────────── */

export function ArmyIcon({ size = 64, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Abstract soldier silhouette */}
      <circle cx="32" cy="14" r="6" />
      <path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z" />
      <line x1="20" y1="44" x2="10" y2="54" />
      <line x1="44" y1="44" x2="54" y2="54" />
      <line x1="26" y1="48" x2="24" y2="58" />
      <line x1="38" y1="48" x2="40" y2="58" />
    </svg>
  );
}

export function SkullIcon({ size = 64, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 40 C12 36 10 24 16 16 C20 10 26 8 32 8 C38 8 44 10 48 16 C54 24 52 36 44 40 L44 50 L20 50 Z" />
      <line x1="24" y1="50" x2="24" y2="56" />
      <line x1="32" y1="50" x2="32" y2="56" />
      <line x1="40" y1="50" x2="40" y2="56" />
      <circle cx="25" cy="28" r="4" />
      <circle cx="39" cy="28" r="4" />
      <path d="M29 38 L32 35 L35 38" />
    </svg>
  );
}

export function RobotIcon({ size = 64, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2" />
      <rect x="22" y="28" width="8" height="8" rx="1" />
      <rect x="34" y="28" width="8" height="8" rx="1" />
      <line x1="32" y1="12" x2="32" y2="20" />
      <circle cx="32" cy="10" r="3" />
      <path d="M26 44 L26 54 L38 54 L38 44" />
      <line x1="16" y1="30" x2="8" y2="30" />
      <line x1="16" y1="36" x2="8" y2="36" />
      <line x1="48" y1="30" x2="56" y2="30" />
      <line x1="48" y1="36" x2="56" y2="36" />
      <line x1="24" y1="44" x2="40" y2="44" />
    </svg>
  );
}

/* ── Host / Earn section ──────────────────────────────────── */

export function MedalIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="15" r="6" />
      <path d="M8.56 2.9L7 7l5 3 5-3-1.56-4.1" />
      <path d="M9 7l3 2 3-2" />
    </svg>
  );
}

export function StarIcon({ size = 14, color = "currentColor", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function SwordsIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
      <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
      <line x1="5" y1="14" x2="9" y2="18" />
      <line x1="7" y1="17" x2="3" y2="21" />
    </svg>
  );
}

export function UsersIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
