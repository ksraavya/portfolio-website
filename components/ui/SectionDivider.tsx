"use client";

export default function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      gap:"1.25rem", padding:"5rem 1.5rem 3.5rem",
      position:"relative", zIndex:1,
    }}>
      {/* Gradient line */}
      <div style={{
        width:"100%", maxWidth:"700px", height:"1px",
        background:"linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(6,182,212,0.8), transparent)",
        boxShadow:"0 0 12px rgba(139,92,246,0.4)",
      }}/>
      {/* Label */}
      <div style={{ display:"flex", alignItems:"center", gap:"1.25rem" }}>
        <div style={{ width:"48px", height:"1px", background:"rgba(255,255,255,0.25)" }}/>
        <span style={{
          fontFamily:"var(--font-mono)", fontSize:"0.95rem",
          fontWeight:500, color:"#fff",
          letterSpacing:"0.25em", textTransform:"uppercase",
        }}>{label}</span>
        <div style={{ width:"48px", height:"1px", background:"rgba(255,255,255,0.25)" }}/>
      </div>
    </div>
  );
}