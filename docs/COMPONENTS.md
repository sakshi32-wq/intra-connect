# IntraConnect: UI component catalogue

Reusable UI patterns in the IntraConnect redesign and how to build them with shadcn/ui (Radix style, `@shadcn` registry) + Tailwind v4 + lucide-react, for the TanStack Start rebuild.

- **Source.** Every claim here was checked against the screenshots in `docs/screens/<frame>.png` and the per-frame visual inspection records. The earlier metadata-only draft has been corrected (see the change notes at the end).
- **Frame names** are the Figma frame names: `1`–`4` (auth), `Overview`, `Logs 1`, `Frame 1`, `Frame 2`, `Setting`, `Connection`, `Practices`, `Logs` (this is actually Add Practice), and `8`–`67`. Frames 5–7, 21, 40 and 55 don't exist. Routes and states are in `docs/SCREEN_MAP.md`, and colours are in `docs/TOKENS.md`. This file names colours only by role (primary blue, success green and so on).
- **File locations.**
  - Shared components: `src/components/<x>.tsx`.
  - Feature components: `src/features/<feature>/components/<x>.tsx`.
  - shadcn primitives: generated into `src/components/ui/*`. Don't hand-edit them except for the documented tweaks (§10).
- **Copy.** Fix the Figma typos in the build and keep a list for design sign-off. Examples:
  - Refrence → Reference, Atach → Attach, Summery → Summary, Connetion → Connection, Tpye/Tpye → Type, Nounce → Nonce, Data Modal → Data Model, Uplode → Upload.
  - Forget → Forgot, URl → URL, recive/reciived → receive, successfilly/siccessfully → successfully, Orthopediac → Orthopaedic.
  - The Sign In button reads "Sign Up" in frame 1.
- **Design errors to ignore** (implement the logical state instead):
  - The wrong active nav item in `Logs`, 53, 54, 62 and 67.
  - The wrong active pill in 11, 20, 34 and 36.
  - The page title "Setting" on Practices and Connection.
  - Card titles copied from other screens (28 "Practice Profile Details", 64 "Add New Connection Details").
  - The leftover grey "1. How intraconnects works" bar in 11 and 12.

---

## 1. App shell

### 1.1 AppSidebar — `src/components/app-sidebar.tsx`
- **Frames:** every app frame (all except 1–4, `Frame 1`, `Frame 2`).
- **Anatomy:**
  - Fixed 372px-wide (at 1920) dark-navy column.
  - **Logo slot** (top ~100px). It is empty in every frame, so recreate the IntraConnect logo there.
  - **Primary nav:** Overview, Connection, Practices, Logs, Setting.
  - A thin light divider.
  - **Secondary nav:** Documentation, API Reference.
  - **Footer panel:** a slightly lighter navy panel holding `EnvironmentSwitcher`, `OrganisationSwitcher` and `NavUser`.
- **Nav item:**
  - Default: white icon + label (~20px).
  - Active: full-width bright primary-blue background, plus a lighter-blue accent bar ~6px wide on the **right** edge.
  - No hover state is drawn.
- **shadcn:** `sidebar` (SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton `isActive` + `asChild` → TanStack `<Link>`, SidebarSeparator, SidebarFooter), `separator`.
- **Custom:**
  - The right-edge accent bar (an `after:` pseudo-element on `data-[active=true]`).
  - Sidebar CSS vars come from TOKENS.md.
  - Below `lg`, use the sidebar's built-in off-canvas Sheet with a `SidebarTrigger` in the header. This responsive behaviour is not drawn.

### 1.2 EnvironmentSwitcher / OrganisationSwitcher — `src/components/environment-switcher.tsx`, `src/components/organisation-switcher.tsx`
- **Frames:** sidebar footer in every app frame. They are **not** in the page header. The Figma places them in the sidebar footer, and the build follows the Figma.
- **Anatomy:** uppercase muted caption **CURRENT ENVIRONMENT** / **CURRENT ORGANISATION** above a white, full-width, compact select trigger with a dark value (**Production** / **DocMD**) and a `ChevronDown`.
- **shadcn:** `select` for both. The lists are small mock lists; no search is drawn.
- **Custom:** switching writes the choice to app state (cookie or localStorage), then calls `queryClient.invalidateQueries()` / `router.invalidate()`.

### 1.3 NavUser (sidebar user card) — `src/components/nav-user.tsx`
- **Frames:** sidebar footer in every app frame.
- **Anatomy:** a white rounded card containing a 40px photo avatar, **James Joy**, small muted **Jamesjoy@xyz**, and a `ChevronDown` on the right.
- **Menu:** not designed. **`Frame 2` is NOT this menu** (see 4.4). Proposed items are User Details (→ Settings › User Details) and Log out.
- **shadcn:** `dropdown-menu`, `avatar` (AvatarImage + initials AvatarFallback; the avatar photo was not exported).

### 1.4 PageHeader — `src/components/page-header.tsx`
- **Frames:** every app frame.
- **Row 1:** H1 title (~32px), a vertical divider, a breadcrumb (`ChevronRight` separators; ancestors muted, current item darker), and a right-aligned action slot.
- **Optional row 2:** `PillTabs` (1.5) and/or a toolbar. A primary action can also sit right-aligned on this row: **+ Invite New User** (9), **+ Add New Webhook** (34).
- **Variants:**

  | Variant | Frames | Look |
  |---|---|---|
  | `navy` | Overview, Logs 1 | navy band, white title, light-grey breadcrumb; Overview has no breadcrumb; Logs 1 has a primary **Filters** button on the right |
  | `white` (default) | all other app frames | white with a bottom shadow, dark title |

- **Heights:** ~98px with one row, ~157px with two rows (tabs or toolbar).
- **List-page toolbar in row 2:**
  - Practices: `TableSearch` + **+ Add New Practice**.
  - Connection/56/57: `StatusFilter` + `TableSearch` + **App Type** select + **+ Add New Connection**.
  - The table then starts directly below the header, full-bleed, with no card.
- **shadcn:** `breadcrumb` (Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink `asChild` `<Link>`, BreadcrumbPage, BreadcrumbSeparator), `separator orientation="vertical"`, `button`.
- **Custom:** build breadcrumbs from route `staticData` / `useMatches()`. Don't copy Figma's breadcrumbs, which contain many copy-paste errors.

### 1.5 PillTabs (route sub-nav) — `src/components/pill-tabs.tsx`
- **Frames:**
  - Settings: **Organisation Profile | Manage User | User Details** (Setting, 8–20).
  - Practice detail: **Profile | Connection | Webhooks | Providers | Patients** (22–39, 42–51).
- **Anatomy:**
  - A row of separate small rectangular buttons (radius ~4, ~2px gap).
  - Active: solid primary blue with white text.
  - Inactive: white background with a 1px primary border and primary text.
- **Build:** a `<nav>` of `button` (`variant="default"` when active, `"outline"` otherwise, `size="sm"`) with `asChild` TanStack `<Link>`. Set `aria-current="page"` from `useMatchRoute`.
  - Don't use `tabs`. These are routes, not panels.

### 1.6 SectionBar — `src/components/section-bar.tsx`
- **Frames:**
  - Grey tone: "1. How intraconnects works" (Overview; also leftovers in 11 and 12), "Multi- factor Authentication" (16).
  - Blue tone: "Change password" (15), "Invite New User" (18).
- **Anatomy:** a full-width ~78px bar with a bold ~20–24px title. Tone `muted` (light grey) or `accent` (light blue).
- **Build:** a plain `div` with variants via `cva`. There is no shadcn equivalent.

