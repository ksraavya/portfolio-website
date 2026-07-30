"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "Tell me about Sraavya's cybercrime work at I4C",
  "What is her favorite AI stack?",
  "Is she available for hire?",
  "What's her competitive programming rating?",
];

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hey! I'm Sraavya's AI twin 🤖 I know everything about her projects, tech stack, and experience. What do you want to know?",
  },
];

export default function ChatModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ensure client-side mounting for Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen || !mounted) return null;

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Oops, brain short-circuited... try asking again!" },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error! Make sure server is reachable." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999, /* Top-most layer above all sections & navbar */
        background: "rgba(3, 7, 18, 0.92)", /* Solid dark base to completely obscure content beneath */
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulseGlow { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* Main Glass Modal */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "85vh",
          background: "#080c18", /* Opaque surface */
          border: "1px solid rgba(139, 92, 246, 0.35)",
          borderRadius: "24px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 60px rgba(139, 92, 246, 0.2)",
          position: "relative",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: "1.25rem 2rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.02)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Sraavya's AI Twin <span style={{ fontSize: "0.75rem", color: "var(--accent-bright)" }}>✨</span>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                }}
              >
                System Instruction Loaded // Trained on portfolio context
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages(INITIAL_MESSAGES);
              setInput("");
              onClose();
            }}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              borderRadius: "10px",
              padding: "0.4rem 0.8rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            ESC ✕
          </button>
        </div>

        {/* Conversation Stream */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {messages.map((m, index) => {
            const isUser = m.role === "user";
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "1rem 1.25rem",
                    borderRadius: isUser ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                    background: isUser
                      ? "var(--accent, #8b5cf6)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: isUser
                      ? "none"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    fontFamily: "var(--font-body)",
                    boxShadow: isUser
                      ? "0 4px 15px rgba(139, 92, 246, 0.3)"
                      : "0 2px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  padding: "0.85rem 1.25rem",
                  borderRadius: "18px 18px 18px 2px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "var(--accent-bright)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  animation: "pulseGlow 1.2s infinite",
                }}
              >
                AI Twin is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions */}
        {messages.length < 3 && (
          <div
            style={{
              padding: "0 2rem 1rem",
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "999px",
                  background: "rgba(139, 92, 246, 0.12)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  color: "var(--accent-bright)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.12)";
                }}
              >
                + {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div
          style={{
            padding: "1.25rem 2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            background: "#050812",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            style={{ display: "flex", gap: "0.75rem" }}
          >
            <input
              type="text"
              placeholder="Ask me anything about Sraavya..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "0.85rem 1.25rem",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                padding: "0.85rem 1.5rem",
                borderRadius: "12px",
                background: "var(--accent, #8b5cf6)",
                border: "none",
                color: "#fff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              SEND →
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Render directly to document.body via Portal to escape all local CSS stacking contexts
  return createPortal(modalContent, document.body);
}