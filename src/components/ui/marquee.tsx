import React from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  className,
  pauseOnHover = false,
  reverse = false,
  style,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { pauseOnHover?: boolean, reverse?: boolean }) {
  return (
    <div
      {...props}
      style={{ gap: "var(--gap, 1rem)", ...style }}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
