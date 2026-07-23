# Design QA — Interactive Portfolio World

## Comparison Target

- Source visual truth (room): `public/assets/home/minjoun-home-world.png`, `1486 × 1058` px.
- Source visual truth (contact): `public/assets/home/minjoun-home-doorbell.png`, `1486 × 1058` px.
- Implementation: `http://127.0.0.1:4321/`, browser-rendered at `1280 × 720` CSS px, density `1`.
- States compared: initial room, project street, project entry, and the home-doorbell ending.
- Full-view evidence: each source image and its same-state implementation were rendered together in one temporary local comparison page at the same browser capture scale. The temporary comparison routes were removed after review.
- Focused evidence: the room's quiet left field/introduction, bookshelf skills, open door, and the doorbell/contact panel were also inspected in their full-screen interactive states. No narrower crop was needed; all copy remained legible at the capture scale.

## Findings

- No actionable P0, P1, or P2 visual differences remain.
- Accepted intentional difference: semantic HTML copy sits in the source artwork's reserved dark areas. This makes the introduction, skills, and contact details selectable and linkable without changing the scene composition.

## Comparison History

1. **P1 — contact deep-link hydration mismatch (blocked)**
   - Evidence: direct contact-state verification initially rendered server room markup and client contact markup, producing a browser hydration error.
   - Fix: the server and client now both render the room first; the optional QA contact state changes after hydration.
   - Post-fix evidence: a fresh `/?scene=contact` browser load showed the contact scene and `0` console errors.

2. **Post-fix comparison**
   - Room: source and implementation preserve the centered shelf, right-side open door, desk crop, and reserved dark introduction area.
   - Contact: source and implementation preserve the exterior door, lit intercom, warm/charcoal palette, and blank wall used for contact information.

## Required Fidelity Surfaces

- **Fonts and typography:** cream high-weight Korean display type and small monospace scene labels preserve the reference's hierarchy. Contact links remain readable, keyboard-focusable HTML rather than baked raster text.
- **Spacing and layout rhythm:** the room, street, and contact views are one `100svh` scene each. There are no stacked portfolio sections or vertical-page transitions.
- **Colors and visual tokens:** deep charcoal/navy, warm lamp amber, cream type, and restrained mint skill labels match the generated scene palette. No new gradients or simulated artwork were used.
- **Image quality and asset fidelity:** the generated `1486 × 1058` room/contact scenes and five `1536 × 1024` project-district PNGs are used directly as full-bleed backgrounds. No CSS/SVG approximation replaces visible scene artwork.
- **Copy and content:** copy is intentionally short and contextual: desk introduction, bookshelf skills, door CTA, then contact at the doorbell. Project evidence stays on each project-store detail route.

## Interaction and Browser Verification

- Room: buttons and arrow/Enter controls select desk, bookshelf, and front door.
- Street: entering the door opens five full-screen project districts; `Enter` on a district opens its matching project detail.
- Ending: moving right past the fifth store opens the home exterior and exposes email, phone, and GitHub links.
- Accessibility: all visible actions have labels; the canvas street has a screen-reader project navigation fallback.
- Browser console: fresh contact-state verification returned `0` errors.

## Build Checks

- `npm run check` — passed (`0` Astro diagnostics; `51` Vitest tests passed).
- `npm run build` — passed (`9` static routes).
- `git diff --check` — passed.

## Follow-up Polish

- P3: perform one additional visual pass at a true `390 × 844` in-app-browser viewport when its viewport override is available.

## 2026-07-23 Label and Hit-Area Refinement

- Replaced the room raster labels with `소개 / 스킬 / 둘러보기`; removed all `E` key badges and the bottom keyboard-control overlay from the generated asset.
- Updated the semantic copy to `BACKEND DEVELOPER / 김민준` and `복잡한 흐름을 검증 가능한 구조로.` to reflect the evidence-first backend positioning.
- Removed hover outlines and tightened the desk, bookshelf, and door hit areas to their visible objects. At the current `852 × 863` in-app-browser viewport, the scene now uses a 90% art scale so all three labels remain visible.
- No actionable P0, P1, or P2 differences found in the browser-rendered room after the refinement.

## 2026-07-23 World Flow Refinement

- Added a two-stage cinematic handoff (fade-out → incoming fade-in) between room, street, and contact scenes, replacing the previous immediate scene swap.
- The street now has meaningful edges in both directions: left from the first storefront returns to the room; right from the fifth storefront reaches the contact house. Contact returns to the fifth storefront via its visible action, `Esc`, or `←`.
- Project entry preserves the selected storefront in browser history. The visible `거리로 돌아가기` action on a project detail returns to that exact shop rather than resetting to the street entrance.
- An attempted action during the short incoming fade is queued and played once the transition completes, preventing a lost first click/tap on the contact return action.
- Browser verification covered room → street, first-store ← → room, fifth-store → → contact, contact → fifth store, and ReadAndShare street → detail → same storefront. No P0, P1, or P2 interaction defects remain.
- `npm run test:e2e` passed: `18` tests across desktop and mobile.

