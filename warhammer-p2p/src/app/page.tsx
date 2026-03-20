import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheckIcon,
  PackageIcon,
  CheckCircleIcon,
  SearchIcon,
  ShieldIcon,
  TruckIcon,
  BanknoteIcon,
  ArmyIcon,
  SkullIcon,
  RobotIcon,
  MedalIcon,
  StarIcon,
  SwordsIcon,
} from "@/components/Icons";

/* ─── Data ───────────────────────────────────────────── */
const featuredListings = [
  {
    id: 1,
    title: "Ultramarines 2,000pt Assault Force",
    faction: "Space Marines",
    unitType: "Heavy Support",
    dailyRate: 18,
    replacementValue: 650,
    points: 2000,
    painted: "Pro Painted",
    paintedTier: "gold" as const,
    host: "GrimDarkGary",
    rating: 4.9,
    reviews: 23,
    Icon: ArmyIcon,
    iconColor: "#60a5fa",
    iconBg: "rgba(59,130,246,0.10)",
  },
  {
    id: 2,
    title: "Death Guard Plague Company",
    faction: "Chaos Space Marines",
    unitType: "Troops",
    dailyRate: 22,
    replacementValue: 900,
    points: 2000,
    painted: "Studio Quality",
    paintedTier: "gold" as const,
    host: "NurglesNancy",
    rating: 5.0,
    reviews: 11,
    Icon: SkullIcon,
    iconColor: "#84cc16",
    iconBg: "rgba(132,204,22,0.08)",
  },
  {
    id: 3,
    title: "Necron Awakening Dynastic Host",
    faction: "Necrons",
    unitType: "Elites",
    dailyRate: 15,
    replacementValue: 480,
    points: 1500,
    painted: "Battle Ready",
    paintedTier: "orange" as const,
    host: "TombWorldTed",
    rating: 4.8,
    reviews: 17,
    Icon: RobotIcon,
    iconColor: "#14b8a6",
    iconBg: "rgba(20,184,166,0.08)",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Browse & Book",
    description:
      "Search by faction, points level, or game system. Found your army? Pick your rental dates and request a booking.",
    Icon: SearchIcon,
  },
  {
    step: "02",
    title: "Verify & Pay",
    description:
      "Complete a quick identity check via Stripe Identity. Pay the rental fee — we hold a refundable deposit as damage insurance.",
    Icon: ShieldIcon,
  },
  {
    step: "03",
    title: "Deploy & Return",
    description:
      "Receive a pre-paid shipping label. The army arrives ready to play. Return it the same way when done.",
    Icon: TruckIcon,
  },
  {
    step: "04",
    title: "Deposit Released",
    description:
      "Host confirms the army returned intact. Your deposit is released within 24 hours. No drama.",
    Icon: BanknoteIcon,
  },
];

const stats = [
  { value: "400+", label: "Painted Armies" },
  { value: "50K+", label: "Points Available" },
  { value: "100%", label: "Deposit Protected" },
  { value: "4.9★", label: "Avg. Rating" },
];

const trustBadges = [
  { label: "Deposit Protected", Icon: ShieldCheckIcon },
  { label: "Pre-paid Shipping", Icon: PackageIcon },
  { label: "Identity Verified", Icon: CheckCircleIcon },
];

