# IntraConnect: screen map

Every Figma frame mapped to a route and a state. Source: the 69 exported frames in `docs/screens/<frame>.png` (1920×1080). They were inspected visually and conflicts were settled against the screenshots.
Rule: each frame maps to its **intended** state. Design mistakes are listed in §6 and are not built.

---

## 1. Overview

### 1.1 Sections

| Section | Frames | Count |
|---|---|---|
| Auth | 1, 2, 3, 4 | 4 |
| Overview | Overview | 1 |
| Connection | Connection, 53, 56–67 | 14 |
| Practices | Practices, Frame 2, 22–39, Logs*, 41–52, 54 | 34 |
| Logs | Logs 1, Frame 1 | 2 |
| Setting | Setting, 8–20 | 14 |
| API Reference | none | 0 |
| **Total** | | **69** |

\* The frame named **"Logs"** is the Add Practice form (details step), and **41** is its review step. Neither is part of the Logs section.

### 1.2 Global layout

- `__root.tsx` holds the document, the QueryClient context and `<Outlet/>`.
- **`_auth` (pathless)** is a full-bleed diagonal gradient (slate blue → cyan) with one white card. There is no logo and no shell. Frames 1–4.
- **`_app` (pathless)** is the app shell: a 372px navy sidebar plus a content column. Every page renders its own `PageHeader` (title | breadcrumb, with optional actions and a pill-tab row).
  - Layout routes add a shared header and pill tabs for their section: `_app/settings/route.tsx` and `_app/practices/$practiceId/route.tsx`.

### 1.3 Sidebar (checked against Overview.png and Connection.png)

| # | Item (as drawn) | Build label | Target |
|---|---|---|---|
| — | Logo area (top ~100px) | IntraConnect logo | **empty in every frame**, so the asset is missing (Q1) |
| 1 | Overview | Overview | `/overview` |
| 2 | Connection | Connection | `/connections` |
| 3 | Practices | Practices | `/practices` |
| 4 | Logs | Logs | `/logs` |
| 5 | Setting | Setting | `/settings` → `/settings/organisation` |
| — | divider | | |
| 6 | Documentation | Documentation | external link (Q4) |
| 7 | API Refrence | API Reference | external link (Q4) |
| footer | CURRENT ENVIRONMENT `[Production ▾]` | Select | global app state (Q12) |
| footer | CURRENT ORGANISATION `[DocMD ▾]` | Select | global app state |
| footer | User card: avatar, **James Joy**, `Jamesjoy@xyz`, ▾ | NavUser | **no menu designed** (Q5) |

- **Active item:** bright-blue full-width background, a lighter right accent bar, and white icon and text.
- **Active-item matching:** by route prefix. `/practices/**` → Practices, `/connections/**` → Connection, `/settings/**` → Setting. This fixes the wrong highlights drawn on frames Logs, 53, 54, 62 and 67.

### 1.4 Header variants

| Variant | Frames | Look |
|---|---|---|
| **Navy band** (~98px, white text) | Overview, Logs 1 | title only (Overview); title \| breadcrumb + primary `Filters` button (Logs) |
| **White** (bottom shadow) | all other app frames | dark title \| grey breadcrumb with `ChevronRight` separators (last crumb darker), with an optional pill-tab row or toolbar underneath |

- Build one `PageHeader` with `variant: "navy" | "white"`. Use `navy` only on `/overview` and `/logs`, as drawn (Q2).

### 1.5 Not designed

- **User/account menu.** "Frame 2" was originally briefed as a profile dropdown. It is actually the **Practices row-action (kebab) menu**: Profile / Provider / Patients / Connection / Webhook, which are the Practice-detail tabs. So the planned "Profile-menu pages" phase **is** the Practice detail tabs. Nothing is designed behind the sidebar user-card chevron. There is no sign-out, no account page and no logout flow.
- **API Reference and Documentation pages.** No frame shows either one.
- **Overview steps 2–4.** Only step 1, "How Intraconnects works", is drawn.
- **Row menus and confirmations:**
  - Connections row kebab menu contents
  - Delete MFA device confirmation
  - Status-toggle confirmation
- **Empty, loading and error states for lists:**
  - Empty states missing for providers, patients, webhooks (beyond the no-connection case), users and logs
  - No "no results for this filter" state
  - No loading or error states anywhere
- **Logs:** a log-step payload panel and a "no log selected" state.
- **Missing screens:**
  - Sign-up success
  - Reset-password form (the target of the emailed link)
  - 404 page
- **Missing images:** the IntraConnect logo, the DrChrono logo, the EHR architecture diagram (frames 27, 46, 53), the org caduceus logo, and the provider/patient photos.

---

## 2. Route tree (`src/routes/`)

```
__root.tsx
index.tsx                                   → redirect /overview (or /login when signed out)
_auth.tsx                                   gradient + centred card layout
_auth/login.tsx                             /login                         1
_auth/signup.tsx                            /signup                        2
_auth/forgot-password.tsx                   /forgot-password?step          3, 4
_app.tsx                                    shell (sidebar + Outlet)
_app/overview.tsx                           /overview?step                 Overview
_app/connections/index.tsx                  /connections                   Connection, 53, 56, 57
_app/connections/new.tsx                    /connections/new?step          58–62
_app/connections/$connectionId/index.tsx    /connections/:id               63
_app/connections/$connectionId/edit.tsx     /connections/:id/edit?step     64–67
_app/practices/index.tsx                    /practices                     Practices, Frame 2, 52
_app/practices/new.tsx                      /practices/new?step            Logs, 41, 54
_app/practices/$practiceId/route.tsx        layout: "Practice Details" header + 5 pill tabs + Outlet
_app/practices/$practiceId/index.tsx        → redirect ./profile
_app/practices/$practiceId/profile/index.tsx          /practices/:id/profile                       22
_app/practices/$practiceId/profile/edit.tsx           /practices/:id/profile/edit?step             23, 24
_app/practices/$practiceId/connection/index.tsx       /practices/:id/connection                    27, 28
_app/practices/$practiceId/connection/attach.tsx      /practices/:id/connection/attach?step        47–51
_app/practices/$practiceId/connection/edit.tsx        /practices/:id/connection/edit?step          29–33
_app/practices/$practiceId/webhooks/index.tsx         /practices/:id/webhooks                      34, 46
_app/practices/$practiceId/webhooks/new.tsx           /practices/:id/webhooks/new?step             42–45
_app/practices/$practiceId/webhooks/$webhookId/index.tsx  /practices/:id/webhooks/:wid             35
_app/practices/$practiceId/webhooks/$webhookId/edit.tsx   /practices/:id/webhooks/:wid/edit?step   36–39
_app/practices/$practiceId/providers.tsx              /practices/:id/providers                     25
_app/practices/$practiceId/patients.tsx               /practices/:id/patients                      26
_app/logs/index.tsx                         /logs?…                        Logs 1, Frame 1
_app/settings/route.tsx                     layout: "Setting" header + 3 pill tabs + Outlet
_app/settings/index.tsx                     → redirect ./organisation
_app/settings/organisation.tsx              /settings/organisation?step               Setting, 8
_app/settings/users/index.tsx               /settings/users                           9
_app/settings/users/invite.tsx              /settings/users/invite?step               18, 19
_app/settings/user-details/index.tsx        /settings/user-details                    10, 14
_app/settings/user-details/mfa.tsx          /settings/user-details/mfa?step&method    11, 12, 13, 16, 17
_app/settings/user-details/change-password.tsx  /settings/user-details/change-password?step  15, 20
```

### 2.1 Naming conventions