### 1.7 ContentCard (card with tinted header) — `src/components/content-card.tsx`
- **Frames:**
  - Blue header: `Logs` "Add Details of New Practice", 22/41 "Practice Profile Details", 27/28 "Connection Details", 35/46 "Webhook Details", 63 "Connection Details".
  - Grey header (wizards): 29–32, 47–50 "Edit/Attach Connection", 36/42–44 "Add/Edit Webhook Details", 58–61 "Add New Connection Details", 64–66 "Edit Connection Details".
- **Anatomy:**
  - A white card with a soft shadow and no visible border.
  - A full-width header strip (~78px) with a semibold title on the left and an optional `actions` slot on the right.
  - In the actions slot: a `StatusSwitch` framed variant and/or an outline **Edit Details** button with `SquarePen`.
- **Props:** `tone: 'accent' | 'muted'`, `title`, `actions?`, `children`.
- **shadcn:** `card` (Card, CardHeader, CardTitle, CardAction, CardContent). Override the header background with the tone.

---

## 2. Navigation and flow

### 2.1 Stepper — `src/components/stepper.tsx`
No shadcn equivalent, so it is custom.

- **Frames and step sets:**

  | Flow | Frames | Steps |
  |---|---|---|
  | Overview onboarding | Overview | How Intraconnects works · Pre-requisite Process · Pre-requisite Process · Create Practice, + trailing `ChevronRight` icon button |
  | MFA | 11, 12, 16 | Register · MFA Set Up |
  | Practice connection attach/edit | 29–32, 47–50 | EHR Name · EHR Type · Practice ID · Summary |
  | Webhook add/edit | 36–38, 42–44 | Webhook Details · Webhook Summary · Verification |
  | Add connection | 58–61 | Getting Started · Connection Type · Connection Details · Connection Summary |
  | Edit connection | 64–66 | Connection Type · Connection Details · Connection Summary |

- **Anatomy:**
  - A full-width light-blue band (~78px).
  - Items are laid out inline, left to right. There are **no connector lines**.
  - Each item is a ~20–24px circle indicator plus a primary-blue label (~20px). **All labels are blue**, whatever the state.
- **Indicator states:** Figma is inconsistent here (29/47/58 put a check on the current step 1; 30/31/59 revert past steps to outlined numbers; Overview shows step 1 checked and step 2 filled). Standardise on:
  - **current**: filled primary circle with a white number.
  - **completed**: primary `CircleCheck`.
  - **upcoming**: 1px primary-outlined circle with a primary number.
- **API:** `<Stepper steps={string[]} current={number} trailing?={ReactNode} />` with `aria-current="step"` on the current item. Steps are not clickable in the design.
- **Custom:** everything (flex row, cva indicator). Wizard step state lives in a zod search param. `react-hook-form` holds the whole wizard and each step triggers validation of its own fields before **Next**.

### 2.2 FormActions (wizard/form footer) — `src/components/form-actions.tsx`
- **Frames:** all wizards and forms (Setting, 11, 15, 16, 18, `Logs`, 29–32, 36–38, 41–44, 47–50, 58–61, 64–66, `Frame 1`).
- **Anatomy:**
  - A left-aligned pair of small buttons (~36px tall, ~22px gap).
  - First button, outline: **Cancel** on the first step, **Previous** later, **Go back** in 41, **Clear filters** in `Frame 1`.
  - Second button, primary: **Next**, **Proceed**, **Save**, **Save Changes**, **Invite**, **Generate Token**, **Apply Filters**.
  - On a final summary step, Figma's **Next** submits. Label it **Submit** / **Attach** / **Update**, and note the change for sign-off.
- **shadcn:** `button` (`variant="outline"` + `default`), `spinner` inside the primary button while the mutation is pending.

### 2.3 Pagination bar — `src/components/data-table/data-table-pagination.tsx`
- **Frames:** Practices, Connection, 56, 57 (table footer) and Logs 1 (under the log list).
- **Anatomy:**
  - A light-blue footer strip.
  - On the left, **Showing 1 to 10 of 100 Entries** (tables only; Logs 1 has no text).
  - On the right: a prev `ChevronLeft` in a small white bordered box, plain page numbers `1 2 3 …… 5`, and a next `ChevronRight` box.
  - Active page: a small solid primary square with a white number.
- **shadcn:** `pagination` (Pagination, PaginationContent, PaginationItem, PaginationLink `isActive`, PaginationPrevious/PaginationNext icon-only, PaginationEllipsis).
- **Custom:**
  - Page-window logic.
  - Links set `?page=` via TanStack `<Link search>`.
  - Fix the Figma inconsistency (page 2 is active while the text says 1–10).

---

## 3. Data display

### 3.1 DataTable — `src/components/data-table/data-table.tsx`
- **Frames and columns:**

  | Table | Frames | Columns | Container |
  |---|---|---|---|
  | Practices | Practices | ID : Name · Contact · Location · Email · Website · Status · Action | full-bleed, toolbar in header, pagination |
  | Connections | Connection, 56, 57 | EHR · ID : Name · Client ID · Org Redirect URL · App Type · Status · Action | full-bleed, toolbar in header, pagination |
  | Manage Users | 9 | ID : User Name · User Status · User Role · Email · PHI Access · Owner/ User · MFA Status | shadow card; **grouped rows**; no pagination/search |
  | MFA devices | 14 | Device Name · App Name · App Description · Authentication Date & Time · Action | bordered card, no row dividers |
  | Providers | 25 | Provider · Gender · Service type · EHR ID · NPI ID · Status | shadow card |
  | Patients | 26 | Patient · Gender · DOB · Service Use · EHR ID · Status | shadow card |
  | Webhooks | 34 | ID : Name · Token ID · URL · Verification · Status · Action | shadow card |

- **Anatomy:**
  - Header row: light-blue background, dark ~20px text, no sort affordance.
  - Body rows: ~70px tall with thin grey dividers. Cells are muted ~20px text; names are bold dark.
- **Grouped rows (9):**
  - A muted small uppercase label row (**PENDING INVITES**; the second group should read **ACTIVE USERS**; Figma repeats PENDING INVITES).
  - A full-width **primary-blue divider** between the groups.
  - Build: a `TableRow` with a `colSpan` cell.
- **shadcn:** `table`, plus the `@tanstack/react-table` data-table pattern (`manualPagination` / `manualFiltering`, state from route search params), `skeleton` (loading rows), `empty` (no results; not drawn).
- **Not drawn:** sorting. Don't add sortable headers unless asked.

### 3.2 Table cells — `src/components/data-table/cells.tsx`

| Cell | Frames | Build |
|---|---|---|
| `CopyableCell` (copy icon **before** the value) | names in Practices, Connection, 9, 34; Client ID (Connection); Token ID (34); EHR ID (25, 26) | `CopyButton` (5.1) + text |
| `TruncatedCell` (`https://pa...`, `c127da....`, `http://pa....`) | Connection, 34 | CSS `truncate` + `tooltip` with the full value |
| `AvatarNameCell` (round photo + bold name) | 25, 26 | `avatar` (initials fallback; no photos exported) |
| `EhrLogoCell` | Connection, 56, 57 | `EhrLogo` (5.4) |
| `ExternalLinkCell` (icon only, no URL text) | Practices (Website) | `button variant="ghost" size="icon"` `asChild` `<a target="_blank">` + `SquareArrowOutUpRight` |
| `StatusSwitchCell` | Practices, Connection, 25, 26, 34 | `StatusSwitch` (3.4) |
| `RowActionsCell` (kebab) | Practices (→ `PracticeRowActions`, 4.4), Connection | `dropdown-menu` + `button variant="ghost" size="icon"` + `EllipsisVertical`. The Connection menu items are not designed; propose View details / Edit |
| `RowIconAction` | 14 (delete, `Trash`), 34 (edit, `SquarePen`) | `button variant="ghost" size="icon"` + `tooltip`; delete opens `ConfirmDialog` (6.3) |

