# IntraConnect — frontend redesign

Frontend-only build of the IntraConnect Figma redesign (mock data, no backend).
Figma: `https://www.figma.com/design/rgEuwRzbC9FJreS2T77bbr/IntraConnects-Reedesign` — fileKey `rgEuwRzbC9FJreS2T77bbr`, everything on Page 1 (`0:1`), frames are 1920×1080.

## Resume protocol (do this at the start of every session)
1. Read `docs/PROGRESS.md` — especially the **In progress:** line.
2. Run `git log --oneline -15` and `git status`.
3. If a unit is half-done (In progress line set, uncommitted changes), finish it first, then tick it and commit.
4. Continue from the first unchecked item in `docs/PROGRESS.md`.
5. Respect the review gates: after each phase, stop and wait for the user's approval before starting the next.

## Working rules
- Update the **In progress:** line in `docs/PROGRESS.md` *before* starting a unit; tick + commit after finishing it. Small, frequent commits.
- Record discoveries in `docs/SCREEN_MAP.md` (frame → route + state), `docs/COMPONENTS.md` (UI patterns → shadcn), `docs/TOKENS.md` (design tokens → CSS vars).

## Tools & design source
The Figma account is a View seat limited to ~20 Figma MCP calls/month (already exhausted once), so the design was exported to local files. **The local files are the design source of truth.**
- `docs/screens/<frame>.png` — every frame, named after the Figma frame (`1.png` … `67.png`, `Overview.png`, `Connection.png`, `Practices.png`, `Logs.png`, `Logs 1.png`, `Setting.png`; `Frame 1.png` = Logs filter panel 614×1088; `Frame 2.png` = profile dropdown 184×235). The rest are 1920×1080.
- `docs/assets/images/` — EHR logos (`ehr-athenahealth.svg`, `ehr-epic.svg`, `ehr-cerner.svg`, `ehr-nextgen.svg`) and 2x illustrations (`illustration-convert-data.png`, `illustration-convert-laptop.png`, `illustration-push-data.png`, `illustration-transfer-data.png`, `illustration-pull-data.png`, `practice-hospital.png` = 3D hospital on the Overview "Practice" card). When building, copy them to `public/images/` and reference them from there.
- Read layout, text, sizes and states from the screenshots. **Never guess colours by eye**: sample exact hex values from the PNGs with a script (Python + Pillow) and record them in `docs/TOKENS.md`.
- **Figma MCP: treat as unavailable.** Never call `get_screenshot`, `get_metadata` or `download_assets`. Only use `get_design_context` / `get_variable_defs` if the user explicitly says a Dev/Full seat is available, and then only on one or two representative frames for exact tokens.
- Icons: none were exported — use **lucide-react** for every icon, closest match to the screenshot.
- Visual checks: Playwright MCP screenshots at 1920×1080 compared against the matching `docs/screens/<frame>.png`.
- shadcn MCP for registry search/add; Context7 for current TanStack Start/Router/Query, shadcn and Tailwind v4 docs (check before writing routing/SSR code).
- `design/screens/` (git-ignored) holds 7 early Figma MCP screenshots from before the switch; ignore it, `docs/screens/` supersedes it.

## Stack
TanStack Start (React, TS strict) · TanStack Router (file-based, zod `validateSearch`, loaders use `queryClient.ensureQueryData`) · TanStack Query (`queryOptions` factories, mutations + invalidation) · shadcn/ui + Tailwind v4 · react-hook-form + zod · lucide-react · pnpm.

## Architecture rules
- Data access only via `src/features/<feature>/api.ts` (`queryOptions` + mutation fns) → `src/mocks/db.ts` (in-memory, 300–600 ms fake latency). Components never import `src/mocks/*` directly.
- Mutations really mutate the in-memory db and invalidate related queries.
- Table state (filters, pagination, sorting, search) lives in URL search params, validated with zod.
- Don't hand-write components shadcn already provides. Translate Figma design-context output into shadcn + Tailwind idioms; never paste absolute-positioned output.
- No `any`, no unused/demo code. `pnpm build` and `tsc --noEmit` must pass.
