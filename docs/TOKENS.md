# IntraConnect design tokens

Source: the exported Figma frames in `docs/screens/*.png` (1920×1080 at 1x; `Frame 1.png` is the Logs filter sheet, 614×1088 with an 11/8 px transparent export margin; `Frame 2.png` is the profile dropdown, 184×235). Element positions come from the Figma layer metadata XML (frame-relative x/y/w/h). Measured 2026-10-08.

**Every value below was sampled from pixels, not estimated by eye.** The previous eyeballed draft is superseded. Its main errors were: tints are `#E8F4FF`, not `#E7F3FF`; app input borders are `#BFBFBF`, not `#CFCFCF` (`#CFCFCF`/`#EFEFEF` was a sub-pixel split of a 1px `#BFBFBF` line); buttons, selects and the info box use a 4px radius, not 6–8px; the sidebar divider is white at 50%, not `#1E404E`; and badge variants exist in frames `9` and `34`, including a success tint `#E9F9EE`. Method and scripts: section (f).

Coordinates are `x,y` pixels inside the named PNG. A box is `(x0,y0,x1,y1)`. "Frame" means the PNG name in `docs/screens/`.

---

## (a) Raw measurements

### a1. Surfaces and chrome

| Hex | Role | Frame | Sample (mode of interior box, share) |
|---|---|---|---|
| `#FFFFFF` | Page / content background, cards, inputs, white header | Setting, Logs 1 | (1780,300,1900,900) 100% · (1000,500,1800,900) 100% |
| `#0F3242` | Sidebar background (nav area) | Overview, Connection | (10,10,360,95) 100% · (10,640,360,780) 100% |
| `#1A495F` | Sidebar footer panel (y 793–1080) **and** navy page header | Overview, Logs 1 | footer (5,800,40,1075) 100% · header (600,5,1700,25) 100% · (700,5,1700,25) 100% |
| `#1674C6` | Sidebar active row (= `#1890FF` at 70% over `#0F3242`, max error 1) | Overview, Connection | (5,105,40,164) · (5,171,40,230) 100% |
| `#1890FF` | Sidebar active indicator bar, x 362/363–372 (10px) | Overview, Setting | (364,105,371,164) · (363,369,371,428) 100% |
| `#8798A0` (≈ white 50% on `#0F3242`) | Sidebar divider, 1px slanted line at x 39–333, y≈460 (renders as a `#788C95`+`#1E3F4E` anti-aliased pair) | Overview | vertical scans at x=50/150/250/320, y 457–466 |
| `#FFFFFF` | 1px seam between sidebar and navy header (x=372). Only appears on navy-header frames. | Overview, Logs 1 | h-scan y=60 |
| `#FFFFFF` | White page header (Setting, Connection, Practices, 22, 52, 58, 62, 63) | Setting, 63 | (1000,5,1900,25) · (1300,5,1900,25) 100% |
| `#F2F2F2` | Section title bar (Overview "1. How intraconnects works"); wizard card header bar; neutral badge | Overview, 58, 9 | (395,115,405,185) · (420,115,430,185) · badge (699,320) |
| `#E8F4FF` (= `#1890FF` at 10% over white, exact) | Light-blue tint: stepper bar, details-card header bar, Logs flow panel, pagination bar, tinted info card | Overview, 58, 63, 22, Logs 1, Connection, 52 | (395,205,405,275) · (420,115,430,185) · (940,172,955,400) · (380,1005,400,1065) · (1165,215,1180,800) |
| `#D5EBFF` (= `#1890FF` at 18%, exact) | Table header row | Connection, Practices, 9 | (380,175,400,215) 100% |
| `#F4F4F4` | Key-value group panels inside detail cards | 63, 22 | (440,210,450,330) · (440,268,450,390) 100% |
| `#F0F0F0` | Log-card "Data Modal" strip; scrollbar track | Logs 1 | (430,184,436,228) · (881,600,889,900) 100% |
| `#C5C5C5` | Scrollbar thumb (6px core, x 883–886, with an anti-aliased edge) | Logs 1 | (881,170,889,500); h-scan y=300 |
| `#EBEBEB` | Logo-upload strip; "Inactive" badge fill | Setting, 9 | (552,386,565,428) 100% · badge (1736,320) |
| `#ECECEC` | Overview "Practice" illustration card | Overview | (1525,362,1535,615) 100% |
| `#C2E1F2` | Overview "Intraconnects" diagram panel (illustration-only colour; not a clean primary tint) | Overview | (770,330,800,420) 100% |
| `#74C3EE` | Overview inner white tiles, 2px border | Overview | v-scan x=1100, y 333–334 |
| `#484848` | Overview dark "Practice" button | Overview | (1545,627,1560,665) 100% |
| `#E6E6E6` | Status-toggle pill background (table) | Connection | (1675,241,1688,267) 94% |
| `#EFEFEF` | Status-toggle pill background (details chip); empty "Verification" cell | 63, 34 | (1645,137,1662,163) 94% · (1272,430,1386,460) |

### a2. Brand, action and link

