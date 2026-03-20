"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import {
  ArmyIcon,
  SkullIcon,
  RobotIcon,
  StarIcon,
  SearchIcon,
  ShieldCheckIcon,
  SwordsIcon,
} from "@/components/Icons";

/* ─── Faction icon helper ─────────────────────────────────── */
function FlameIcon({ size = 64, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8 C32 8 44 18 44 30 C44 42 36 52 32 56 C28 52 20 42 20 30 C20 18 32 8 32 8Z" />
      <path d="M32 28 C32 28 38 34 38 40 C38 46 35 50 32 52 C29 50 26 46 26 40 C26 34 32 28 32 28Z" />
    </svg>
  );
}

function EldarIcon({ size = 64, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8 L40 24 L56 28 L44 40 L46 56 L32 48 L18 56 L20 40 L8 28 L24 24 Z" />
      <circle cx="32" cy="32" r="6" />
      <line x1="32" y1="8" x2="32" y2="56" strokeDasharray="3 4" />
    </svg>
  );
}

function OrkIcon({ size = 64, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="22" r="10" />
      <rect x="18" y="32" width="28" height="18" rx="2" />
      <line x1="18" y1="38" x2="8" y2="50" />
      <line x1="46" y1="38" x2="56" y2="50" />
      <path d="M26 20 L24 14" />
      <path d="M38 20 L40 14" />
    </svg>
  );
}

/* ─── Mock data ───────────────────────────────────────────── */
const listings = [
  {
    id: 1,
    title: "Ultramarines 2,000pt Assault Force",
    faction: "Space Marines",
    system: "Warhammer 40K",
    dailyRate: 18,
    weeklyRate: 105,
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
    models: 42,
    location: "Austin, TX",
    available: true,
  },
  {
    id: 2,
    title: "Death Guard Plague Company",
    faction: "Chaos Space Marines",
    system: "Warhammer 40K",
    dailyRate: 22,
    weeklyRate: 130,
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
    models: 38,
    location: "Chicago, IL",
    available: true,
  },
  {
    id: 3,
    title: "Necron Awakening Dynastic Host",
    faction: "Necrons",
    system: "Warhammer 40K",
    dailyRate: 15,
    weeklyRate: 88,
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
    models: 52,
    location: "Seattle, WA",
    available: true,
  },
  {
    id: 4,
    title: "Salamanders Siege Force",
    faction: "Space Marines",
    system: "Warhammer 40K",
    dailyRate: 20,
    weeklyRate: 118,
    replacementValue: 720,
    points: 2000,
    painted: "Studio Quality",
    host: "VulkansForge",
    rating: 4.7,
    reviews: 8,
    Icon: FlameIcon,
    accentColor: "rgba(249,115,22,0.08)",
    accentBorder: "rgba(249,115,22,0.2)",
    iconColor: "#f97316",
    models: 45,
    location: "Denver, CO",
    available: true,
  },
  {
    id: 5,
    title: "Craftworld Iyanden Ghost Warriors",
    faction: "Aeldari",
    system: "Warhammer 40K",
    dailyRate: 25,
    weeklyRate: 148,
    replacementValue: 1100,
    points: 2500,
    painted: "Pro Painted",
    host: "PhoenixLord",
    rating: 5.0,
    reviews: 4,
    Icon: EldarIcon,
    accentColor: "rgba(234,179,8,0.08)",
    accentBorder: "rgba(234,179,8,0.2)",
    iconColor: "#eab308",
    models: 29,
    location: "Portland, OR",
    available: false,
  },
  {
    id: 6,
    title: "Waaagh! Skullkrumpa's Green Tide",
    faction: "Orks",
    system: "Warhammer 40K",
    dailyRate: 12,
    weeklyRate: 70,
    replacementValue: 380,
    points: 1750,
    painted: "Battle Ready",
    host: "DaKommander",
    rating: 4.6,
    reviews: 31,
    Icon: OrkIcon,
    accentColor: "rgba(34,197,94,0.08)",
    accentBorder: "rgba(34,197,94,0.2)",
    iconColor: "#22c55e",
    models: 98,
    location: "Houston, TX",
    available: true,
  },
];

