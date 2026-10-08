# Progress

**In progress:** ⏸ All screens' UI merged (Setting last) — waiting for user review. Next when asked: data integration (api.ts + mock db) per the architecture rules, or Phase 10 links.

> **Built but not merged yet** (git branches from the parallel run, merge one feature at a time on request): none — every section is merged.

Legend: `[ ]` todo · `[x]` done. Review gate (⏸) = stop and wait for user approval.

> Design source = local exports in `docs/screens/` + `docs/assets/images/` (see CLAUDE.md → Tools & design source). Figma MCP is unavailable (View seat, ~20 calls/month) — do not call it. Colours are sampled from the PNGs with a script, never eyeballed. Icons = lucide-react.
> **UI-only mode (2026-10-08):** build screens with static sample data, no data integration — see CLAUDE.md → Current mode.
> Routes, states and design-error corrections: `docs/SCREEN_MAP.md`. Components + shadcn install list: `docs/COMPONENTS.md`. Tokens: `docs/TOKENS.md`.

## Phase 0 — Discovery (no app code)
- [x] Project folder: `git init`, `.gitignore`, `CLAUDE.md` resume protocol, this file
- [x] MCP servers (shadcn, context7, playwright) in `.mcp.json`; pnpm fixed
- [x] Design exported to local files: 69 frames in `docs/screens/`, 10 images in `docs/assets/images/` (verified complete)
- [x] `docs/SCREEN_MAP.md` — all 69 frames → route + state (visually verified), design errors, open questions
- [x] `docs/COMPONENTS.md` — patterns → shadcn (registry-verified), icons, install list
- [x] `docs/TOKENS.md` — pixel-sampled colours, measured radii/shadows/layout, shadcn CSS-var mapping
- [x] ⏸ Present screen map + tokens — approved 2026-10-08 with the SCREEN_MAP §7 defaults

## Phase 1 — Foundation
- [x] Scaffold TanStack Start (`npx @tanstack/cli@latest create`), pnpm, TS strict — SSR off by default (`src/start.ts`), devtools dev-only
- [x] Tailwind v4 + shadcn init; theme tokens in `src/styles/app.css`; Inter font (self-hosted `@fontsource-variable/inter`)
- [x] shadcn components from COMPONENTS.md install list (`form` instead of `field`, per brief); theme-aware `cn` in `src/lib/utils.ts`
- [x] Copy `docs/assets/images/*` → `public/images/` (logo wordmark placeholder is built with the sidebar in Phase 3 — SCREEN_MAP Q1)
- [x] Mock layer: `src/mocks/db.ts` (latency 300–600 ms) + seeded `src/mocks/data/*` + feature `types.ts`; ESLint blocks `#/mocks` imports outside `src/features/*/api.ts`
- [x] `QueryClient` in router context; 404 page (`src/components/not-found.tsx`, not designed — built from tokens); favicon; `clean-demos` (nothing to clean)
- [x] ⏸ Review — approved 2026-10-08

## Phase 2 — Auth
- [x] 1 Sign In `/login` · mock auth (valid email + 6+ char password), session in localStorage (sessionStorage when Remember me is off), `beforeLoad` guard → `/login?redirect=`
- [x] 2 Sign Up `/signup` (live password rules, duplicate-email error)
- [x] 3, 4 Forgot password `/forgot-password?step=request|sent` (+ Resend toast, Back to Sign In)
- [x] Playwright vs screenshots (frames 1–4) + multi-agent code review: 18 confirmed findings, 17 fixed, 1 (contrast): user chose to keep design colours — logged as contrast debt in TOKENS.md
- [x] ⏸ Review — approved 2026-10-08

## Phase 3 — App shell
- [x] `_app` layout: AppSidebar (nav, Documentation/API Reference links, footer env/org switchers + user card with Sign out), PageHeader (white + navy variants), section placeholders for Connection/Practices/Logs/Setting; sidebar 372px at 1920 → 260px min at 1280
- [x] Add "User Details" to the user menu
- [x] Review — user switched to UI-only mode (2026-10-08); shell code review stopped

## Phase 4 — Overview
- [x] Overview `/overview?step` (SectionBar + reusable Stepper + EHRs/Intraconnects/Practice diagram + glossary; steps 2–4 not designed → placeholder / link to Practices); matches frame at 1920 (panel, cards, box within 1–3px)
- [x] Review — user: "just complete the UI"; shared components + route skeleton committed (2234281, cffee6c)

## Phase 5 — Connection
- [x] Connection, 56, 57 list `/connections` (status filter, search, app type, pagination — local state) · 53 empty state when the filtered list is empty
- [x] 58–62 Add connection wizard `/connections/new?step`
- [x] 63 Connection detail `/connections/$connectionId`
- [x] 64–67 Edit connection wizard `/connections/$connectionId/edit?step`
- [ ] ⏸ Review

## Phase 6 — Practices: list + add
- [x] Practices list `/practices` · Frame 2 row menu · 52 empty state
- [x] "Logs", 41, 54 Add practice `/practices/new?step`
- [ ] ⏸ Review

## Phase 7 — Practice detail (replaces the brief's "profile-menu pages": Frame 2 is the practice row menu)
- [x] `$practiceId` layout (header + 5 pill tabs)
- [x] 22–24 Profile (view, edit, success)
- [x] 27, 28 Connection tab (empty, populated) · 47–51 attach wizard · 29–33 edit wizard
- [x] 34, 46 Webhooks tab · 35 webhook detail · 42–45 add webhook · 36–39 edit webhook
- [x] 25 Providers · 26 Patients
- [ ] "+ Add New Webhook" sits above the table instead of on the header tab row (34) — needs a header action slot in the practice layout
- [ ] ⏸ Review

## Phase 8 — Logs
- [x] Logs 1 `/logs` (log cards + pagination, flow diagram with selectable nodes) · Frame 1 filter sheet (local filtering; close button + overlay added)
- [ ] ⏸ Review

## Phase 9 — Setting
- [x] `settings` layout (3 pill tabs)
- [x] Setting, 8 Organisation profile `/settings/organisation?step`
- [x] 9 Manage users · 18, 19 invite
- [x] 10, 14 User details (opens as 14; delete both devices → 10) · 11, 12, 13, 16, 17 MFA wizard · 15, 20 change password
- [ ] ⏸ Review

## Phase 10 — API Reference / Documentation
- [ ] No frames designed — external links only (SCREEN_MAP Q4)