### 3.3 Badges — `src/components/status-badge.tsx`
These are small rectangular badges (radius ~2, ~36px tall in 9, compact elsewhere), built on shadcn `badge` with extra `cva` variants.

| Variant | Labels (exact) | Look | Frames |
|---|---|---|---|
| `success` | **Active User**, **Access**, **Active** (MFA) | light-green fill, green 1px border, green text | 9 |
| `muted` | **Pending Invites** | light-grey fill, no border, dark text | 9 |
| `inactive` | **Inactive** (MFA) | grey fill, grey border, dark text | 9 |
| `neutral` | **Owner**, **Sub-user** | white fill, grey border, dark text | 9 |
| `verified` | `ShieldCheck` + **Verified** | as `success` with a leading icon | 34 |
| — (unverified) | empty light-grey block in the design | render a `muted` **Not verified** badge (design shows a blank placeholder) | 34 row 3 |
| `appType` | **Provider**, **System**, **Patient** | white fill, grey 1px border, muted text (one style for all) | Connection, 56, 57 |
| `chip` | specialties **Orthopaedic**, **Physiotherapy**, **Neuro-special**, **Psychology**, **Physicians**, **Acupuncturist** | white fill, primary 1px border, primary text (one style for all) | 22, 41 |

**Log status** (Logs 1) is **text only**, not a badge: **Successful** in green or **Failed** in red, semibold. Put it in `LogCard`.

### 3.4 StatusSwitch — `src/components/status-switch.tsx`
- **Frames:**
  - `pill`: Practices, Connection, 56, 57, 25, 26, 34.
  - `framed`: 28 "Connection status :", 35 "Webhook status:", 63 "Connection status :".
- **Anatomy:**
  - **`pill`:** a light-grey rounded pill holding a switch on the left and a muted label (**Active** / **Inactive**) on the right. The switch is **green** when on and has a grey track when off.
  - **`framed`:** a white box with a primary 1px border, a primary label ("Connection status :"), then the `pill`. It sits in the `ContentCard` header actions.
- **shadcn:** `switch` + `label`. Override the checked colour to the success green: `data-[state=checked]:bg-success`.
- **Custom:**
  - An optimistic mutation that invalidates the list and detail queries.
  - A `sonner` toast on error with rollback.
  - The same green-switch styling applies to the **Remember me** switch (1) and the App Type Status switches (30, 48).

### 3.5 DetailList (key : value) — `src/components/detail-list.tsx`
- **Frames:**
  - `block` variant: 22, 28, 41, 63 (practice/connection details); 29–32, 47–50 (wizard "Practice Details" context box + summary); 35 (webhook detail); 13, 17, 19 (success cards).
  - `plain` variant: 16 (Security Credentials); 37, 43 (webhook summary); 61, 66 (connection summary).
- **Anatomy:**
  - Rows read `Label : value`, with a fixed label column (~245px), a `:` column, then the value.
  - Labels are muted and values dark. 30/31/48/49 invert this (dark labels, grey values); standardise on muted labels.
  - Required labels carry a red `*`.
  - `columns: 1 | 2` (22, 41, 63, 61 use two columns).
  - Optional `title` (bold, e.g. **Practice Details**, **Practices Provided**, **Physical Address :**, **Security Credentials**).
  - Values can be text, multi-line text (EHR Type: "Provided - Epictest12 / Patient - EpicPatient 13"), a **primary-coloured link** (URLs in 37, 43, 61, 66), or a chip list (`StatusBadge chip`).
- **Variants:**
  - `block`: light-grey filled panel, radius ~4, no border. Consecutive blocks are stacked with ~16px gaps (22, 28, 63 use 3 blocks).
  - `plain`: no background.
  - `card`: used inside `SuccessState`; light-grey fill, radius ~8, compact, ~542px wide.
- **Build:** semantic `<dl>/<dt>/<dd>` in a CSS grid. No shadcn primitive is needed. Item options: `required`, `href`, `multiline`.

### 3.6 CopyButton — `src/components/copy-button.tsx` + `src/hooks/use-copy-to-clipboard.ts`
- **Frames:**
  - Icon: see `CopyableCell` (3.2).
  - **Copy Secret key** link-button (12).
- **Anatomy:**
  - A small grey `Copy` icon (two overlapping squares) before the value.
  - After a click, swap it to `Check` for ~1.5s and show a "Copied" `tooltip`.
- **shadcn:** `button variant="ghost" size="icon"` (or `variant="link"` for the text form), `tooltip`.
- **Custom:** a hook wrapping `navigator.clipboard.writeText`.

---

## 4. Feature composites

### 4.1 Auth (`src/features/auth/components/`)

| Component | Frames | Anatomy | shadcn |
|---|---|---|---|
| `AuthLayout` (inline in `src/routes/_auth.tsx`) | 1–4 | full-bleed diagonal gradient (slate-indigo bottom-left → cyan top-right); no logo drawn (none added — Q1); card centred (frame 1 has it right-aligned; centred everywhere) | — |
| `AuthCard` (`auth-card.tsx`) | 1–4 | white, 581px wide, radius ~24, centred content: muted eyebrow **Welcome Back!**, ~32px title, sub-line with a cyan link (**Sign Up** / **Sign In**) | `card` |
| `SignInForm` | 1 | `Mail` + **Email ID**; `LockKeyhole` + **Password** + `EyeOff`/`Eye` toggle; row: green switch **Remember me** · link **Forgot Password**; full-width auth-primary **Sign In** | `field`, `input-group` (InputGroupAddon + InputGroupInput + InputGroupButton), `switch`, `button` |
| `SignUpForm` | 2 | `User` **Username**, `Mail` **Email ID**, **Password** (with toggle), static grey bullet hints (below), **Confirm Password** (Figma label reads "Password"), full-width **Sign Up**; header copy should be "Create Account" / "Already have an account? Sign In" | as above |
| `PasswordHints` | 2 (reuse in 15) | **static** muted bullet list (not a live checklist): "Password must include these Categories: A-Z, a-z, 0-9, and Special Characters (-!@#$%^&*)" · "Password must be longer than 8 Characters, and Shorter than 250 Characters" | `field` FieldDescription |
| `ForgotPasswordForm` | 3 | title **Forgot Password**, "Want to get back? Sign In", muted instruction, `Mail` **Email ID**, full-width **Get Verification Link** + trailing `ArrowRight` | `field`, `input-group`, `button` |
| `ResetLinkSent` | 4 | `SuccessState size="lg"` (136px medallion) inside `AuthCard`: heading, "An email is sent to <email>", muted line, footer "Didn't receive a verification mail? **Resend Link**" (link) | `button variant="link"` |

`PasswordInput` (`src/components/password-input.tsx`): an `input-group` with a show/hide `InputGroupButton` (`Eye`/`EyeOff`). It is shared by the auth forms and `ChangePasswordForm` (15).

### 4.2 Overview (`src/features/overview/components/`)
- **Frame:** Overview. There are **no KPIs or charts**. Don't add `chart` or `recharts`.
- **Layout:**
  - `SectionBar muted` "1. How intraconnects works".
  - `Stepper` (4 steps + trailing `ChevronRight` icon button that advances).
  - `HowItWorksDiagram`.
  - Lead paragraph (~24px).
  - `GlossaryCard`.
- **`HowItWorksDiagram`** (`how-it-works-diagram.tsx`): a three-column grid, stacked below `lg`.
  - **Left:** `EhrStack`, a dark navy rounded card with 4 white logo tiles (`EhrLogo` athenahealth, Epic, Cerner, nextgen) and a solid primary **EHRs** label bar.
  - **Centre:** a light-blue rounded panel with a 3×2 grid of illustrated tiles (image + caption) and an **Intraconnects** caption between the rows. The middle-column tiles are white with a primary border; the others are borderless.
    - Top row: Convert data into unified format · Convert data into unified format (bordered) · Push data by webhook.
    - Bottom row: Transfer the data from practice · Convert data into EHR format (bordered) · Pull the data from practice.
  - **Right:** `PracticeTile`, a light-grey card with the hospital illustration and a dark-grey **Practice** label bar.
