import React from "react";

/**
 * Monospace arrow link with drifting arrow on hover.
 * Used for "View project", "Get in touch", footer nav, etc.
 */
export default function ArrowLink({ href = "#", children, className = "", ...rest }) {
  return (
    <a className={`arrow-link ${className}`} href={href} {...rest}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