- **Path segments are kebab-case.** Collections are plural: `connections`, `practices`, `webhooks`, `providers`, `patients`, `users`.
- **Singletons are singular:** `profile`, `connection` (a practice has one attached connection), `organisation`, `user-details`.
- **Actions are verbs:** `new` (create), `edit`, `attach`, `invite`, `mfa`, `change-password`.

### 2.2 Wizard and form convention (applies everywhere)

1. **Every multi-screen flow gets its own route**, with a zod `step` search param.
   - The schema is `z.enum([...]).catch(<first>)`, so an invalid step falls back to the first one.
   - Back/forward buttons and deep links work.
   - "Previous" navigates to the previous step.
2. **The success screen is the terminal step value `step: "success"`**, never a separate `?done` or `?saved` flag.
   - Create flows add `createdId` to the URL, so the success screen and its CTA can read the new entity from the query cache.
3. **Single-form pages use the same convention**, as a two-step enum `["form", "success"]`. This covers organisation, profile edit, invite and change-password.
4. **Form values live in one react-hook-form instance owned by the route component.** They are not stored in the URL.
   - Opening a later step with an empty form redirects (`replace`) to the first step.
   - Edit flows are pre-filled from the entity query, so they can deep-link to any step.
5. **The submit happens on the last data step** (summary, review or verification). On success the route navigates to `step: "success"` with `replace: true`, so the browser Back button does not resubmit.

### 2.3 Why tabs are child routes, not `?tab=`

- **Practice detail:** each tab has its own loader and data (profile, connection, webhooks, providers, patients).
  - Tabs have nested sub-routes: edit and attach wizards, webhook detail.
  - Every one of those frames keeps the tab row visible (29–51).
  - The row menu (Frame 2) deep-links straight to a tab.
  - A `?tab=` param cannot nest routes or own loaders. So `$practiceId/route.tsx` renders the header and tabs, and each tab is a file.
- **Settings:** the same reasoning applies. The tabs are Organisation Profile, Manage User and User Details, with sub-pages invite, mfa and change-password. The active pill comes from the matched route.

| Tab row | Order (as designed) | Active-pill rule |
|---|---|---|
| Practice detail | Profile · Connection · Webhooks · Providers · Patients | first path segment after `$practiceId` |
| Settings | Organisation Profile · Manage User · User Details | `organisation` / `users/**` / `user-details/**` |

---

## 3. Search params (zod)

| Route | Param | Zod shape | Default | Notes |
|---|---|---|---|---|
| `/login` | `redirect` | `z.string().optional()` | — | return path after sign-in |
| `/forgot-password` | `step` | `enum(["request","sent"])` | `request` | 3 / 4 |
| | `email` | `z.string().email().optional()` | — | shown on 4 ("An email is sent to …") |
| `/overview` | `step` | `z.coerce.number().int().min(1).max(4)` | `1` | only step 1 is designed (Q7) |
| `/connections` | `page` | `z.coerce.number().int().min(1)` | `1` | pageSize fixed at 10 |
| | `q` | `z.string().optional()` | — | search by name (debounced) |
| | `status` | `enum(["all","active","inactive"])` | `all` | segmented All/Active/Inactive |
| | `appType` | `enum(["provider","system","patient"]).optional()` | — | "App Type" select |
| `/connections/new` | `step` | `enum(["getting-started","type","details","summary","success"])` | `getting-started` | 58–62 |
| | `createdId` | `z.string().optional()` | — | set on success |
| `/connections/:id/edit` | `step` | `enum(["type","details","summary","success"])` | `type` | 64–67 |
| `/practices` | `page`, `q` | as on `/connections` | `1`, — | no status filter designed |
| `/practices/new` | `step` | `enum(["details","review","success"])` | `details` | Logs, 41, 54 |
| | `createdId` | `z.string().optional()` | — | |
| `/practices/:id/profile/edit` | `step` | `enum(["form","success"])` | `form` | 23, 24 |
| `/practices/:id/connection/attach` | `step` | `enum(["ehr","app-types","practice-id","summary","success"])` | `ehr` | 47–51 |
| `/practices/:id/connection/edit` | `step` | same enum | `ehr` | 29–33 |
| `/practices/:id/webhooks/new` | `step` | `enum(["details","summary","verification","success"])` | `details` | 42–45 |
| | `createdId` | `z.string().optional()` | — | |
| `/practices/:id/webhooks/:wid/edit` | `step` | same enum | `details` | 36–39 |
| `/logs` | `page` | `z.coerce.number().int().min(1)` | `1` | list pagination |
| | `logId` | `z.string().optional()` | first on page | selected log (detail panel) |
| | `node` | `z.coerce.number().int().min(0).max(5).optional()` | — | selected flow node (2×3 grid) |
| | `ehr`, `practiceId`, `dataModel`, `eventType` | `z.string().optional()` each | — | written by the filter sheet; reset `page` to 1 |
| | `status` | `enum(["successful","failed"]).optional()` | — | |
| `/settings/organisation` | `step` | `enum(["form","success"])` | `form` | Setting, 8 |
| `/settings/users/invite` | `step` | `enum(["form","success"])` | `form` | 18, 19 |
| | `createdId` | `z.string().optional()` | — | the invited user shown on 19 |
| `/settings/user-details/mfa` | `step` | `enum(["register","setup","success"])` | `register` | |
| | `method` | `enum(["app","key"]).optional()` | — | chosen on step 1. Selects the 12 vs 16 and 13 vs 17 variant. Setup without a method redirects to `register` |
| | `deviceId` | `z.string().optional()` | — | new device shown on success |
| `/settings/user-details/change-password` | `step` | `enum(["form","success"])` | `form` | 15, 20 |

Routes not listed (detail pages, tabs without tables, `/settings/users`, `/settings/user-details`) take no search params. Providers and patients have no pagination or search in the design (add `page` if fixtures grow).

### 3.1 Overlays: URL or local state

| Overlay | Frame | Where it lives |
|---|---|---|
| Logs filter `Sheet` ("Filter the logs by") | Frame 1 | **local** open state. The applied values are in the URL (§3) |
| Practices row `DropdownMenu` | Frame 2 | **local**. Its items are `<Link>`s to the tab routes |
| Connections row kebab `DropdownMenu` | Connection | **local** (contents not designed: View, Edit) |
| Delete-device `AlertDialog` | 14 (not drawn) | **local** |
| Status-toggle confirm (if adopted) | Practices, Connection, 25, 26, 28, 34, 35, 63 | **local** (Q9) |
| Copy-to-clipboard toast | many | **local** (`sonner`) |

No overlay is URL-addressable. Every wizard step and success screen is (§2.2).

---

## 4. Sections

### 4.1 Auth (`_auth`)

| Frame | Route | State | Notes |
|---|---|---|---|
| 1 | `/login` | empty form, Remember me ON | Card right-aligned in design; **centre it** like 2–4 (Q13). Button text reads "Sign Up" → **Sign In** |
| 2 | `/signup` | empty form | Header copy is copied from Sign In; build "Create Account" with "Already have an account? Sign In". Second password field = **Confirm Password**. Hints → live validation |
| 3 | `/forgot-password?step=request` | empty | Link "Want to get back? Sign Up" → **"Sign In"** → `/login` |
| 4 | `/forgot-password?step=sent&email=…` | email sent | Green check; "Resend Link" re-fires the mutation (toast). Add a "Back to Sign In" link |

**Flows**
- 1 → (Sign Up) 2 → submit → 1 (toast).
- 1 → (Forgot Password) 3 → submit → 4 → Resend.
- 1 → submit → `/overview`.