- **`GlossaryCard`:** a white card with a 1px primary border and a 2×2 grid of title + description: **EHR**, **Healthcare Platform**, **Practice**, **Intraconnects**.
- **shadcn:** `card`, `button` (icon). Everything else is layout.

### 4.3 Logs (`src/features/logs/components/`)
- **Frames:** Logs 1 (list + detail) and `Frame 1` (filter sheet). The header is the `navy` variant with a primary **Filters** button.
- **`LogList`:** left column (~455px), titled **Logs**. A vertical `scroll-area` (thin grey scrollbar is visible) of `LogCard`s, then the pagination bar (2.3) without entries text.
- **`LogCard`:**
  - A white bordered card with a light shadow.
  - A grey inner band: small label **Data Model** over the value **Bombay. Diagosticrepory.claim**.
  - A three-column label/value row: **Event** (Update) · **Log Type** (Request) · **Log Status** (Successful in green / Failed in red).
  - Timestamp **12 Apr, 2023 12:30 AM**.
  - The whole card is a `<Link search={{ logId }}>`.
  - No selected style is drawn. Use `ring-2 ring-primary` + `aria-current`.
- **`LogDetail`:** a heading `Log ID : <id>` (bold dark label, muted value) above `LogFlowDiagram`.
- **`LogFlowDiagram`:**
  - A light-blue shadowed panel holding a 2×3 grid of `FlowNode`s.
  - Row 1: IC Request (Involved- Bombay, Hospital) → IC Request (Involved- Intraconnects) → EHR Response (Involved-Epic).
  - A ↓ arrow from row 1 column 3 to row 2 column 3.
  - Row 2: the same three nodes, arrows again left → right.
  - Column captions: **Practices** (primary), **Intraconnects** (dark), **EHR** (primary).
  - Connectors are thin grey lines with chevron heads. Draw them in CSS/SVG, or use `ArrowRight`/`ArrowDown`.
- **`FlowNode`:**
  - A white bordered box: status icon (`CircleCheck` green; `CircleX` red for failed, which is not drawn), a bold title and a small muted "Involved-" line.
  - Selected: solid primary background with white text and icon.
  - Build as a `button` with `aria-pressed`.
  - What a selected node reveals is **not designed**. Don't invent a payload panel without sign-off.
- **`LogsFilterSheet`** (`Frame 1`):
  - A right `sheet`, ~612px wide.
  - Header with a drop shadow: **Filter the logs by** (~32px). There is **no close X** in the design; close with Esc or the overlay.
  - Five stacked fields, each a bold label over a full-width select with a placeholder:
    - **EHR Connection** — "Filter by EHR"
    - **Practices** — "Filter by practices"
    - **Data Model** — "Filter by data model"
    - **Event Type** — "Filter by event type"
    - **Status** — "Filter by status"
  - Directly below the fields (not pinned to the bottom): **Clear filters** (outline) and **Apply Filters** (primary).
  - shadcn: `sheet` (SheetContent `side="right"`, SheetHeader, SheetTitle), `field`, `label`, `select`, `button`.
  - Custom: a local draft state. **Apply** calls `navigate({ search: (p) => ({ ...p, ...filters, page: 1 }) })` and closes the sheet. **Clear** removes the keys.

### 4.4 Practices (`src/features/practices/components/`)

| Component | Frames | Anatomy / notes | Built from |
|---|---|---|---|
| `PracticesTable` | Practices | 3.1 columns; Website = external-link icon; status pill; kebab | DataTable, cells, StatusSwitch, PracticeRowActions, pagination |
| `PracticeRowActions` | `Frame 2` | `dropdown-menu`: five plain text items, no icons or dividers: **Profile**, **Provider**, **Patients**, **Connection**, **Webhook** → `/practices/$id/<tab>` | `dropdown-menu` (DropdownMenuItem `asChild` `<Link>`) |
| `PracticesEmptyState` | 52 | `OnboardingEmptyState` (6.2) with `practice-hospital.png`, CTA **+ Add New Practice** | 6.2 |
| `PracticeForm` (add + edit) | `Logs` (add, inside `ContentCard accent` "Add Details of New Practice"), 23 (edit, "Practice Profile Details") | stacked full-width fields: **Practice Name\***, **NPI Number\***, **E-mail\***, **Specialty Provided\*** (multi-select), separator, "Physical Address" 2-col grid **Address line 1\*** · **Address line 2** · **City\*** · **State\***; each with muted helper text ("Ex : Birla Hospital. Enter practice name to connect" etc.). Add footer: **Previous** / **Next**. Figma omits Contact, Website, Zip code that 41/22 display: add them | `field`, `input`, `SpecialtyMultiSelect`, `separator`, FormActions |
| `SpecialtyMultiSelect` | `Logs`, 23 | trigger looks like an input with placeholder "Select Specialty"; selected values show as `chip` badges | `popover` + `command` (CommandItem with `Check`) + `badge` |
| `PracticeReview` | 41 | `ContentCard accent` "Practice Profile Details" + outline **Edit Details** (`SquarePen`) → back to form; DetailList blocks (2-col details + specialty chips; address); footer **Go back** / **Save** | ContentCard, DetailList, FormActions |
| `PracticeProfileCard` | 22 | as 41 but read-only: three DetailList blocks (details · **Practices Provided** chips · **Physical Address :**); **Edit Details** → 23 | ContentCard, DetailList, StatusBadge chip |
| `PracticeConnectionCard` | 28 | `ContentCard accent` "Connection Details" + StatusSwitch `framed` + **Edit Details**; 3 DetailList blocks (practice · EHR · OAuth) | ContentCard, StatusSwitch, DetailList |
| `PracticeConnectionEmpty` | 27 | `OnboardingEmptyState` inside `ContentCard accent` "Connection Details"; CTA **+ Attach Connection** | 6.2 |
| `AttachConnectionWizard` (attach + edit) | 29–32, 47–50 → 33/51 | `ContentCard muted` + Stepper (4). Step body: H2 + muted sub-line, `DetailList block` "Practice Details" context, then step field(s): **EHR Name\*** (select; Figma draws no chevron), **EHR Type\*** (`AppTypeConnectionRow` ×2), **Practice ID\***, Summary (DetailList only); FormActions | Stepper, DetailList, `select`, `input`, AppTypeConnectionRow |
| `AppTypeConnectionRow` | 30, 48 | light-grey row: left **App Type Status** + green switch + **Patient**/**Provider**; right **Connection Name** select ("EpicTest12" / "Select Connection Name"); disable the select while the switch is off | `switch`, `label`, `select`, `field` |
| `ProvidersTable`, `PatientsTable` | 25, 26 | 3.1 columns; avatar + name; copyable EHR ID; status pill | DataTable, cells |

`PracticeDetailLayout` (`practice-detail-layout.tsx`) is the route layout for 22–51. It renders `PageHeader` with the title **Practice Details**, the breadcrumb, the `PillTabs` (Profile | Connection | Webhooks | Providers | Patients) and an optional right action (**+ Add New Webhook** on 34), followed by the `<Outlet/>`.

### 4.5 Webhooks (`src/features/webhooks/components/`)

| Component | Frames | Anatomy / notes | Built from |
|---|---|---|---|
| `WebhooksTable` | 34 | inside a shadow card, no card header; columns per 3.1; Verification badge; status pill; edit icon → wizard | DataTable, cells, StatusBadge `verified` |
| `WebhookDetailCard` | 35 | `ContentCard accent` "Webhook Details" + StatusSwitch `framed` "Webhook status:" + **Edit Details**; DetailList block 1 (Webhook Name, Webhook URL, Method Type), block 2 (Token ID) | ContentCard, StatusSwitch, DetailList |
| `WebhooksBlocked` | 46 | `OnboardingEmptyState` in `ContentCard accent` "Webhook Details": no connection attached yet, CTA **+ Attach Connection** (→ Connection tab); steps card shows one step "2 Add Webhook to the practice" | 6.2 |
| `WebhookWizard` (add + edit) | 36–38 (edit), 42–44 (add) → 39/45 | `ContentCard muted` + Stepper (3). Step 1: `CenteredFormCard` "Webhook Details" with **Webhook Name\***, **Webhook URL\***, **Method Type** select (GET/POST…), each with a helper; **Cancel**/**Next**. Step 2: plain DetailList (URL as link); **Previous**/**Next**. Step 3: two columns, left **Token ID** read-only input + helper + **Previous**/**Generate Token**, right `Callout muted` "Generate New Verification Token" | Stepper, CenteredFormCard, `field`, `input`, `select`, DetailList, Callout |

