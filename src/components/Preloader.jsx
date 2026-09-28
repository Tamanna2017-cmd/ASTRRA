import React, { useEffect, useRef, useState } from "react";
import { createPreloader } from "../animations/preloaderAnimation";
import { reducedMotion } from "../animations/animationConfig";

/**
 * Opening Intro Animation: 2x2 Halftone Grid Reveal
 *
 * 1. 2x2 Grid Layout:
 *    - Top-left: Solid light background (#f4f3ef), real bold ASTRRA wordmark asset.
 *    - Top-right: Dot-halftone pattern of the hero background image.
 *    - Bottom-left: Dot-halftone pattern continuing seamlessly from the same image.
 *    - Bottom-right: Solid light-gray background (#e8e6df), brand descriptor tagline.
 * 2. Halftone Treatment:
 *    - Monochrome dot grid (~5px step).
 *    - Dot size proportional to brightness.
 *    - One continuous picture mapped across top-right and bottom-left cells.
 * 3. Sequence:
 *    - Grid appears instantly, holds ~1.15s.
 *    - Headline ("Make your space digitally.") slides/fades up overlapping the grid.
 *    - Grid cells fade out as headline covers them.
 *    - Preloader curtain lifts, site unlocks, hero takes over (~2.35s total).
 * 4. Respects prefers-reduced-motion.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const headlineRef = useRef(null);
  const trCanvasRef = useRef(null);
  const blCanvasRef = useRef(null);

  const [hidden, setHidden] = useState(() => reducedMotion());

  useEffect(() => {
    if (reducedMotion()) {
      document.body.classList.remove("is-loading");
      onDone && onDone();
      return;
    }

    document.body.classList.add("is-loading");

    const handleRevealStart = () => {
      document.body.classList.remove("is-loading");
      onDone && onDone();
    };

    const finish = () => {
      setHidden(true);
    };

    // Preload & render halftone canvases
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/astrra-hero-bg.jpg";

    const drawHalftone = () => {
      const trCanvas = trCanvasRef.current;
      const blCanvas = blCanvasRef.current;
      if (!trCanvas || !blCanvas) return;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const step = 5;

      const cellW = W / 2;
      const cellH = H / 2;

      trCanvas.width = cellW * dpr;
      trCanvas.height = cellH * dpr;
      blCanvas.width = cellW * dpr;
      blCanvas.height = cellH * dpr;

      const ctxTR = trCanvas.getContext("2d");
      const ctxBL = blCanvas.getContext("2d");
      if (!ctxTR || !ctxBL) return;

      ctxTR.scale(dpr, dpr);
      ctxBL.scale(dpr, dpr);

      const bgColor = "#090908";
      const dotColor = "#f4f3ef";

      ctxTR.fillStyle = bgColor;
      ctxTR.fillRect(0, 0, cellW, cellH);
      ctxBL.fillStyle = bgColor;
      ctxBL.fillRect(0, 0, cellW, cellH);

      if (!img.complete || img.naturalWidth === 0) return;

      const cols = Math.ceil(W / step);
      const rows = Math.ceil(H / step);

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      // Single continuous image cover mapping across full viewport
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const screenAspect = W / H;
      let drawW, drawH, drawX, drawY;

      if (imgAspect > screenAspect) {
        drawH = H;
        drawW = H * imgAspect;
        drawX = (W - drawW) / 2;
        drawY = 0;
      } else {
        drawW = W;
        drawH = W / imgAspect;
        drawX = 0;
        drawY = (H - drawH) / 2;
      }

      offCtx.drawImage(
        img,
        drawX / step,
        drawY / step,
        drawW / step,
        drawH / step
      );
      const data = offCtx.getImageData(0, 0, cols, rows).data;

      ctxTR.fillStyle = dotColor;
      ctxBL.fillStyle = dotColor;
      const maxR = step * 0.48;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = (c + 0.5) * step;
          const gy = (r + 0.5) * step;
          const idx = (r * cols + c) * 4;
          const brightness =
            (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) /
            255;
          const radius = maxR * brightness;
          if (radius < 0.35) continue;

          // Top-right quadrant
          if (gx >= cellW && gy < cellH) {
            ctxTR.beginPath();
            ctxTR.arc(gx - cellW, gy, radius, 0, Math.PI * 2);
            ctxTR.fill();
          }
          // Bottom-left quadrant
          else if (gx < cellW && gy >= cellH) {
            ctxBL.beginPath();
            ctxBL.arc(gx, gy - cellH, radius, 0, Math.PI * 2);
            ctxBL.fill();
          }
        }
      }
    };

    if (img.complete) {
      drawHalftone();
    } else {
      img.onload = drawHalftone;
    }

    const onResize = () => {
      if (img.complete) drawHalftone();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // GSAP Intro Timeline
    const tl = createPreloader({
      root: rootRef.current,
      grid: gridRef.current,
      headline: headlineRef.current,
      onRevealStart: handleRevealStart,
      onComplete: finish,
    });

    return () => {
      window.removeEventListener("resize", onResize);
      tl && tl.kill();
      document.body.classList.remove("is-loading");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      {/* 2x2 Viewport Grid */}
      <div ref={gridRef} className="preloader__grid">
        {/* Cell 1 (Top-Left): Solid light background, bold real wordmark asset */}
        <div className="preloader__cell preloader__cell--top-left">
          <div className="preloader__wordmark-wrap">
            <img
              src="/astrra-logo.png"
              alt="ASTRRA"
              className="preloader__wordmark-img"
            />
          </div>
        </div>

        {/* Cell 2 (Top-Right): Halftone image cell */}
        <div className="preloader__cell preloader__cell--top-right preloader__cell--halftone">
          <canvas ref={trCanvasRef} className="preloader__canvas" />
        </div>

        {/* Cell 3 (Bottom-Left): Halftone image cell (seamless continuation) */}
        <div className="preloader__cell preloader__cell--bottom-left preloader__cell--halftone">
          <canvas ref={blCanvasRef} className="preloader__canvas" />
        </div>

        {/* Cell 4 (Bottom-Right): Solid light-gray background, brand descriptor */}
        <div className="preloader__cell preloader__cell--bottom-right">
          <div className="preloader__detail">
            <span className="preloader__detail-label">DIGITAL STUDIO</span>
            <p className="preloader__detail-tagline">
              ASTRRA TECH — BUILDING DIGITAL SPACES
            </p>
            <div className="preloader__detail-meta">
              <span>EST. 2026</span>
              <span className="preloader__detail-dot" aria-hidden="true" />
              <span>SYS.ONLINE</span>
            </div>
          </div>
        </div>

        {/* Hairline division lines */}
        <div className="preloader__grid-lines" aria-hidden="true">
          <div className="preloader__line-v" />
          <div className="preloader__line-h" />
        </div>
      </div>

      {/* Headline Transition Overlay (slides/fades up overlapping the grid) */}
      <div className="preloader__headline-overlay">
        <div ref={headlineRef} className="preloader__headline-card">
          <div className="preloader__headline-badge">
            <span>ASTRRA TECH</span>
            <span className="preloader__headline-dot" aria-hidden="true" />
            <span>DIGITAL STUDIO</span>
          </div>
          <h2 className="preloader__headline-title">
            <span>Make your space</span>
            <em>digitally.</em>
          </h2>
          <p className="preloader__headline-sub">BUILDING DIGITAL SPACES</p>
        </div>
      </div>
    </div>
  );
}
