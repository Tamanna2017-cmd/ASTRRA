import React, { useEffect, useRef } from "react";
import { magnetic } from "../animations/hoverAnimations";

/**
 * Magnetic wrapper — children ease toward the cursor on hover.
 * Falls back to plain passthrough on touch devices / reduced motion.
 */
export default function Magnetic({ children, strength = 0.3, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    return magnetic(ref.current, { strength });
  }, [strength]);

  return (
    <div ref={ref} className="magnetic" {...rest}>
      {children}
    </div>
  );
}
