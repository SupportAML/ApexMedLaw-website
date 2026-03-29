# ApexMedLaw Website — Redesign Spec for Claude Code

> **Purpose:** This document is a design analysis + actionable spec meant to be fed to Claude Code (running in an IDE like Cursor, IDX, or Antigravity) to execute the redesign. Every change is specific, references the current file, and explains why.
>
> **Repo:** `SupportAML/ApexMedLaw-website`
> **Stack:** React 19 + Vite 7 + Tailwind 3.4 + shadcn/ui + GSAP
> **Live:** https://www.apexmedlaw.com

---

## Executive Summary

The current site is solid for a v1 — clean layout, good copy, functional form. But it reads like a well-structured template, not a premium medical-legal brand. The core issues are: excessive whitespace that makes sections feel disconnected, lack of visual proof/social proof weight, a blog that needs featured imagery, and a division page routing bug. Below are prioritized changes organized by impact.

---

## CRITICAL BUGS (Fix First)

### 1. Division Pages Render Blank on Direct URL Access
- **What:** Navigating directly to `/divisions/neurology` renders a white screen. Works when clicking from homepage (client-side routing), but fails on hard refresh or direct URL.
- **Why:** Vercel SPA fallback likely not configured. The Vite build outputs a single `index.html` but Vercel doesn't know to serve it for all routes.
- **File:** `vercel.json` (create or update at repo root)
- **Fix:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
- **Priority:** P0 — this is a broken page that kills SEO and any link shared to attorneys.

---

## HIGH IMPACT — Visual & Layout

### 2. Hero Section: Tighten Layout, Add More Weight
- **File:** `src/sections/ApexHeroSection.tsx`
- **Current state:** The hero is dark navy with large all-caps headline + 3 stat cards on the right. It works but feels generic.
- **Changes:**
  - **Reduce the massive headline size by ~15%.** The current `display-xl` clamp goes up to 84px — that's billboard scale. Cap it at ~68px max. The line breaks on "MEDICAL-LEGAL" look awkward at certain widths.
  - **Add a subtle background element.** Right now it's flat dark navy. Add a very faint radial gradient or a barely-visible abstract medical/legal pattern (scales of justice wireframe, neural pathway lines) at ~3-5% opacity. Don't overdo it — just enough to give depth.
  - **Stat cards: add micro-animation on scroll entry.** The 3 stat cards (100%, 7 Days, MD) should stagger-fade-in with GSAP when they enter viewport. Currently they're static. This is low-effort, high-polish.
  - **"Available Nationwide" badge:** Move it from top-left to inline with the subtitle text, or make it a subtle animated pill. Currently it floats in the corner disconnected from the content.

### 3. Excessive Section Spacing Throughout
- **Files:** Multiple section components + `src/index.css`
- **Current state:** There are massive gaps (100-150px+) between every section. The page feels like sections are floating in space rather than building a narrative.
- **Changes:**
  - **Cut vertical padding between sections by 30-40%.** Go from `py-24`/`py-32` down to `py-16`/`py-20` on most sections. The page is currently ~6500px tall for content that could fit in ~4500px.
  - **Use background color transitions to separate sections** instead of whitespace. Alternate between white and `#F8FAFC` (clinical light) more deliberately. Right now some sections have backgrounds and some don't, making the spacing feel random.
  - **The gap between Divisions and Services sections** is particularly egregious — there's a full viewport of white space with just a "Need a Different Specialty?" card floating in it.

### 4. Divisions Section: Make Cards More Scannable
- **File:** `src/sections/DivisionsSection.tsx`
- **Current state:** 2x2 grid of text-heavy cards. Each card has a title, subtitle, a full paragraph of body text, and a "View Specialties" link. The paragraphs are too dense for scanning.
- **Changes:**
  - **Truncate body text to 2 lines max** with a "Read more" expansion or just link to the division page. Attorneys scanning this page don't need 4 sentences per card.
  - **Add a colored accent bar or icon background** to differentiate each division visually. Right now all 4 cards look identical except for the text.
  - **Consider a horizontal layout** (1 column, full-width cards) instead of 2x2. Each division gets more breathing room and you can add a small relevant image or illustration per division.