**Data**
- `AuthUser { email, password }`. Remember me is local only.
- Mock sign-in accepts any registered email.

### 4.2 App shell (`_app`)

| Element | Frames | Notes |
|---|---|---|
| `AppSidebar` | all app frames | order and behaviour in §1.3 |
| Environment / Organisation selects | all | `Production`, `DocMD`. Options not designed (Q12) |
| `NavUser` card | all | `James Joy` / `Jamesjoy@xyz` + avatar photo (asset not exported, so use `Avatar` initials). Chevron: Q5 |
| `PageHeader` | all | §1.4 |

### 4.3 Overview

| Frame | Route | State | Notes |
|---|---|---|---|
| Overview | `/overview?step=1` | step 1 "How Intraconnects works" | Grey bar "1. How intraconnects works"; light-blue stepper (4 steps + `ChevronRight`); 3-column diagram (EHRs card · Intraconnects tile grid · Practice card); 2×2 definitions box |

- **Stepper:** How Intraconnects works · Pre-requisite Process · Pre-requisite Process (duplicate, Q7) · Create Practice.
- **Step 4** most likely links to `/practices/new`.
- **Images:**
  - `ehr-athenahealth|epic|cerner|nextgen.svg`
  - `illustration-convert-data.png`
  - `illustration-convert-laptop.png` (both bordered middle tiles)
  - `illustration-push-data.png`
  - `illustration-transfer-data.png`
  - `illustration-pull-data.png`
  - `practice-hospital.png`
- **Static content (no entity):**
  - EHR: "This is the Electronic Health Record system."
  - Healthcare Platform: "This is your own software or system"
  - Practice: "This refer to any Hospital, Clinic, or Health Care Provider you wish to integrate with."
  - Intraconnects: "This consist of two parts - the Unfield API and EHR Connection Adapters."

### 4.4 Connection

| Frame | Route | State | Notes |
|---|---|---|---|
| Connection | `/connections` | populated, `status=all` | Toolbar: segmented All/Active/Inactive, underline search "Search ( Ex. TestNextgenpatient)", "App Type" select, primary "+ Add New Connection". Full-bleed table, pagination footer |
| 56 | `/connections?status=inactive` | filtered: 2 rows | footer and pager must reflect the filtered total |
| 57 | `/connections?status=active` | filtered: 8 rows | same |
| 53 | `/connections` | empty (no connections, no filters) | Alert "No connection is added in the system yet!"; diagram card + "+ Add New Connection"; vertical 2-step guide (1 Pre-requisite Of EHR integration + Learn More, 2 Create Connection) |
| 58 | `/connections/new?step=getting-started` | wizard 1/4 | grey card header "Add New Connection Details"; 3 green-dot bullets; Cancel / Next |
| 59 | `/connections/new?step=type` | wizard 2/4, empty | centred sub-card: EHR Name*, App Type for Connection* selects; Previous / Next; grey "Pre-requisite link EHR integration : Link" callout |
| 60 | `/connections/new?step=details` | wizard 3/4, empty | context "EHR Name : Athena", "Connection App Type : Patient"; read-only **Redirect URL** (system-generated, copyable); 2-column form of 8 fields |
| 61 | `/connections/new?step=summary` | wizard 4/4 | description list of all values; primary = **Create Connection** (drawn as "Next") |
| 62 | `/connections/new?step=success&createdId=…` | created | "Connection Added Successfully"; CTA → **View Connection** `/connections/$createdId` (Q8) |
| 63 | `/connections/$connectionId` | detail, Active | light-blue header bar: "Connection status :" switch pill + "Edit Details"; 3 grey description blocks; no tabs |
| 64 | `/connections/$connectionId/edit?step=type` | edit 1/3, **pre-filled** | "Edit Connection Type"; "Note to Remember" callout; first button = **Cancel** → detail |
| 65 | `/connections/$connectionId/edit?step=details` | edit 2/3, pre-filled | same form as 60 |
| 66 | `/connections/$connectionId/edit?step=summary` | edit 3/3 | primary = **Update Connection** |
| 67 | `/connections/$connectionId/edit?step=success` | updated | "Connection Updated Successfully"; CTA → **Back to Connection** detail (Q8) |

**Flows**
- List: Connection ⇄ 56 ⇄ 57 (status pills) · search · App Type · pagination.
- Create: Connection (+ Add New Connection) or 53 (+ CTA) → 58 → 59 → 60 → 61 → 62 → 63.
- Edit: Connection (row click / kebab › View) → 63 → Edit Details → 64 → 65 → 66 → 67 → 63.
- Status switch (list or 63) → `toggleConnectionStatus` mutation → invalidates list and detail.

**Form (60/65):**
- Name* "Enter Connection Name" (help: "Short Name For This Connection must be unique")
- Client ID* "Client ID" (help: "The value is your app's OAuth client ID, must be unique")
- Scope* "Enter Scope" (help: "Requested "scopes" for services to access")
- Client Secret "Enter Client Secret" (password input with reveal)
- Audience "Audience" (help: "The target "audience" server URL")
- Nonce "Enter Nonce" (help: "Required if requesting the openid scope")
- Organisation Redirect URL* "Org Redirect URL"
- Launch "Enter Launch"

**Data: `Connection`**

| Field | Type | Samples (verbatim) |
|---|---|---|
| `id` | string | — (the "ID : Name" column shows only the name, Q15) |
| `ehr` | `athenahealth \| epic \| cerner \| nextgen \| drchrono` | logos per row |
| `appType` | `provider \| system \| patient` | Provider, System, Patient |
| `name` | string | TestNexthenPatient, TestEpicSystem, TestAthenaPatient, TestDrchronoPatient, TestCernerSystem, TestEpicProvider, TestAthenaSystem, TestCernerStytem; AthenaPAtientconnection; Pace Hospital (63) |
| `clientId` | string | 73782 (all rows); Athena7890 |
| `clientSecret` | string | Athena1234 (display masked) |
| `scope` | string | Athena; Athena/service Athenanet.MDP |
| `audience`, `nonce`, `launch` | string? | Athena; Patient |
| `orgRedirectUrl` | url | `https://pa...` (truncated), http://ehskkdsoou-fdkcnshfjzxmnc, https://seoihnsdvn |
| `redirectUrl` | url (system-generated) | http://ehskkdsoou-fdkcnshfjzxmnc |
| `status` | `active \| inactive` | Active / Inactive |
| `customerId` | string (63) | 27353629257 |

- The frame values contradict each other (base vs filtered rows, step 3 vs summary). Seed **one** fixture set of 25+ rows and derive every view from it.
- Fix the typos when seeding (§6.2).

### 4.5 Practices

#### 4.5.1 List, add practice, row menu

| Frame | Route | State | Notes |
|---|---|---|---|
| Practices | `/practices` | populated, page 1 | Title **Practices** (drawn "Setting"); underline search; "+ Add New Practice"; columns: ID : Name · Contact · Location · Email · Website (external-link icon) · Status (switch pill) · Action (kebab) |
| Frame 2 | `/practices` | row kebab menu open (local) | Items link to the tab routes. Order and labels follow the tab row (Q11) |
| 52 | `/practices` | empty | Title **Practices**; alert **"No practice is added yet!"**; `practice-hospital.png` card + "+ Add New Practice"; "Steps to Follow" card |
| Logs (frame name) | `/practices/new?step=details` | add form, partly filled | Card "Add Details of New Practice"; first button **Cancel** (drawn "Previous"); fields as profile edit (23) **plus** Contact*, Website, Zip code* (shown on 41) |
| 41 | `/practices/new?step=review` | review | "Practice Profile Details" + "Edit Details" (→ `step=details`); "Go back" + **Save** (creates the practice) |
| 54 | `/practices/new?step=success&createdId=…` | created | "New Practice Added successfully"; "You can update Connection & Webhook to this practice now."; CTA "Redirect to Practice Page" → `/practices/$createdId/profile` |

