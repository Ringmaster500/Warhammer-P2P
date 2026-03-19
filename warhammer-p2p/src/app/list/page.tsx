"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  PackageIcon,
  MedalIcon,
  SwordsIcon,
} from "@/components/Icons";

/* ─── Inline icons ────────────────────────────────────────── */
function UploadIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function PlusIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CheckIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── Step indicator ──────────────────────────────────────── */
const steps = [
  { num: 1, label: "Army Details" },
  { num: 2, label: "Photos & Models" },
  { num: 3, label: "Pricing" },
  { num: 4, label: "Review & Publish" },
];

/* ─── Options ─────────────────────────────────────────────── */
const factions40k = [
  "Space Marines", "Chaos Space Marines", "Necrons", "Aeldari",
  "Orks", "Tyranids", "Death Guard", "Thousand Sons",
  "Adeptus Mechanicus", "Astra Militarum", "T'au Empire", "Drukhari",
];

const paintOptions = ["Base Coat Only", "Battle Ready", "Pro Painted", "Studio Quality", "Golden Daemon Level"];
const systemOptions = ["Warhammer 40,000", "Age of Sigmar", "The Old World", "Horus Heresy"];

/* ─── Section wrapper ─────────────────────────────────────── */
function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ width: "5px", height: "1.25rem", background: "var(--accent-primary)", borderRadius: "999px", display: "inline-block", flexShrink: 0 }} />
        {title}
      </h3>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
      {children}
    </label>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function ListArmyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("Warhammer 40,000");
  const [selectedPaint, setSelectedPaint] = useState("");
  const [dailyRate, setDailyRate] = useState(15);
  const [replacementValue, setReplacementValue] = useState(500);
  const [dragOver, setDragOver] = useState(false);
  const [mockPhotos, setMockPhotos] = useState(2); // simulate 2 photos already added
  const [unitsText, setUnitsText] = useState("");
  const [points, setPoints] = useState(2000);

  const weeklyRate = Math.round(dailyRate * 5.5);
  const platformFeeRate = 0.15;
  const estimatedMonthly = Math.round(dailyRate * 8 * (1 - platformFeeRate));

  return (
    <>
      {/* ── Page Header ── */}
      <section style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)", padding: "7rem 1.5rem 0" }}>
        <div className="container">
          <div className="section-label" style={{ marginBottom: "1rem" }}>
            <MedalIcon size={13} color="var(--color-orange-300)" />
            <span>For Collectors</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", marginBottom: "0.5rem" }}>
            List Your <span className="gradient-text">Army</span>
          </h1>
          <p style={{ maxWidth: "560px", marginBottom: "0" }}>
            Turn your shelf queens into passive income. Setup takes about 5 minutes.
          </p>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "0", marginTop: "2rem", overflowX: "auto", paddingBottom: "0" }}>
            {steps.map((step, idx) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => setCurrentStep(step.num)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    padding: "0.875rem 1.5rem",
                    background: "none",
                    border: "none",
                    borderBottom: currentStep === step.num ? "2px solid var(--accent-primary)" : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-sans)",
                    marginBottom: "-1px",
                  }}
                >
                  <span
                    style={{
                      width: "24px", height: "24px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
                      background: step.num < currentStep ? "var(--accent-primary)" : step.num === currentStep ? "var(--accent-glow)" : "var(--bg-card)",
                      border: step.num === currentStep ? "1.5px solid var(--accent-primary)" : step.num < currentStep ? "none" : "1.5px solid var(--border-card)",
                      color: step.num < currentStep ? "white" : step.num === currentStep ? "var(--color-orange-300)" : "var(--text-muted)",
                    }}
                  >
                    {step.num < currentStep ? <CheckIcon size={12} color="white" /> : step.num}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: currentStep === step.num ? 600 : 400, color: currentStep === step.num ? "var(--text-primary)" : "var(--text-muted)" }}>
                    {step.label}
                  </span>
                </button>
                {idx < steps.length - 1 && (
                  <div style={{ width: "2rem", height: "1px", background: "var(--border-subtle)", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2.5rem", alignItems: "start" }}>

            {/* ── Form Area ── */}
            <div>

              {/* STEP 1: Army Details */}
              {currentStep === 1 && (
                <>
                  <FormSection title="Game System & Faction">
                    <div style={{ marginBottom: "1.25rem" }}>
                      <Label>Game System</Label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {systemOptions.map((s) => (
                          <button key={s} onClick={() => setSelectedSystem(s)} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: selectedSystem === s ? "1.5px solid var(--accent-primary)" : "1.5px solid var(--border-card)", background: selectedSystem === s ? "var(--accent-glow)" : "var(--bg-secondary)", color: selectedSystem === s ? "var(--color-orange-300)" : "var(--text-muted)", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all var(--transition-fast)" }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Faction</Label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {factions40k.map((f) => (
                          <button key={f} onClick={() => setSelectedFaction(f)} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: selectedFaction === f ? "1.5px solid var(--accent-primary)" : "1.5px solid var(--border-card)", background: selectedFaction === f ? "var(--accent-glow)" : "var(--bg-secondary)", color: selectedFaction === f ? "var(--color-orange-300)" : "var(--text-muted)", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all var(--transition-fast)" }}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </FormSection>

                  <FormSection title="Listing Details">
                    <div style={{ marginBottom: "1.25rem" }}>
                      <Label>Listing Title</Label>
                      <input className="input" type="text" placeholder='e.g. "Ultramarines 2,000pt Assault Force"' defaultValue="" />
                    </div>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <Label>Description</Label>
                      <textarea className="input" rows={5} placeholder="Describe the army — detachment, key units, competitive viability, how it's stored and transported..." style={{ resize: "vertical", lineHeight: 1.7 }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <Label>Total Points</Label>
                        <input className="input" type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} min={500} max={10000} step={50} />
                      </div>
                      <div>
                        <Label>Paint Quality</Label>
                        <select className="input" value={selectedPaint} onChange={(e) => setSelectedPaint(e.target.value)} style={{ cursor: "pointer" }}>
                          <option value="">Select quality…</option>
                          {paintOptions.map((q) => <option key={q}>{q}</option>)}
                        </select>
                      </div>
                    </div>
                  </FormSection>
                </>
              )}

              {/* STEP 2: Photos & Models */}
              {currentStep === 2 && (
                <>
                  <FormSection title="Army Photos">
                    <p style={{ fontSize: "0.9rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                      Upload at least 3 photos — full army shot, close-ups of key units, and the storage case. These are used as condition baseline.
                    </p>

                    {/* Upload zone */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={() => { setDragOver(false); setMockPhotos((p) => Math.min(p + 1, 8)); }}
                      onClick={() => setMockPhotos((p) => Math.min(p + 1, 8))}
                      style={{
                        border: `2px dashed ${dragOver ? "var(--accent-primary)" : "var(--border-card)"}`,
                        borderRadius: "1rem",
                        padding: "2.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        background: dragOver ? "var(--accent-glow)" : "var(--bg-secondary)",
                        transition: "all var(--transition-fast)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <UploadIcon size={32} color={dragOver ? "var(--accent-primary)" : "var(--text-muted)"} />
                      <p style={{ margin: "0.75rem 0 0.25rem", fontWeight: 600, color: dragOver ? "var(--color-orange-300)" : "var(--text-secondary)" }}>
                        Drop photos here or click to browse
                      </p>
                      <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-muted)" }}>JPG, PNG up to 20MB each</p>
                    </div>

                    {/* Mock photo grid */}
                    {mockPhotos > 0 && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.625rem" }}>
                        {Array.from({ length: mockPhotos }).map((_, i) => (
                          <div key={i} style={{ aspectRatio: "1", borderRadius: "0.5rem", background: `linear-gradient(135deg, rgba(59,130,246,${0.08 + i * 0.02}), var(--bg-card))`, border: "1px solid var(--border-card)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                            <svg width={32} height={32} viewBox="0 0 64 64" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                              <circle cx="32" cy="14" r="6" />
                              <path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z" />
                            </svg>
                            <button onClick={(e) => { e.stopPropagation(); setMockPhotos((p) => Math.max(0, p - 1)); }} style={{ position: "absolute", top: "4px", right: "4px", width: "20px", height: "20px", borderRadius: "50%", background: "rgba(0,0,0,0.65)", border: "none", color: "white", cursor: "pointer", fontSize: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)" }}>×</button>
                          </div>
                        ))}
                        <div onClick={() => setMockPhotos((p) => Math.min(p + 1, 8))} style={{ aspectRatio: "1", borderRadius: "0.5rem", background: "var(--bg-secondary)", border: "2px dashed var(--border-card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <PlusIcon size={24} color="var(--text-muted)" />
                        </div>
                      </div>
                    )}
                  </FormSection>

                  <FormSection title="Unit Roster">
                    <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
                      List each unit included. Renters use this to confirm they have the right army for their list.
                    </p>
                    <textarea
                      className="input"
                      rows={8}
                      placeholder={"Marneus Calgar (Primaris) — Warlord\nChief Librarian Tigurius\n2× Intercessor Squad (10ea)\nTerminator Assault Squad (5 models)\n..."}
                      value={unitsText}
                      onChange={(e) => setUnitsText(e.target.value)}
                      style={{ resize: "vertical", lineHeight: 1.8, fontFamily: "var(--font-sans)" }}
                    />
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.5rem", marginBottom: 0 }}>
                      One unit per line. Include quantities and model counts.
                    </p>
                  </FormSection>
                </>
              )}

              {/* STEP 3: Pricing */}
              {currentStep === 3 && (
                <>
                  <FormSection title="Daily Rate">
                    <p style={{ fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                      Set your daily rental rate. The platform takes a <strong style={{ color: "var(--text-primary)" }}>15% service fee</strong> on each booking.
                    </p>

                    <div style={{ marginBottom: "1.75rem" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        <span style={{ fontSize: "3rem", fontWeight: 900, color: "var(--text-primary)" }}>${dailyRate}</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "1rem" }}>/ day</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        step={1}
                        value={dailyRate}
                        onChange={(e) => setDailyRate(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--accent-primary)", cursor: "pointer" }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                        <span>$5/day</span>
                        <span>$100/day</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                      {[
                        { label: "Daily rate", value: `$${dailyRate}` },
                        { label: "Auto weekly rate", value: `$${weeklyRate}` },
                        { label: "Est. monthly payout", value: `$${estimatedMonthly}` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "0.75rem", padding: "1rem", textAlign: "center" }}>
                          <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--text-primary)" }}>{value}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </FormSection>

                  <FormSection title="Replacement Value">
                    <p style={{ fontSize: "0.9rem", marginBottom: "1.25rem" }}>
                      The full retail replacement cost of your army. This amount is <strong style={{ color: "var(--text-primary)" }}>held as a security deposit</strong> via Stripe and released automatically when the army is returned intact.
                    </p>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <Label>Replacement Value ($)</Label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontWeight: 600 }}>$</span>
                        <input className="input" type="number" value={replacementValue} onChange={(e) => setReplacementValue(Number(e.target.value))} min={100} max={10000} step={50} style={{ paddingLeft: "2rem" }} />
                      </div>
                    </div>

                    <div style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "0.75rem", padding: "1rem", display: "flex", gap: "0.75rem" }}>
                      <ShieldCheckIcon size={18} color="var(--color-orange-400)" />
                      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        Be conservative — use current GW retail prices for all models in the army. The deposit is your protection against damage or loss.
                      </p>
                    </div>
                  </FormSection>

                  <FormSection title="Availability Blackout Dates">
                    <p style={{ fontSize: "0.9rem", marginBottom: "1.25rem" }}>
                      Block out dates when the army is unavailable (conventions, your own games, etc.)
                    </p>
                    <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" }}>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "0 0 1rem" }}>Calendar date picker (coming in full build)</p>
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                        {["Apr 5–7", "Apr 19–22", "May 10"].map((date) => (
                          <span key={date} style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "var(--color-orange-300)", padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8125rem" }}>{date}</span>
                        ))}
                        <span style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", color: "var(--text-muted)", padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8125rem", cursor: "pointer" }}>+ Add dates</span>
                      </div>
                    </div>
                  </FormSection>
                </>
              )}

              {/* STEP 4: Review & Publish */}
              {currentStep === 4 && (
                <>
                  <FormSection title="Review Your Listing">
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                      <div style={{ width: "80px", height: "80px", borderRadius: "0.75rem", background: "linear-gradient(135deg, rgba(59,130,246,0.12), var(--bg-secondary))", border: "1px solid rgba(59,130,246,0.25)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width={40} height={40} viewBox="0 0 64 64" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="32" cy="14" r="6" />
                          <path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>
                          {selectedFaction || "Space Marines"} · {points}pts
                        </div>
                        <div style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: "0.375rem" }}>
                          {selectedFaction || "Space Marines"} {points}pt Army
                        </div>
                        <span className="badge badge-orange">{selectedPaint || "Pro Painted"}</span>
                      </div>
                    </div>

                    {[
                      { label: "Daily Rate", val: `$${dailyRate} / day` },
                      { label: "Weekly Rate", val: `$${weeklyRate} / week` },
                      { label: "Deposit Hold", val: `$${replacementValue}` },
                      { label: "Platform Fee", val: "15% per booking" },
                    ].map(({ label, val }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "0.625rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
                        <span style={{ color: "var(--text-muted)" }}>{label}</span>
                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{val}</span>
                      </div>
                    ))}
                  </FormSection>

                  <FormSection title="Hosting Agreement">
                    <p style={{ fontSize: "0.9rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                      By publishing this listing you confirm that you own the army, that all photos accurately represent its current condition, and that you agree to the War-Rent hosting terms.
                    </p>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginTop: "0.2rem", accentColor: "var(--accent-primary)", width: "16px", height: "16px", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        I confirm I own this army, the photos are accurate, and I agree to the{" "}
                        <Link href="#" style={{ color: "var(--color-orange-400)", textDecoration: "underline" }}>hosting terms & conditions</Link>.
                      </span>
                    </label>
                  </FormSection>

                  <button className="btn btn-primary btn-lg" style={{ width: "100%", marginBottom: "0.75rem" }}>
                    Publish Listing →
                  </button>
                  <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0 }}>
                    Your listing will be reviewed within 24 hours before going live.
                  </p>
                </>
              )}

              {/* Nav buttons */}
              {currentStep < 4 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                  {currentStep > 1 ? (
                    <button className="btn btn-secondary" onClick={() => setCurrentStep((s) => s - 1)}>← Back</button>
                  ) : <div />}
                  <button className="btn btn-primary" onClick={() => setCurrentStep((s) => s + 1)}>
                    Continue →
                  </button>
                </div>
              )}
            </div>

            {/* ── Right Sidebar ── */}
            <div style={{ position: "sticky", top: "5.5rem" }}>
              {/* Earnings estimator */}
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-accent)", marginBottom: "1.25rem" }}>
                  Earnings Estimate
                </h3>
                <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text-primary)" }}>${estimatedMonthly}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>est. / month at 8 rental days</div>
                </div>
                <hr className="divider" style={{ marginBottom: "1rem" }} />
                {[
                  { label: "Your daily rate", val: `$${dailyRate}` },
                  { label: "Avg rental length", val: "4.2 days" },
                  { label: "Platform cut", val: "15%" },
                  { label: "You keep", val: `$${Math.round(dailyRate * 0.85)} / day` },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.625rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Trust info */}
              <div className="card" style={{ padding: "1.25rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-accent)", marginBottom: "1rem" }}>
                  Host Protections
                </h3>
                {[
                  { Icon: ShieldCheckIcon, label: "Full deposit held via Stripe", sub: "Equal to army replacement value" },
                  { Icon: CheckCircleIcon, label: "Identity-verified renters only", sub: "All renters pass Stripe Identity" },
                  { Icon: PackageIcon, label: "Pre-paid shipping both ways", sub: "Shippo labels auto-generated" },
                ].map(({ Icon, label, sub }) => (
                  <div key={label} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                    <Icon size={18} color="var(--color-orange-400)" />
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}>{label}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