### 5. Team/Leadership Section: Needs Professional Polish
- **File:** `src/sections/ApexTeamSection.tsx`
- **Current state:** Large headshot photos with gradient overlay showing name/title. Photos look AI-generated (smooth skin, perfect lighting, generic backgrounds).
- **Changes:**
  - **Replace with real professional headshots.** The current images look synthetic and undermine the credibility message. If real photos aren't available yet, use a more conservative layout (smaller photos, no gradient overlay) that doesn't draw attention to the image quality.
  - **Reduce photo size by 40%.** The photos currently take up the full card width (~700px each). Scale to ~400px wide with bio text beside them in a horizontal layout rather than stacked.
  - **The "What Sets Our Experts Apart" sub-section** (Academically Rigorous, Clinically Active, Trial Ready) should be visually connected to the team section, not floating below with a gap. Consider making these badges/pills on the team cards themselves.

### 6. Blog Page: Add Featured Images and Better Cards
- **File:** `src/pages/BlogPage.tsx`
- **Current state:** Text-only blog cards with date, author, title, description, and tags. No images, no visual hierarchy between posts.
- **Changes:**
  - **Add auto-generated or stock hero images per post.** Even a simple colored gradient header with the division icon would be better than pure text cards.
  - **Make the first/latest post a featured card** — full-width, larger, with more prominence. Then show remaining posts in a 2-column grid.
  - **Add category filters** (Neurology, Critical Care, GI, Pain Medicine) as pill buttons at the top so attorneys can find relevant content fast.
  - **Add estimated read time** next to the date (e.g., "8 min read").

---

## MEDIUM IMPACT — Conversion & Trust

### 7. Testimonials Section: Too Lightweight
- **File:** `src/sections/TestimonialsSection.tsx`
- **Current state:** 3 cards with 5-star ratings and quotes. Anonymous attributions ("Partner, Defense Litigation Firm").
- **Changes:**
  - **Add names if possible.** Anonymous testimonials carry significantly less weight. Even first name + firm name is better than nothing.
  - **Increase visual weight.** The cards are small white rectangles on a light gray background. Consider adding a subtle dark background to this section to make the testimonial cards pop, or use a larger quote layout (one testimonial at a time with carousel dots).
  - **Add a case outcome metric** if available (e.g., "Case settled for $2.3M" or "Expert testimony led to defense verdict"). Attorneys care about results.

### 8. Contact Form: Improve UX and Trust Signals
- **File:** `src/sections/ContactSection.tsx`
- **Current state:** Dark background, split layout with info on left and form on right. Form has good fields but feels clinical.
- **Changes:**
  - **Add a "What Happens Next" micro-copy block** above or below the form: "1. We review your case details. 2. Match you with a subspecialty expert within 24 hours. 3. Provide CV, fee schedule, and availability." This sets expectations and reduces friction.
  - **Add a trust badge row** below the form: "HIPAA Compliant", "Conflict Check Guaranteed", "Secure Submission". Even if these are simple text + icon rows.
  - **The "Urgent Deadline?" toggle** is a great feature but visually buried. Make "Yes" glow red or orange when selected to signal urgency.
  - **Phone number on the left** should be a clickable `tel:` link (verify it is) and more prominent — some attorneys will always prefer to call.

### 9. Add a "Results" or "Case Types" Section
- **Currently missing.** The site talks about process and credentials but doesn't show outcomes or the types of cases handled with specificity.
- **Add a new section** between Services and Leadership:
  - Either a "Case Types We Handle" grid with specific examples (TBI from car accident, missed stroke diagnosis, ICU medication error, etc.)
  - Or a "By The Numbers" section: cases reviewed, depositions given, states covered, average turnaround, etc.
  - This is what attorneys actually search for — specificity about case types, not just specialty names.