#### 4.5.2 Practice detail tabs (`$practiceId/route.tsx`: H1 "Practice Details", breadcrumb `Home > Practices > Practice Details > <Tab> [> sub-page]`)

| Frame | Route | State | Notes |
|---|---|---|---|
| 22 | `/practices/$id/profile` | view | "Practice Profile Details" + Edit Details; 3 grey blocks (identity, "Practices Provided" chips, "Physical Address") |
| 23 | `/practices/$id/profile/edit?step=form` | edit, pre-filled | Add **Cancel / Save** (missing in the design). Specialty = multi-select. Address line 2 optional. Include Contact, Website, Zip |
| 24 | `/practices/$id/profile/edit?step=success` | saved | "Profile Updated Successfully"; CTA → profile view |
| 25 | `/practices/$id/providers` | populated | columns: Provider (avatar + name) · Gender · Service type · EHR ID (copy) · NPI ID · Status |
| 26 | `/practices/$id/patients` | populated | columns: Patient · Gender · DOB · Service Use · EHR ID · Status |
| 27 | `/practices/$id/connection` | **empty**: no connection attached | info alert; diagram card + "+ Attach Connection" → `connection/attach`; "Steps to Follow" (step 1 "Attach connection to the practice") |
| 28 | `/practices/$id/connection` | attached (view) | card title **Connection Details**; "Connection status :" switch + Edit Details → `connection/edit` |

#### 4.5.3 Practice connection wizard: one `PracticeConnectionWizard`, `mode: "attach" | "edit"`

| Frame | Route | State | Notes |
|---|---|---|---|
| 47 | `/practices/$id/connection/attach?step=ehr` | attach 1/4 | Card header **Attach Connection**; read-only "Practice Details" block; EHR Name* select; Cancel / Next |
| 48 | `…/attach?step=app-types` | attach 2/4 | 2 rows: App Type Status switch (Patient / Provider) + Connection Name select (disabled while its switch is off); at least 1 row must be on |
| 49 | `…/attach?step=practice-id` | attach 3/4, empty | "Add Practice ID"; Practice ID* "Enter the practice ID" |
| 50 | `…/attach?step=summary` | attach 4/4 | primary **Attach Connection** (drawn as "Next") |
| 51 | `…/attach?step=success` | attached | "Connection Attached Successfully"; CTA → `/practices/$id/connection` |
| 29 | `/practices/$id/connection/edit?step=ehr` | edit 1/4, pre-filled | Card header **Edit Connection Details** |
| 30 | `…/edit?step=app-types` | edit 2/4 | as 48 |
| 31 | `…/edit?step=practice-id` | edit 3/4, pre-filled `E-284564` | |
| 32 | `…/edit?step=summary` | edit 4/4 | primary **Update Connection** |
| 33 | `…/edit?step=success` | updated | "Connection Updated Successfully"; CTA "Redirect to Connection Details" |

#### 4.5.4 Webhooks: one `WebhookWizard`, `mode: "add" | "edit"`

| Frame | Route | State | Notes |
|---|---|---|---|
| 34 | `/practices/$id/webhooks` | populated (connection attached) | "+ Add New Webhook" in the header; columns: ID : Name · Token ID · URL · Verification (badge "Verified" / **"Not verified"**) · Status · Action (edit icon) |
| 46 | `/practices/$id/webhooks` | blocked: no connection attached | alert + diagram card + "+ Attach Connection" (→ `connection/attach`); step guide "2 Add Webhook to the practice" (show steps 1–3) |
| 35 | `/practices/$id/webhooks/$wid` | detail | "Webhook Details" bar: status switch + Edit Details; Name / URL / Method Type; Token ID (+ copy) |
| 42 | `/practices/$id/webhooks/new?step=details` | add 1/3 | header **Add New Webhook Details**; centred sub-card: Webhook Name*, Webhook URL*, Method Type select; Cancel / Next |
| 43 | `…/new?step=summary` | add 2/3 | header **Add New Webhook Details** (drawn "Edit") |
| 44 | `…/new?step=verification` | add 3/3 | Token ID read-only + copy (empty until generated); callout "Generate New Verification Token"; primary **Generate Token** (saves) |
| 45 | `…/new?step=success&createdId=…` | added | **"Webhook Added Successfully"** (drawn "Updated"); CTA → webhook detail |
| 36 | `/practices/$id/webhooks/$wid/edit?step=details` | edit 1/3, pre-filled | header **Edit Webhook Details**; active tab **Webhooks** |
| 37 | `…/edit?step=summary` | edit 2/3 | |
| 38 | `…/edit?step=verification` | edit 3/3 | current token shown; Generate Token = save + regenerate + reset verification |
| 39 | `…/edit?step=success` | updated | "Webhook Updated Successfully"; CTA → `/practices/$id/webhooks/$wid` |

**Flows**
- List:
  - Practices → search / pagination.
  - Status switch → `togglePracticeStatus`.
  - Name click or kebab (Frame 2) → 22 / 25 / 26 / 27 or 28 / 34 or 46.
- Add: Practices or 52 (+) → Logs (details) → 41 (review; Edit Details / Go back → details) → Save → 54 → 22.
- Profile: 22 → Edit Details → 23 → Save → 24 → 22.
- Attach connection: 27 or 46 (+ Attach Connection) → 47 → 48 → 49 → 50 → 51 → 28.
- Edit connection: 28 → Edit Details → 29 → 30 → 31 → 32 → 33 → 28.
- Add webhook: 34 (+ Add New Webhook) → 42 → 43 → 44 → 45 → 35.
- Edit webhook: 34 (row/edit icon) → 35 → Edit Details → 36 → 37 → 38 → 39 → 35.
- Webhooks tab when the practice has no connection → 46.

**Data**

| Entity | Fields | Samples (verbatim) |
|---|---|---|
| `Practice` | id, name, email, npi, contact, website?, specialties[], address1, address2?, city, state, zip, location (list column), status, customerId | Bombay Hoapital · Pace Hospital · Milaan Hoapital · Pune Hoapital · Medicover Hoapital · Midcover Hoapital · Millan Hoapital · BombayHoapital; contact 3265858387; email James.jpy@gmail.com; location Hampton, New York, Foren, America, Russia, Boston, Denver. Pace Hospital detail: Pace.hospital@gmail.com, (4579)747-574, NPI 27353629257, specialties Orthopediac, Physiotherapy, Neuro-special, Psychology, Physicians, Acupuncturist; 3287,st johns street, Hampton, 116488, viriginia. Footer "Showing 1 to 10 of 100 Entries" |
| `PracticeConnection` | practiceId, ehr, appTypes `{ patient?: connectionId, provider?: connectionId }`, ehrPracticeId, status | EHR Epic; EHR Type Patient; Connection connected Epictest45 / EpicTest12 / "Provided - Epictest12", "Patient - EpicPatient 13"; Practice ID V - 4676452 / E-463877 / E-284564; Customer ID 27353629257 / 748g-46-75j3-473g-37-457k3 / 387g-46-45k3-984g-37-36j4. Org Redirect URL, Scope and Audience are read from the linked `Connection` |
| `Provider` | id, practiceId, name, gender, serviceType, ehrId, npiId, status, avatar? | Rocky Joy · Male · Neuro Surgen · 473g4850 · 46527 · Active; Jerry Smith · Male · Physiotherapist · 973g2250 · 43351 · Active; Grace Deo · Female · Dental Health · 857g3751 · 95738 · Inactive; John Adel · Male · Orthodntist · 653g4384 · 36388 · Active |
| `Patient` | id, practiceId, name, gender, dob, serviceUse, ehrId, status, avatar? | Rocky Joy · Male · 01/21/1989 · Orthodntist · 473g4850 · Active; Jerry Smith · Male · 04/23/1987 · Physiotherapist · 973g2250 · Active (use distinct names in fixtures) |
| `Webhook` | id, practiceId, name, url, method `GET \| POST \| PUT`, tokenId, verified, status | PaceHospitalwebhook, BombayHospitalwebhook, AsiaCosmetichospitalWebhook (unverified, Inactive), BirlaHospitalWebhook; token c127da…, c2163dkj-dskn-snfskkjdiv7, cuiewr473-4y7erj-dskjrhu-dsaj; url https://oojcijv, http:/fiifn.f9s.eufjh; method GET |

