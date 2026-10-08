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
- Figma reference screenshots live in `design/screens/<frame>.png` (git-ignored; re-fetch with the Figma MCP `get_screenshot` if missing).

## Stack
TanStack Start (React, TS strict) · TanStack Router (file-based, zod `validateSearch`, loaders use `queryClient.ensureQueryData`) · TanStack Query (`queryOptions` factories, mutations + invalidation) · shadcn/ui + Tailwind v4 · react-hook-form + zod · lucide-react · pnpm.

## Architecture rules
- Data access only via `src/features/<feature>/api.ts` (`queryOptions` + mutation fns) → `src/mocks/db.ts` (in-memory, 300–600 ms fake latency). Components never import `src/mocks/*` directly.
- Mutations really mutate the in-memory db and invalidate related queries.
- Table state (filters, pagination, sorting, search) lives in URL search params, validated with zod.
- Don't hand-write components shadcn already provides. Translate Figma design-context output into shadcn + Tailwind idioms; never paste absolute-positioned output.
- No `any`, no unused/demo code. `pnpm build` and `tsc --noEmit` must pass.