### 10. Navigation: Add Scroll Progress + Mobile Optimization
- **File:** `src/components/Navigation.tsx`
- **Changes:**
  - **Add a thin progress bar** at the very top of the nav (1-2px, blue accent) that fills as the user scrolls down the page. This is subtle but signals a modern, polished site.
  - **Verify mobile nav behavior.** The current nav likely collapses to a hamburger, but test that the phone number and CTA button are accessible on mobile without opening the menu.
  - **Make the "Request a consult" CTA button** slightly larger and consider making it pulse subtly or change color after the user has scrolled past the hero (they've seen the pitch, now nudge them).

---

## LOW IMPACT — Polish & SEO

### 11. Footer: Too Minimal
- **Current state:** Single line with copyright, Terms, Privacy, LinkedIn.
- **Changes:**
  - **Expand to a proper 3-4 column footer:** Column 1 = Logo + tagline + phone. Column 2 = Quick Links (Divisions, Services, Blog, Contact). Column 3 = Divisions (Neurology, Critical Care, GI, Pain). Column 4 = Legal (Terms, Privacy, HIPAA).
  - **Add email address** for attorneys who prefer email.
  - A real footer signals an established business. A one-liner signals a landing page.

### 12. SEO Meta + Open Graph
- **File:** `index.html` + consider adding `react-helmet` or route-level meta
- **Changes:**
  - **Add unique meta titles and descriptions per page** (especially division pages and blog posts). Currently the SPA likely serves the same meta for all routes.
  - **Add Open Graph tags** so when attorneys share a blog post or page link, it shows a proper preview card with image, title, and description.
  - **Add JSON-LD structured data** for the organization (LocalBusiness or ProfessionalService schema) and for blog posts (Article schema). This helps Google understand the site and can enable rich snippets.

### 13. Performance & Loading
- **Changes:**
  - **Add loading skeletons or a simple fade-in** for the initial page load. The GSAP animations mean content may flash before animating.
  - **Lazy-load below-fold sections.** The blog post data and testimonials don't need to load until the user scrolls there.
  - **Compress and convert images to WebP.** The team headshots especially should be optimized.

### 14. "How We Work" Section: Needs Visual Treatment
- **File:** `src/sections/ApexApproachSection.tsx`
- **Current state:** 6 numbered steps in a 2-column grid with blue circle numbers. The "Why Attorneys Trust ApexMedLaw" callout below is just a bordered card with a bullet list.
- **Changes:**
  - **Convert the 6-step process to a visual timeline/flowchart** — vertical or horizontal with connecting lines between steps. The numbered circles are fine but the grid layout makes it feel like a list, not a process.
  - **The "Why Attorneys Trust" callout** duplicates messaging from other sections. Consider removing it and weaving those trust points into their respective sections instead.

---

## Design System Refinements

### Colors (keep but refine usage)
- **Primary Navy (#0A1628):** Good. Keep for dark sections and headings.
- **Electric Blue (#2563EB):** Good for CTAs. But it's overused — every icon, link, badge, and button is the same blue. Add a secondary accent (deep teal #006872 from the AML 2026 design system) for variety.
- **Add a warm accent** for urgency/importance — amber or warm gold. Use sparingly for the "urgent deadline" feature and important callouts.

### Typography
- **Sora for headings, Inter for body:** Good pairing. But heading sizes are too aggressive. The jump from body text (16px) to section headings (48-84px) is jarring. Add more intermediate sizes.
- **Letter-spacing on all-caps labels** ("OUR SERVICES", "HOW WE WORK", "LEADERSHIP") — increase to 0.15em for better readability. Currently they feel tight.

### Spacing
- **Establish a consistent section rhythm.** Pick 2-3 section padding sizes and use them consistently:
  - Small sections (testimonials, CTA bands): `py-16`
  - Standard sections (services, approach): `py-20`
  - Hero/feature sections (hero, divisions, team): `py-24`

---

## Implementation Priority for Claude Code

**Phase 1 — Fix & Foundations (Day 1)**
1. Fix Vercel SPA routing (vercel.json rewrites)
2. Reduce section spacing globally
3. Fix heading size scale
4. Expand footer

**Phase 2 — High-Impact Visual (Day 2-3)**
5. Hero section refinements (background, stat animations, badge)
6. Division cards redesign (truncate text, accent colors)
7. Team section layout (smaller photos, horizontal layout)
8. Blog page (featured images, category filters, featured post)

**Phase 3 — Conversion (Day 3-4)**
9. Contact form UX improvements (what happens next, trust badges)
10. New "Results/Case Types" section
11. Testimonials upgrade
12. Nav progress bar + mobile polish

**Phase 4 — SEO & Polish (Day 4-5)**
13. Per-route meta tags + Open Graph
14. JSON-LD structured data
15. Performance (lazy loading, WebP, loading states)
16. "How We Work" visual timeline

---

## Notes for Claude Code Session

- **Branch:** Create `redesign/v2` from `main`
- **Preview:** Vercel will auto-deploy preview URLs for the branch
- **Don't touch:** The blog post data in `src/blog/posts.ts` — that's auto-generated by scheduled task
- **Don't touch:** The contact form submission endpoint — that works fine
- **Design system file:** Reference `Products/AML 2026/DESIGN-SYSTEM.md` for the "Clinical Editorial" aesthetic that should eventually unify across AML properties
- **Test:** After each phase, verify on mobile (375px), tablet (768px), and desktop (1440px)
- **Fonts:** Sora + Inter are already loaded. Don't add new fonts.
- **Dependencies:** Minimize new deps. GSAP is already there for animations. Don't add Framer Motion or other animation libs.