/* ─── Page Component ─────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "var(--surface-dim)",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg.png"
            alt="Warhammer armies on a battlefield"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          {/* Heavy left gradient — intentional asymmetry */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, rgba(14,15,18,0.97) 0%, rgba(14,15,18,0.92) 45%, rgba(14,15,18,0.50) 70%, rgba(14,15,18,0.10) 100%)",
            }}
          />
          {/* Bottom atmospheric fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, var(--surface), transparent)",
            }}
          />
          {/* Subtle orange ambient on left edge */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "-100px",
              width: "500px",
              height: "500px",
              background: "radial-gradient(ellipse, rgba(250,105,0,0.06), transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Hero content — heavy left aligned */}
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, padding: "9rem 1.5rem 5rem" }}
        >
          {/* Intentional asymmetry: max 580px on left, vast right space */}
          <div style={{ maxWidth: "580px" }}>
            {/* Tactical section tag */}
            <div className="section-tag" style={{ marginBottom: "2rem" }}>
              <SwordsIcon size={11} color="var(--outline)" />
              <span>P2P Army Rentals — Community Platform</span>
            </div>

            {/* Monolithic headline — Space Grotesk, tight */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                marginBottom: "1.75rem",
              }}
            >
              Deploy a{" "}
              <span className="gradient-text">Painted Army</span>
              <br />
              This Weekend.
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.1875rem)",
                lineHeight: 1.75,
                color: "var(--on-surface-variant)",
                marginBottom: "2.75rem",
                maxWidth: "480px",
              }}
            >
              Rent professionally painted Warhammer armies from verified collectors.
              No hobby debt. No half-painted shame. Just play.
            </p>

            {/* CTA — Primary orange + Gold secondary */}
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center", marginBottom: "3rem" }}>
              <Link href="/browse" className="btn btn-primary btn-lg">
                Browse Armies
              </Link>
              <Link href="/list" className="btn btn-secondary btn-lg">
                List Your Army →
              </Link>
            </div>

            {/* Trust metadata — archival label style */}
            <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
              {trustBadges.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="label-sm"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--outline)",
                  }}
                >
                  <Icon size={13} color="var(--on-primary-container)" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS BAR ══════════════════════ */}
      {/*
        No-Line Rule: separated from hero via bg-shift (background color change),
        not a border. The ambient noise + level change creates the boundary.
      */}
      <section className="bg-shift" style={{ padding: "2.5rem 1.5rem" }}>
        <div className="container">
          <div className="stats-grid">
            {stats.map(({ value, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: "var(--on-primary-container)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.0,
                  }}
                >
                  {value}
                </div>
                <div className="label-sm" style={{ color: "var(--outline)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, auto);
            justify-content: start;
            gap: 4rem;
          }
          @media (max-width: 640px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
          }
        `}</style>
      </section>

      {/* ══════════════════════ FEATURED LISTINGS ══════════════════════ */}
      {/* Level 0 floor — tonal contrast with the stats bar above */}
      <section className="section bg-floor" id="browse">
        <div className="container">
          {/* Section header — left-heavy asymmetry */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "flex-end",
              marginBottom: "var(--sp-16)",
              gap: "1rem",
            }}
            className="listings-header"
          >
            <div>
              <div className="section-tag">Featured Armies</div>
              <h2 style={{ marginBottom: "0.75rem" }}>Ready to Deploy</h2>
              <p style={{ maxWidth: "460px" }}>
                Each listing is verified, insured, and shipped direct. Browse by faction, points, or paint quality.
              </p>
            </div>
            <Link href="/browse" className="btn btn-ghost btn-sm" style={{ whiteSpace: "nowrap" }}>
              View All →
            </Link>
          </div>

          {/* Listing cards — Level 2 cards on Level 0 floor */}
          <div className="listings-grid">
            {featuredListings.map((listing) => (
              <article key={listing.id} className="card army-card">
                {/* Image area — flush, sharp internal corners */}
                <div
                  style={{
                    height: "200px",
                    background: `linear-gradient(135deg, ${listing.iconBg} 0%, var(--surface-container) 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <listing.Icon size={84} color={listing.iconColor} />

                  {/* Paint quality badge — Burnished Gold for top tier */}
                  <span
                    className={`badge ${listing.paintedTier === "gold" ? "badge-gold" : "badge-orange"}`}
                    style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}
                  >
                    {listing.painted}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: "1.25rem 1.375rem 1.375rem" }}>
                  {/* Metadata — archival label style */}
                  <div
                    className="label-sm"
                    style={{
                      color: "var(--on-primary-container)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {listing.faction}
                  </div>
                  <div
                    className="label-sm"
                    style={{ color: "var(--outline)", marginBottom: "0.625rem" }}
                  >
                    Unit Type: {listing.unitType} · {listing.points}pts
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      marginBottom: "var(--sp-3)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {listing.title}
                  </h3>

                  {/* Host & rating — no divider, just vertical spacing gap */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "var(--sp-3)",
                      marginBottom: "1rem",
                    }}
                  >
                    <span className="label-sm" style={{ color: "var(--outline)" }}>
                      Host:{" "}
                      <span style={{ color: "var(--on-surface-variant)", textTransform: "none", letterSpacing: "normal", fontWeight: 500 }}>
                        {listing.host}
                      </span>
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--tertiary)",
                      }}
                    >
                      <StarIcon size={12} color="var(--tertiary)" />
                      {listing.rating}
                      <span style={{ color: "var(--outline)", fontWeight: 400 }}>
                        ({listing.reviews})
                      </span>
                    </span>
                  </div>

                  {/* Pricing row — vertical spacing, no divider line */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "var(--sp-3)",
                      /* Tonal step instead of border */
                      borderTop: "1px solid var(--ghost-border)",
                      marginTop: "0.25rem",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: "var(--on-surface)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        ${listing.dailyRate}
                      </span>
                      <span className="label-sm" style={{ color: "var(--outline)", marginLeft: "0.3rem", letterSpacing: "0.05em" }}>
                        / day
                      </span>
                    </div>
                    <Link href={`/listing/${listing.id}`} className="btn btn-primary btn-sm">
                      View Intel
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <style>{`
            .listings-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.25rem;
              margin-bottom: 2rem;
            }
            .army-card { cursor: pointer; }
            @media (max-width: 900px) {
              .listings-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 560px) {
              .listings-grid { grid-template-columns: 1fr; }
              .listings-header { grid-template-columns: 1fr; }
            }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      {/* Level 1 — surface-container-low, tonal shift from floor */}
      <section className="section bg-shift" id="how-it-works">
        <div className="container">
          {/* Centered header — break asymmetry for process sections */}
          <div style={{ maxWidth: "560px", marginBottom: "var(--sp-16)" }}>
            <div className="section-tag">Mission Briefing</div>
            <h2 style={{ marginBottom: "0.75rem" }}>How War-Rent Works</h2>
            <p>
              From browse to battlefield in four steps. We handle logistics, insurance,
              and payment — for everyone involved.
            </p>
          </div>

          <div className="hiw-grid">
            {howItWorks.map(({ step, title, description, Icon }) => (
              <div key={step} className="hiw-card">
                {/* Step number — archival accent */}
                <div
                  className="label-sm"
                  style={{
                    color: "var(--on-primary-container)",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2rem",
                      height: "2rem",
                      background: "rgba(250,105,0,0.12)",
                      borderRadius: "0.125rem",
                    }}
                  >
                    <Icon size={16} color="var(--on-primary-container)" />
                  </span>
                  Step {step}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    marginBottom: "0.625rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--outline)", lineHeight: 1.7 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <style>{`
            .hiw-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 0;
            }
            .hiw-card {
              padding: 2rem 1.75rem;
              border-right: 1px solid var(--ghost-border);
            }
            .hiw-card:last-child { border-right: none; }
            @media (max-width: 900px) {
              .hiw-grid { grid-template-columns: repeat(2, 1fr); }
              .hiw-card:nth-child(2) { border-right: none; }
              .hiw-card:nth-child(1),
              .hiw-card:nth-child(2) { border-bottom: 1px solid var(--ghost-border); }
            }
            @media (max-width: 500px) {
              .hiw-grid { grid-template-columns: 1fr; }
              .hiw-card { border-right: none; border-bottom: 1px solid var(--ghost-border); }
              .hiw-card:last-child { border-bottom: none; }
            }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════ DUAL PATH CTA ══════════════════════ */}
      <section className="section bg-floor">
        <div className="container">
          <div style={{ maxWidth: "460px", marginBottom: "var(--sp-16)" }}>
            <div className="section-tag">
              <SwordsIcon size={11} color="var(--outline)" />
              <span>Join the Battlefield</span>
            </div>
            <h2 style={{ marginBottom: "0.75rem" }}>How Are You Playing?</h2>
            <p>War-Rent operates on both sides of the table. Select your role.</p>
          </div>

          {/* Two-column asymmetric layout */}
          <div className="dual-path-grid">
            {/* Renter column */}
            <div className="dual-path-card">
              {/* Level 2 card with subtle blue ambient */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(1,92,185,0.10) 0%, var(--surface-container-high) 60%)",
                  borderRadius: "0.25rem",
                  padding: "clamp(2rem, 4vw, 2.75rem)",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {/* Ambient orb */}
                <div
                  style={{
                    position: "absolute",
                    top: "-60px",
                    right: "-60px",
                    width: "220px",
                    height: "220px",
                    background: "radial-gradient(ellipse, rgba(1,92,185,0.15), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="label-sm"
                  style={{ color: "var(--on-secondary-container)", marginBottom: "0.875rem" }}
                >
                  Intelligence File — For Renters
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.875rem",
                  }}
                >
                  Play Without the Hobby Grind
                </h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, marginBottom: "1.75rem", color: "var(--on-surface-variant)" }}>
                  Skip the painting queue. Browse hundreds of pro-painted armies, pick your faction, book your dates, and show up ready to roll dice.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {["No painting required", "Identity-verified & insured", "Pre-paid shipping both ways"].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <CheckCircleIcon size={14} color="var(--secondary-container)" />
                      <span className="label-sm" style={{ color: "var(--on-surface-variant)", textTransform: "none", letterSpacing: "normal" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/browse"
                  className="btn"
                  style={{
                    background: "rgba(1,92,185,0.20)",
                    border: "1px solid rgba(1,92,185,0.40)",
                    color: "var(--on-secondary-container)",
                    borderRadius: "0.125rem",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  Browse Armies →
                </Link>
              </div>
            </div>

            {/* Collector column */}
            <div className="dual-path-card">
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(250,105,0,0.10) 0%, var(--surface-container-high) 60%)",
                  borderRadius: "0.25rem",
                  padding: "clamp(2rem, 4vw, 2.75rem)",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {/* Ambient orb */}
                <div
                  style={{
                    position: "absolute",
                    top: "-60px",
                    right: "-60px",
                    width: "220px",
                    height: "220px",
                    background: "radial-gradient(ellipse, rgba(250,105,0,0.15), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Verified excellence marker — Burnished Gold tertiary */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                  }}
                >
                  <span className="badge badge-gold">Verified Host</span>
                </div>

                <div
                  className="label-sm"
                  style={{ color: "var(--on-primary-container)", marginBottom: "0.875rem" }}
                >
                  Intelligence File — For Collectors
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.875rem",
                  }}
                >
                  Put Your Collection to Work
                </h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, marginBottom: "1.75rem", color: "var(--on-surface-variant)" }}>
                  Got a shelf full of painted armies gathering dust? List them on War-Rent. Set your own rate, block dates, and we handle the rest.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {["Full deposit protection", "Verified renters only", "You control availability"].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <CheckCircleIcon size={14} color="var(--on-primary-container)" />
                      <span className="label-sm" style={{ color: "var(--on-surface-variant)", textTransform: "none", letterSpacing: "normal" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/list" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>
                  List Your Army →
                </Link>
              </div>
            </div>
          </div>

          <style>{`
            .dual-path-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.25rem;
            }
            .dual-path-card { height: 100%; }
            @media (max-width: 700px) {
              .dual-path-grid { grid-template-columns: 1fr; }
            }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════ COMMANDER'S LOG / TRUST ══════════════════════ */}
      <section className="section bg-dim" style={{ borderTop: "1px solid var(--ghost-border)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
            className="trust-grid"
          >
            {/* Left: Quote / Ethos */}
            <div>
              <div className="section-tag">Commander's Log</div>
              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.375rem, 3vw, 2rem)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                  color: "var(--on-surface)",
                  margin: "0 0 1.5rem",
                  position: "relative",
                  paddingLeft: "1.5rem",
                  borderLeft: "3px solid var(--on-primary-container)",
                }}
              >
                "The hobby shouldn't gatekeep the game. Every player deserves to field a painted army."
              </blockquote>
              <p style={{ color: "var(--outline)", fontSize: "0.9rem" }}>
                — The War-Rent founding principle
              </p>
            </div>

            {/* Right: Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                {
                  Icon: ShieldCheckIcon,
                  title: "Deposit Protection",
                  desc: "Every rental is covered by a fully refundable security deposit, protecting both hosts and renters.",
                },
                {
                  Icon: PackageIcon,
                  title: "Pre-Paid Logistics",
                  desc: "We generate shipping labels on both ends. Armies travel insured, tracked, and protected.",
                },
                {
                  Icon: MedalIcon,
                  title: "Verified Community",
                  desc: "Stripe Identity confirms every user. Bad actors are blocked before they can access the platform.",
                },
              ].map(({ Icon, title, desc }) => (
                <div key={title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      flex: "0 0 2.25rem",
                      width: "2.25rem",
                      height: "2.25rem",
                      background: "rgba(250,105,0,0.10)",
                      borderRadius: "0.125rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "0.125rem",
                    }}
                  >
                    <Icon size={18} color="var(--on-primary-container)" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        marginBottom: "0.25rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--outline)", margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .trust-grid {
            grid-template-columns: 1fr 1fr;
          }
          @media (max-width: 768px) {
            .trust-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          }
        `}</style>
      </section>
    </>
  );
}
