# Progress

**In progress:** Phase 0 — Discovery (screenshots + screen map + components + tokens)

Legend: `[ ]` todo · `[x]` done. Review gate (⏸) = stop and wait for user approval.

## Phase 0 — Discovery (no app code)
- [x] Project folder: `git init`, `.gitignore`, `CLAUDE.md` resume protocol, this file
- [ ] Screenshot every frame → `design/screens/` (git-ignored)
- [ ] `docs/SCREEN_MAP.md` — every frame → route + state, grouped by section
- [ ] `docs/COMPONENTS.md` — reusable patterns → shadcn components
- [ ] `docs/TOKENS.md` — colors, type, radius, shadow, spacing → shadcn CSS vars
- [ ] ⏸ Present screen map + tokens; wait for approval

## Phase 1 — Foundation
- [ ] Scaffold TanStack Start (`npx @tanstack/cli@latest create`), pnpm, TS strict
- [ ] Tailwind v4 + shadcn init; theme tokens in `src/styles/app.css`; fonts
- [ ] Logo + assets exported from Figma
- [ ] Mock layer: `src/mocks/db.ts` (latency 300–600 ms) + `src/mocks/data/*`
- [ ] `QueryClient` in router context; 404 page; `clean-demos`
- [ ] ⏸ Review

## Phase 2 — Auth (frames 1–4)
_(per-frame checklist filled in from SCREEN_MAP after Phase 0 approval)_

## Phase 3 — App shell
## Phase 4 — Overview
## Phase 5 — Connection
## Phase 6 — Practices
## Phase 7 — Logs
## Phase 8 — Setting
## Phase 9 — API Reference
## Phase 10 — Profile-menu pages
