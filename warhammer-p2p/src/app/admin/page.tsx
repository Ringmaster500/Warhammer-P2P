"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheckIcon, CheckCircleIcon, PackageIcon, StarIcon, BanknoteIcon } from "@/components/Icons";

function AlertIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
function XIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function UserIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function TruckIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
}

type AdminTab = "overview" | "bookings" | "disputes" | "users" | "listings";
type DisputeStatus = "open" | "reviewing" | "resolved";

const mockDisputes: { id: string; booking: string; army: string; host: string; renter: string; issue: string; deposit: number; status: DisputeStatus; opened: string }[] = [
  { id: "DSP-001", booking: "BK-0041", army: "Ultramarines Assault Force", host: "GrimDarkGary", renter: "WarbossWendy", issue: "3 broken bolter arms on 2 Intercessors. Disputed by host.", deposit: 650, status: "open", opened: "Mar 19, 2026" },
  { id: "DSP-002", booking: "BK-0033", army: "Death Guard Plague Company", host: "NurglesNancy", renter: "ChaosChris", issue: "Lost Plague Marine model. Renter claims arrived missing.", deposit: 900, status: "reviewing", opened: "Mar 12, 2026" },
];

const mockAllBookings = [
  { id: "BK-0041", army: "Ultramarines Assault Force", host: "GrimDarkGary", renter: "WarbossWendy", total: 126, deposit: 650, status: "active", from: "Mar 22", to: "Mar 29" },
  { id: "BK-0040", army: "Death Guard", host: "NurglesNancy", renter: "ChaosChris", total: 154, deposit: 900, status: "returning", from: "Mar 10", to: "Mar 17" },
  { id: "BK-0039", army: "Necron Host", host: "TombWorldTed", renter: "PheonixFan", total: 105, deposit: 480, status: "complete", from: "Mar 5", to: "Mar 12" },
  { id: "BK-0038", army: "Salamanders", host: "GrimDarkGary", renter: "Mordecai_40K", total: 140, deposit: 720, status: "active", from: "Mar 15", to: "Mar 22" },
];

const mockUsers = [
  { name: "GrimDarkGary", role: "host", kyc: true, payouts: true, bookings: 27, rating: 4.9, joined: "Mar 2024" },
  { name: "NurglesNancy", role: "host", kyc: true, payouts: true, bookings: 11, rating: 5.0, joined: "Jan 2025" },
  { name: "WarbossWendy", role: "renter", kyc: true, payouts: false, bookings: 8, rating: 5.0, joined: "Feb 2025" },
  { name: "TombWorldTed", role: "host", kyc: true, payouts: true, bookings: 17, rating: 4.8, joined: "Apr 2024" },
  { name: "ChaosChris", role: "renter", kyc: true, payouts: false, bookings: 3, rating: 4.5, joined: "Dec 2025" },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  active:    { bg: "rgba(34,197,94,0.10)",  color: "#4ade80" },
  returning: { bg: "rgba(249,115,22,0.10)", color: "#fb923c" },
  complete:  { bg: "rgba(100,116,139,0.12)", color: "#94a3b8" },
  pending:   { bg: "rgba(234,179,8,0.10)",  color: "#eab308" },
  open:      { bg: "rgba(239,68,68,0.10)",  color: "#f87171" },
  reviewing: { bg: "rgba(168,85,247,0.10)", color: "#c084fc" },
  resolved:  { bg: "rgba(34,197,94,0.10)",  color: "#4ade80" },
};