| Hex | Role | Frame | Sample |
|---|---|---|---|
| `#1890FF` | **App primary**: filled buttons (Add New Connection, Save, Filters, Apply Filters, EHRs), active tab/segment, active page number, selected flow node, stepper circles and labels, outline-button border and text, chips, info icon, links in cards | Connection, Setting, Logs 1, Frame 1, Overview | (1700,108,1870,112) · (550,1008,560,1040) · (1762,33,1785,64) · Frame 1 (205,703,220,735) · (816,231,820,236), all 100% |
| `#FFFFFF` | Text on primary | Setting | glyph core of "Organisation Profile" tab (434,107,585,126) |
| `#009AC1` | **Auth primary button** (Sign Up / Sign In) | 1, 2 | (1180,698,1360,738) 100% |
| `#00A3CC` | **Auth link text** ("Sign Up", "Forget Password") | 1 | glyph core (1486,466,1561,490) |
| `#1EA64B` | Auth "Remember me" toggle, on | 1 | (1175,645,1185,656) 100% |

**Auth background gradient.** It is linear and fits a plane with an RMS residual of 0.32 per channel, so two stops reproduce it exactly. The direction is 60.7° (bottom-left to top-right). It is identical on frames 1–4.

| Point | Hex (9×9 median) |
|---|---|
| TL (4,4) | `#3271A2` |
| TR (1915,4) | `#0FB8E2` |
| BL (4,1075) | `#3D5B8E` |
| BR (1915,1075) | `#1AA2CE` |
| Centre (960,540) | `#268AB8` |
| Fitted CSS | `linear-gradient(61deg, #3D5B8E 0%, #268AB8 50%, #0EB9E3 100%)` |

The auth card (white, 581×568 at 1118,256, radius 20) has **no shadow**: the gradient continues right up to the card edge.

### a3. Text colours (glyph-core sampling)

Almost all text is **pure black or pure white at an opacity**. Every pair below was solved as a single-overlay alpha with error ≤ 1 (`opacity.py`). That is why the same text layer renders as a different hex on each surface.

| Effective hex | Overlay | Role | Frame | Box |
|---|---|---|---|---|
| `#333333` | black 80% | **Primary text**: page titles on a white header, table names, form labels, headings, body copy, filter-sheet title, "Owner" badge text | Setting, 63, Connection, Practices, Frame 1, 58, 8, Overview | (414,30,525,69) · (616,242,809,266) · (823,189,1005,213) · Frame 1 (52,141,209,165) |
| `#2B2F33` / `#2E3133` / `#303030` / `#313131` / `#272D30` | black 80% on `#D5EBFF` / `#E8F4FF` / `#F2F2F2` / `#F4F4F4` / `#C2E1F2` | Table header text; card-header titles; key-value values; Overview tile captions | Connection (414,176,1825,200) · 63 (443,138,627,162) · 58 (437,138,714,162) · 63 (720,225,839,247) · Overview (816,461,952,493) |
| `#4D4D4D` | black 70% | Breadcrumb current item; auth "Sign In" title; log-card values and dates; alert text; empty-state body | Setting (755,38,944,62) · 1 (1356,416,1461,455) · Logs 1 (429,309,603,328) · 52 (509,149,1030,173) |
| `#494949` / `#484848` / `#464A4D` | black 70% on `#F2F2F2` / `#F0F0F0` / `#E8F4FF` | Section-bar title; Data Modal strip; pagination numbers; tinted card body | Overview (414,137,691,161) · Logs 1 (439,206,679,225) · Connection (1660,1023,1684,1047) · 52 (1232,428,1808,548) |
| `#7F7F7F` | black 50% | **Muted**: placeholders, helper text, breadcrumb links, secondary table cells, app-type badge text, Log ID value, wizard subtext, success subtitle, dropdown items, "PENDING INVITES" caption, chevrons, search icon, auth input icons | Setting (838,232,1040,256) · (823,274,1130,298) · (560,38,617,62) · Connection (939,242,1000,266) · Frame 2 (38,153,147,177) · 9 (452,272,590,291) |
| `#7A7A7A` / `#747A7F` / `#737373` | black 50% on `#F4F4F4` / `#E8F4FF` / `#E6E6E6` | Key-value labels; "Showing 1 to 10…" and flow arrows; toggle-pill label | 63 (461,225,614,247) · Connection (414,1023,701,1047) · Connection (1624,245,1673,264) |
| `#616161` | black 62% | Copy icon | Connection (584,242,608,266) |
| `#000000` | black | Sidebar select values ("Production", "DocMD") | Overview (60,857,129,879) |
| `#FFFFFF` | white | Sidebar nav text and icons (active and inactive alike); navy-header title | Overview (84,188,195,212) · (84,122,175,146) · (414,30,559,69) |
| `#BAC8CF` | white 70% on `#1A495F` | Breadcrumb on navy header (all items) | Logs 1 (522,38,578,62) · (616,38,663,62) |
| `#A3B6BF` | white 60% on `#1A495F` | Sidebar footer captions ("CURRENT ENVIRONMENT") | Overview (48,827,247,846) |
| `#8DA4AF` / `#7F7F7F` | white 50% on navy / black 50% on white | Title–breadcrumb vertical rule, **2px** wide, 30px tall | Logs 1 h-scan y=50 x 502–503 · Setting x 541–542 |
| `#1890FF` | — | Links in cards ("Add new Practice"), stepper labels, outline buttons, chips, flow column label "Practices" | 52 (1232,388,1402,410) · 58 (462,229,612,253) |

