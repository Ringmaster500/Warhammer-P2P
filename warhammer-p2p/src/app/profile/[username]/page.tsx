"use client";

import Link from "next/link";
import { StarIcon, ShieldCheckIcon, CheckCircleIcon, PackageIcon, MedalIcon } from "@/components/Icons";

function MapPinIcon({ size = 14, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function ArmyIcon({ size = 48, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="32" cy="14" r="6"/><path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z"/><line x1="20" y1="44" x2="10" y2="54"/><line x1="44" y1="44" x2="54" y2="54"/></svg>;
}

const mockListings = [
  { id: 1, title: "Ultramarines 2,000pt Assault Force", faction: "Space Marines", dailyRate: 18, rating: 4.9, reviews: 23, available: true, painted: "Pro Painted", accentColor: "#60a5fa" },
  { id: 4, title: "Salamanders Siege Breakers", faction: "Space Marines", dailyRate: 20, rating: 5.0, reviews: 8, available: false, painted: "Studio Quality", accentColor: "#f97316" },
  { id: 3, title: "Chaos Undivided Warband", faction: "Chaos Space Marines", dailyRate: 16, rating: 0, reviews: 0, available: true, painted: "Pro Painted", accentColor: "#a855f7" },
];

const mockReviews = [
  { author: "WarbossWendy", rating: 5, date: "2 weeks ago", text: "Incredible army. Packed perfectly, every model arrived immaculate." },
  { author: "Mordecai_40K", rating: 5, date: "1 month ago", text: "Paint quality is unreal in person. Gary is super responsive too." },
  { author: "PrimarchsNephew", rating: 4, date: "2 months ago", text: "Great army, minor pre-existing chip noted in condition photos. No deposit issues at all." },
];

export default function ProfilePage({ params }: { params: { username: string } }) {
  const username = params.username || "GrimDarkGary";

  return (
    <>
      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(160deg, rgba(250,105,0,0.07) 0%, var(--surface-dim) 60%)",
        borderBottom: "1px solid var(--ghost-border)",
        padding: "6rem 1.5rem 0",
      }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem", paddingBottom: "2rem", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{ width: "96px", height: "96px", borderRadius: "50%", background: "linear-gradient(135deg, var(--on-primary-container), var(--primary-container))", border: "4px solid var(--surface-container-high)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
              G
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", margin: 0 }}>{username}</h1>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "#4ade80", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.25rem 0.625rem", borderRadius: "999px", fontWeight: 600 }}>
                  <CheckCircleIcon size={12} color="#4ade80" /> VERIFIED HOST
                </span>
              </div>
              <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                <span style={{ color: "var(--tertiary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <StarIcon size={13} color="var(--tertiary)" /> 4.9 <span style={{ color: "var(--outline)", fontWeight: 400, fontSize: "0.875rem" }}>(23 reviews)</span>
                </span>
                <span style={{ fontSize: "0.875rem", color: "var(--outline)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <MapPinIcon size={13} color="var(--outline)" /> Austin, TX
                </span>
                <span style={{ fontSize: "0.875rem", color: "var(--outline)" }}>Host since March 2024</span>
                <span style={{ fontSize: "0.875rem", color: "var(--outline)" }}>27 completed rentals</span>
              </div>
            </div>
          </div>

          {/* Stat bar */}
          <div style={{ display: "flex", gap: "2.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--ghost-border)", paddingBottom: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "RESPONSE RATE", value: "98%" },
              { label: "AVG RESPONSE TIME", value: "< 2 hrs" },
              { label: "DAMAGE INCIDENTS", value: "0" },
              { label: "LISTINGS", value: "3" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.02em" }}>{value}</div>
                <div className="label-sm" style={{ color: "var(--outline)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2.5rem", alignItems: "start" }} className="profile-layout">

            {/* Left: listings + reviews */}
            <div>
              {/* About */}
              <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>About</h2>
                <p style={{ lineHeight: 1.8, margin: 0 }}>
                  Long-time collector and competitive 40K player based in Austin, TX. I've been in the hobby for 15+ years and have accumulated several pro-painted armies I can no longer field regularly. Love seeing armies get table time instead of gathering dust on a shelf.
                </p>
                <p style={{ lineHeight: 1.8, marginTop: "1rem", marginBottom: 0 }}>
                  All armies ship double-boxed with custom foam inserts. I photograph every model before shipping so condition is always documented. Zero damage incidents across 27 rentals.
                </p>
              </div>

              {/* Listings */}
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>
                Listings <span style={{ color: "var(--outline)", fontWeight: 400, fontSize: "1rem" }}>({mockListings.length})</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                {mockListings.map((l) => (
                  <div key={l.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem", opacity: l.available ? 1 : 0.7 }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "0.125rem", background: `linear-gradient(135deg, ${l.accentColor}22, var(--surface-container))`, border: `1px solid ${l.accentColor}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <ArmyIcon size={36} color={l.accentColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="label-sm" style={{ color: "var(--on-primary-container)", marginBottom: "0.2rem" }}>{l.faction}</div>
                      <div style={{ fontWeight: 600, color: "var(--on-surface)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.2rem" }}>{l.title}</div>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <span className="badge badge-orange">{l.painted}</span>
                        {l.reviews > 0 && <span style={{ fontSize: "0.8125rem", color: "var(--tertiary)" }}>★ {l.rating} ({l.reviews})</span>}
                        {!l.available && <span style={{ fontSize: "0.75rem", color: "var(--outline)", fontStyle: "italic" }}>Currently rented</span>}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--on-surface)" }}>${l.dailyRate}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>/ day</div>
                      <Link href={`/listing/${l.id}`} className="btn btn-primary btn-sm" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                        {l.available ? "View" : "Notify Me"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviews */}
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>
                Reviews <span style={{ color: "var(--outline)", fontWeight: 400, fontSize: "1rem" }}>(23)</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {mockReviews.map((review) => (
                  <div key={review.author} className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(250,105,0,0.15), var(--surface-container-highest))", border: "1px solid var(--ghost-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, color: "var(--on-primary-container)" }}>
                          {review.author[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--on-surface)" }}>{review.author}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>{review.date}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} size={13} color={i < review.rating ? "var(--tertiary)" : "var(--outline-variant)"} />)}
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.7 }}>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: trust sidebar */}
            <div>
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--outline)", marginBottom: "1.25rem" }}>
                  Host Credentials
                </h3>
                {[
                  { Icon: ShieldCheckIcon, label: "Identity Verified", sub: "via Stripe Identity", ok: true },
                  { Icon: PackageIcon, label: "Stripe Connect", sub: "Payouts connected", ok: true },
                  { Icon: MedalIcon, label: "Zero Disputes", sub: "0 damage incidents", ok: true },
                  { Icon: CheckCircleIcon, label: "Email Verified", sub: "Account confirmed", ok: true },
                ].map(({ Icon, label, sub, ok }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.125rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "0.125rem", background: ok ? "rgba(34,197,94,0.08)" : "rgba(100,116,139,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} color={ok ? "#4ade80" : "var(--outline)"} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--on-surface)" }}>{label}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--outline)", marginBottom: "1rem" }}>
                  Shipping Policy
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, margin: "0 0 0.75rem" }}>
                  Ships within {`${2} business days`} of booking acceptance. Pre-paid labels provided for outbound and return.
                </p>
                <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Packages insured up to retail value.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .profile-layout { display: grid; grid-template-columns: 1fr 300px; gap: 2.5rem; align-items: start; }
        @media (max-width: 900px) { .profile-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