### 4.6 Connections (`src/features/connections/components/`)

| Component | Frames | Anatomy / notes | Built from |
|---|---|---|---|
| `ConnectionsTable` | Connection, 56, 57 | 3.1 columns; EHR logo; copyable name + Client ID; truncated URL; `appType` badge; status pill; kebab | DataTable, cells |
| `ConnectionsToolbar` | Connection, 56, 57 | `StatusFilter` **All \| Active \| Inactive**: three separate small buttons, selected = solid primary, others = outline primary; `TableSearch`; **App Type** select (outlined, `ChevronDown`); **+ Add New Connection** | `toggle-group type="single"` (each item styled like PillTabs) bound to `?status=`; `select`; `button` |
| `ConnectionsEmptyState` | 53 | `OnboardingEmptyState`; banner "No connection is added in the system yet!"; 2-step guide (step 1 "Pre-requisite Of EHR integration" + **Learn More** link; step 2 "Create Connection" + bullets); CTA **+ Add New Connection** | 6.2 |
| `ConnectionWizard` (add 4-step / edit 3-step) | 58–61 → 62; 64–66 → 67 | `ContentCard muted` + Stepper. **Getting Started** (58): H2, sub-line, lead sentence, 3 bullets with **green dot markers**, **Cancel**/**Next**. **Connection Type** (59, 64): `CenteredFormCard` with **EHR Name\*** select ("Select EHR") + **App Type for Connection\*** select ("Select App Type"), helpers, FormActions, then a `Callout muted` (59: "Pre-requisite link EHR integration : **Link**" + note; 64: **Note to Remember** + text). **Connection Details** (60, 65): `ConnectionDetailsForm`. **Summary** (61, 66): 2-col plain DetailList (URLs as links) + **Previous**/**Next**(submit) | Stepper, CenteredFormCard, `select` (EHR options can show `EhrLogo`), Callout, DetailList |
| `ConnectionDetailsForm` | 60, 65 | context lines "EHR Name : Athena", "Connection App Type : Patient", separator, **Redirect URL :** (read-only, value + CopyButton); 2-col grid: **Name\*** · **Client ID\*** · **Scope\*** · **Client Secret** · **Audience** · **Nonce** · **Organisation Redirect URL\*** · **Launch**, each with a helper | `field`, `input`, `separator`, CopyButton |
| `ConnectionDetailCard` | 63 | `ContentCard accent` "Connection Details" + StatusSwitch `framed` + **Edit Details**; 3 DetailList blocks: identity (1-col), EHR (2-col), OAuth (2-col) | ContentCard, StatusSwitch, DetailList |

### 4.7 Settings (`src/features/settings/components/`)

