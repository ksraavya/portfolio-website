"use client";

const items = [
  "I read literary fiction",
  "I write for an NGO's LinkedIn",
  "I solve codeforces problems for fun (yes, genuinely)",
  "Perpetually chasing ideas too ambitious for a weekend",
];

export default function HumanStrip() {
  return (
  <section
    style={{
      position: "relative",
      zIndex: 1,
      padding: "0 1.5rem",
      marginBottom: "5rem",
    }}
  >
    <div className="container" style={{ maxWidth: "900px" }}>
      {/* psst line */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          letterSpacing: "0.05em",
          marginBottom: "0.75rem",
          paddingLeft: "1.4rem",
        }}
      >
        psst... try the keyboard 👀
      </p>

      {/* human strip */}
      <div
        style={{
          borderLeft: "2px solid var(--accent)",
          paddingLeft: "1.25rem",
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            letterSpacing: "0.03em",
            lineHeight: 1.8,
          }}
        >
          <span style={{ color: "var(--accent-bright)", marginRight: "0.5rem" }}>
            also:
          </span>
          {items.map((item, i) => (
            <span key={i}>
              <span
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                {item}
              </span>
              {i < items.length - 1 && (
                <span
                  style={{
                    color: "var(--accent)",
                    margin: "0 0.5rem",
                    opacity: 0.5,
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  </section>
);
}