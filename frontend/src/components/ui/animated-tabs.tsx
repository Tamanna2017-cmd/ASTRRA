"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function AnimatedTabs({ 
  tabs, 
  defaultTab,
  onChange 
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          style={{
            position: "relative",
            padding: "8px 16px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: activeTab === tab.id ? "var(--bg)" : "var(--ink-dim)",
            transition: "color 0.3s ease",
            WebkitTapHighlightColor: "transparent",
            cursor: "pointer",
            border: "none",
            background: "transparent",
            outline: "none"
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.id) e.currentTarget.style.color = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.id) e.currentTarget.style.color = "var(--ink-dim)";
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: -1,
                backgroundColor: "var(--gold)",
                borderRadius: "20px"
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