| Component | Frames | Anatomy / notes | Built from |
|---|---|---|---|
| `SettingsLayout` | Setting, 8–20 | `PageHeader` title **Setting**, breadcrumb, PillTabs (Organisation Profile \| Manage User \| User Details), optional right action **+ Invite New User** (9) | PageHeader, PillTabs |
| `OrganisationProfileForm` | Setting → 8 | top row: `ImageUploadCard` (caption **Organisation Profile**) + **Organisation Name\*** and **Organisation Overview\*** (textarea); separator; 2-col **Alert Email\*** · **Sales Email\*** · **Contact** · **Website** · **Twitter**; separator; **Categories** select · **Env Type** select; primary **Save** | ImageUploadCard, `field`, `input`, `textarea`, `select`, `separator` |
| `UsersTable` | 9 | grouped table (3.1); badges per 3.3; copyable name | DataTable, StatusBadge |
| `InviteUserForm` | 18 → 19 | `SectionBar accent` "Invite New User" + `CenteredFormCard` titled "Invite User in current organisation" with a centred muted note; **Name**, **E-mail**, **User role** select; **Cancel**/**Invite** | SectionBar, CenteredFormCard, `field`, `input`, `select` |
| `UserDetailsForm` | 10, 14 | top row: `ImageUploadCard` (round-silhouette placeholder, caption **User Profile**) + **User Name\***, **Email ID\***, **Contact\***; thick separator; H2 **Multi-factor Authentication device** + `MfaStatusCard` (10) **or** primary **+ Register with New Device** + `MfaDevicesTable` (14); separator; H2 **Manage Password** + muted sub-line + `PasswordSummaryCard`. No Save button is drawn; add one for sign-off | ImageUploadCard, `field`, `input`, `separator` |
| `MfaStatusCard` | 10 | white shadowed card (not an alert): **red** title "Multi-factor Authentication is not complete yet!", muted text, primary **+ Register with New Device** | `card`, `button` |
| `MfaDevicesTable` | 14 | bordered card, light-blue header, no row dividers; delete `Trash` → ConfirmDialog | DataTable, ConfirmDialog |
| `PasswordSummaryCard` | 10, 14 | white shadowed card: bold "Current Password : ••••••••", muted "Last Update : 23 January, 2021 at 03:48 PM", right-aligned outline **Change Password** + `ArrowRight` | `card`, `button` |
| `ChangePasswordForm` | 15 → 20 | `SectionBar accent` "Change password" + `CenteredFormCard` "Verify the password before the changing": **Password**, separator, **New Password**, **Confirm Password**; **Cancel**/**Save Changes** | SectionBar, CenteredFormCard, PasswordInput, PasswordHints |
| `MfaWizard` | 11 → 12 or 16 → 13/17 | `SectionBar muted` "Multi-factor Authentication" (replaces the leftover bar) + Stepper (Register · MFA Set Up) + white shadowed panel | Stepper, SectionBar |
| `MfaMethodPicker` | 11 | inner card "Register for MFA" + text + **Learn More** link; muted prompt "Select one option below to authenticate"; two full-width shadowed radio cards: radio · grey square icon tile (`Smartphone` / `KeyRound`) · title + description (**Authenticator App** / **Security Key**); no default selection; **Cancel**/**Proceed** | `radio-group` in the `field` choice-card pattern (FieldLabel wrapping Field), `card`, `button` |
| `TotpSetup` | 12 | H3 "Set up virtual MFA device" + ordered list: (1) install app, with inline links; (2) scan: `MfaQrCode` in a ~220px white shadowed tile, then "Alternatively, you can type the secret key, **Copy Secret key**" (CopyButton link); (3) two code fields **MFA code 1** / **MFA code 2**. No buttons are drawn: add **Cancel**/**Verify** | `MfaQrCode`, CopyButton, `input-otp` (2 × 6 slots; the design draws two plain inputs), FormActions |
| `MfaQrCode` | 12 | renders the `otpauth://` URI | `qrcode.react` (`QRCodeSVG`) |
| `SecurityKeySetup` | 16 | H3 + link "See the list of browsers that support U2F keys."; plain DetailList **Security Credentials** (User ARN, Path, Creation time); separator; ordered steps; link **Troubleshoot U2F** + `ArrowRight`; **Cancel**/**Proceed** | DetailList, `separator`, `button variant="link"` |

---

## 5. Shared building blocks

### 5.1 TableSearch — `src/components/table-search.tsx`
- **Frames:** Practices, Connection, 56, 57.
- **Anatomy:**
  - An **underline-style** input, ~479px: no box, a bottom border only.
  - A leading `Search` icon.
  - Placeholder **Search ( Ex. TestNextgenpatient)**.
- **shadcn:** `input-group` (InputGroupAddon + InputGroupInput) restyled to a bottom border only.
- **Custom:** debounce by 300ms, write `?q=`, and reset `page` to 1.

### 5.2 CenteredFormCard — `src/components/centered-form-card.tsx`
- **Frames:** 15, 18, 36, 42, 59, 64.
- **Anatomy:**
  - A ~648px card centred in the content, with a 1px grey border, radius ~8 and a soft shadow.
  - Centred title (~24px) with an optional centred muted subtitle.
  - Full-width fields and left-aligned `FormActions`.
  - An optional `Callout` below the actions (59, 64).
- **shadcn:** `card`.

### 5.3 ImageUploadCard — `src/components/image-upload-card.tsx`
- **Frames:** Setting (org logo, default caduceus image), 10/14 (user avatar, grey silhouette).
- **Anatomy:**
  - A 208×242 card with a grey border.
  - The image or placeholder fills the top.
  - A grey footer strip holds `CloudUpload` + **Upload Org Logo**. In 10/14 the strip should read **Upload Profile Photo**.
  - A bold caption below the card.
- **Build:** `card` + a hidden `<input type="file" accept="image/*">` triggered by a `button variant="ghost"`. Preview with `URL.createObjectURL`. The placeholder is the `UserRound` icon (no caduceus asset was exported).

### 5.4 EhrLogo — `src/components/ehr-logo.tsx`
- **Frames:** Overview (logo tiles), Connection, 56, 57 (table EHR column). Optionally used in the EHR select options (29, 47, 59, 64).
- **Build:** `<img src="/images/ehr-<name>.svg" alt="<EHR name>">` keyed by an `ehr` enum.
- **Gaps:**
  - The exported SVGs are **full wordmarks**. The Connection table shows icon-only marks for athenahealth (leaf) and Cerner (swirl); use the wordmarks scaled to row height.
  - **DrChrono** has no asset. Fall back to a small green rounded square with "dr" text.

### 5.5 Callout — `src/components/callout.tsx`

| Variant | Frames | Content | Look |
|---|---|---|---|
| `info` | 27, 46, 52, 53 | `Info` + "No connection is attached to this specific practice yet!" / "No connection is added in the system yet!" | white background, 1px grey border, full width, primary filled info icon |
| `muted` | 38, 44 | title (primary, semibold) **Generate New Verification Token** + muted body | light-grey fill, radius ~8, no icon, no border |
| `muted` | 59 | "Pre-requisite link EHR integration : **Link**" + two muted lines | as above |
| `muted` | 64 | bold **Note to Remember** + muted body | as above |

- **shadcn:** `alert` (Alert, AlertTitle, AlertDescription). Add a `muted` variant via `cva`.
- There is **no** yellow/warning alert anywhere in the design. The 10 MFA notice is a card with a red title (`MfaStatusCard`).

---

## 6. Feedback states

### 6.1 SuccessState — `src/components/success-state.tsx`
Used in 8, 13, 17, 19, 20, 24, 33, 39, 45, 51, 54, 62, 67, and in 4 at `size="lg"` inside `AuthCard`.

- **Anatomy:** a centred column directly on the white content background (no card), shown in place of the form or wizard.
  - A **green filled circle with a white check**: 94px in the app, 136px on auth. Build it as a custom `div` (`rounded-full bg-success`) wrapping `Check`.
  - A **green** semibold heading (~32px). In 8 the heading is dark.
  - 1–2 muted lines.
  - An optional `DetailList variant="card"` (13, 17, 19).
  - One **OUTLINE** CTA (white, primary border and text). It is not primary.

| Frame | Heading (fixed copy) | Details card | CTA (outline) |
|---|---|---|---|
| 8 | Organisation profile saved successfully | — | Redirect to Profile Details |
| 13, 17 | Authentication completed! | device: App Name, description, date (13 One Plus 4s, 17 U2F Security key SL) | Redirect to User Details |
| 19 | Invite Sent! | User Name, User Role, E-mail | Redirect to Manage Users |
| 20 | Password Updated! | — | Redirect to User Details |
| 24 | Profile Updated Successfully | — | Redirect to Profile Details |
| 33 | Connection Updated Successfully | — | Redirect to Connection Details |
| 39, 45 | Webhook Updated Successfully | — | Redirect to Webhook Details |
| 51 | Connection Attached Successfully | — | Redirect to Connection Details |
| 54 | New Practice Added successfully | — (2 muted lines) | Redirect to Practice Page |
| 62 | Connection Added Successfully | — | Redirect to Webhook Details (Figma; should be Connection Details) |
| 67 | Connection Updated Successfully | — | Redirect to Webhook Details (Figma; should be Connection Details) |

- **Props:** `title`, `description`, `details?`, `action` (`{ label, to }`), `size?: 'default' | 'lg'`.
- **shadcn:** `empty` (Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent), `button variant="outline"`.
- **Route state:** render it as a `?step=success` (or `?saved=1`) search-param state so that a refresh doesn't re-submit.

### 6.2 OnboardingEmptyState — `src/components/onboarding-empty-state.tsx` (+ `steps-to-follow.tsx`)
Used in 27, 46, 52 and 53.

- **Anatomy:**
  - A full-width `Callout info` banner.
  - Below it, a two-column grid of equal cards:
    - **Left:** a white shadowed card holding an illustration, 1–2 paragraphs and a centred primary CTA with a leading `Plus`.
    - **Right:** `StepsToFollow`, a light-blue tinted card. It has the H2 **Steps to Follow**, the muted line "You can add new practice through the following steps.", then numbered steps. Each step has a small circle indicator (filled primary = current, outlined = other), a primary title, a paragraph, and an optional **Learn More** text link or bullet list. A thin vertical grey line joins the steps in 53.

  | Frame | Banner | Illustration | CTA | Steps |
  |---|---|---|---|---|
  | 27 | No connection is attached to this specific practice yet! | EHR/PHR architecture diagram (**not exported**) | + Attach Connection | 1 Attach connection to the practice |
  | 46 | same | same diagram (not exported) | + Attach Connection | 2 Add Webhook to the practice |
  | 52 | same (copy should be "No practice is added yet!") | `practice-hospital.png` | + Add New Practice | Add new Practice (unnumbered) |
  | 53 | No connection is added in the system yet! | diagram (not exported) | + Add New Connection | 1 Pre-requisite Of EHR integration · 2 Create Connection |

- **shadcn:** `alert`, `card`, `button`.
- **Custom:** the step list with its connector line.
- **Missing asset:** for the architecture diagram, use a placeholder (e.g. `illustration-transfer-data.png`) until it is exported.

### 6.3 ConfirmDialog — `src/components/confirm-dialog.tsx`
- **Not drawn.** It is required for: MFA device delete (14), status switch → Inactive (practices, connections, webhooks, providers, patients), and discarding a wizard on **Cancel**.
- **shadcn:** `alert-dialog`, `button` (`variant="destructive"` for delete), `spinner`.

### 6.4 Toasts and loading
- **Toasts (not drawn):** `sonner` (`<Toaster />` in `__root.tsx`) for copy confirmation, status-switch success/error, mutation errors, and **Resend Link** (4).
- **Loading (not drawn, but needed for the 300–600ms mock latency):**
  - `skeleton` for table rows, log cards, detail lists and the sidebar user card.
  - `spinner` in pending buttons.

---

## 7. Buttons

| Style | shadcn | Where (exact labels) |
|---|---|---|
| Primary (solid blue, white text, small ~36px) | `default size="sm"` | Next, Proceed, Save, Save Changes, Invite, Generate Token, Apply Filters, Filters, + Add New Practice, + Add New Connection, + Add New Webhook, + Invite New User, + Register with New Device, + Attach Connection |
| Outline (white, primary border + text) | `outline size="sm"` | Cancel, Previous, Go back, Clear filters, Edit Details (`SquarePen`), Change Password (`ArrowRight`), **every SuccessState CTA** (Redirect to …), inactive PillTabs / StatusFilter items |
| Link (primary text) | `link` | Sign Up / Sign In, Forgot Password, Resend Link, Learn More, Copy Secret key, Google Authenticator, List of authenticator apps, Troubleshoot U2F (`ArrowRight`), Link (59) |
| Ghost icon | `ghost size="icon"` | Copy, kebab, edit, delete, website link, Overview stepper next |
| Auth primary (full width, ~48px, auth cyan-blue) | `default` + `w-full h-12` + auth colour token | Sign In, Sign Up, Get Verification Link (`ArrowRight`) |
| Destructive | `destructive` | ConfirmDialog confirm only (not drawn) |

Leading `Plus` for every "+ Add/Invite/Attach/Register" button.

---

## 8. Frame → components

"Shell" = AppSidebar + EnvironmentSwitcher + OrganisationSwitcher + NavUser + PageHeader (white unless noted).

| Frame | Components (beyond Shell) |
|---|---|
| 1 | AuthLayout, AuthCard, SignInForm (InputGroup, PasswordInput, Switch) |
| 2 | AuthLayout, AuthCard, SignUpForm, PasswordInput, PasswordHints |
| 3 | AuthLayout, AuthCard, ForgotPasswordForm |
| 4 | AuthLayout, AuthCard, ResetLinkSent (SuccessState lg) |
| Overview | PageHeader navy · SectionBar muted · Stepper (4 + next) · HowItWorksDiagram (EhrStack/EhrLogo, tiles, PracticeTile) · GlossaryCard |
| Logs 1 | PageHeader navy + Filters · LogList (ScrollArea, LogCard) · Pagination · LogDetail · LogFlowDiagram (FlowNode) |
| Frame 1 | LogsFilterSheet (Sheet, Select ×5, FormActions) |
| Setting | SettingsLayout (PillTabs) · OrganisationProfileForm (ImageUploadCard, Textarea, Select) |
| 8 | SettingsLayout · SuccessState |
| 9 | SettingsLayout + Invite action · UsersTable (grouped DataTable, StatusBadge, CopyButton) |
| 10 | SettingsLayout · UserDetailsForm · MfaStatusCard · PasswordSummaryCard |
| 11 | SettingsLayout · MfaWizard (SectionBar, Stepper) · MfaMethodPicker (RadioGroup cards) · FormActions |
| 12 | SettingsLayout · MfaWizard · TotpSetup (MfaQrCode, CopyButton, InputOTP) |
| 13 | SettingsLayout · SuccessState + DetailList card |
| 14 | SettingsLayout · UserDetailsForm · MfaDevicesTable (Trash → ConfirmDialog) · PasswordSummaryCard |
| 15 | SettingsLayout · SectionBar accent · CenteredFormCard · ChangePasswordForm (PasswordInput) |
| 16 | SettingsLayout · MfaWizard · SecurityKeySetup (DetailList plain) |
| 17 | SettingsLayout · SuccessState + DetailList card |
| 18 | SettingsLayout · SectionBar accent · CenteredFormCard · InviteUserForm |
| 19 | SettingsLayout · SuccessState + DetailList card |
| 20 | SettingsLayout · SuccessState |
| Practices | PageHeader + toolbar (TableSearch, Add) · PracticesTable (CopyableCell, ExternalLinkCell, StatusSwitch, RowActions) · Pagination |
| Frame 2 | PracticeRowActions (DropdownMenu) |
| 22 | PracticeDetailLayout (PillTabs) · PracticeProfileCard (ContentCard accent, DetailList block, chip badges) |
| 23 | PracticeDetailLayout · ContentCard accent · PracticeForm (SpecialtyMultiSelect) |
| 24 | PracticeDetailLayout · SuccessState |
| 25 | PracticeDetailLayout · ProvidersTable (AvatarNameCell, CopyableCell, StatusSwitch) |
| 26 | PracticeDetailLayout · PatientsTable |
| 27 | PracticeDetailLayout · ContentCard accent · OnboardingEmptyState (Callout info, StepsToFollow) |
| 28 | PracticeDetailLayout · PracticeConnectionCard (StatusSwitch framed, DetailList block) |
| 29–32 | PracticeDetailLayout · AttachConnectionWizard (ContentCard muted, Stepper, DetailList block, Select / AppTypeConnectionRow / Input) · FormActions |
| 33 | PracticeDetailLayout · SuccessState |
| 34 | PracticeDetailLayout + Add New Webhook · WebhooksTable (CopyableCell, TruncatedCell, StatusBadge verified, StatusSwitch, edit icon) |
| 35 | PracticeDetailLayout · WebhookDetailCard (StatusSwitch framed, DetailList block) |
| 36 | PracticeDetailLayout · WebhookWizard step 1 (CenteredFormCard) |
| 37 | PracticeDetailLayout · WebhookWizard step 2 (DetailList plain) |
| 38 | PracticeDetailLayout · WebhookWizard step 3 (read-only Input, Callout muted) |
| 39 | PracticeDetailLayout · SuccessState |
| Logs (Add Practice) | PageHeader · ContentCard accent · PracticeForm · FormActions |
| 41 | PageHeader · PracticeReview (ContentCard accent + Edit Details, DetailList, chips) · FormActions |
| 42–44 | PracticeDetailLayout · WebhookWizard steps 1–3 (add) |
| 45 | PracticeDetailLayout · SuccessState |
| 46 | PracticeDetailLayout · ContentCard accent · WebhooksBlocked (OnboardingEmptyState) |
| 47–50 | PracticeDetailLayout · AttachConnectionWizard steps 1–4 |
| 51 | PracticeDetailLayout · SuccessState |
| 52 | PageHeader · PracticesEmptyState (OnboardingEmptyState) |
| 53 | PageHeader · ConnectionsEmptyState (OnboardingEmptyState) |
| 54 | PageHeader · SuccessState |
| Connection, 56, 57 | PageHeader + ConnectionsToolbar (ToggleGroup, TableSearch, Select, Add) · ConnectionsTable (EhrLogoCell, CopyableCell, TruncatedCell, appType badge, StatusSwitch, RowActions) · Pagination |
| 58 | ContentCard muted · ConnectionWizard Getting Started · FormActions |
| 59 | ConnectionWizard Connection Type (CenteredFormCard, Select ×2, Callout muted) |
| 60 | ConnectionWizard ConnectionDetailsForm |
| 61 | ConnectionWizard Summary (DetailList plain, 2-col) |
| 62 | SuccessState |
| 63 | ConnectionDetailCard (StatusSwitch framed, DetailList block ×3) |
| 64 | ConnectionWizard (edit) Connection Type (CenteredFormCard, Callout muted) |
| 65 | ConnectionWizard (edit) ConnectionDetailsForm (prefilled) |
| 66 | ConnectionWizard (edit) Summary |
| 67 | SuccessState |

---

## 9. Icons (lucide-react)

No icons were exported. Every glyph below is from `lucide-react`, and every name was checked against `lucide-react@1.53.0`.

| UI element | lucide-react | Note |
|---|---|---|
| Nav: Overview (2×2 rounded squares) | `LayoutGrid` | |
| Nav: Connection (connected nodes) | `Network` | |
| Nav: Practices (house with medical cross) | `HousePlus` | `Hospital` as alternative |
| Nav: Logs (document with pencil) | `NotebookPen` | `FilePen` as alternative |
| Nav: Setting (gear) | `Settings` | |
| Nav: Documentation (open book) | `BookOpen` | |
| Nav: API Reference | `Braces` | Figma reuses the gear; distinct icon proposed |
| Select / user card / filter chevron | `ChevronDown` | |
| Breadcrumb separator, stepper next, pagination next | `ChevronRight` | |
| Pagination prev | `ChevronLeft` | |
| Copy (two overlapping squares) | `Copy` → `Check` after copying | |
| Row kebab | `EllipsisVertical` | `MoreVertical` is only an alias |
| Edit row / Edit Details (pencil on square) | `SquarePen` | |
| Delete (14) | `Trash` | `Trash2` is an alias of `Trash` in v1.x |
| Add / Invite / Attach / Register | `Plus` | |
| Website (square with outward arrow) | `SquareArrowOutUpRight` | |
| Upload strip | `CloudUpload` | |
| Info banner (filled blue circle) | `Info` | render filled: `fill-primary stroke-white` (or `text-white` inside a primary circle) |
| Verified badge (shield with check) | `ShieldCheck` | |
| Stepper completed step | `CircleCheck` | |
| Log flow node success / failed | `CircleCheck` (green) / `CircleX` (red, not drawn) | |
| Flow connectors | `ArrowRight`, `ArrowDown` | or CSS/SVG lines |
| Success medallion | `Check` in a custom `bg-success rounded-full` circle | |
| Table search | `Search` | |
| Auth email | `Mail` | |
| Auth password | `LockKeyhole` | |
| Auth username | `User` | |
| Password visibility | `EyeOff` (hidden) / `Eye` (shown) | |
| Button trailing arrow (Get Verification Link, Change Password, Troubleshoot U2F) | `ArrowRight` | |
| Avatar / upload placeholder silhouette | `UserRound` | |
| MFA: Authenticator App tile | `Smartphone` | Figma uses a grey pictogram tile (user-check over server) |
| MFA: Security Key tile | `KeyRound` | |
| User menu: Log out (proposed, not drawn) | `LogOut` | |

---

## 10. Images

Copy `docs/assets/images/*` to `public/images/` and reference the files as `/images/<file>`.

| File | Used in | Component |
|---|---|---|
| `ehr-athenahealth.svg`, `ehr-epic.svg`, `ehr-cerner.svg`, `ehr-nextgen.svg` | Overview (logo tiles); Connection, 56, 57 (EHR column); optional in EHR selects | `EhrLogo` |
| `illustration-convert-data.png` | Overview, top-left tile | `HowItWorksDiagram` |
| `illustration-convert-laptop.png` | Overview, both bordered middle tiles | `HowItWorksDiagram` |
| `illustration-push-data.png` | Overview, top-right tile | `HowItWorksDiagram` |
| `illustration-transfer-data.png` | Overview, bottom-left tile | `HowItWorksDiagram` |
| `illustration-pull-data.png` | Overview, bottom-right tile | `HowItWorksDiagram` |
| `practice-hospital.png` | Overview (Practice tile); 52 (empty state) | `PracticeTile`, `PracticesEmptyState` |

**Not exported**, so handle them in code:

| Missing asset | Where | Handling |
|---|---|---|
| IntraConnect logo | sidebar top (empty in Figma), auth | recreate as an inline SVG/wordmark (PROGRESS Phase 1) |
| EHR/PHR architecture diagram | 27, 46, 53 | placeholder illustration until exported |
| DrChrono logo | Connection, 57 | "dr" text-mark fallback in `EhrLogo` |
| Org logo (caduceus) | Setting | `ImageUploadCard` placeholder |
| User, provider and patient photos | sidebar, 25, 26 | `AvatarFallback` initials |
| QR code | 12 | generated by `qrcode.react` |

---

## 11. Dependencies and install

### shadcn components

```bash
pnpm dlx shadcn@latest add sidebar button input label field input-group textarea select switch radio-group input-otp popover command badge card table pagination breadcrumb toggle-group dropdown-menu sheet alert alert-dialog tooltip separator skeleton spinner sonner avatar scroll-area empty
```

All 31 names are confirmed in the `@shadcn` registry. Things deliberately left out:

| Not installed | Reason |
|---|---|
| `chart` | the Overview has no charts |
| `calendar` | no date filter is drawn |
| `dialog`, `drawer` | no modals are drawn |
| `tabs` | PillTabs are route links |
| `form` | use `field` + react-hook-form `Controller` |
| `combobox` | the `@shadcn` combobox item depends on `@base-ui/react`; use `popover` + `command` instead |
| `accordion`, `collapsible`, `kbd`, `item`, `button-group`, `progress` | unused |

Post-install tweaks:
- `sonner.tsx` imports `next-themes`. Replace `useTheme()` with a fixed `theme="light"`, because there is no theme switch in the design.
- The `switch` checked colour is `bg-success` (green).
- `alert` gets a `muted` variant, and `badge` gets the 3.3 variants.

### npm packages beyond shadcn

| Package | Why |
|---|---|
| `@tanstack/react-table` | DataTable (Practices, Connections, Users, MFA devices, Providers, Patients, Webhooks) |
| `react-hook-form`, `@hookform/resolvers`, `zod` | all forms and wizards |
| `qrcode.react` | `MfaQrCode` (12) |
| `lucide-react` | icons (also pulled in by shadcn) |
| `sonner`, `input-otp`, `cmdk`, `radix-ui` | installed automatically by the shadcn components above |

Not needed: `recharts` (no charts), `vaul` (no drawer), `shiki` / JSON viewers (no payload view is designed).

---

## 12. Changes from the metadata-only draft

- **Removed (not in the screenshots):**
  - StatCard / Overview charts (and `chart`, `recharts`, `calendar`).
  - LogPayloadPanel / CodeBlock / SecretValue.
  - ResponsiveDialog / dialog / drawer usage.
  - The `warning` alert variant (frame 10 is a red-title card).
  - Live password checklist (frame 2 hints are static).
  - Sortable column headers.
  - "Promo" banner in 11/12 (it is a leftover section bar).
  - The `dot` status badge in 63 (it is a switch).
  - Three-colour specialty chips (all one outline style).
  - Rounded "card rows" in 9 (plain rows).
  - Status-tab `tabs` usage.
- **Corrected:**
  - SuccessState CTA is **outline**, not primary, and the heading is green.
  - PageHeader has `navy` (Overview, Logs 1) and `white` variants.
  - Env/org switchers live in the **sidebar footer**.
  - PillTabs are link buttons, not `tabs`.
  - The Stepper has no connectors, all labels are blue, and a standardised state rule.
  - 28 is the populated Connection tab, not Profile.
  - 14's Register button is primary.
  - The Logs sheet has no close X.
  - Icon names: `Trash` (not `Trash2`), `HousePlus`, `NotebookPen`, `ShieldCheck` (not `BadgeCheck`), `SquarePen`, `CloudUpload`, `SquareArrowOutUpRight`.
- **Added:**
  - SectionBar, ContentCard tones, TableSearch (underline style).
  - Grouped UsersTable details (exact badge styles).
  - StatusSwitch `framed` variant.
  - DetailList `block` / `plain` / `card` variants.
  - MfaStatusCard, PasswordSummaryCard, AppTypeConnectionRow details.
  - EhrLogo with gaps, image and missing-asset tables.
  - Full frame cross-reference.
  - Verified install list.