### 4.6 Logs

| Frame | Route | State | Notes |
|---|---|---|---|
| Logs 1 | `/logs?page=2&logId=…&node=3` | log selected, flow node selected | Navy header + "Filters"; left: scrollable card list + pager; right: "Log ID :" + 2×3 flow grid (columns Practices / Intraconnects / EHR). Show the selected card with a primary border |
| Frame 1 | `/logs` + local sheet open | filter sheet, empty | 5 selects: EHR Connection, Practices, Data Model, Event Type, Status; buttons "Clear filters" (outline) and "Apply Filters". Keep the shadcn close X |

**Flow:** Logs 1 → Filters → Frame 1 → Apply (writes params, page = 1, closes) or Clear. Card click sets `logId`; node click sets `node`.

**Data: `Log`**

| Field | Samples (verbatim) |
|---|---|
| `id` | 3a1e9fgcxw-scv aatfdsrw=hvsfxAaerc |
| `dataModel` | Bombay. Diagosticrepory.claim |
| `event` | Update |
| `logType` | Request |
| `status` | Successful / Failed |
| `timestamp` | 12 Apr, 2023 12:30 AM |
| `practiceId`, `ehr` | Bombay Hospital, Epic |
| `steps[6]` | `{ title, involved, status }`: IC Request / Involved- Bombay, Hospital → IC Request / Involved- Intraconnects → EHR Response / Involved-Epic (×2 rows) |

### 4.7 Setting (`settings/route.tsx`: H1 "Setting", pill tabs, breadcrumb `Home > Setting > …`)

| Frame | Route | State | Notes |
|---|---|---|---|
| Setting | `/settings/organisation?step=form` | form (empty in design; build pre-filled from org) | Logo upload card (caduceus, Q1); Organisation Name*, Organisation Overview*, Alert Email*, Sales Email*, Contact, Website, Twitter, Categories, Env Type; Save |
| 8 | `/settings/organisation?step=success` | saved | "Organisation profile saved successfully"; CTA "Redirect to Profile Details" → `step=form` |
| 9 | `/settings/users` | 2 pending + 2 active | "+ Invite New User" on the tab row; groups **PENDING INVITES** / **ACTIVE USERS**; columns: ID : User Name · User Status · User Role · Email · PHI Access · Owner/ User · MFA Status |
| 18 | `/settings/users/invite?step=form` | empty | section bar "Invite New User"; Name, E-mail, User role select; Cancel / Invite |
| 19 | `/settings/users/invite?step=success&createdId=…` | sent | "Invite Sent!"; key/value card (User Name, User Role, E-mail) **from the invited user**; CTA → `/settings/users` |
| 10 | `/settings/user-details` | MFA not configured (0 devices) | profile form (User Name*, Email ID*, Contact*) + **Save** (missing in the design); red callout + "+ Register with New Device"; Manage Password card + "Change Password →" |
| 14 | `/settings/user-details` | MFA configured (2 devices) | devices table: Device Name · App Name · App Description · Authentication Date & Time · Action (delete) |
| 11 | `/settings/user-details/mfa?step=register` | step 1, nothing selected | radio cards Authenticator App / Security Key; Proceed disabled until one is chosen; Cancel |
| 12 | `…/mfa?step=setup&method=app` | step 2, app | QR + "Copy Secret key" + 2 OTP inputs; add **Cancel / Verify** (missing in the design) |
| 16 | `…/mfa?step=setup&method=key` | step 2, key | Security Credentials list + U2F steps; Cancel / Proceed |
| 13 | `…/mfa?step=success&method=app&deviceId=…` | done, app | "Authentication completed!" + device card |
| 17 | `…/mfa?step=success&method=key&deviceId=…` | done, key | same; App Name "-", description "Key" |
| 15 | `/settings/user-details/change-password?step=form` | empty | Password, New Password, Confirm Password; Cancel / Save Changes |
| 20 | `/settings/user-details/change-password?step=success` | updated | "Password Updated!"; CTA → `/settings/user-details`; active pill **User Details** |

**Flows**
- Organisation: Setting → Save → 8 → Setting.
- Invite: 9 → + Invite → 18 → Invite → 19 → 9 (new row under Pending).
- MFA: 10 or 14 → + Register → 11 → (app) 12 → 13, or (key) 16 → 17 → 14.
- Delete device: 14 → delete icon → AlertDialog → 14, or 10 when none are left.
- Password: 10 or 14 → Change Password → 15 → 20 → 10/14 (Last Update refreshed).

**Data**

| Entity | Fields | Samples (verbatim) |
|---|---|---|
| `Organisation` | name, overview, alertEmail, salesEmail, contact?, website?, twitter?, category?, envType?, logoUrl? | name DocMD (sidebar); categories and env types unknown (Q12) |
| `OrgUser` | id, name, status `pending \| active`, role, email, phiAccess, ownership `owner \| sub-user`, mfa `active \| inactive` | Rocky / James / Rocky / Avhi; Developer; James.jpy@gmail.com; Access; Owner / Sub-user; Inactive / Active |
| `CurrentUser` | name, email, contact, avatarUrl?, passwordUpdatedAt | James Joy, Jamesjoy@xyz; "Last Update : 23 January, 2021 at 03: 48 PM" |
| `MfaDevice` | id, method `app \| key`, name, appName, description, authenticatedAt | One Plus 4s · Google Authenticator · Authenticator app level 2 · 22 Jan, 2022 at 04: 30 PM; Security Key SL · - · Key · 22 jan,2023 at 04:30 PM |
| U2F credentials (static mock) | userArn, path, createdAt | dsoifhjoinjcxvoi/aiushfdiu; 22 Jan, 2022 04:30 PM |

### 4.8 API Reference

- **No frame.** Documentation and API Reference sit together below the sidebar divider, and nothing is designed for either one.
- **Build both as external links** (`<a target="_blank">` with an `ExternalLink` hint). Do not create routes. Destination URLs: Q4.
- PROGRESS.md "Phase 9 — API Reference" shrinks to "wire the sidebar link".
- PROGRESS.md "Phase 10 — Profile-menu pages" is the Practice detail tabs (§4.5.2), already covered by Phase 6.

### 4.9 Shared components reused across frames

