# Նախագծի տեխնոլոգիական քարտ

**Նախագիծ.** Սարիբեկյան միջազգային բժշկական համալսարան  
**Չափ.** B (medium)  
**Ամսաթիվ.** 2026-09-22  
**Ստատուս.** հաստատված (stack — օգտագործողի հանձնարարությամբ)

> Ստատուսներ. ⬜ չի սկսվել · 🔄 ընթացքում · ✅ պատրաստ · ➖ պետք չէ

---

## 1. Հիմք

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 1.1 | Նախագծի չափ | B | ✅ | բազմաէջ համալսարանական կայք + CMS |
| 1.2 | Ճարտարապետություն | Feature-based | ✅ | `src/features/*`, `src/shared/*` |
| 1.3 | Package manager | pnpm | ✅ | |
| 1.4 | Node.js | 22.x LTS | ✅ | |
| 1.5 | TypeScript | 5.x, strict | ✅ | |
| 1.7 | Git ստրատեգիա | feature branches | ✅ | |
| 1.8 | Commit կոնվենցիա | Conventional Commits | ✅ | |

---

## 2. Frontend

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 2.1 | Framework | Next.js 15+ App Router | ✅ | fullstack |
| 2.2 | Ոճեր | Tailwind CSS 4.x | ✅ | design tokens CSS vars |
| 2.3 | UI Kit | custom (Figma) | ✅ | |
| 2.6 | Data fetching | Server Components | ✅ | |
| 2.7 | i18n | next-intl (hy, en) | ✅ | `/[locale]/…`, `locales/{hy,en}/*.json` |
| 2.8 | SEO | Metadata API | ✅ | |
| 2.9 | Մուգ թեմա | պետք չէ | ➖ | |
| 2.10 | Անիմացիաներ | CSS transitions | ✅ | |

---

## 3. Backend

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 3.1 | Տիպ | Next.js Route Handlers / Server Actions | ✅ | |
| 3.2 | Վալիդացիա | Zod | ✅ | |

---

## 4. Բազային տվյալներ

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 4.1 | ՍՈՒԲԴ | PostgreSQL | ✅ | |
| 4.2 | ORM | Prisma | ✅ | |
| 4.8 | Seed data | prisma db seed | ✅ | home content |
| 4.11 | Production migrations | CI job (հետագա) | ⬜ | local ≠ prod |

---

## 5. Ինքնություն հաստատում

| # | Պարամետր | Որոշում | Ստատուս | Նշում |
|---|----------|---------|---------|-------|
| 5.1 | Լուծում | Auth.js — հետագա (ադմին) | ⬜ | phase 2 |

---

## Adaptive limits (քննարկման ենթակա)

- `DATABASE_CONNECTION_LIMIT` — թողնել `.env`-ի 10 մինչև staging load test
- `statement_timeout` — չսահմանել լռելյայն առանց թիմի հաստատման

---

## Phase 1 scope

1. Գլխավոր էջ (Figma Home 02) — բոլոր հատվածներ
2. Shared Header / Footer
3. Prisma մոդելներ + seed (news, partners, stats, programs)
4. Responsive + performance baseline