### a4. Status colours and badge variants

| Variant | Fill | Border (1px) | Text | Frame / sample |
|---|---|---|---|---|
| Success text ("Successful", success title) | — | — | `#1AC252` | Logs 1 (772,266,858,285) · 62 (899,503,1393,538) |
| Error text ("Failed"); required asterisk | — | — | `#DF2A2D` | Logs 1 (792,474,839,493) · Setting (1008,189,1020,205) |
| Success badge ("Access", "Active User", "Active", "Verified") | `#E9F9EE` (= `#1AC252` at 9%, error 1) | `#1AC252` | `#1AC252` | 9: v-scan x=1368 y 318→319; text (1391,327,1444,345) · 34 (1313,294,1369,312) |
| Neutral badge ("Pending Invites") | `#F2F2F2` | none | `#303030` (black 80%) | 9 (694,318) fill; text (705,327,815,345) |
| Outline badge ("Owner", "Sub-user"; app-type "Provider/System/Patient") | `#FFFFFF` | `#BFBFBF` | `#333333` (frame 9) / `#7F7F7F` (Connection app-type) | 9 h-scan y=336 x=1547 · Connection (1378,239) |
| Inactive badge ("Inactive" MFA) | `#EBEBEB` | `#B0B0B0` | `#2F2F2F` (black 80%) | 9 (1731,318) scan |
| Status toggle, on | track `#1AC252`, knob `#FFFFFF` | — | pill `#E6E6E6`, label `#737373` | Connection (1581,244,1590,262) |
| Status toggle, off | track `#D6D6D6`, knob `#FFFFFF` | — | same pill | Connection (1605,315,1615,334) |
| Success icon (check-circle, success screens, bullet dots, flow checks) | `#1AC252` | — | white check | 62 (1110,350,1130,360) · 8 (1110,450,1130,460) · 58 bullet (461,446,471,456) |
| Info (alert icon, tints) | `#1890FF` / tint `#E8F4FF` | alert border `#BFBFBF` | text `#4D4D4D` | 52 (473,149,497,173) · v-scan x=1000 y=132 |
| **Warning** | **No sample anywhere.** A census of flat colours across all 69 PNGs (`palette_scan.py`) found no warm hue. | | | — |
| **Error tint** | **No sample.** Error is shown as coloured text only. | | | — |

### a5. Borders and dividers

| Value | Role | Frame / scan |
|---|---|---|
| `#BFBFBF` 1px (black 25%) | **The universal app border**: inputs and selects (Setting and the filter sheet), table row dividers, log-card border, alert border, search underline, outline badge. Frame 1 renders it as `#CFCFCF`+`#EFEFEF` because the line sits on a half pixel; the coverages sum to exactly one `#BFBFBF` px. | Setting v x=1000 y=220 · h y=243 x=823 · Connection v x=1000 y=288 · Logs 1 v x=600 y=347 · 52 y=132 · Frame 1 v x=300 y=171/172 |
| `#BFBFBF` **3px** | Form section divider (Setting) | Setting v x=1000 y 487–489, 846–848 |
| `#7F7F7F` 1px | Auth inputs; Setting logo box | 1 h y=545 x=1173 · v x=1400 y=521 · Setting (547,189,755,191) |
| `#1890FF` 1px | Outline buttons/tabs/chips, flow nodes, user-group divider (frame 9 y=440) | 62 (1017,624,1276,626) · 22 v x=530 y=457 · Logs 1 h y=300 x=960 · 9 v x=1000 y=440 |
| `#1890FF` 2px | Overview info box border | Overview v x=1000 y 867–868 |
| `#B0B0B0` 1px | Inactive badge border | 9 |
| none | Dropdown (Frame 2): no border and no row dividers in the export; items `#7F7F7F` on white | Frame 2 v x=92 |

### a6. Shadows (fitted, not eyeballed)

`shadow_fit.py` converts the fall-off outside each edge to alpha (`1 − v/bg`) and least-squares fits `alpha(d) = A·Φ((offset − d)/σ)`, where CSS blur = 2σ. The values are CSS `box-shadow` equivalents.

