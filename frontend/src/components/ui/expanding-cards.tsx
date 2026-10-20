"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from "lucide-react";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  images?: string[];
  liveUrl?: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<HTMLDivElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number>(defaultActiveIndex);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col md:flex-row gap-3 h-[720px] md:h-[580px] select-none",
          className
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <ExpandingCardItem
              key={item.id}
              item={item}
              index={index}
              isActive={isActive}
              onActivate={() => setActiveIndex(index)}
            />
          );
        })}
      </div>
    );
  }
);
ExpandingCards.displayName = "ExpandingCards";

const getAssetUrl = (url: string) => {
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
};

function ExpandingCardItem({
  item,
  index,
  isActive,
  onActivate,
}: {
  item: CardItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const images = item.images && item.images.length > 0 ? item.images : [item.imgSrc];
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Auto-advance slideshow ONLY when expanded and has multiple images, pause when modal is open
  React.useEffect(() => {
    if (!isActive || images.length <= 1 || isModalOpen) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isActive, images.length, isModalOpen]);

  // Reset to first slide and close modal when card collapses
  React.useEffect(() => {
    if (!isActive) {
      setSlideIndex(0);
      setIsModalOpen(false);
    }
  }, [isActive]);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % images.length);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={onActivate}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ease-out group/card",
          isActive
            ? "flex-[6] md:flex-[5] border-[#c8a96b]/60 shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
            : "flex-1 border-white/10 hover:border-white/25 hover:bg-white/[0.02]"
        )}
      >
        {/* Background Images */}
        <div className="absolute inset-0 w-full h-full bg-[#0a0a09] overflow-hidden">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={getAssetUrl(img)}
              alt={`${item.title} - ${idx + 1}`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out",
                isActive && idx === slideIndex
                  ? "opacity-100 scale-100 filter-none"
                  : !isActive && idx === 0
                  ? "opacity-60 scale-105 filter grayscale contrast-125"
                  : "opacity-0 scale-105 pointer-events-none"
              )}
            />
          ))}
        </div>

        {/* Subtle overlay gradients */}
        {isActive ? (
          // Active: very light gradient so the website image is bright and crisp
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20 pointer-events-none" />
        ) : (
          // Collapsed: dark glass tint to keep collapsed tabs focused
          <div className="absolute inset-0 bg-black/60 hover:bg-black/45 transition-colors pointer-events-none" />
        )}

        {/* ============================================================ */}
        {/* EXPANDED VIEW CONTENT (Clean, high-visibility, with slideshow) */}
        {/* ============================================================ */}
        {isActive ? (
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 z-10">
            {/* Top Header Bar: Slide badges & controls */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[#ddc084] font-mono text-[11px] tracking-widest uppercase">
                  {String(index + 1).padStart(2, "0")} / SELECTED WORK
                </span>

                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8a96b] text-[#0a0a09] font-mono font-bold text-[11px] tracking-wider uppercase hover:bg-[#ddc084] transition-colors shadow-md"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                  </a>
                )}

                {/* Expand Image / Fullscreen Pop-up Button */}
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#c8a96b]/40 text-[#ddc084] font-mono text-[11px] tracking-wider uppercase hover:bg-[#c8a96b] hover:text-[#0a0a09] transition-all shadow-md group/zoom"
                  title="Expand picture to see clearly"
                  aria-label="Expand picture"
                >
                  <Maximize2 className="w-3 h-3 stroke-[2] transition-transform duration-300 group-hover/zoom:scale-110" />
                  <span className="hidden sm:inline">View Full</span>
                </button>
              </div>

              {/* Slideshow Controls if multiple images exist */}
              {images.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block font-mono text-[11px] text-white/70 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {slideIndex + 1} / {images.length}
                  </span>

                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full p-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-7 h-7 rounded-full hover:bg-[#c8a96b] text-white hover:text-black flex items-center justify-center transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-7 h-7 rounded-full hover:bg-[#c8a96b] text-white hover:text-black flex items-center justify-center transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Area: Title, Description & Slide Dots */}
            <div className="space-y-3 max-w-2xl bg-black/40 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#c8a96b]">{item.icon}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="sm:hidden p-2 rounded-lg bg-black/60 border border-white/15 text-[#ddc084] hover:bg-[#c8a96b] hover:text-[#0a0a09] transition-colors"
                  aria-label="Expand picture"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Slideshow Dot Indicators */}
              {images.length > 1 && (
                <div className="pt-2 flex items-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlideIndex(i);
                      }}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === slideIndex
                          ? "w-6 bg-[#c8a96b]"
                          : "w-2 bg-white/30 hover:bg-white/60"
                      )}
                      aria-label={`Jump to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
        /* ============================================================ */
        /* COLLAPSED VIEW (Strictly vertical on desktop, minimal on mobile) */
        /* ============================================================ */
        <div className="absolute inset-0 flex flex-col justify-between items-center p-4 md:py-8 z-10 pointer-events-none">
          {/* Top Index */}
          <span className="font-mono text-xs text-[#c8a96b] font-semibold">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Desktop Vertical Title */}
          <div className="hidden md:flex flex-1 items-center justify-center my-4 overflow-hidden">
            <h4 className="[writing-mode:vertical-lr] rotate-180 uppercase tracking-widest text-xs font-mono text-white/70 whitespace-nowrap">
              {item.title.split("—")[0].trim()}
            </h4>
          </div>

          {/* Mobile Horizontal Title */}
          <div className="md:hidden flex items-center justify-center text-center">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider line-clamp-1">
              {item.title.split("—")[0].trim()}
            </span>
          </div>

          {/* Bottom Icon */}
          <div className="text-white/40 group-hover:text-[#c8a96b] transition-colors">
            {item.icon}
          </div>
        </div>
      )}
    </div>

    {/* Modal Popup to expand picture and see clearly */}
    {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} full picture view`}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 md:p-10 animate-in fade-in duration-300 select-none"
          onClick={handleCloseModal}
        >
          {/* Top Bar with title, counters, and controls */}
          <div
            className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-black/80 border border-[#c8a96b]/40 text-[#ddc084] font-mono text-xs tracking-wider uppercase backdrop-blur-md">
                {String(index + 1).padStart(2, "0")} / {item.title.split("—")[0].trim()}
              </span>
              {images.length > 1 && (
                <span className="font-mono text-xs text-white/80 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                  {slideIndex + 1} / {images.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c8a96b] text-[#0a0a09] font-mono font-bold text-xs tracking-wider uppercase hover:bg-[#ddc084] transition-colors shadow-lg"
                >
                  <span>Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              )}
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-black/80 border border-white/20 hover:border-[#c8a96b] text-white hover:text-[#c8a96b] flex items-center justify-center transition-all hover:scale-105"
                aria-label="Close full picture"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Previous Image Button (Desktop & Mobile) */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/75 border border-white/20 hover:border-[#c8a96b] text-white hover:text-[#0a0a09] hover:bg-[#c8a96b] flex items-center justify-center transition-all shadow-2xl hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
          )}

          {/* Next Image Button (Desktop & Mobile) */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/75 border border-white/20 hover:border-[#c8a96b] text-white hover:text-[#0a0a09] hover:bg-[#c8a96b] flex items-center justify-center transition-all shadow-2xl hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          )}

          {/* Main Full Picture Display */}
          <div
            className="relative max-w-6xl max-h-[82vh] w-full h-full flex items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-[#0a0a09]/80 shadow-[0_20px_70px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getAssetUrl(images[slideIndex])}
              alt={`${item.title} full view - ${slideIndex + 1}`}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Bottom Thumbnail Strip / Dots in Modal */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlideIndex(i)}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    i === slideIndex
                      ? "w-8 h-2 bg-[#c8a96b]"
                      : "w-2 h-2 bg-white/30 hover:bg-white/70"
                  )}
                  aria-label={`View slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
