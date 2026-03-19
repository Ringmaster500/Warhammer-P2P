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

/* ─── Placeholder listing data ───────────────────────────── */
const featuredListings = [
  {
    id: 1,
    title: "Ultramarines 2,000pt Assault Force",
    faction: "Space Marines",
    dailyRate: 18,
    replacementValue: 650,
    points: 2000,
    painted: "Pro Painted",
    host: "GrimDarkGary",
    rating: 4.9,
    reviews: 23,
    Icon: ArmyIcon,
    accentColor: "rgba(59,130,246,0.12)",
    accentBorder: "rgba(59,130,246,0.25)",
    iconColor: "#60a5fa",
  },
  {
    id: 2,
    title: "Death Guard Plague Company",
    faction: "Chaos Space Marines",
    dailyRate: 22,
    replacementValue: 900,
    points: 2000,
    painted: "Studio Quality",
    host: "NurglesNancy",
    rating: 5.0,
    reviews: 11,
    Icon: SkullIcon,
    accentColor: "rgba(132,204,22,0.08)",
    accentBorder: "rgba(132,204,22,0.2)",
    iconColor: "#84cc16",
  },
  {
    id: 3,
    title: "Necron Awakening Dynastic Host",
    faction: "Necrons",
    dailyRate: 15,
    replacementValue: 480,
    points: 1500,
    painted: "Battle Ready",
    host: "TombWorldTed",
    rating: 4.8,
    reviews: 17,
    Icon: RobotIcon,
    accentColor: "rgba(20,184,166,0.08)",
    accentBorder: "rgba(20,184,166,0.2)",
    iconColor: "#14b8a6",
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
  { value: "400+", label: "Painted Armies Available" },
  { value: "50K+", label: "Points to Deploy" },
  { value: "100%", label: "Deposit Protected" },
  { value: "4.9★", label: "Average Rating" },
];

const trustBadges = [
  { label: "Deposit Protected", Icon: ShieldCheckIcon },
  { label: "Pre-paid Shipping", Icon: PackageIcon },
  { label: "Identity Verified", Icon: CheckCircleIcon },
];

/* ─── Page Component ─────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ======================== HERO ======================== */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg.png"
            alt="Warhammer armies on a battlefield"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(12,10,9,0.94) 40%, rgba(12,10,9,0.55) 65%, rgba(12,10,9,0.2) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to top, var(--bg-primary), transparent)",
            }}
          />
        </div>

        {/* Hero content */}
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, padding: "8rem 1.5rem 4rem" }}
        >
          <div style={{ maxWidth: "640px" }}>
            {/* Label */}
            <div className="section-label" style={{ marginBottom: "1.75rem" }}>
              <SwordsIcon size={13} color="var(--color-orange-300)" />
              <span>P2P Army Rentals</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              Deploy a{" "}
              <span className="gradient-text">Painted Army</span>
              <br />
              This Weekend.
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                marginBottom: "2.5rem",
                maxWidth: "520px",
              }}
            >
              Rent professionally painted Warhammer armies from verified collectors.
              No hobby debt. No half-painted shame. Just play.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/browse" className="btn btn-primary btn-lg">
                Browse Armies
              </Link>
              <Link href="/list" className="btn btn-secondary btn-lg">
                List Your Army →
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {trustBadges.map(({ label, Icon }) => (
                <span
                  key={label}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Icon size={14} color="var(--color-orange-400)" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================== STATS BAR ======================== */}
      <section
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "2rem 1.5rem",
        }}
      >
        <div className="stats-grid container">
          {stats.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 800,
                  color: "var(--accent-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  marginTop: "0.25rem",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
          @media (max-width: 640px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ======================== FEATURED LISTINGS ======================== */}
      <section className="section" id="browse">
        <div className="container">
          {/* Section header */}
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label">Featured Armies</div>
            <h2 style={{ marginBottom: "0.75rem" }}>Ready to Deploy</h2>
            <p style={{ maxWidth: "520px" }}>
              Browse available armies. Each listing shows points, paint quality, daily rate, and host ratings.
            </p>
          </div>

          {/* Listing cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {featuredListings.map((listing) => (
              <article key={listing.id} className="card" style={{ overflow: "hidden" }}>
                {/* Illustration area */}
                <div
                  style={{
                    height: "200px",
                    background: `linear-gradient(135deg, ${listing.accentColor}, var(--bg-secondary))`,
                    border: `1px solid ${listing.accentBorder}`,
                    borderBottom: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <listing.Icon size={80} color={listing.iconColor} />
                  {/* Painted badge */}
                  <span
                    className="badge badge-orange"
                    style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}
                  >
                    {listing.painted}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: "1.25rem" }}>
                  {/* Faction tag */}
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--text-accent)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {listing.faction} · {listing.points}pts
                  </div>

                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      marginBottom: "0.875rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {listing.title}
                  </h3>

                  {/* Host & rating */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>
                      Hosted by{" "}
                      <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                        {listing.host}
                      </span>
                    </span>
                    <span
                      style={{
                        color: "var(--color-orange-400)",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <StarIcon size={13} color="var(--color-orange-400)" />
                      {listing.rating}{" "}
                      <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                        ({listing.reviews})
                      </span>
                    </span>
                  </div>

                  <hr className="divider" style={{ marginBottom: "1rem" }} />

                  {/* Pricing row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: "var(--text-primary)",
                        }}
                      >
                        ${listing.dailyRate}
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-muted)",
                          marginLeft: "0.25rem",
                        }}
                      >
                        / day
                      </span>
                    </div>
                    <Link href={`/listing/${listing.id}`} className="btn btn-primary btn-sm">
                      View Army
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Browse all CTA */}
          <div style={{ textAlign: "center" }}>
            <Link href="/browse" className="btn btn-secondary">
              Browse All Armies →
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================== */}
      <section
        className="section"
        id="how-it-works"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label" style={{ display: "inline-flex" }}>
              Simple Process
            </div>
            <h2 style={{ marginBottom: "0.75rem" }}>How War-Rent Works</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              From browse to battlefield in four steps. We handle the logistics,
              the insurance, and the payment — for everyone involved.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {howItWorks.map(({ step, title, description, Icon }) => (
              <div key={step} className="card" style={{ padding: "1.75rem" }}>
                {/* Icon container */}
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "0.75rem",
                    background: "var(--accent-glow)",
                    border: "1px solid rgba(249,115,22,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Icon size={22} color="var(--accent-primary)" />
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--accent-primary)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Step {step}
                </div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== DUAL PATH CTA ======================== */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label" style={{ display: "inline-flex", marginBottom: "1rem" }}>
              <SwordsIcon size={13} color="var(--color-orange-300)" />
              <span>Join the Battlefield</span>
            </div>
            <h2 style={{ marginBottom: "0.75rem" }}>
              How Are You Playing?
            </h2>
            <p style={{ maxWidth: "460px", margin: "0 auto" }}>
              War-Rent works for both sides of the table. Pick your path.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Renter card */}
            <div
              className="card"
              style={{
                padding: "clamp(2rem, 4vw, 2.75rem)",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(59,130,246,0.25)",
                background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, var(--bg-card) 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "180px",
                  height: "180px",
                  background: "radial-gradient(ellipse, rgba(59,130,246,0.12), transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.875rem",
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <SearchIcon size={22} color="#60a5fa" />
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: "0.625rem",
                }}
              >
                For Renters
              </div>
              <h3 style={{ fontSize: "1.375rem", fontWeight: 800, marginBottom: "0.875rem", color: "var(--text-primary)" }}>
                Play Without the Hobby Grind
              </h3>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Skip the painting queue. Browse hundreds of pro‑painted armies, pick your faction, book your dates, and show up ready to roll dice.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["No painting required", "Identity-verified & insured", "Pre-paid shipping both ways"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <CheckCircleIcon size={15} color="#60a5fa" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/browse" className="btn btn-lg" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", color: "#93c5fd", width: "100%", textAlign: "center", display: "block" }}>
                Browse Armies →
              </Link>
            </div>

            {/* Collector card */}
            <div
              className="card"
              style={{
                padding: "clamp(2rem, 4vw, 2.75rem)",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(249,115,22,0.25)",
                background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, var(--bg-card) 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "180px",
                  height: "180px",
                  background: "radial-gradient(ellipse, rgba(249,115,22,0.12), transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.875rem",
                  background: "var(--accent-glow)",
                  border: "1px solid rgba(249,115,22,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <MedalIcon size={22} color="var(--accent-primary)" />
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-orange-400)",
                  marginBottom: "0.625rem",
                }}
              >
                For Collectors
              </div>
              <h3 style={{ fontSize: "1.375rem", fontWeight: 800, marginBottom: "0.875rem", color: "var(--text-primary)" }}>
                Put Your Collection to Work
              </h3>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Got a shelf full of painted armies gathering dust? List them on War-Rent. Set your own rate, block dates, and we handle the rest.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Full deposit protection", "Verified renters only", "You control availability"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <CheckCircleIcon size={15} color="var(--color-orange-400)" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/list" className="btn btn-primary btn-lg" style={{ width: "100%", textAlign: "center", display: "block" }}>
                List Your Army →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