| Element | Edge alpha (measured) | Fit | RMS | Frame / scan |
|---|---|---|---|---|
| White page header (98 or 157 tall) | 0.20 → 0 over 15px | `0 5px 10px rgba(0,0,0,.25)` | 0.002 | Setting v x=1000 from y=157 · 63 from y=98 |
| Navy header (Overview, Logs) | — | **none** (hard edge `#1A495F` → `#FFFFFF` at y=98) | — | Logs 1 v x=1000 y 94–112 |
| Page content card (1464 wide; 52, 58, 63, 9, 22, 34) | bottom 0.145 → 0 over 24px; sides 0.067 | `0 11px 12px rgba(0,0,0,.15)` | 0.003 | 63 v x=1000 from y=989, h y=600 both sides · 52 from y=936 |
| Soft panel (Logs list cards, Logs flow panel, Overview EHR card and diagram panel) | ≈0.078 flat for about 8px, then fades by about 28px | `0 16px 10px rgba(0,0,0,.07)` (alternatives fit within 0.004) | 0.004–0.006 | Logs 1 v x=600 from y=348; v x=1400 from y=406 · Overview v x=1100 from y=727 |
| Overview practice card | 0.078 | `0 12px 20px rgba(0,0,0,.10)` | 0.004 | Overview v x=1680 from y=678 |
| Empty-state inner cards (52) | 0.071 on every side | `0 0 11px rgba(0,0,0,.15)` | 0.002 | 52 h y=500 from x=444 leftwards; v x=700 from y=805 |
| Filter-sheet header bar | 0.176 → 0 over 14px | `0 3px 10px rgba(0,0,0,.26)` | 0.002 | Frame 1 v x=300 from y=106 |
| Filter sheet body, auth card, dropdown | **no outer shadow in the exports** | — | — | Frame 1 h y=600 edges are hard; 1 h y=500; Frame 2 |
| **Overlay scrim** | **No frame shows one.** The filter sheet and dropdown are exported as isolated components with transparent margins, not over a dimmed page. | — | — | Frame 1 alpha channel |

### a7. Radii (corner-curvature fit)

`radius.py` finds the sub-pixel 50%-coverage inset on each of the first 24 rows from a corner and fits a circle (`inset = r − √(r² − (r − k − ½)²)`). Strokes read about 1px low, so treat ≈3.1–4.4 as 4.

| Fit | Use as | Elements (frame @ corner) |
|---|---|---|
| 4.4 | **4px** | Every button (Connection 1644,105; Setting 548,1006; Logs 1 1759,31; Overview 465,621; auth 1,1173,694); inputs/selects (Setting 823,220; auth 1173,521; sidebar selects 45,852); user card (45,989); tabs/segments (Setting 414,98 and 606,98; Connection 414,105); app-type badge (1378,239); frame-9 badges (3.2–4.4); log card (Logs 1 414,161); Data Modal strip (426,180); pager bar (413,998); flow node (960,188); alert (52 445,132); info box (Overview 450,867); details status chip (63 1377,132); Frame 1 inputs and buttons (3.0–3.1, half-pixel offset) |
| 8.9–9.2 | **10px** | Overview EHR card (450,357), practice card (1522,357), inner tiles (1008,333); Logs flow panel (932,167); Setting logo box (547,189) |
| 19.2 | **20px** | Auth card (1118,256) |
| 29.1 | **30px** | Overview diagram panel (761,307) |
| 14.2 on 30px height | **full** (`9999px`) | Status toggle pill (Connection 1576,310) |
| 7.6 on 17px height | **full** | Auth remember-me toggle (1173,642) |
| 0–1.5 | **0** (≈2 for pager squares) | Header, sidebar, table rows, content card (63 414,111; 52 416,111), key-value panels (63 434,204), empty-state cards (52), section bar (Overview 391,110), pager squares (Connection 1705,1023 → 1.2) |

### a8. Typography

**Family: Inter. This is a best guess, labelled as a guess.** `fontmatch.py` renders the actual strings in 8 candidates (Inter, Roboto, Poppins, Open Sans, Nunito, Manrope, DM Sans, Plus Jakarta Sans) × weights 400/500/600, fits the size to the ink width, and scores normalised cross-correlation against the screenshot.

- Inter ranks first in 11 of 17 strings ("Sign In" 0.955, "Organisation Name" 0.950, "EHR" 0.992, "Connection Added Successfully" 0.921, "IC Request" 0.938, "Bombay Hoapital" 0.926, "EHR Connection" 0.914, "Filter the logs by" 0.862).
- Roboto ranks first on some 16–18px strings: placeholders ("Enter Organisation Name" 0.885, "Filter by EHR" 0.850), "Add New Connection" (0.856) and "TestNexthenPatient" (0.832).
- In a ×4 visual comparison (`fontsheet.png`, `fontsheet2.png`), the screenshot glyphs match Inter in the shape of `G`, `t`, `a`, `y`, `C` and the bowl of `e`. Roboto wins those strings only on width: Figma's Inter 3.x is tracked wider than the Inter 4 served by Google Fonts, so a wider Roboto fits the width better.
- Plus Jakarta Sans and Manrope each win one heading ("Setting", "Overview" nav) on NCC, but they are rejected visually because their `g` and `w` differ.
- **Verdict:** Inter everywhere, including the filter sheet. The old "Roboto in the filter drawer" claim is not supported: its labels and title match Inter.

**Sizes** come from Figma text-box heights (Inter auto line-height ≈ 1.21 × size). They were cross-checked against the fitted render size and against cap height (`EHR` ink 15px ÷ 0.727 = 20.6; `Add New Connection` cap 12 ÷ 0.727 = 16.5).

