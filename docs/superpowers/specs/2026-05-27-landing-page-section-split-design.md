# Design: Landing Page Section Split & Projects Rename

**Date:** 2026-05-27
**Status:** Approved

## Summary

Remove About, Services, Products, and SocialProof (Results/Case Study) sections from the landing page. Each gets its own dedicated page (except SocialProof, which is removed entirely from the site). Rename Products → Projects throughout.

## Changes by File

### `app/page.tsx` (landing page)
Remove `<Services />`, `<Products />`, `<About />`, `<SocialProof />` and their imports.
Remaining sections: Hero, IntegrationSphere, Process, Pricing, FinalCTA.

### `app/about/page.tsx`
Remove the decorative page header `<section>` block and `<FinalCTA />`.
Page renders only `<About />` inside `<main className="pt-20">`.
Navbar + Footer come from the root layout — no other sections needed.

### `app/services/page.tsx`
Remove `<SocialProof />` and its import.
Keep: page header, Services, Process, Pricing, FinalCTA.

### `components/sections/Products.tsx` → `components/sections/Projects.tsx`
- Rename file.
- Rename exported function: `Products` → `Projects`.
- Update `id` on the `<section>` element: `id="products"` → `id="projects"`.
- Update section label text: `"Claude Code Skills"` → `"Projects"`.
- Update section heading: keep `"Tools You Own. Systems That Run."` — it remains accurate for a Projects framing.

### `app/products/page.tsx` → `app/projects/page.tsx`
- Create `app/projects/` folder with a new `page.tsx`.
- Update all imports: `Products` → `Projects`, path `@/components/sections/Products` → `@/components/sections/Projects`.
- Update metadata: title `"Products — JVA"` → `"Projects — JVA"`, description updated accordingly.
- Update page header: label `"Claude Code Skills"` → `"Projects"`, headline and sub-copy updated to reflect Projects framing.
- Delete `app/products/page.tsx` and remove the `app/products/` folder.

### `components/layout/Navbar.tsx`
Update `navLinks` array — change hash anchors to page routes and rename Products to Projects:
- `{ label: "Services", href: "#services" }` → `{ label: "Services", href: "/services" }`
- `{ label: "Products", href: "#products" }` → `{ label: "Projects", href: "/projects" }`
- `{ label: "About", href: "#about" }` → `{ label: "About", href: "/about" }`

## What Is Removed Entirely
- `SocialProof` section from landing page and services page. No dedicated page will be created for it.

## Routing
- `/products` route is deleted (no redirect). Clean cut with Option A.
- `/projects` is the new route.

## Out of Scope
- No changes to the Services page content (other than removing SocialProof).
- No changes to the About or Projects section component internals (cards, copy, animations).
- No changes to the blog page or Footer.
