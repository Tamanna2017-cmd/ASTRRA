# ASTRRA TECH — Make Your Space Digitally.

Premium, original frontend for ASTRRA TECH — a digital technology studio.
React + Vite, GSAP (ScrollTrigger), Lenis smooth scrolling.
The visual/interaction language is inspired by the editorial quality of sites
like Aspen Search — the design, content and implementation are entirely original.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Structure

```
index.html                  Vite entry (fonts, meta)
vite.config.js              Vite + React config
src/
  main.jsx                  Style layers + React root
  App.jsx                   Shell: preloader, smooth scroll, cursor, sections
  animations/               Animation architecture (no motion inside components)
    animationConfig.js      GSAP setup, shared easings, reduced-motion helpers
    textAnimations.js       fadeUp / fadeIn / revealLines / drawLine
    imageAnimations.js      imageReveal (clip curtain) / parallax / staggerReveal
    heroAnimations.js       Load sequence + hero scroll drift
    preloaderAnimation.js   Brand + counter + curtain lift
    hoverAnimations.js      Magnetic hover, arrow drift
  components/               Shared UI
    Navbar behaviors live in sections; here:
    Preloader.jsx  SmoothScroll.jsx (Lenis)  Cursor.jsx
    RevealManager.jsx  Magnetic.jsx  Button.jsx  LazyImage.jsx  SectionHead.jsx
  sections/                 One file per page section
    Navbar  Hero  About  Services  Expertise  Process
    Projects  Testimonials  CTA  Contact  Footer
  styles/
    tokens.css              Design tokens, reset, primitives (btn, eyebrow…)
    chrome.css              Navbar, mobile menu, preloader, cursor
    sections.css            All section styles + responsive
```

## Design system

### Fonts
- Manrope — display / body
- DM Mono — labels, meta, buttons

### Color
- Deep black `#050505` · Off-white `#f4f3ef`
- Warm gold `#c8a96b` (accent only) · Bright gold `#ddc084`
- Light sections: paper `#f4f3ef` with ink `#0a0a09`

### Motion language
- Cinematic masked line reveals for headlines
- Subtle fadeUp staggers for lists and copy
- Clip-path curtain reveals for imagery
- Magnetic CTAs, drifting arrows, custom gold cursor
- Scroll-linked progress rail in Process
- Lenis smooth scroll wired to ScrollTrigger
- All heavy motion respects `prefers-reduced-motion` and is disabled on it

## Notes
- Frontend only — no backend, API, or server code.
- Project imagery falls back to an elegant gold-geometric placeholder when
  assets are absent (`/images/project-*.jpg` are optional).
- Contact details shown are only those already provided in the project
  (hello@astrratech.com, LinkedIn placeholder).