function DisputeModal({ dispute, onClose }: { dispute: typeof mockDisputes[0]; onClose: () => void }) {
  const [resolution, setResolution] = useState<null | "host" | "renter" | "split">(null);
  const [note, setNote] = useState("");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(12,13,16,0.9)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div className="card" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "600px", padding: "2rem", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <div className="label-sm" style={{ color: "#f87171", marginBottom: "0.5rem" }}>{dispute.id} — OPEN DISPUTE</div>
            <h3 style={{ fontSize: "1.25rem" }}>{dispute.army}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--outline)" }}><XIcon size={20} /></button>
        </div>

        {/* Issue summary */}
        <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "0.125rem", padding: "1rem", marginBottom: "1.5rem", borderLeft: "3px solid #f87171" }}>
          <div className="label-sm" style={{ color: "#f87171", marginBottom: "0.5rem" }}>Reported Issue</div>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>{dispute.issue}</p>
        </div>

        {/* Parties */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[{ label: "HOST", name: dispute.host, role: "host" }, { label: "RENTER", name: dispute.renter, role: "renter" }].map(({ label, name }) => (
            <div key={label} style={{ background: "var(--surface-container)", borderRadius: "0.125rem", padding: "1rem" }}>
              <div className="label-sm" style={{ color: "var(--outline)", marginBottom: "0.5rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "var(--on-surface)" }}>{name}</div>
            </div>
          ))}
        </div>

        {/* Condition photo evidence */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="label-sm" style={{ color: "var(--outline)", marginBottom: "0.75rem" }}>Condition Evidence</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
            {["Pre-ship 1","Pre-ship 2","Return 1","Return 2"].map((label, i) => (
              <div key={label} style={{ aspectRatio: "1", background: `linear-gradient(135deg, rgba(59,130,246,${0.08 + i*0.02}), var(--surface-container))`, borderRadius: "0.125rem", border: "1px solid var(--ghost-border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: "0.375rem" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.6rem", color: "#60a5fa", fontWeight: 700 }}>{i > 1 ? "R" : "P"}</span>
                </div>
                <span style={{ fontSize: "0.65rem", color: "var(--outline)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution */}
        {!resolution ? (
          <>
            <div className="label-sm" style={{ color: "var(--outline)", marginBottom: "0.75rem" }}>Admin Decision</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
              <textarea
                className="input"
                rows={3}
                placeholder="Internal resolution note (not shown to parties)…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ resize: "vertical", lineHeight: 1.6 }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.625rem" }}>
              <button onClick={() => setResolution("host")} className="btn btn-sm" style={{ background: "rgba(250,105,0,0.12)", border: "1px solid rgba(250,105,0,0.3)", color: "var(--on-primary-container)", width: "100%" }}>
                Capture → Host (${dispute.deposit})
              </button>
              <button onClick={() => setResolution("split")} className="btn btn-sm" style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc", width: "100%" }}>
                Split 50/50
              </button>
              <button onClick={() => setResolution("renter")} className="btn btn-sm" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80", width: "100%" }}>
                Release → Renter
              </button>
            </div>
          </>
        ) : (
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "0.125rem", padding: "1.25rem", textAlign: "center" }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#4ade80" }}>
              ✓ Dispute resolved — {resolution === "host" ? `$${dispute.deposit} captured for host` : resolution === "renter" ? "Deposit released to renter" : "Deposit split 50/50"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [selectedDispute, setSelectedDispute] = useState<typeof mockDisputes[0] | null>(null);

  const tabs: { id: AdminTab; label: string }[] = [
    { id: "overview",  label: "Overview" },
    { id: "bookings",  label: "All Bookings" },
    { id: "disputes",  label: `Disputes ${mockDisputes.filter(d => d.status !== "resolved").length ? `(${mockDisputes.filter(d => d.status !== "resolved").length})` : ""}` },
    { id: "users",     label: "Users" },
    { id: "listings",  label: "Listings" },
  ];

  return (
    <>
      {selectedDispute && <DisputeModal dispute={selectedDispute} onClose={() => setSelectedDispute(null)} />}

      <div style={{ paddingTop: "4.5rem", minHeight: "100vh", background: "var(--surface-dim)" }}>
        {/* Admin header */}
        <div style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--ghost-border)", padding: "2rem 1.5rem 0" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "#f87171", background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)", padding: "0.25rem 0.625rem", borderRadius: "999px", marginBottom: "0.625rem" }}>
                  🔒 SUPER ADMIN
                </div>
                <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>War-Rent Command Center</h1>
              </div>
              <Link href="/" className="btn btn-ghost btn-sm">← Back to Site</Link>
            </div>

            <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "0.875rem 1.25rem", background: "none", border: "none", borderBottom: activeTab === tab.id ? "2px solid var(--on-primary-container)" : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "var(--on-surface)" : "var(--outline)", marginBottom: "-1px", transition: "all var(--t-fast)" }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="section" style={{ paddingTop: "2.5rem" }}>
          <div className="container">

            {activeTab === "overview" && (
              <div>
                {/* Alert for open disputes */}
                {mockDisputes.some(d => d.status === "open") && (
                  <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.25rem", padding: "1rem 1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <AlertIcon size={18} color="#f87171" />
                      <span style={{ fontWeight: 600, color: "#f87171" }}>{mockDisputes.filter(d => d.status === "open").length} open dispute{mockDisputes.filter(d => d.status === "open").length > 1 ? "s" : ""} require your attention.</span>
                    </div>
                    <button onClick={() => setActiveTab("disputes")} className="btn btn-sm" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                      Review Disputes →
                    </button>
                  </div>
                )}

                {/* Platform stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }} className="admin-stats">
                  {[
                    { label: "Total Revenue", value: "$8,241", sub: "all time", Icon: BanknoteIcon, color: "#22c55e" },
                    { label: "Active Bookings", value: "2", sub: "in the field", Icon: TruckIcon, color: "var(--on-primary-container)" },
                    { label: "Total Users", value: "312", sub: "verified accounts", Icon: UserIcon, color: "var(--on-secondary-container)" },
                    { label: "Open Disputes", value: String(mockDisputes.filter(d => d.status !== "resolved").length), sub: "need resolution", Icon: AlertIcon, color: "#f87171" },
                  ].map(({ label, value, sub, Icon, color }) => (
                    <div key={label} className="card" style={{ padding: "1.5rem" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "0.125rem", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                        <Icon size={20} color={color} />
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--on-surface-variant)", marginTop: "0.375rem" }}>{label}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--outline)", marginTop: "0.2rem" }}>{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Recent activity */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="admin-grid">
                  <div>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>Recent Bookings</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {mockAllBookings.slice(0, 3).map((b) => (
                        <div key={b.id} className="card" style={{ padding: "1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                                <span className="label-sm" style={{ color: "var(--outline)" }}>{b.id}</span>
                                <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: statusColors[b.status]?.bg, color: statusColors[b.status]?.color }}>{b.status}</span>
                              </div>
                              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{b.army}</div>
                              <div style={{ fontSize: "0.8rem", color: "var(--outline)" }}>{b.host} → {b.renter}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontWeight: 700 }}>${b.total}</div>
                              <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>${b.deposit} held</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>Open Disputes</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {mockDisputes.map((d) => (
                        <div key={d.id} className="card" style={{ padding: "1rem", cursor: "pointer", borderLeft: "3px solid #f87171" }} onClick={() => setSelectedDispute(d)}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                                <span className="label-sm" style={{ color: "#f87171" }}>{d.id}</span>
                                <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: statusColors[d.status]?.bg, color: statusColors[d.status]?.color }}>{d.status}</span>
                              </div>
                              <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{d.army}</div>
                              <div style={{ fontSize: "0.8rem", color: "var(--outline)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "260px" }}>{d.issue}</div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <div style={{ fontWeight: 700, color: "#f87171" }}>${d.deposit}</div>
                              <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>at stake</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>All Bookings</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {mockAllBookings.map((b) => (
                    <div key={b.id} className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                          <span className="label-sm" style={{ color: "var(--outline)" }}>{b.id}</span>
                          <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: statusColors[b.status]?.bg, color: statusColors[b.status]?.color }}>{b.status}</span>
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{b.army}</div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Host: <strong style={{ color: "var(--on-surface-variant)" }}>{b.host}</strong> · Renter: <strong style={{ color: "var(--on-surface-variant)" }}>{b.renter}</strong> · {b.from} – {b.to}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700, fontSize: "1.125rem" }}>${b.total}</div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>${b.deposit} deposit held</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "disputes" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Dispute Resolution</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {mockDisputes.map((d) => (
                    <div key={d.id} className="card" style={{ padding: "1.5rem", borderLeft: `3px solid ${statusColors[d.status]?.color}` }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem" }}>
                            <span className="label-sm" style={{ color: "var(--outline)" }}>{d.id}</span>
                            <span style={{ padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: statusColors[d.status]?.bg, color: statusColors[d.status]?.color }}>{d.status.toUpperCase()}</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--outline)" }}>Opened {d.opened}</span>
                          </div>
                          <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.375rem" }}>{d.army}</h3>
                          <div style={{ fontSize: "0.875rem", color: "var(--outline)", marginBottom: "0.5rem" }}>
                            Host: <span style={{ color: "var(--on-surface-variant)", fontWeight: 600 }}>{d.host}</span> · Renter: <span style={{ color: "var(--on-surface-variant)", fontWeight: 600 }}>{d.renter}</span>
                          </div>
                          <div style={{ fontSize: "0.875rem", color: "var(--on-surface-variant)", fontStyle: "italic" }}>"{d.issue}"</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#f87171" }}>${d.deposit}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>deposit at stake</div>
                          <button onClick={() => setSelectedDispute(d)} className="btn btn-primary btn-sm" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171" }}>
                            Resolve Dispute →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>All Users</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {mockUsers.map((user) => (
                    <div key={user.name} className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(250,105,0,0.2), var(--surface-container-highest))", border: "2px solid var(--ghost-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: "var(--on-primary-container)", flexShrink: 0 }}>
                          {user.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {user.name}
                            <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: user.role === "host" ? "rgba(250,105,0,0.10)" : "rgba(1,92,185,0.10)", color: user.role === "host" ? "var(--on-primary-container)" : "var(--on-secondary-container)" }}>
                              {user.role.toUpperCase()}
                            </span>
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "var(--outline)" }}>Joined {user.joined} · {user.bookings} bookings {user.rating > 0 ? `· ★ ${user.rating}` : ""}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        {user.kyc && <span style={{ fontSize: "0.7rem", color: "#4ade80", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.2rem 0.5rem", borderRadius: "999px", fontWeight: 600 }}>KYC ✓</span>}
                        {user.payouts && <span style={{ fontSize: "0.7rem", color: "var(--tertiary)", background: "rgba(244,191,63,0.10)", border: "1px solid rgba(244,191,63,0.2)", padding: "0.2rem 0.5rem", borderRadius: "999px", fontWeight: 600 }}>STRIPE ✓</span>}
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.8rem" }}>Manage →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "listings" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>All Listings</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { id: 1, title: "Ultramarines 2,000pt Assault Force", host: "GrimDarkGary", faction: "Space Marines", rate: 18, status: "live", views: 142 },
                    { id: 2, title: "Death Guard Plague Company", host: "NurglesNancy", faction: "Chaos Space Marines", rate: 22, status: "rented", views: 98 },
                    { id: 3, title: "Necron Awakening Dynastic Host", host: "TombWorldTed", faction: "Necrons", rate: 15, status: "live", views: 67 },
                    { id: 4, title: "Salamanders Siege Breakers", host: "GrimDarkGary", faction: "Space Marines", rate: 20, status: "rented", views: 88 },
                    { id: 5, title: "Chaos Undivided Warband", host: "GrimDarkGary", faction: "Chaos Space Marines", rate: 16, status: "draft", views: 0 },
                  ].map((l) => (
                    <div key={l.id} className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.375rem" }}>
                          <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: l.status === "live" ? "rgba(34,197,94,0.10)" : l.status === "rented" ? "rgba(249,115,22,0.10)" : "rgba(100,116,139,0.12)", color: l.status === "live" ? "#4ade80" : l.status === "rented" ? "#fb923c" : "#94a3b8" }}>{l.status.toUpperCase()}</span>
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{l.title}</div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Host: <span style={{ color: "var(--on-surface-variant)" }}>{l.host}</span> · {l.faction} · {l.views} views</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700 }}>${l.rate}/day</div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Link href={`/listing/${l.id}`} className="btn btn-ghost btn-sm">View</Link>
                          <button className="btn btn-sm" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>Suspend</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        .admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 900px) {
          .admin-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
