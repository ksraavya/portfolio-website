"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/portfolio-data";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulating a form submission delay
    // You can hook this up to Formspree, Resend, or Web3Forms later!
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "0 0 8rem",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.75rem",
              color: "var(--accent-bright, #a78bfa)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            // INITIATE CONNECTION
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Get In Touch
          </h2>
        </div>

        {/* Layout Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left Column: Direct Links & Status */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Status Card */}
            <div
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.025)",
                backdropFilter: "blur(16px)",
                padding: "1.75rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono, monospace)",
                  color: "#10b981",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "999px",
                  padding: "0.25rem 0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
                OPEN TO OPPORTUNITIES
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 0.5rem",
                }}
              >
                Let’s build something together.
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                }}
              >
                Whether you want to discuss AI models, cybercrime forensic pipelines, or tech internships — my inbox is always open.
              </p>
            </div>

            {/* Direct Channels Card */}
            <div
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.025)",
                backdropFilter: "blur(16px)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.68rem",
                  color: "rgba(255, 255, 255, 0.35)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                DIRECT CHANNELS
              </p>

              {/* Email Copy Box */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  {siteConfig.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.7rem",
                    color: copied ? "#10b981" : "var(--accent-bright, #a78bfa)",
                    background: "rgba(139, 92, 246, 0.12)",
                    border: "1px solid rgba(139, 92, 246, 0.25)",
                    borderRadius: "6px",
                    padding: "0.3rem 0.6rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? "COPIED! ✓" : "COPY"}
                </button>
              </div>

              {/* Social Link Buttons */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.8rem",
                    padding: "0.65rem",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.75)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                  }}
                >
                  ↗ GitHub
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.8rem",
                    padding: "0.65rem",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.75)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                  }}
                >
                  ↗ LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Contact Form */}
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.025)",
              backdropFilter: "blur(16px)",
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {status === "success" ? (
              <div
                style={{
                  padding: "3rem 1.5rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid #10b981",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    fontSize: "1.35rem",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Message Transmitted
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    maxWidth: "320px",
                    margin: 0,
                  }}
                >
                  Thanks for reaching out! I'll review your message and get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    marginTop: "1rem",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    color: "var(--accent-bright, #a78bfa)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.7rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent, #8b5cf6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.7rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent, #8b5cf6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.7rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What are you looking to build?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent, #8b5cf6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.85rem",
                    borderRadius: "10px",
                    background: "var(--accent, #8b5cf6)",
                    border: "none",
                    color: "#ffffff",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                    transition: "all 0.2s",
                    opacity: status === "submitting" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "submitting") {
                      e.currentTarget.style.background = "var(--accent-bright, #a78bfa)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "submitting") {
                      e.currentTarget.style.background = "var(--accent, #8b5cf6)";
                    }
                  }}
                >
                  {status === "submitting" ? "TRANSMITTING..." : "SEND MESSAGE →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}