| Role | Size / line-height | Weight (from NCC) | Evidence (box h → frame:text) |
|---|---|---|---|
| Page title (header), auth title, filter-sheet title, "Steps to Follow", success headline (62) | **32 / 39** | 500 on app titles (best Inter match for "Setting", NCC 0.898); 600 for auth "Sign In" and the 62 success title | 39 → Setting "Setting", 63, 1 "Sign In", Frame 1; 62 title ink-width fit 32px |
| Success headline (frame 8) | 36 / 44 | 600 | 44 → 8 |
| Wizard heading, Overview lead paragraph | 24 / 29 | 500 | 29 → 58 "Getting Started"; 58/2 lines → Overview |
| Section/card title, sidebar nav, table header and cells, form label, breadcrumb, stepper label, body copy | **20 / 24** | nav 500; table header 500; names and labels 600; secondary cells 400 | 24 → 157 layers |
| Input text / placeholder, key-value rows, wizard subtext | 18 / 22 | 400 | 22 → 94 layers (Setting, 63) |
| Button, tab, badge, sidebar caption (uppercase), auth placeholder, flow node title | **16 / 19** | 500 (buttons), 400 (captions) | 19 → 71 layers; frame-9 badges 18 |
| Overview info-box body | 15 / 18 | 400 | 18 → Overview |
| User name; auth hint | 14 / 17 | 500 | 17 → sidebar |
| Flow node caption ("Involved-…"); Overview tile caption | 13 / 16 | 400 | 16 → Logs 1; 32/2 lines → Overview |
| Micro labels ("Data Modal", "Event"), stepper digits | 12 / 15 | 400 | 15 → Logs 1, 58 |
| User email | 10 / 12 | 400 | 12 → sidebar |

### a9. Layout and component sizes (px, exact from XML and confirmed by scans)

| Item | Value | Source |
|---|---|---|
| Sidebar width | **372** (active row is 373 wide on Overview; 1px white seam at x=372 on navy-header frames) | all frames; h-scans |
| Sidebar nav | first row y=102; rows 65 tall at a 66 pitch (1px gap); icon 24 at x=45; label at x=84; active bar 10px at the right edge | Connection XML |
| Sidebar divider | x 39–333, y≈460 | Line 1 |
| Sidebar footer panel | y 793–1080 (287); selects 281×32 at x=45; user card 281×57; avatar 41 | Connection XML |
| Header height | **98** (title only) / **157** (title + toolbar or tab row at y≈98–141) | Overview, 63 vs Setting, Connection |
| Header title | x=414, y=30 (box 39) → vertically centred in 98 | XML |
| Page gutter | **42** left (414 − 372) and right (1920 − 1878) | XML |
| Content card | 414..1878 (1464 wide), top y=111 (13 below the 98 header) | 63, 52, 58 |
| Card header bar | 78 tall; title inset 29 (details) / 23 (wizard) | 63, 58 |
| Card body inset | 20 (key-value panels at 434..1857); 48 for wizard content (x=462) | 63, 58 |
| Key-value panel gap | 15 | 63 (338 → 353) |
| Table | full-bleed 372..1920 on list pages; header row **62**; body rows **70** + 1px divider (71 pitch); footer/pager bar 70 | Connection |
| Pager | 24×24 squares; arrows in white boxes; active square `#1890FF` | Connection |
| Buttons | **36** tall; padding-x 20; icon-to-label gap 10 (icon 1664, label 1696 with a 22px "+" glyph box); buttons in a row 22 apart | Connection, Setting, Frame 1, 58 |
| Segmented tabs / filters | 36 tall, 1px gap, active filled | Setting, Connection |
| Inputs (app) | **46** tall (textarea 73); label → input gap 5–7; input → helper gap 5 | Setting, Frame 1 |
| Inputs and button (auth) | 48 tall; 471 wide | 1 |
| Sidebar selects | 32 tall | Overview |
| Badges | 30 tall (app-type, 104 wide; status pill 115) or 36 tall (frame-9 badges) | Connection, 9 |
| Toggle | track 40×24, knob 18 (table pill 115×30); auth toggle 33×17, knob 15 | Connection, 1 |
| Form grid (Setting) | columns at x=548 and x=1202, each 542 wide, gap 112 | Setting |
| Filter sheet | 591 wide, full height; header 98; body padding 41; field pitch 112 | Frame 1 |
| Dropdown | 184 wide, rows 47 | Frame 2 |
| Log cards | 455×187, 21 gap, inner padding 12 | Logs 1 |
| Icons | 24 (nav, copy, kebab, stepper circle); 34 (menu) | XML |

---

## (b) Proposed shadcn / Tailwind v4 mapping

There is no dark theme in Figma, so ship `:root` only. Values are flattened hex on white, so contrast stays stable. See (e)4 for the overlay variants.