| Component | Frames |
|---|---|
| `PageHeader` (navy / white, breadcrumb, actions, tabs slot) | all app frames |
| `PillTabsNav` (route-driven, `<Link>` pills) | Practice detail 22–51; Settings, 8–20 |
| `DataTable` + `TablePagination` ("Showing x to y of N Entries") | Practices, Connection, 56, 57; also 9, 14, 25, 26, 34 (no pager) |
| `StatusSwitchPill` (switch + Active/Inactive) | Practices, Connection, 25, 26, 28, 34, 35, 63 |
| `CopyButton` + toast | Practices, Connection, 9, 25, 26, 34, 35, 12, 44 |
| `EhrLogo` | Connection, 56, 57, Overview |
| `WizardCard` (grey header bar + `Stepper` strip + body + footer buttons) | 11, 12, 16, 29–32, 36–38, 42–44, 47–50, 58–61, 64–66 |
| `Stepper` | the wizard frames above and Overview. State rule: Q3 |
| `DetailHeaderBar` (light-blue bar: title, status pill, "Edit Details") | 22, 28, 35, 41, 63 |
| `DescriptionList` (grey key : value blocks) | 13, 17, 19, 22, 28–32, 35, 37, 41, 43, 47–50, 61, 63, 66 |
| `SuccessState` (green check, green title, text, outline CTA) | 4, 8, 13, 17, 19, 20, 24, 33, 39, 45, 51, 54, 62, 67 |
| `EmptyStateGuide` (info alert + illustration card + CTA + "Steps to Follow" card) | 27, 46, 52, 53 |
| `CenteredFormCard` (section bar + centred bordered card) | 15, 18, 36, 42, 59, 64 |
| `ConnectionDetailsForm` / `ConnectionSummary` | 60/65, 61/66 |
| `PracticeProfileForm` / `PracticeProfileView` | Logs/23, 22/41 |

---

## 5. Frame index (all 69, canvas reading order: rows top→bottom, left→right)

| # | Frame | Node | Section | Route | State |
|---|---|---|---|---|---|
| 1 | 1 | 9:2 | Auth | `/login` | empty |
| 2 | 4 | 9:76 | Auth | `/forgot-password?step=sent` | email sent |
| 3 | 2 | 9:26 | Auth | `/signup` | empty |
| 4 | 3 | 9:62 | Auth | `/forgot-password?step=request` | empty |
| 5 | Overview | 9:85 | Overview | `/overview?step=1` | step 1 |
| 6 | Logs 1 | 253:25 | Logs | `/logs?page=2&logId&node` | log + node selected |
| 7 | Frame 1 | 434:13 | Logs | `/logs` (sheet local) | filter sheet open |
| 8 | Setting | 440:14 | Setting | `/settings/organisation?step=form` | form |
| 9 | 8 | 540:137 | Setting | `/settings/organisation?step=success` | saved |
| 10 | 11 | 557:323 | Setting | `/settings/user-details/mfa?step=register` | MFA step 1 |
| 11 | 9 | 544:264 | Setting | `/settings/users` | pending + active |
| 12 | 10 | 546:443 | Setting | `/settings/user-details` | no MFA device |
| 13 | 12 | 557:434 | Setting | `/settings/user-details/mfa?step=setup&method=app` | MFA step 2, app |
| 14 | 13 | 557:613 | Setting | `/settings/user-details/mfa?step=success&method=app` | MFA done, app |
| 15 | 15 | 563:893 | Setting | `/settings/user-details/change-password?step=form` | form |
| 16 | 14 | 562:740 | Setting | `/settings/user-details` | 2 MFA devices |
| 17 | 16 | 564:1051 | Setting | `/settings/user-details/mfa?step=setup&method=key` | MFA step 2, key |
| 18 | 17 | 564:1184 | Setting | `/settings/user-details/mfa?step=success&method=key` | MFA done, key |
| 19 | 18 | 564:1271 | Setting | `/settings/users/invite?step=form` | form |
| 20 | 19 | 564:1368 | Setting | `/settings/users/invite?step=success` | invite sent |
| 21 | 20 | 564:1485 | Setting | `/settings/user-details/change-password?step=success` | updated |
| 22 | Practices | 565:1576 | Practices | `/practices` | populated |
| 23 | Frame 2 | 635:613 | Practices | `/practices` (menu local) | row menu open |
| 24 | 22 | 568:1959 | Practices | `/practices/$id/profile` | view |
| 25 | 23 | 575:2 | Practices | `/practices/$id/profile/edit?step=form` | edit |
| 26 | 24 | 578:23 | Practices | `/practices/$id/profile/edit?step=success` | saved |
| 27 | 25 | 578:149 | Practices | `/practices/$id/providers` | populated |
| 28 | 26 | 578:347 | Practices | `/practices/$id/patients` | populated |
| 29 | 27 | 579:498 | Practices | `/practices/$id/connection` | no connection |
| 30 | 28 | 581:657 | Practices | `/practices/$id/connection` | attached |
| 31 | 29 | 582:836 | Practices | `/practices/$id/connection/edit?step=ehr` | edit 1/4 |
| 32 | 30 | 584:1027 | Practices | `…/connection/edit?step=app-types` | edit 2/4 |
| 33 | 31 | 586:1212 | Practices | `…/connection/edit?step=practice-id` | edit 3/4 |
| 34 | 32 | 587:1385 | Practices | `…/connection/edit?step=summary` | edit 4/4 |
| 35 | 33 | 587:1515 | Practices | `…/connection/edit?step=success` | updated |
| 36 | 34 | 588:1649 | Practices | `/practices/$id/webhooks` | populated |
| 37 | 35 | 593:1863 | Practices | `/practices/$id/webhooks/$wid` | detail |
| 38 | 36 | 594:1979 | Practices | `…/webhooks/$wid/edit?step=details` | edit 1/3 |
| 39 | 37 | 600:2 | Practices | `…/webhooks/$wid/edit?step=summary` | edit 2/3 |
| 40 | 38 | 600:152 | Practices | `…/webhooks/$wid/edit?step=verification` | edit 3/3 |
| 41 | 39 | 600:286 | Practices | `…/webhooks/$wid/edit?step=success` | updated |
| 42 | Logs | 601:414 | Practices | `/practices/new?step=details` | add, details |
| 43 | 41 | 601:531 | Practices | `/practices/new?step=review` | add, review |
| 44 | 42 | 602:682 | Practices | `/practices/$id/webhooks/new?step=details` | add 1/3 |
| 45 | 43 | 602:809 | Practices | `…/webhooks/new?step=summary` | add 2/3 |
| 46 | 44 | 602:922 | Practices | `…/webhooks/new?step=verification` | add 3/3 |
| 47 | 45 | 602:1038 | Practices | `…/webhooks/new?step=success` | added |
| 48 | 46 | 602:1125 | Practices | `/practices/$id/webhooks` | blocked: no connection |
| 49 | 47 | 602:1226 | Practices | `/practices/$id/connection/attach?step=ehr` | attach 1/4 |
| 50 | 48 | 602:1344 | Practices | `…/connection/attach?step=app-types` | attach 2/4 |
| 51 | 49 | 604:1484 | Practices | `…/connection/attach?step=practice-id` | attach 3/4 |
| 52 | 50 | 604:1609 | Practices | `…/connection/attach?step=summary` | attach 4/4 |
| 53 | 51 | 604:1731 | Practices | `…/connection/attach?step=success` | attached |
| 54 | 52 | 605:1816 | Practices | `/practices` | empty |
| 55 | 53 | 605:1923 | Connection | `/connections` | empty |
| 56 | 54 | 605:2029 | Practices | `/practices/new?step=success` | created |
| 57 | Connection | 606:2117 | Connection | `/connections?status=all` | populated |
| 58 | 56 | 607:2495 | Connection | `/connections?status=inactive` | filtered |
| 59 | 57 | 607:2800 | Connection | `/connections?status=active` | filtered |
| 60 | 58 | 608:3120 | Connection | `/connections/new?step=getting-started` | create 1/4 |
| 61 | 59 | 609:137 | Connection | `/connections/new?step=type` | create 2/4 |
| 62 | 60 | 610:277 | Connection | `/connections/new?step=details` | create 3/4 |
| 63 | 61 | 616:2 | Connection | `/connections/new?step=summary` | create 4/4 |
| 64 | 62 | 617:347 | Connection | `/connections/new?step=success` | created |
| 65 | 63 | 618:431 | Connection | `/connections/$id` | detail |
| 66 | 64 | 618:562 | Connection | `/connections/$id/edit?step=type` | edit 1/3 |
| 67 | 65 | 622:22 | Connection | `/connections/$id/edit?step=details` | edit 2/3 |
| 68 | 66 | 623:163 | Connection | `/connections/$id/edit?step=summary` | edit 3/3 |
| 69 | 67 | 623:278 | Connection | `/connections/$id/edit?step=success` | updated |