## 2026-07-23 Project District Visual Upgrade

- Selected visual direction: option 2 — a detailed Jeju coastal storefront at blue hour, with a wet stone road, warm lamps, and a right-side venue facade.
- Source visual truth: `public/assets/street/cafe-gamsugwang-district.png`, `1536 × 1024` px.
- Implementation screenshot: `/private/tmp/unclesamsun-street-cafe-20260723.png`, captured in the in-app browser at `1280 × 720` CSS px.
- Full-view comparison: the source image and the matching Café Gamsugwang browser capture were reviewed together. The coastal horizon, dark basalt storefront, lantern rhythm, right-side interior, image crop, and its reserved left copy area all match; the only intentional addition is selectable HTML project copy.
- Replaced the prior hand-drawn street canvas with five direct district assets: climbing gym, Jeju cafe, restaurant, bookstore, and warehouse/store. They share the same road, streetlamp, dusk/night, and walking-height composition so the transition reads as one connected route rather than five unrelated project covers.
- Browser check: room → Hola district → Café Gamsugwang district was rendered with the new `01 / 05` and `02 / 05` index states. No P0, P1, or P2 fidelity issue was found.
- E2E: `npm run test:e2e -- --reporter=line` passed all `18` desktop/mobile tests after the index labels were updated to reflect the visible `NN / 05` UI.

## 2026-07-23 Accidental Main-Return Fix

- Root cause: the street treated any vertical wheel movement as left/right navigation. At the first district, an ordinary upward scroll therefore crossed the left boundary and returned to the room.
- Fix: only a deliberate horizontal wheel gesture, held pointer drag, or arrow key changes districts. The store itself is now a bounded right-side entry target; hovering or clicking the rest of the scene cannot change the active district or open a store.
- Detail return: `거리로 돌아가기` now always follows its selected `/?scene=street&shop={slug}` URL instead of relying on browser history, so it cannot fall back to a different earlier route.
- Verification: added a desktop/mobile regression case for vertical scrolling at the first district. `npm run test:e2e -- --reporter=line` passed all `20` tests.

## 2026-07-23 Copy Hierarchy and Contact Polish

- Reframed the room around the current positioning: `AI를 서비스로.` with `AI PIPELINES · BACKEND SYSTEMS`. The bookshelf now exposes four compact working groups — Backend, AI / Data, Platform, and Quality — instead of a dense exhaustive list.
- Simplified the door to `프로젝트로.`, removed the duplicated visual `작업실로` control on the street, and kept the semantic return path in the screen-reader navigation and the first-district left boundary.
- The street now states only `← → 이동 · Enter 입장`; a small `입장 →` cue sits at the actual storefront entrance while the existing bounded entry target remains the interactive control.
- Replaced the multi-line `벨을 눌러주세요.` contact headline with the single-line `연락하기.` and tightened the contact-link rhythm. This keeps the doorbell context while returning visual priority to usable contact details.
- Updated the Hola summary and street descriptors to describe the AI product outcome more directly.
- Visual comparison: the room and contact source PNGs were each reviewed beside their matching `1280 × 720` in-app-browser capture. Their original composition, warm/charcoal palette, and reserved copy areas remain intact; HTML copy is the only intentional layer.
- Responsive check: the room, bookshelf, and contact states were inspected at `390 × 844`. Both the four-group skill list and the one-line contact title stay within the viewport with no clipped text.
- Flow check: room → street, fifth district → contact, and contact → fifth district all completed with the expected location restored. The direct CLI E2E run could not launch the sandboxed browser process (`MachPortRendezvousServer` permission denied), so it is not counted as a product-test failure.

final result: passed

## 2026-07-23 Brand Spelling Correction

- Corrected all user-visible `MINJOUN` / `Minjoun` branding to `MINJOON` / `Minjoon`: street title and heading, project-store brand, accessible labels, favicon label, project highlight, and smoke-test selectors.
- Edited the room doorway sign to `MINJOON ST.` and the contact-house brass nameplate to `MINJOON'S HOME`, preserving the original scene composition and lighting.

final result: passed

## 2026-07-23 Return Through the Door

- The contact-house door is now a bounded, invisible interaction target over the visible doorway. Selecting it returns through the existing cinematic transition to the first room state and normalizes the URL to `/`.
- The contact card is layered above the doorway target so its email, phone, GitHub, and `거리로 돌아가기` controls remain independently usable at desktop and mobile widths.
- The backward path is intentionally unchanged: `거리로 돌아가기`, `←`, and `Esc` return to the fifth storefront. The ending now has two clear directions rather than a forced reset.
- Regression coverage: the desktop and mobile E2E flow verifies fifth storefront → contact → front door → first room, plus the existing contact → fifth storefront and project detail → same storefront routes.

final result: passed
