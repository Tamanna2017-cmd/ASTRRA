import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAssetUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  const base = import.meta.env.BASE_URL || "/";
  let resolved = url;
  if (base !== "/" && !url.startsWith(base)) {
    const cleanBase = base.endsWith("/") ? base : `${base}/`;
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    resolved = `${cleanBase}${cleanUrl}`;
  }
  return encodeURI(decodeURI(resolved));
}
