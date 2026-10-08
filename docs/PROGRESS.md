# Progress

**In progress:** Phase 0 — Discovery: screen map from local screenshots (`docs/screens/`)

Legend: `[ ]` todo · `[x]` done. Review gate (⏸) = stop and wait for user approval.

> Design source = local exports in `docs/screens/` + `docs/assets/images/` (see CLAUDE.md → Tools & design source). Figma MCP is unavailable (View seat, ~20 calls/month) — do not call it. Colours are sampled from the PNGs with a script, never eyeballed. Icons = lucide-react.

## Phase 0 — Discovery (no app code)
- [x] Project folder: `git init`, `.gitignore`, `CLAUDE.md` resume protocol, this file
- [x] MCP servers (shadcn, context7, playwright) in `.mcp.json`; pnpm fixed
- [x] Design exported to local files: 69 frames in `docs/screens/`, 10 images in `docs/assets/images/` (verified complete)
- [ ] `docs/SCREEN_MAP.md` — every frame → route + state, grouped by section (from the local screenshots)
- [ ] `docs/COMPONENTS.md` — reusable patterns → shadcn components (first draft exists from metadata-only analysis; verify against screenshots)
- [ ] `docs/TOKENS.md` — redo from pixel-sampled hex values (first draft exists but was eyeballed) → shadcn CSS vars
- [ ] ⏸ Present screen map + tokens; wait for approval

## Phase 1 — Foundation
- [ ] Scaffold TanStack Start (`npx @tanstack/cli@latest create`), pnpm, TS strict
- [ ] Tailwind v4 + shadcn init; theme tokens in `src/styles/app.css`; fonts
- [ ] Copy `docs/assets/images/*` → `public/images/`; logo (recreate from screenshot — not exported)
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
