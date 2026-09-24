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

## International

`/international` single page with in-page section navigation covering the
International Office, European and CIS cooperation, partner university
logos and official website links, memoranda, exchange programmes, and
international projects. Copy lives in `locales/*/international.json`;
structural IDs and partner URLs in `features/international/content/meta.ts`.
Office contacts reuse `shared/config/site.ts`.

