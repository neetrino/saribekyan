# Architecture — Saribekyan Medical University

**Size:** B (feature-based)  
**Stack:** Next.js App Router (fullstack) + PostgreSQL (Prisma)

## Layout

```text
locales/               # i18n message catalogs (hy, en)
  hy/*.json
  en/*.json
src/
  app/
    [locale]/          # locale-prefixed routes (/hy/..., /en/...)
  i18n/                # next-intl routing, navigation, message loader
  features/
    home/              # home page sections + data access
    about/             # about hub + who-we-are / quality / structure
    education/         # education hub + medicine / dentistry / cpd
    clinics/           # clinics hub + hospitals / practical / tour
    admissions/        # how to apply, tuition, PDF application forms
    science/           # research, projects, publications, SSS, reports
    contact/           # contact details, map, validated contact form
    international/     # international office, partners, memoranda, exchanges
    team/              # unified Team Members: registry, public cards, admin (team/admin)
    documents/         # unified PDF Documents: registry, public lists, admin (documents/admin)
    admin-auth/        # admin login, signed session cookie, requireAdmin guard
    admin-shell/       # admin layout, i18n, shared admin UI (drawer, placements editor, row drag)
  shared/
    ui/                # Header, Footer, primitives
    lib/               # prisma, cn, utilities
    config/            # site + navigation
prisma/                # schema, migrations, seed
public/                # static assets from Figma
```

## i18n

- Library: `next-intl`
- Locales: `hy` (default), `en`
- URL prefix always: `/hy/about`, `/en/about`
- Messages: root `locales/{locale}/{namespace}.json` merged by namespace
- Use `Link` / `usePathname` / `useRouter` from `@/i18n/navigation`

## Boundaries

- Features export via `index.ts` barrels.
- `shared` never imports from `features`.
- DB access only on the server (RSC / server modules).

## Phase 1

Home page (Figma Home 02) + shared chrome + Prisma models for CMS content.

## About

`/about` hub with typed content modules under `features/about/content`
(who-we-are, quality, structure). People photos and PDF URLs can later
move to Prisma/CMS without changing page composition.

## Clinics

`/clinics` hub with two canon sections — hospitals and practical centres —
plus facility pages (`complex`, `dental`, `simulation`) and a virtual-tour
slot. Copy lives in `locales/{hy,en}/clinics.json`. Media URLs can later
move to Prisma/CMS without changing page composition.

## Education

`/education` hub with faculty cards; detail routes `/education/medicine`,
`/education/dentistry`, `/education/cpd`. Copy lives in `locales/*/education.json`;
structural IDs in `features/education/content/meta.ts`.

## Admissions

`/admissions` hub with three sections: how to apply, tuition, and PDF
application forms. `/admissions/documents` and `/admissions/international` reuse the
how-to-apply page so existing home and footer links keep working.
Copy lives in `locales/*/admissions.json`.

## Science

`/science` single page with in-page section navigation covering the science
unit overview, research directions, current/completed projects, publications,
conferences and events, the Student Scientific Society (SSS / ՈՒԳԸ), activity
reports, and responsible contacts. Copy lives in `locales/*/science.json`;
structural IDs in `features/science/content/meta.ts`.

## Contact

`/contact` page with address, phones, emails, admissions and international
department contacts, working hours, social links, map embed, and a validated
contact form (server action + Zod). Copy lives in `locales/*/contact.json`;
contact values and map URLs live in `shared/config/site.ts`.

## Team Members (CMS)

One `TeamMember` table (hy/en name, position, optional bio, photo, contacts) plus
`TeamMemberPlacement` rows (`pageKey`, `sectionKey`, `sortOrder`). A member is
created once and can be placed in several page sections, each with its own order.
Allowed pages/sections live in `features/team/config/placements.ts`; add a new
entry there and render it with `getTeamPageMembers(pageKey, locale)` +
`TeamPeopleGrid` on the public page. Admin UI: `/admin/team` (tabs All / About /
Education / Clinics / Science are filters, plus search and page/section filter;
drag the grip dots to reorder a single section — including a tab that has only one
section, such as Science). Add/Edit open a right-side drawer
(70% width) driven by the URL (`?drawer=new`, `?edit=<id>`) that keeps the active
filters; the form switches between Armenian and English fields. Saving
revalidates the affected public paths for both locales.

Photos are upload-only (no external URLs), stored on local disk in `storage/uploads/team/` (git-ignored) and
served by `/media/team/[file]`. Move to object storage (R2) before a serverless
deployment.

## Documents (CMS)

Same model as Team Members: one `SiteDocument` table (hy/en title, optional hy/en
description, year, PDF file) plus `SiteDocumentPlacement` rows (`pageKey`,
`sectionKey`, `sortOrder`), so one PDF can appear in several sections. Pages and
sections live in `features/documents/config/placements.ts`; each section declares
`groupByYear`. Year-grouped sections (Quality reports, Accounting, Science
publications and reports) show newest year first with the admin order inside each
year; the others (HR, admission regulations, application forms) use the admin order.
Year chips on the site are derived from the documents, so a new year (e.g. 2027)
appears as soon as a document uses it. Public pages render
`getPageDocuments(pageKey, locale)` with `DocumentYearFilter` / `DocumentList`
(or the admissions `PdfDownloadList` / `ApplicationForms`).

Admin UI: `/admin/documents` — tabs All / About Us / Admissions / Science are
filters; search plus page/section/year filters; drag reorder is enabled when the
list is exactly one ordered group (one section, and one year for year-grouped
sections). The drawer form has hy/en fields, PDF upload/replace, a year picker
with "add another year", and the shared placements editor.

PDFs (max 10 MB, validated by `%PDF-` signature) are stored in
`storage/uploads/documents/` and served by `/media/documents/[file]`; a replaced or
deleted document removes its uploaded file. Seeded documents point to static
files under `public/documents/`.

Shared admin building blocks (drawer, tabs, delete button, form fields,
placements editor, row drag, placement/search-param/form-parsing helpers) live in
`features/admin-shell`; disk storage in `shared/lib/local-file-store.ts`.

## Admin auth

`/admin/*` is excluded from the i18n middleware. Single admin account
(`ADMIN_EMAIL` + `ADMIN_PASSWORD`, constant-time comparison) and an HMAC-signed HttpOnly
cookie (key derived from the admin credentials, so changing them invalidates sessions; 8h,
`path=/admin`, `SameSite=Strict`). Every admin page and server action calls `requireAdmin()`.
Planned upgrade: Auth.js with per-user accounts.

## International

`/international` single page with in-page section navigation covering the
International Office, European and CIS cooperation, partner university
logos and official website links, memoranda, exchange programmes, and
international projects. Copy lives in `locales/*/international.json`;
structural IDs and partner URLs in `features/international/content/meta.ts`.
Office contacts reuse `shared/config/site.ts`.

