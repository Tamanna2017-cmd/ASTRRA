import { useEffect } from "react";
import { initAnimations, gsap, ScrollTrigger, reducedMotion } from "../animations/animationConfig";

export default function RevealManager() {
  useEffect(() => {
    if (reducedMotion()) return;

    const ctx = gsap.context(() => {
      /*
       * ---------------------------------------------------------
       * 1. GENERAL SECTION REVEALS
       * ---------------------------------------------------------
       * Softer, slower movement with more travel.
       */

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            y: 70,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      /*
       * ---------------------------------------------------------
       * 2. STAGGERED CONTENT
       * ---------------------------------------------------------
       * Cards / lists enter one after another.
       */

      gsap.utils.toArray("[data-reveal-stagger]").forEach((parent) => {
        const targets = Array.from(parent.children);

        gsap.fromTo(
          targets,
          {
            autoAlpha: 0,
            y: 65,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      /*
       * ---------------------------------------------------------
       * 3. FADE-ONLY ELEMENTS
       * ---------------------------------------------------------
       */

      gsap.utils.toArray("[data-reveal-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              once: true,
            },
          }
        );
      });

      /*
       * ---------------------------------------------------------
       * 4. HORIZONTAL LINES
       * ---------------------------------------------------------
       */

      gsap.utils.toArray("[data-reveal-line]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              once: true,
            },
          }
        );
      });

      /*
       * ---------------------------------------------------------
       * 5. IMAGE REVEALS
       * ---------------------------------------------------------
       */

      gsap.utils.toArray("[data-image-reveal]").forEach((el) => {
        const image = el.querySelector("img");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        });

        tl.fromTo(
          el,
          {
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power3.inOut",
          }
        );

        if (image) {
          tl.fromTo(
            image,
            {
              scale: 1.12,
            },
            {
              scale: 1,
              duration: 1.8,
              ease: "power3.out",
            },
            0
          );
        }
      });

      /*
       * ---------------------------------------------------------
       * 6. SCROLL-LINKED PARALLAX
       * ---------------------------------------------------------
       * This is important:
       * unlike a normal reveal, this continues responding
       * while the user scrolls.
       */

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 70;

        gsap.fromTo(
          el,
          {
            y: -amount * 0.35,
          },
          {
            y: amount * 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      /*
       * ---------------------------------------------------------
       * 7. SCALE-BASED IMAGE MOTION
       * ---------------------------------------------------------
       */

      gsap.utils.toArray("[data-scale-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            scale: 1.12,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 20%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      /*
       * ---------------------------------------------------------
       * 8. EDITORIAL TEXT DRIFT
       * ---------------------------------------------------------
       * Gives larger headings a little movement instead of
       * simply fading them in.
       */

      gsap.utils.toArray("[data-editorial-drift]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 45,
          },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      /*
       * ---------------------------------------------------------
       * 9. REFRESH AFTER ALL TRIGGERS EXIST
       * ---------------------------------------------------------
       */

      ScrollTrigger.refresh();
    });

    initAnimations(() => {});

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
}