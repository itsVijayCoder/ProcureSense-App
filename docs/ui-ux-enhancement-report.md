# ProcureSense Dashboard UI/UX Enhancement Report

_Date: 3 November 2025_

This document captures the recommended updates to elevate the user experience
across the procurement analysis dashboard. The suggestions focus on visual
cohesion, usability, accessibility, and the introduction of purposeful
micro-interactions.

---

## 1. Global Styling & Motion Foundations

-  Establish a consistent typography scale (headings, body, caption) and spacing
   tokens to reinforce hierarchy.
-  Expand the color system with semantic tokens (e.g., `--surface`, `--border`,
   `--muted`, success/warning variants) that align with brand guidelines.
-  Extend `app/globals.css` with reusable animation utilities (`.fade-in`,
   `.slide-up`, `.delay-200`) and honor `prefers-reduced-motion`.
-  Replace the generic loader with either skeleton states or a branded animation
   sequence.

## 2. Layout Structure Improvements

-  **Sidebar (`app/(dashboard)/layout.js`):** refine open/close transitions, add
   hover tooltips, and animate icon/label states when collapsing.
-  **Header:** balance spacing around the logo, add subtle hover/focus scaling
   for the dropdown trigger, and optionally include a quick command/search
   action.
-  **Main content:** introduce elevated cards/panels with shadows or borders to
   define sections, ensuring responsive gutter spacing.

## 3. Analysis List Page (`app/(dashboard)/analysis/page.js`)

-  Convert list rows to stacked cards with clear status indicators and hover
   reveals for actions (view/edit/delete).
-  Add skeleton placeholders when fetching, and an empty-state illustration with
   call-to-action when no data exists.
-  Support search input focus animation, inline result counts with count-up
   animation, and animated entry for list items (staggered fade/slide).

## 4. Analysis Detail Page (`app/(dashboard)/analysis/[analyseId]/page.js`)

-  Introduce a sticky header containing breadcrumbs, high-level metrics, and
   animated number counters.
-  Animate tab transitions (Framer Motion/layout transitions) and provide visual
   feedback for the active tab.
-  For ranking segments, use animated chips indicating movement (e.g., up/down
   arrows) and progressive disclosure for deeper insights.

## 5. Ranking & Sidebar Components

-  **`components/pages/ranking-info/ranking-data.jsx`:** style entries as cards
   with ranking badges, animated progress bars, and hover/focus states revealing
   additional metrics.
-  **`components/pages/proposal-sidebar.js`:** upgrade the horizontal selector
   with active-state highlights, smooth scroll indicators, and responsive touch
   targets.

## 6. Analysis Content Tabs

-  **General, Financial, Risk Pages (`components/pages/general.js`,
   `financial.js`, `risk.js`):**
   -  Frame content with cards, badges, and micro-interactions on hover.
   -  Embed lightweight charts or gauges with entrance animations to visualize
      metrics.
   -  Provide reveal-on-hover details within ranking cards and integrate
      tooltips for data points.
-  **`components/pages/proposal-analysis/proposalAnalysis.jsx`:** convert long
   sections into collapsible cards or accordions with smooth expand/collapse
   transitions and sticky subheaders for anchor navigation.

## 7. Wizard Flow (`components/pages/step1.js` – `step4.js`)

-  Add a progress bar/stepper with animated transitions between steps.
-  Implement inline validation feedback (shake/subtle glow) and success
   checkmarks when a step is completed.
-  Provide a compact summary card of completed steps and animate the “Start
   Analysis” completion state (e.g., confetti or success banner).

## 8. Motion & Interaction Guidelines

-  Leverage Framer Motion or GSAP for complex component transitions; use CSS
   transitions (`200–250ms`, `cubic-bezier(0.4, 0, 0.2, 1)`) for hover/focus
   states.
-  Add scroll-triggered animations via Intersection Observer for section
   reveals.
-  Always offer accessible alternatives or disable motion when
   `prefers-reduced-motion` is set.

---

## Implementation Roadmap (Suggested Order)

1. Define design tokens and animation utilities in `app/globals.css`.
2. Introduce a motion library and create reusable motion wrappers.
3. Refactor critical pages: analysis list, analysis detail, ranking sidebar.
4. Enhance wizard steps and proposal analysis components.
5. Add skeleton loaders and unified empty states.
6. QA for accessibility, responsive behavior, and performance regression.

This roadmap provides the necessary context to modernize the dashboard UI and
weave in polished micro-interactions that reinforce the ProcureSense brand
experience.
