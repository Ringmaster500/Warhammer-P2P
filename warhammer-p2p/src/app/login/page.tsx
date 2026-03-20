"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoSwordIcon } from "@/components/Icons";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Mock: simulate login, then redirect to dashboard
    setTimeout(() => {
      setLoading(false);
      if (email === "" || password === "") {
        setError("Please fill in all fields.");
        return;
      }
      // Mock success — store in sessionStorage so navbar can detect
      sessionStorage.setItem("wr_user", JSON.stringify({ name: "GrimDarkGary", email, role: "host" }));
      window.location.href = "/dashboard";
    }, 1200);
  }

  return (
    <>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        background: "var(--surface-dim)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "400px",
          background: "radial-gradient(ellipse, rgba(250,105,0,0.05), transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "2.5rem" }}>
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "2.5rem", height: "2.5rem",
            background: "linear-gradient(135deg, var(--primary), var(--on-primary-container))",
            borderRadius: "0.125rem",
            boxShadow: "0 0 24px var(--glow-orange)",
          }}>
            <LogoSwordIcon size={16} color="white" />
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.025em" }}>
            War<span style={{ color: "var(--on-primary-container)" }}>-Rent</span>
          </span>
        </Link>

        {/* Card */}
        <div className="card" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem", overflow: "visible" }}>
          <div style={{ marginBottom: "2rem" }}>
            <div className="section-tag" style={{ marginBottom: "1rem" }}>Commander Authentication</div>
            <h1 style={{ fontSize: "1.875rem", marginBottom: "0.5rem" }}>Welcome back</h1>
            <p style={{ fontSize: "0.9rem", margin: 0 }}>Sign in to your War-Rent account to access your arsenal.</p>
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

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface-variant)", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                EMAIL ADDRESS
              </label>
              <input
                id="login-email"
                className="input"
                type="email"
                placeholder="commander@warrent.gg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface-variant)", letterSpacing: "0.05em" }}>
                  PASSWORD
                </label>
                <Link href="/forgot-password" style={{ fontSize: "0.8125rem", color: "var(--on-primary-container)", opacity: 0.8 }}>
                  Forgot?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  className="input"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--outline)", lineHeight: 0 }}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: "100%", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Authenticating…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: "1.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--ghost-border)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--outline)", letterSpacing: "0.08em" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "var(--ghost-border)" }} />
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--outline)" }}>
            No account?{" "}
            <Link href="/register" style={{ color: "var(--on-primary-container)", fontWeight: 600 }}>
              Create one →
            </Link>
          </p>
        </div>

        <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "var(--outline)", textAlign: "center", maxWidth: "380px", lineHeight: 1.6 }}>
          By signing in you agree to the War-Rent{" "}
          <Link href="/terms" style={{ color: "var(--outline)", textDecoration: "underline", opacity: 0.8 }}>Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" style={{ color: "var(--outline)", textDecoration: "underline", opacity: 0.8 }}>Privacy Policy</Link>.
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