```css
:root {
  --radius: 0.25rem;                    /* 4px: buttons, inputs, badges, small cards */

  --background: #FFFFFF;
  --foreground: #333333;                /* black/80 */
  --card: #FFFFFF;
  --card-foreground: #333333;
  --popover: #FFFFFF;
  --popover-foreground: #7F7F7F;        /* Frame 2 dropdown items are black/50 */

  --primary: #1890FF;
  --primary-foreground: #FFFFFF;
  --secondary: #E8F4FF;                 /* primary/10: stepper, card header, pager bar */
  --secondary-foreground: #1890FF;
  --muted: #F2F2F2;                     /* section bar, neutral badge */
  --muted-foreground: #7F7F7F;          /* black/50 */
  --accent: #E8F4FF;
  --accent-foreground: #1890FF;
  --destructive: #DF2A2D;

  --border: #BFBFBF;                    /* black/25: inputs, dividers, cards */
  --input: #BFBFBF;
  --ring: #1890FF;

  /* no charts in the design; a palette-derived set (GUESS) */
  --chart-1: #1890FF;
  --chart-2: #1AC252;
  --chart-3: #009AC1;
  --chart-4: #1A495F;
  --chart-5: #DF2A2D;

  --sidebar: #0F3242;
  --sidebar-foreground: #FFFFFF;
  --sidebar-primary: #1890FF;           /* active indicator bar */
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #1674C6;            /* active row = primary/70 over sidebar */
  --sidebar-accent-foreground: #FFFFFF;
  --sidebar-border: #8798A0;            /* white/50 divider */
  --sidebar-ring: #1890FF;
  --sidebar-footer: #1A495F;
  --sidebar-caption: #A3B6BF;           /* white/60 */

  /* header: two measured variants */
  --header: #FFFFFF;                    /* most pages */
  --header-foreground: #333333;
  --header-muted: #7F7F7F;              /* breadcrumb links + rule */
  --header-current: #4D4D4D;            /* breadcrumb current item */
  --header-navy: #1A495F;               /* Overview, Logs */
  --header-navy-foreground: #FFFFFF;
  --header-navy-muted: #BAC8CF;         /* white/70 */

  /* text steps (black alpha, flattened on white) */
  --text-strong: #4D4D4D;               /* black/70 */

  /* surfaces */
  --table-header: #D5EBFF;              /* primary/18 */
  --panel: #F4F4F4;                     /* key-value groups */
  --strip: #F0F0F0;                     /* log-card strip, scrollbar track */
  --scrollbar-thumb: #C5C5C5;

  /* status */
  --success: #1AC252;
  --success-foreground: #FFFFFF;
  --success-tint: #E9F9EE;              /* measured, frame 9/34 badges */
  --info: #1890FF;
  --info-foreground: #FFFFFF;
  --info-tint: #E8F4FF;
  --destructive-foreground: #FFFFFF;
  --destructive-tint: #FCEAEA;          /* DERIVED: #DF2A2D at 10%; not in Figma */
  --warning: #FAAD14;                   /* GUESS: no sample; Ant Design v4 warning, matching the #1890FF/#BFBFBF Ant palette */
  --warning-foreground: #FFFFFF;
  --warning-tint: #FFF7E6;              /* GUESS */
  --neutral-badge: #F2F2F2;
  --inactive-badge: #EBEBEB;
  --inactive-badge-border: #B0B0B0;
  --toggle-off: #D6D6D6;
  --toggle-pill: #E6E6E6;

  /* auth */
  --auth-primary: #009AC1;
  --auth-link: #00A3CC;
  --auth-input-border: #7F7F7F;
  --auth-gradient: linear-gradient(61deg, #3D5B8E 0%, #268AB8 50%, #0EB9E3 100%);

  /* elevation (fitted) */
  --shadow-header: 0 5px 10px rgb(0 0 0 / 0.25);
  --shadow-card: 0 11px 12px rgb(0 0 0 / 0.15);
  --shadow-panel: 0 16px 10px rgb(0 0 0 / 0.07);
  --shadow-tile: 0 0 11px rgb(0 0 0 / 0.15);
  --shadow-sheet-header: 0 3px 10px rgb(0 0 0 / 0.26);
  --overlay: rgb(0 0 0 / 0.45);         /* GUESS: no scrim in any export */
}

@theme inline {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-destructive-tint: var(--destructive-tint);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-footer: var(--sidebar-footer);
  --color-sidebar-caption: var(--sidebar-caption);
  --color-header: var(--header);
  --color-header-foreground: var(--header-foreground);
  --color-header-muted: var(--header-muted);
  --color-header-current: var(--header-current);
  --color-header-navy: var(--header-navy);
  --color-header-navy-foreground: var(--header-navy-foreground);
  --color-header-navy-muted: var(--header-navy-muted);
  --color-text-strong: var(--text-strong);
  --color-table-header: var(--table-header);
  --color-panel: var(--panel);
  --color-strip: var(--strip);
  --color-scrollbar-thumb: var(--scrollbar-thumb);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-success-tint: var(--success-tint);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-info-tint: var(--info-tint);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-warning-tint: var(--warning-tint);
  --color-neutral-badge: var(--neutral-badge);
  --color-inactive-badge: var(--inactive-badge);
  --color-inactive-badge-border: var(--inactive-badge-border);
  --color-toggle-off: var(--toggle-off);
  --color-toggle-pill: var(--toggle-pill);
  --color-auth-primary: var(--auth-primary);
  --color-auth-link: var(--auth-link);
  --color-auth-input-border: var(--auth-input-border);

  --radius-sm: var(--radius);                  /* 4  */
  --radius-md: var(--radius);                  /* 4  shadcn default for buttons/inputs */
  --radius-lg: calc(var(--radius) + 6px);      /* 10 panels, Overview cards */
  --radius-xl: calc(var(--radius) + 16px);     /* 20 auth card */
  --radius-2xl: calc(var(--radius) + 26px);    /* 30 Overview diagram */

  --shadow-header: var(--shadow-header);
  --shadow-card: var(--shadow-card);
  --shadow-panel: var(--shadow-panel);
  --shadow-tile: var(--shadow-tile);
  --shadow-sheet-header: var(--shadow-sheet-header);

  /* type scale (size / Figma auto line-height) */
  --text-title: 2rem;        --text-title--line-height: 2.4375rem;   /* 32/39 */
  --text-display: 2.25rem;   --text-display--line-height: 2.75rem;   /* 36/44 */
  --text-heading: 1.5rem;    --text-heading--line-height: 1.8125rem; /* 24/29 */
  --text-lg: 1.25rem;        --text-lg--line-height: 1.5rem;         /* 20/24 */
  --text-md: 1.125rem;       --text-md--line-height: 1.375rem;       /* 18/22 */
  --text-base: 1rem;         --text-base--line-height: 1.1875rem;    /* 16/19 */
  --text-sm: 0.875rem;       --text-sm--line-height: 1.0625rem;      /* 14/17 */
  --text-xs: 0.75rem;        --text-xs--line-height: 0.9375rem;      /* 12/15 */
  --text-2xs: 0.625rem;      --text-2xs--line-height: 0.75rem;       /* 10/12 */

  --spacing-sidebar: 372px;
  --spacing-header: 98px;
  --spacing-gutter: 42px;
}
```