**Canvas layout**
- The canvas is a 3-column grid. Frames are numbered roughly by grid position, so the unnumbered frames fill gaps:
  - Overview = 5
  - Logs 1 = 6
  - Setting = 7
  - Practices = 21
  - Logs = 40
  - Connection = 55
- Exceptions to that order:
  - 1 and 4 share the top row.
  - 15 sits left of 14.
  - Frame 1 sits beside Logs 1; Frame 2 sits beside Practices.
- The stray empty text node **408:25** (0×22 at 1930, 692) is not a frame. Ignore it.

---

## 6. Design errors corrected in the build

### 6.1 Structural and copy errors

| Frame(s) | Issue | What we build |
|---|---|---|
| Logs, 54 | Sidebar highlights **Logs** on Add Practice | Practices active (prefix match) |
| 53 | Sidebar highlights **Practices** on Connections empty state | Connection active |
| 62, 67 | Sidebar highlights **Practices** on connection success | Connection active |
| 34 | Pill tab **Providers** active on the Webhooks list | Webhooks active (route-driven) |
| 36 | Pill tab **Connection** active, card "Edit Connetion Details", breadcrumb "…Connections > Edit Connections" | Webhooks tab; "Edit Webhook Details"; breadcrumb `… > Webhooks > <name> > Edit` |
| 11 | Pill **Organisation Profile** active on the MFA wizard | User Details active |
| 20 | Pill **Manage User** active on password success | User Details active |
| Practices, Connection, 56, 57 | Page title "Setting" | "Practices" / "Connections" |
| 52, 54 | Title "Practice Details" on list/add pages | "Practices" (list), "Add New Practice" (add) |
| 41 | Title "Practice Details", label "Specialty Name*" | "Add New Practice"; "Practice Name" |
| 62 | Title "Add New Connection", breadcrumb "Connection > New Connection" | "Connections", `Home > Connections > Add New Connection` |
| 63 | Breadcrumb "…> New Connection" | `Home > Connections > <connection name>` |
| 64 | Header / card "Add New Connection Details" in edit | "Edit Connection Details" |
| 10, 14 | Breadcrumb "Organisation Profile" | `Home > Setting > User Details` |
| 18, 19 | Breadcrumb "Change Password" | `Home > Setting > Manage Users > Invite New User` |
| 22 | Breadcrumb "Home > Setting > Practice Detail" | `Home > Practices > Practice Details > Profile` |
| 23, 24, 28 | Breadcrumb ends "Change Password" | `… > Profile > Edit` / `… > Connection` |
| 45 | Breadcrumb ends "Connection" on the webhook success | `… > Webhooks > Add Webhook` |
| 11, 12 | Grey bar "1. How intraconnects works" copied from Overview | "Multi-factor Authentication" (as on 16) |
| 28 | Card title "Practice Profile Details" | "Connection Details" |
| 43, 44 | Add-flow card titled "Edit…" / "Add NEw…" | Title from `mode` ("Add New Webhook Details" / "Edit Webhook Details") |
| 47, 49, 50 | Attach flow titled "Edit Connetion Details" / "Atach Connection" | Title from `mode` ("Attach Connection" / "Edit Connection Details") |
| 45 | "Webhook Updated Successfully" on the add flow | "Webhook Added Successfully" |
| 9 | Second group header "PENDING INVITES" | "ACTIVE USERS" |
| 19 | Card values copied from the MFA screen (U2F Security key SL, …) | invited user's name, role and e-mail |
| 17 | App Name "Google Authenticator" for a security key | "-" and "Key" (from device data) |
| 1 | Primary button "Sign Up" on Sign In | "Sign In" |
| 2 | Sign Up card headed "Welcome Back ! / Sign In", 2nd field "Password" | "Create Account", "Already have an account? Sign In"; "Confirm Password" |
| 3 | "Want to get back? Sign Up" | "Sign In" → `/login` |
| 32, 50, 61, 66 | "Next" on the final (submit) step | "Update Connection" / "Attach Connection" / "Create Connection" / "Update Connection" |
| Logs | First button "Previous" on step 1 | "Cancel" → `/practices` |
| 64 | "Previous" on step 1 | "Cancel" → `/connections/$id` |
| 12 | No Cancel/Verify buttons | Cancel (outline) + Verify (primary) |
| 23 | No Save/Cancel buttons | Cancel + Save |
| 10, 14 | No Save for the profile fields; org placeholders reused ("Enter Organisation Name", "Upload Org Logo") | Save button; "Enter your name", "Upload Photo" |
| 15 | New Password placeholder "Enter the existing Password" | "Enter the new password" |
| 23, Logs | Specialty drawn as a single select; Address line 2 required; Contact/Website/Zip missing | multi-select; line 2 optional; add Contact*, Website, Zip code* |
| 23, Logs | "NPI Name*"; NPI/Specialty helper text copy-pasted | "NPI Number*"; "Group or solo NPI number"; "Ex : Physiotherapy" |
| 29, 47, 59, 64 | EHR Name drawn as plain input (no chevron) on 29/47 | Select (with EHR logos) |
| 30, 48 | Provider Connection Name select enabled while its switch is off | Disable and clear it when the switch is off |
| 29 vs 30, 58 vs 59 | Check icon on the current step, then outlined "1" on the next step | Stepper rule (Q3 default: done = check, current = filled number, upcoming = outline) |
| 34 | Unverified webhook shows an empty grey box | "Not verified" neutral badge |
| 35, 37, 41, 61, 66 | Required `*` on read-only labels | no asterisks in read-only lists |
| 60, 65 | Redirect URL label with no value | read-only generated URL + copy |
| 61, 66 | Client Secret shown in plain text; "Launch" row missing ":" | masked `••••1234` + reveal; aligned row |
| 60, 65 | Org Redirect URL / Launch helper text copied from Audience / Nonce | "Your application's redirect URL" / "Launch context, if required" |
| 37, 43, 66 | Summary sub-copy says "created" in edit flows | "updated" in edit mode |
| 8, 24, 39, 45, 54 | Success body copy pasted from the connection flow ("connection/specialty Details…") | Entity-specific sentence (e.g. "Your practice profile has been updated.") |
| 62, 67 | CTA "Redirect to Webhook Details" after a connection create/edit | "View Connection" → `/connections/$id` (Q8) |
| 52 | Alert "No connection is attached…" on the empty practices list | "No practice is added yet!" |
| 27, 46, 52, 53 | "Steps to Follow" copy is placeholder (practice text under connection/webhook; MFA text under "Pre-requisite"; 46 starts at step 2) | Coherent 3-step guide: 1 Create connection → 2 Add practice + attach connection → 3 Add webhook; highlight the step relevant to the page |
| Practices, Connection, 56, 57 | Page 2 highlighted, "Showing 1 to 10", 11 rows; filtered views keep the "100 Entries" total | 10 per page; footer and pager from the real (filtered) total |
| 56/57 vs Connection, 29–32 vs 47–50, 31 vs 32, 36 vs 35/37, 60/65 vs 61/66, 26 vs 25 | Mock values contradict between frames | One consistent fixture set (§4) |
| 63 | Duplicate "EHR Type"/"Connection connected" with different values; Epic connection with Athena scope; Client ID "Patient"; Connection ID shown as an email | single values from one `Connection` record |
| 35 | Webhook URL value is an e-mail | https URL |
| 2 | Stray chevron on the background | omit |
| 1 | Card right-aligned with an empty left half | centred card (Q13) |

