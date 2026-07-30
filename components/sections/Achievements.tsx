"use client";

import { useState } from "react";
import { achievements } from "@/lib/portfolio-data";

export default function Achievements() {
  const [filter, setFilter] = useState<"all" | "competitive" | "hackathon">("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredAchievements = achievements.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <section
      id="achievements"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "0 0 6rem",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Header & Filter Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
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
              // MILSTONES & RECOGNITION
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "#ffffff",
                margin: 0,
              }}
            >
              Achievements
            </h2>
          </div>

          {/* Filter Bar */}
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              background: "rgba(255, 255, 255, 0.03)",
              padding: "0.3rem",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            {(["all", "competitive", "hackathon"] as const).map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    padding: "0.4rem 1rem",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    background: active ? "var(--accent, #8b5cf6)" : "transparent",
                    color: active ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento/Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredAchievements.map((item, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  border: `1px solid ${
                    isHovered
                      ? "rgba(167, 139, 250, 0.35)"
                      : "rgba(255, 255, 255, 0.07)"
                  }`,
                  background: isHovered
                    ? "radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.08) 0%, rgba(10, 15, 30, 0.7) 100%)"
                    : "rgba(255, 255, 255, 0.025)",
                  backdropFilter: "blur(16px)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.25rem",
                  transition: "all 0.25s ease",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.1)"
                    : "0 4px 20px rgba(0, 0, 0, 0.2)",
                  overflow: "hidden",
                }}
              >
                {/* Accent Top Light */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg, var(--accent, #8b5cf6), var(--accent-secondary, #06b6d4), transparent)",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Top Row: Icon + Category Tag */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.65rem",
                      color: "var(--accent-bright, #a78bfa)",
                      background: "rgba(139, 92, 246, 0.12)",
                      border: "1px solid rgba(139, 92, 246, 0.25)",
                      borderRadius: "6px",
                      padding: "0.2rem 0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Main Content */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      margin: "0 0 0.5rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255, 255, 255, 0.65)",
                      lineHeight: 1.6,
                      margin: 0,
                      fontFamily: "var(--font-body, sans-serif)",
                    }}
                  >
                    {item.detail}
                  </p>
                </div>

                {/* Bottom Terminal Indicator */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.68rem",
                    color: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <span style={{ color: "var(--accent-bright, #a78bfa)" }}>
                    ✓
                  </span>
                  <span>VERIFIED RECORD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}