Note: shadcn's `--radius-lg` normally equals `--radius`. Here `--radius` is 4px, and the larger steps are explicit measured values. Use `rounded-md` for controls and `rounded-lg` for 10px panels.

## (c) Font loading plan (family is a guess, see a8)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

- **Inter 400 / 500 / 600.** No 700 was observed: no string matched 700 better than 600.
- In TanStack Start, add the links in the root route `head()` (or self-host via `@fontsource-variable/inter`), then set `--font-sans` as above.
- Figma's Inter 3.x renders slightly wider than Google's Inter 4. If pixel-width parity matters, add `letter-spacing: 0.01em` to body text (optional, unverified).

## (d) Layout constants

```ts
export const LAYOUT = {
  sidebarWidth: 372,
  sidebarNavTop: 102,
  sidebarItemHeight: 65,      // 66 pitch
  sidebarActiveBarWidth: 10,
  sidebarFooterHeight: 287,
  headerHeight: 98,           // +59 toolbar/tab row => 157
  pageGutterX: 42,
  pageGutterTop: 13,
  contentCardWidth: 1464,
  cardHeaderHeight: 78,
  cardPaddingX: 20,           // key-value panels; card-header title at 29
  tableHeaderHeight: 62,
  tableRowHeight: 70,         // +1px divider
  paginationBarHeight: 70,
  buttonHeight: 36,
  buttonPaddingX: 20,
  inputHeight: 46,
  textareaHeight: 73,
  authControlHeight: 48,
  authCardWidth: 581,
  sidebarSelectHeight: 32,
  badgeHeight: 30,            // 36 in the Manage Users table
  filterSheetWidth: 591,
  dropdownWidth: 184,
  dropdownRowHeight: 47,
  iconSize: 24,
} as const;
```

## (e) Inconsistencies and what to normalise to

