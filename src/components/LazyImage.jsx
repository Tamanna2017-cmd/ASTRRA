import React, { useState } from "react";

/**
 * Image with native lazy loading + graceful gold-geometric fallback
 * when no asset is present (keeps the layout premium without stock photos).
 */
export default function LazyImage({ src, alt, className = "", ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${className} ${loaded ? "is-loaded" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          {...rest}
        />
      )}
      {!loaded && (
        <div className="img-fallback" aria-hidden="true">
          <span className="img-fallback__diamond" />
        </div>
      )}
    </>
  );
}
