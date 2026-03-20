"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoSwordIcon, CheckCircleIcon } from "@/components/Icons";

function EyeIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const perks = [
  { label: "Deploy pro-painted armies this weekend" },
  { label: "Full deposit protection on every rental" },
  { label: "Identity-verified community only" },
  { label: "Pre-paid shipping both ways" },
];

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"renter" | "host" | "both">("renter");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!agreed) { setError("You must agree to the Terms of Service to continue."); return; }
    if (!username || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("wr_user", JSON.stringify({ name: username, email, role }));
      window.location.href = "/dashboard";
    }, 1400);
  }

  return (
    <>
      <div style={{
        minHeight: "100vh", display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "var(--surface-dim)",
        position: "relative",
      }}>
        {/* Left: value prop */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(3rem, 6vw, 5rem)",
          background: "linear-gradient(160deg, rgba(250,105,0,0.05) 0%, var(--surface-dim) 60%)",
          borderRight: "1px solid var(--ghost-border)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-100px", left: "-100px",
            width: "400px", height: "400px",
            background: "radial-gradient(ellipse, rgba(250,105,0,0.08), transparent 70%)",
            pointerEvents: "none",
          }} />
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "4rem" }}>
            <span style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "2.25rem", height: "2.25rem",
              background: "linear-gradient(135deg, var(--primary), var(--on-primary-container))",
              borderRadius: "0.125rem", boxShadow: "0 0 20px var(--glow-orange)",
            }}>
              <LogoSwordIcon size={14} color="white" />
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.025em" }}>
              War<span style={{ color: "var(--on-primary-container)" }}>-Rent</span>
            </span>
          </Link>

          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>The Tactical Armoury</div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.5rem", lineHeight: 1.05 }}>
            Play the game.<br />
            <span className="gradient-text">Skip the grind.</span>
          </h1>
          <p style={{ fontSize: "1rem", marginBottom: "2.5rem", maxWidth: "380px" }}>
            Join thousands of commanders who rent battle-ready armies — no painting, no storage, no drama.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {perks.map((p) => (
              <li key={p.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "0.125rem",
                  background: "rgba(250,105,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <CheckCircleIcon size={14} color="var(--on-primary-container)" />
                </div>
                <span style={{ fontSize: "0.9375rem", color: "var(--on-surface-variant)" }}>{p.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "clamp(2rem, 5vw, 4rem)",
          overflowY: "auto",
        }}>
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <div style={{ marginBottom: "2rem" }}>
              <div className="section-tag" style={{ marginBottom: "1rem" }}>New Recruit</div>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.375rem" }}>Create your account</h2>
              <p style={{ fontSize: "0.9rem", margin: 0 }}>Free to join. No credit card required.</p>
            </div>

            {/* Role selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface-variant)", marginBottom: "0.625rem", letterSpacing: "0.05em" }}>
                I WANT TO
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                {(["renter", "host", "both"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      padding: "0.625rem 0.5rem",
                      borderRadius: "0.125rem",
                      border: role === r ? "1.5px solid var(--on-primary-container)" : "1.5px solid var(--ghost-border)",
                      background: role === r ? "rgba(250,105,0,0.10)" : "var(--surface-container)",
                      color: role === r ? "var(--on-primary-container)" : "var(--outline)",
                      fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer",
                      fontFamily: "var(--font-body)", textTransform: "capitalize",
                      transition: "all var(--t-fast)",
                    }}
                  >
                    {r === "both" ? "Both" : r === "renter" ? "Rent" : "Host"}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "0.125rem", padding: "0.75rem 1rem", marginBottom: "1.25rem",
                fontSize: "0.875rem", color: "#f87171",
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface-variant)", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                  USERNAME
                </label>
                <input id="reg-username" className="input" type="text" placeholder="GrimDarkGary" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface-variant)", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                  EMAIL ADDRESS
                </label>
                <input id="reg-email" className="input" type="email" placeholder="commander@warrent.gg" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface-variant)", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                  PASSWORD
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="reg-password"
                    className="input"
                    type={showPass ? "text" : "password"}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    style={{ paddingRight: "3rem" }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--outline)", lineHeight: 0 }} aria-label="Toggle password">
                    {showPass ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                  </button>
                </div>
                {/* Strength bar */}
                {password.length > 0 && (
                  <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.25rem" }}>
                    {[0,1,2,3].map((i) => {
                      const strength = password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
                      return (
                        <div key={i} style={{ flex: 1, height: "3px", borderRadius: "999px", background: i < strength ? (strength < 2 ? "#ef4444" : strength < 3 ? "#f97316" : "#22c55e") : "var(--ghost-border)", transition: "background var(--t-fast)" }} />
                      );
                    })}
                  </div>
                )}
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", marginTop: "0.25rem" }}>
                <div
                  onClick={() => setAgreed(!agreed)}
                  style={{
                    width: "18px", height: "18px", borderRadius: "0.125rem", flexShrink: 0, marginTop: "1px",
                    background: agreed ? "var(--on-primary-container)" : "var(--surface-container)",
                    border: agreed ? "1.5px solid var(--on-primary-container)" : "1.5px solid var(--outline-variant)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all var(--t-fast)", cursor: "pointer",
                  }}
                >
                  {agreed && (
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)", lineHeight: 1.6 }}>
                  I agree to the{" "}
                  <Link href="/terms" style={{ color: "var(--on-primary-container)" }}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" style={{ color: "var(--on-primary-container)" }}>Privacy Policy</Link>
                </span>
              </label>

              <button
                id="reg-submit"
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
                style={{ width: "100%", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    Creating account…
                  </span>
                ) : "Create Account →"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--outline)" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "var(--on-primary-container)", fontWeight: 600 }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="borderRight"] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