1. **Two header styles.** Overview and Logs use a navy header (`#1A495F`, white title, `#BAC8CF` breadcrumb, no shadow). Every other page uses a white header (`#333` title, `#7F7F7F`/`#4D4D4D` breadcrumb, `--shadow-header`). Both are verified by sampling. **Normalise to the white header** (the majority: about 60 frames), unless the designer confirms the navy variant is intentional for "dashboard" pages. Keep `--header-navy*` tokens available.
2. **Two primary blues.** App `#1890FF`; auth `#009AC1` (button) and `#00A3CC` (link). They are visibly distinct and scoped to the auth screens. Keep them scoped as `--auth-*`. If the designer wants one brand colour, use `#1890FF`.
3. **Two success greens.** `#1AC252` (28 frames: status text, toggles, badges, icons) and `#1EA64B` (auth toggle only). **Use `#1AC252`.**
4. **Text greys are black/white alpha overlays** (80/70/50% black, 70/60/50% white), so one Figma style shows 3–5 different hexes. **Use flattened hex on white** (`#333333`, `#4D4D4D`, `#7F7F7F`); the shift on tinted surfaces is at most 6/255 per channel. Alternative: define `--foreground: rgb(0 0 0 / .8)` and so on to reproduce Figma exactly. Do not mix the two approaches.
5. **Border greys.** `#BFBFBF` covers 57 frames (inputs, dividers, cards). The others: auth inputs `#7F7F7F`; inactive badge `#B0B0B0`; 3px section dividers. **Use `#BFBFBF` everywhere in the app**, and keep `#7F7F7F` for auth inputs only. Render the 3px Setting divider as `border-t` 1px unless the designer confirms.
6. **Near-duplicate light neutrals.** `#F2F2F2` (section bar, neutral badge), `#F4F4F4` (key-value panels), `#F0F0F0` (log strip, scrollbar track), `#EFEFEF` (detail toggle pill, empty cell), `#ECECEC` (illustration card), `#EBEBEB` (upload strip, inactive badge), `#E6E6E6` (table toggle pill). **Collapse to three**: `--muted #F2F2F2` (bars, badges, strips: absorbs `#F0F0F0`/`#F4F4F4`/`#EFEFEF`), `--inactive-badge #EBEBEB` (absorbs `#ECECEC`), `--toggle-pill #E6E6E6`.
7. **Light-blue tints.** `#E8F4FF` (primary/10) and `#D5EBFF` (primary/18) are deliberate steps; keep both. `#C2E1F2` (Overview diagram) is off-hue (201° vs 209°). Keep it as a one-off illustration colour, not a token.
8. **App-type badge text** is `#7F7F7F` on Connection but `#333333` for "Owner/Sub-user" in frame 9, with the same white/`#BFBFBF` badge. **Use `#7F7F7F`** for outline badges (more instances), or `#333` if the designer prefers.
9. **Badge height** is 30 (Connection app-type, status pill) vs 36 (frame-9 badges). **Use 30** for in-table badges.
10. **Header height** is 98 vs 157. The 157 variant is the 98 header plus a toolbar or tab row inside the same white bar, with the shadow under the toolbar. Implement it as one header component with an optional second row.
11. **Table placement.** It is full-bleed (372..1920, no card) on Connection and Practices, but inside a 1464 card with 20px inset on frames 9 and 34. **Pick the card version** for consistency with the detail pages. The design is ambiguous, so flag it.
12. **Radius scatter.** Measured radii are 4 / 10 / 20 / 30 / full. There is no 6–8 anywhere. Normalise to `--radius: 4px` plus explicit 10/20/30 steps. Pager squares (≈1–2px) are normalised to 4.
13. **Success-screen title.** Frame 62 shows a green title (`#1AC252`, about 32px semibold); frame 8 shows a `#333333` 36px title. **Use 32px semibold `#333333`** with the green check above it, or green if the designer confirms. Ask the designer.
14. **Font weight drift on headings.** The header "Setting" title best matches Inter 500 at 32px, while auth "Sign In" and the 62 success title match 600. Use page titles at 500 (`font-medium`) and auth/success titles at 600.
15. **Shadows.** Five fitted shadows; the soft-panel fit is the least certain (several (offset, blur) pairs fit within 0.004). If fewer tokens are wanted, **collapse** to `--shadow-header`, `--shadow-card`, and `--shadow-panel` (also used for tiles).
16. **Sub-pixel geometry** (x 83.77, 44.88, the 3.02px slanted Line 1, the filter sheet's half-pixel strokes). Snap to integers and render the divider as a straight 1px line.

## (f) How these were measured

All scripts live in the session scratchpad, `…/scratchpad/tokens/`, not in the project. Run them as `python3 -I <script> <scriptdir> [args]` with Pillow. RGBA exports are composited over white before sampling.

| Script | What it does |
|---|---|
| `lib.py` | Loads PNGs (alpha → white), parses the frame XML (`prior_frames.json` frame→node), and provides helpers: `mode()` (most-common colour in an interior box), `px`, `extreme`, run-length scanlines |
| `probe.py` | For every XML element in a frame, prints its box and the top-2 colour modes of its interior (inset 3px from the edges to avoid anti-aliasing) |
| `col.py` | Run-length vertical/horizontal scanlines; used for border thickness, seams, shadows and stepper circles |
| `sample_all.py` | Master table: fills = interior mode; text/lines = glyph-core colour (mode of pixels ≥ 85% of the maximum distance from the local background, so only fully covered glyph pixels count) |
| `opacity.py` | Solves single-overlay alpha (black, white or `#1890FF` over the surface) for each text/tint pair, with max channel error |
| `gradient.py` | 9×9-median corner samples plus a least-squares plane fit per channel over the auth background (card excluded), then evaluates the CSS gradient-line endpoints for the fitted angle |
| `shadow_fit.py` | Converts outside-edge fall-off to alpha and grid-fits `A·Φ((offset−d)/σ)` (blur = 2σ) across one or more edges |
| `radius.py` | Sub-pixel 50%-coverage inset per row from a corner; least-squares circle radius |
| `palette_scan.py` | Flat-colour census (runs ≥ 6px, every 3rd row) across all 69 PNGs; used to find the success tint and to confirm there is no warning colour |
| `textsizes.py` | Groups XML text boxes by height (→ font size at Inter's 1.21 line-height) |
| `fontmatch.py`, `fontsheet.py` | Downloads the Google Fonts TTFs for 8 candidates (`fonts_dl/`), renders each string at 400/500/600, matches ink width, scores NCC, and writes ×3/×4 visual sheets (`fontsheet.png`, `fontsheet2.png`) |

**Limits.** Colours are exact to the PNG export, which is 8-bit sRGB (the exports do not show whether Figma used colour profiles). Radii are ±1px. Shadow offset and blur trade off against each other, so ±3px. Font family is a guess. Weights are ±100. No hover, focus, disabled, selected-row or scrim states exist in any frame, so tokens for those states are the shadcn defaults applied to the colours above.