const factions = ["All Factions", "Space Marines", "Chaos Space Marines", "Necrons", "Aeldari", "Orks"];
const systems = ["All Systems", "Warhammer 40K", "Age of Sigmar", "The Old World"];
const paintQuality = ["Any Quality", "Battle Ready", "Pro Painted", "Studio Quality"];
const sortOptions = ["Lowest Rate", "Highest Rated", "Most Reviews", "Most Points"];

/* ─── Page ────────────────────────────────────────────────── */
export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaction, setSelectedFaction] = useState("All Factions");
  const [selectedSystem, setSelectedSystem] = useState("All Systems");
  const [selectedPaint, setSelectedPaint] = useState("Any Quality");
  const [sortBy, setSortBy] = useState("Highest Rated");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = listings.filter((l) => {
    if (showAvailableOnly && !l.available) return false;
    if (selectedFaction !== "All Factions" && l.faction !== selectedFaction) return false;
    if (selectedSystem !== "All Systems" && l.system !== selectedSystem) return false;
    if (selectedPaint !== "Any Quality" && l.painted !== selectedPaint) return false;
    if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase()) && !l.faction.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Lowest Rate") return a.dailyRate - b.dailyRate;
    if (sortBy === "Highest Rated") return b.rating - a.rating;
    if (sortBy === "Most Reviews") return b.reviews - a.reviews;
    if (sortBy === "Most Points") return b.points - a.points;
    return 0;
  });

  return (
    <>
      {/* ── Page Header ── */}
      <section
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "7rem 1.5rem 3rem",
        }}
      >
        <div className="container">
          <div className="section-label" style={{ marginBottom: "1rem" }}>
            <SwordsIcon size={13} color="var(--color-orange-300)" />
            <span>Marketplace</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.5rem" }}>
            Browse <span className="gradient-text">Armies</span>
          </h1>
          <p style={{ maxWidth: "560px", marginBottom: "2rem" }}>
            {listings.length} armies available from verified collectors. Filter by faction, points, or paint quality.
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: "520px" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <SearchIcon size={18} color="var(--text-muted)" />
            </span>
            <input
              className="input"
              type="text"
              placeholder="Search by faction, title, or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "2.75rem", fontSize: "1rem" }}
            />
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          {/* Mobile filter toggle */}
          {isMobile && (
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="btn btn-secondary"
              style={{ marginBottom: "1rem", width: "100%", justifyContent: "space-between", display: "flex" }}
            >
              <span>🎛 Filters</span>
              <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{filtersOpen ? "Hide" : "Show"}</span>
            </button>
          )}
          <div
            className="browse-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* ── Sidebar Filters ── */}
            <aside style={{ display: (!isMobile || filtersOpen) ? "block" : "none" }}>
              <div
                className="card"
                style={{ padding: "1.5rem", position: "sticky", top: "5rem" }}
              >
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-accent)", marginBottom: "1.5rem" }}>
                  Filters
                </h3>

                {/* Faction */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                    Faction
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {factions.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFaction(f)}
                        style={{
                          background: selectedFaction === f ? "var(--accent-glow)" : "transparent",
                          border: selectedFaction === f ? "1px solid var(--accent-primary)" : "1px solid transparent",
                          borderRadius: "0.5rem",
                          padding: "0.45rem 0.75rem",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          color: selectedFaction === f ? "var(--color-orange-300)" : "var(--text-secondary)",
                          fontFamily: "var(--font-sans)",
                          transition: "all var(--transition-fast)",
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="divider" style={{ marginBottom: "1.5rem" }} />

                {/* Game System */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                    Game System
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {systems.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSystem(s)}
                        style={{
                          background: selectedSystem === s ? "var(--accent-glow)" : "transparent",
                          border: selectedSystem === s ? "1px solid var(--accent-primary)" : "1px solid transparent",
                          borderRadius: "0.5rem",
                          padding: "0.45rem 0.75rem",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          color: selectedSystem === s ? "var(--color-orange-300)" : "var(--text-secondary)",
                          fontFamily: "var(--font-sans)",
                          transition: "all var(--transition-fast)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="divider" style={{ marginBottom: "1.5rem" }} />

                {/* Paint Quality */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                    Paint Quality
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {paintQuality.map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedPaint(q)}
                        style={{
                          background: selectedPaint === q ? "var(--accent-glow)" : "transparent",
                          border: selectedPaint === q ? "1px solid var(--accent-primary)" : "1px solid transparent",
                          borderRadius: "0.5rem",
                          padding: "0.45rem 0.75rem",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          color: selectedPaint === q ? "var(--color-orange-300)" : "var(--text-secondary)",
                          fontFamily: "var(--font-sans)",
                          transition: "all var(--transition-fast)",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="divider" style={{ marginBottom: "1.5rem" }} />

                {/* Available Only */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <div
                    onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                    style={{
                      width: "2.5rem",
                      height: "1.375rem",
                      borderRadius: "999px",
                      background: showAvailableOnly ? "var(--accent-primary)" : "var(--bg-card-hover)",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background var(--transition-fast)",
                      border: "1px solid var(--border-card)",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: showAvailableOnly ? "calc(100% - 18px)" : "2px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "white",
                        transition: "left var(--transition-fast)",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      }}
                    />
                  </div>
                  Available now only
                </label>
              </div>
            </aside>

            {/* ── Listings Grid ── */}
            <div>
              {/* Sort bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "0.9375rem", color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>{sorted.length}</strong> armies found
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", flexShrink: 0 }}>Sort:</span>
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      style={{
                        padding: "0.35rem 0.625rem",
                        borderRadius: "0.5rem",
                        border: sortBy === opt ? "1px solid var(--accent-primary)" : "1px solid var(--border-card)",
                        background: sortBy === opt ? "var(--accent-glow)" : "transparent",
                        color: sortBy === opt ? "var(--color-orange-300)" : "var(--text-secondary)",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                        transition: "all var(--transition-fast)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {sorted.length === 0 ? (
                <div
                  className="card"
                  style={{ padding: "4rem", textAlign: "center" }}
                >
                  <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>No armies match your filters.</p>
                  <button className="btn btn-secondary" style={{ marginTop: "1rem" }} onClick={() => { setSelectedFaction("All Factions"); setSelectedSystem("All Systems"); setSelectedPaint("Any Quality"); setSearchQuery(""); }}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {sorted.map((listing) => (
                    <article key={listing.id} className="card" style={{ overflow: "hidden", opacity: listing.available ? 1 : 0.65 }}>
                      {/* Illustration */}
                      <div
                        style={{
                          height: "180px",
                          background: `linear-gradient(135deg, ${listing.accentColor}, var(--bg-secondary))`,
                          border: `1px solid ${listing.accentBorder}`,
                          borderBottom: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <listing.Icon size={72} color={listing.iconColor} />
                        <span
                          className="badge badge-orange"
                          style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}
                        >
                          {listing.painted}
                        </span>
                        {!listing.available && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(12,10,9,0.6)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-card)",
                                padding: "0.35rem 0.875rem",
                                borderRadius: "999px",
                                fontSize: "0.8125rem",
                                fontWeight: 600,
                                color: "var(--text-muted)",
                              }}
                            >
                              Currently Rented
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div style={{ padding: "1.125rem" }}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "var(--text-accent)",
                            marginBottom: "0.3rem",
                          }}
                        >
                          {listing.faction} · {listing.points}pts
                        </div>

                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            marginBottom: "0.75rem",
                            color: "var(--text-primary)",
                          }}
                        >
                          {listing.title}
                        </h3>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "0.875rem",
                            fontSize: "0.8125rem",
                          }}
                        >
                          <span style={{ color: "var(--text-muted)" }}>
                            by{" "}
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
                            <StarIcon size={12} color="var(--color-orange-400)" />
                            {listing.rating}{" "}
                            <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                              ({listing.reviews})
                            </span>
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginBottom: "0.875rem",
                            fontSize: "0.75rem",
                          }}
                        >
                          <span
                            style={{
                              background: "var(--bg-secondary)",
                              border: "1px solid var(--border-subtle)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "0.375rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            {listing.models} models
                          </span>
                          <span
                            style={{
                              background: "var(--bg-secondary)",
                              border: "1px solid var(--border-subtle)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "0.375rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            {listing.location}
                          </span>
                        </div>

                        <hr className="divider" style={{ marginBottom: "0.875rem" }} />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <span style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--text-primary)" }}>
                              ${listing.dailyRate}
                            </span>
                            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginLeft: "0.25rem" }}>
                              / day
                            </span>
                          </div>
                          <Link
                            href={`/listing/${listing.id}`}
                            className={listing.available ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
                          >
                            {listing.available ? "View Army" : "Notify Me"}
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .browse-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
