# Progress

## 2026-09-22 — Phase 1: Home

- [x] BRIEF + TECH_CARD (Size B)
- [x] Next.js 15 + Tailwind 4 scaffold
- [x] Feature-based layout (`features/home`, `shared/*`)
- [x] Figma Home 02 sections + shared Header/Footer
- [x] Prisma schema + Neon push + seed
- [x] `pnpm build` + `pnpm lint` green

### Next

- About deep pages EN copy (`who-we-are`, `quality`, `structure` content modules)
- Inner pages content (Admissions, Clinics, News detail)
- Admin CMS
- Visual QA vs Figma in browser (desktop / laptop / mobile)

## 2026-09-28 — Admin: Team Members

- [x] Prisma `TeamMember` + `TeamMemberPlacement` (multi-page placements, per-section order)
- [x] Page/section registry (About, Education, Clinics, Science — 10 pages)
- [x] `/admin/team`: tabs as filters, search, page/section filter, reorder, add/edit/delete, photo upload
- [x] Admin login (env password hash + signed cookie)
- [x] Public pages read staff from DB via one shared card; seed migrates existing staff (hy/en)
- [ ] Apply schema + seed on dev DB (`pnpm db:push && pnpm db:seed`)
- [ ] Rate limiting on admin login; R2 storage for photos before serverless deploy

## 2026-09-30 — Admin: Documents

- [x] Prisma `SiteDocument` + `SiteDocumentPlacement` (multi-section placements, per-section order)
- [x] Registry: Quality, HR, Accounting, How to Apply, Application, Science (publications + reports)
- [x] `/admin/documents`: tabs as filters, search, page/section/year filter, reorder, add/edit/delete, PDF upload/replace, new years
- [x] Public pages read documents from DB (hy/en); year filters derived from data; seed migrates existing lists
- [x] Shared admin UI extracted to `admin-shell` (used by Team and Documents)
- [ ] Apply schema + seed on dev DB (`pnpm db:push`, then seed documents)
- [ ] R2 storage for PDFs before serverless deploy

## 2026-09-22 — Education pages

- [x] `/education` hub + medicine / dentistry / cpd detail pages
- [x] Brief 3.1–3.3 sections covered (hy/en JSON)
- [x] Locale routing + site design patterns

## 2026-09-22 — International page

- [x] `/international` inner page (office, Europe/CIS, partners, memoranda, exchange, projects)
- [x] Copy in `locales/{hy,en}/international.json`
- [x] Site design: hero shell, section badges, cards, partner logos, CTA

## 2026-09-22 — i18n (hy / en)

- [x] `next-intl` + middleware + `app/[locale]`
- [x] `locales/{hy,en}/{common,home,about,pages}.json`
- [x] Header language switcher + locale-aware links
- [x] Home + About hub + shared chrome translated
- [x] `pnpm lint` + `pnpm build` green
