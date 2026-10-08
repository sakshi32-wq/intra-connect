# Progress

**In progress:** Phase 1 — mock data layer (`src/mocks/db.ts`, `src/mocks/data/*`)

Legend: `[ ]` todo · `[x]` done. Review gate (⏸) = stop and wait for user approval.

> Design source = local exports in `docs/screens/` + `docs/assets/images/` (see CLAUDE.md → Tools & design source). Figma MCP is unavailable (View seat, ~20 calls/month) — do not call it. Colours are sampled from the PNGs with a script, never eyeballed. Icons = lucide-react.
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
- [ ] Mock layer: `src/mocks/db.ts` (latency 300–600 ms) + `src/mocks/data/*`
- [ ] `QueryClient` in router context; 404 page; `clean-demos`
- [ ] ⏸ Review

## Phase 2 — Auth
- [ ] 1 Sign In `/login` · mock auth (valid email + 6+ char password), session in localStorage, `beforeLoad` guard → `/login`
- [ ] 2 Sign Up `/signup`
- [ ] 3, 4 Forgot password `/forgot-password?step=request|sent`
- [ ] ⏸ Review (Playwright vs screenshots)

## Phase 3 — App shell
- [ ] `_app` layout: AppSidebar (nav, Documentation/API Reference links, footer env/org switchers + user card), PageHeader (white + navy variants)
- [ ] ⏸ Review

## Phase 4 — Overview
- [ ] Overview `/overview?step` (onboarding stepper + diagram)
- [ ] ⏸ Review

## Phase 5 — Connection
- [ ] Connection, 56, 57 list `/connections` (status filter, search, app type, pagination) · 53 empty state
- [ ] 58–62 Add connection wizard `/connections/new?step`
- [ ] 63 Connection detail `/connections/$connectionId`
- [ ] 64–67 Edit connection wizard `/connections/$connectionId/edit?step`
- [ ] ⏸ Review

## Phase 6 — Practices: list + add
- [ ] Practices list `/practices` · Frame 2 row menu · 52 empty state
- [ ] "Logs", 41, 54 Add practice `/practices/new?step`
- [ ] ⏸ Review

## Phase 7 — Practice detail (replaces the brief's "profile-menu pages": Frame 2 is the practice row menu)
- [ ] `$practiceId` layout (header + 5 pill tabs)
- [ ] 22–24 Profile (view, edit, success)
- [ ] 27, 28 Connection tab (empty, populated) · 47–51 attach wizard · 29–33 edit wizard
- [ ] 34, 46 Webhooks tab · 35 webhook detail · 42–45 add webhook · 36–39 edit webhook
- [ ] 25 Providers · 26 Patients
- [ ] ⏸ Review

## Phase 8 — Logs
- [ ] Logs 1 `/logs` (list + detail flow) · Frame 1 filter sheet (filters in URL)
- [ ] ⏸ Review

## Phase 9 — Setting
- [ ] `settings` layout (3 pill tabs)
- [ ] Setting, 8 Organisation profile `/settings/organisation?step`
- [ ] 9 Manage users · 18, 19 invite
- [ ] 10, 14 User details · 11, 12, 13, 16, 17 MFA wizard · 15, 20 change password
- [ ] ⏸ Review

## Phase 10 — API Reference / Documentation
- [ ] No frames designed — external links only (SCREEN_MAP Q4)
