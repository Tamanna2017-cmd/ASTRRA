import React, { useEffect, useState } from "react";

/**
 * Real-time Indian Standard Time (IST) clock
 * Uses native Intl.DateTimeFormat with IANA timezone "Asia/Kolkata".
 * Updates dynamically every second.
 */
export default function LiveClocks({ className = "" }) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`live-clocks ${className}`} aria-label="Indian Standard Time">
      <div className="live-clock__item">
        <span className="live-clock__dot" aria-hidden="true" />
        <span className="live-clock__label">INDIA / IST</span>
        <span className="live-clock__val">{timeStr || "--:--:-- --"}</span>
      </div>
    </div>
  );
}

