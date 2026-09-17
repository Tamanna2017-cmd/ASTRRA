import React from "react";
import Magnetic from "./Magnetic";

/**
 * Primary editorial button with gold fill-wipe hover.
 * variant: "gold" (filled) | "ghost" (outline)
 */
export default function Button({ href, children, variant = "ghost", arrow = true, className = "", ...rest }) {
  const Tag = href ? "a" : "button";

  return (
    <Magnetic>
      <Tag
        href={href}
        className={`btn ${variant === "gold" ? "btn--gold" : ""} ${className}`}
        {...rest}
      >
        <span>{children}</span>
        {arrow && (
          <span className="btn__arrow" aria-hidden="true">
            ↗
          </span>
        )}
      </Tag>
    </Magnetic>
  );
}