### 6.2 Typos (fix in UI copy and fixtures)

| As designed | Correct |
|---|---|
| API Refrence | API Reference |
| Forget Password | Forgot Password |
| Reset password though the Email Sent / verifaction / Introconnectuser@xyz.com | Reset link sent / verification / (use the submitted email) |
| wprks, Practie, Unfield | works, Practice, Unified |
| Data Modal, Diagosticrepory | Data Model, DiagnosticReport |
| Uplode Org Logo | Upload Org Logo |
| nitification | notification |
| nsaved successfilly, reciived | saved successfully, receive |
| MTF, to provided, Learn More | MFA, to provide |
| uthenticator, MAF, Scane, search key | Authenticator, MFA, Scan, secret key |
| Authencation, "See the list of browsers that U2F keys." , ":>" | Authentication, "…browsers that support U2F keys.", ":" |
| Authentication Data & Time; Google Authentication (14) | Authentication Date & Time; Google Authenticator |
| Multi- factor; "register with the new below to complete to authentication" | Multi-factor; "Register a new device below to complete authentication" |
| Verify the  password before the changing | Verify your password before changing it |
| gt, wil, till … doesn't accept; Ince … accept … list of user | get, will, until … accepts; Once … accepts … list of users |
| Hoapital, Midcover, Millan/Milaan, Foren | Hospital, Medicover, Milan, (real city) |
| Orthopediac, viriginia, st jhons / st johns | Orthopaedic, Virginia, St John's Street |
| Neuro Surgen, Orthodntist | Neurosurgeon, Orthodontist |
| Practices Detaild | Practice Details |
| Atach, fallowing, wich, NEw, responce | Attach, following, which, New, response |
| Connetion, Tpye, Summery, Provided - Epictest12 | Connection, Type, Summary, Provider - Epictest12 |
| recive, "is your registered mail ID", Your can, siccessfully | receive, "on your registered mail ID", You can, successfully |
| Connection Update Successfully | Connection Updated Successfully |
| Webhook URl, PaceHospittalWebhook | Webhook URL, PaceHospitalWebhook |
| Genrating, Generation new token | Generating, Generating a new token |
| App Tpye, Org Redirect URl, TestNexthenPatient, TestCernerStytem, AthenaPAtientconnection | App Type, Org Redirect URL, TestNextgenPatient, TestCernerSystem, AthenaPatientConnection |
| nique, Nounce, “ scopes “ | unique, Nonce, "scopes" |
| Plaese, give below, client,ID client secret, need to correct (58) | Please, given below, client ID, client secret, need to connect |
| AthenaHelth, intregration, journey adding | athenahealth, integration, journey of adding |
| effect, futhure (64) | affect, future |

---

## 7. Open questions for the designer/user

1. **Missing assets.** The IntraConnect logo (sidebar header is empty in every frame), the DrChrono logo, the EHR architecture diagram (27, 46, 53), the org caduceus placeholder (Setting) and the provider/patient photos.
   - Default: text wordmark; "dr" letter tile; reuse `illustration-transfer-data.png`; lucide `Building2` / `Avatar` initials.
2. **Header style.** Navy band only on Overview and Logs, white everywhere else. Is that intentional?
   - Default: as drawn.
3. **Stepper state rule.** The frames contradict each other (check on the current step in 29/47/58; past steps drawn as outlined numbers).
   - Default: completed = check, current = filled number, upcoming = outlined.
   - Can users click back to completed steps? Default: yes, completed steps only.
4. **Documentation and API Reference destinations.** No pages are designed. External URLs? Same tab or new tab?
   - Default: external, new tab, placeholder `#`.
5. **User card chevron.** No account menu is designed.
   - Default: `DropdownMenu` with "User Details" → `/settings/user-details` and "Sign out" → `/login`. Confirm, or drop the chevron.
6. **Final-step button labels.** Confirm "Create Connection" / "Update Connection" / "Attach Connection" / "Save" (add practice) / "Generate Token" (webhook) instead of "Next".
   - Should webhook edits be savable without regenerating the token (38)?
7. **Overview steps 2–4.** Steps 2 and 3 are both titled "Pre-requisite Process", and only step 1 is designed. Real titles and content?
   - Default: steps 2–4 stubbed, with step 4 linking to `/practices/new`.
8. **Success CTAs.** On 62 and 67 "Redirect to Webhook Details" has no sensible target. Default: "View Connection".
   - Where should Add Practice success (54) land: the profile or the list? Default: the profile.
9. **Status toggle confirmation** (practices, connections, providers, patients, webhooks). Should toggling ask for confirmation? Can providers and patients be toggled at all?
   - Default: no dialog, optimistic toggle + toast. Providers and patients are read-only.
10. **Missing buttons on 12 and 23.** Confirm the labels: 12 = Cancel + **Verify**; 23 = Cancel + **Save**.
    - Also: User Details (10/14) has no Save. Should we add one, or make the fields read-only?
11. **Row-menu order (Frame 2) vs tab order.**
    - Menu: Profile, Provider, Patients, Connection, Webhook.
    - Tabs: Profile, Connection, Webhooks, Providers, Patients.
    - Default: tab order and tab labels in both.
12. **Option lists not designed:**
    - Environment (Production / Sandbox?)
    - Organisation switcher
    - Organisation Categories and Env Type
    - User role (only "Developer" is seen; default Admin / Developer / Viewer)
    - Webhook Method Type (default POST / GET / PUT)
    - Log Event Type and Data Model
    - Specialties list
13. **Sign In card alignment (1).** Right-aligned with an empty left half: is an illustration missing?
    - Default: centred like 2–4.
14. **Customer ID vs NPI.** On 28 the Customer ID equals the NPI from 22. Are they the same field? Who issues "Practice ID" (E-463877 vs V - 4676452)?
15. **"ID : Name" columns** (Practices, Connections, Webhooks, Users) show only the name. Should the ID be shown, or only copied by the copy icon?
    - Default: copy icon copies the ID; column header "Name".
16. **Invite form.** It has no PHI Access or Owner/Sub-user fields, which the list shows.
    - Default: Sub-user, Access.
    - Pending invites need actions (resend/revoke)?
17. **Webhooks and connections.** Is a webhook really blocked until a connection is attached (46)?
    - Can a practice attach more than one EHR connection, or exactly one with Patient/Provider app types (48)? Default: exactly one.
18. **Logs.** Should the filter selects allow multiple values?
    - What does selecting a flow node show (no payload panel designed)?
    - What does the "no log selected" state look like? Default: auto-select the first log.
