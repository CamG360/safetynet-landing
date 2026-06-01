# REVIEW — Handoff fitness assessment for hero repair

## What this file is

`REVIEW.md` is **not landing-page code** and it does **not update the hero**. It is the written assessment file produced by the repo's preparer/reviewer workflow. In this repo, `HANDOFF.md` is the previous agent's handover, and `REVIEW.md` is where the next agent records whether that handover is good enough to use.

For this task, the question was: **"Is the handover good enough for someone to fix the hero from it?"**

The answer recorded here is: **No. The existing handover is too vague to be used as the repair brief.**

**Date:** 2026-06-01
**Reviewer:** Codex
**Request assessed:** Whether the handover document is fit for purpose for updating the landing-page hero after a failed previous attempt.
**Requested handoff path:** `_ops/handoff/handoff_0925.010626`
**Handoff actually found in repo:** `HANDOFF.md`
**Target hero reference found in repo:** `images/design-log/yes/SN_light_desktop_1705.310526.png` and `images/design-log/yes/SN_light_mobile_1705.310526.png`

## Verdict

**REJECTED — not fit for purpose as an implementation handoff.**

`HANDOFF.md` is useful as a historical completion summary for the prior `agent/preparer` attempt, but it is not sufficient to hand to another coding agent as the authoritative brief for fixing the current hero. It records what the previous agent says it changed, and it includes several reviewer-open visual questions, but it does not provide enough target-state detail, failure context, or acceptance criteria to reliably produce the supplied target hero.


## Plain-English answer

The handoff is **not ready to give to another developer/agent to fix the hero**. It mostly says, "the previous hero change was done," but it does **not** clearly say what the final hero should look like, where the supplied target image lives, what failed in the last attempt, or exactly how to judge whether the next attempt is correct.

In short:

- **Good enough as a record of the previous attempt:** yes.
- **Good enough as instructions for the next repair attempt:** no.
- **Main reason:** it does not turn the provided target hero image into concrete build instructions and pass/fail checks.

If the goal is to fix the landing-page hero now, the next step is not to ask another agent to "use the handoff" as-is. The next step is to write a repair brief that says: "make the current page match this target screenshot, at these screen sizes, using these assets, and these are the exact things that must be true when finished."

## Key findings

### 1. The requested handoff artifact is absent

The user-specified path `_ops/handoff/handoff_0925.010626` does not exist in this checkout. The only handoff-like task document present is `HANDOFF.md`; there is no `_ops/` handoff file to evaluate directly.

**Impact:** A future agent following the user's path will start blocked or will guess that `HANDOFF.md` is the intended substitute.

### 2. The document meets the minimum governance skeleton, but only at a surface level

The repo's handoff workflow requires the sections `TASK`, `DONE`, `SKIPPED / REJECTED`, `QUALITY GATES`, `OPEN FOR REVIEWER`, and `BRANCH`. `HANDOFF.md` contains those headings and a branch/commit reference.

**Impact:** It is structurally compliant as an audit artifact, but structural compliance is not the same as being an actionable implementation brief.

### 3. It lacks a source-of-truth target reference

`HANDOFF.md` does not identify the target screenshot/image path, viewport dimensions, intended desktop/mobile compositions, or any measurable visual tolerances. It refers only to an approved "Light" hero and to broad traits such as split layout, image band, glass cards, cream feather, and teal CTA.

**Impact:** This leaves the most important part of the task — matching the supplied target hero — dependent on unstated visual memory. That is a likely cause of repeated failure.

### 4. It is written as a completion report, not a repair brief

The document says the hero was ported and lists work as already done, including CSS, HTML, rebuilt Tailwind output, and WebP assets. It does not state the current failure, what Claude Code got wrong, what must be retained, or what must be corrected next.

**Impact:** A new agent could mistakenly verify the old attempt instead of fixing it.

### 5. Visual gates are delegated but underspecified

The handoff marks desktop layout, mobile layout, Lucide icon rendering, image crop, and teal rendering as open reviewer checks. However, it does not explain what constitutes pass/fail for those checks beyond generic wording.

**Impact:** The handoff correctly flags that visual judgment is needed, but it does not give enough information to make that judgment repeatable.

### 6. It contains stale or now-misleading context

The branch pointer is `agent/preparer @ f880329`, while the current checkout is on branch `work` and includes later merge commits. The prior `REVIEW.md` also described a conditional approval, whereas the current user context says the previous Claude Code attempt failed. Additionally, `index.html` still contains a comment saying teal is not defined in `@theme`, while the theme now defines teal tokens.

**Impact:** The handoff's historical state no longer matches the present repo state or the user's reported outcome.

### 7. It does not warn about relevant implementation mismatches visible in the current code

The current code uses the new hero DOM and CSS, but several target-critical details are not captured as acceptance criteria in the handoff:

- The global navigation remains outside the hero and keeps a blue desktop CTA, while the target hero shows a teal CTA in the top-right navigation area.
- The current desktop hero image is a CSS background band with specific `background-position`, but there are no target crop coordinates or screenshots to validate against.
- The current status cards are all the same width and stacked within a 300px column, while the target desktop mockup shows wider cards extending from the image side and partially clipped/offset.
- The handoff says "hero section only," but the target screenshot visually includes navigation treatment; the document does not resolve whether nav styling is in scope or out of scope.

**Impact:** These are precisely the kinds of ambiguous details that can make an implementation appear technically correct while missing the supplied visual target.

## What a fit-for-purpose handoff should include before another implementation attempt

1. **Correct artifact path:** create or move the handoff to `_ops/handoff/handoff_0925.010626.md`, or update the task to point at `HANDOFF.md`.
2. **Target references:** list the exact target image files and viewports, e.g. desktop `2048x1080` and mobile target if applicable.
3. **Current-state diagnosis:** describe what failed in the Claude Code attempt, with current screenshot(s) or concrete observations.
4. **Implementation scope decision:** explicitly say whether the navigation is allowed to change to match the target screenshot.
5. **Acceptance criteria:** include measurable desktop and mobile checks: hero height, left/right split ratio, CTA colours, card position/width/overlap, image crop, no horizontal overflow, and section transition below the hero.
6. **Asset contract:** specify whether to use the WebP files, PNG source files, or another asset, and whether source PNGs must be preserved.
7. **Testing/checks:** list required commands and known expected failures separately from acceptance-blocking failures.
8. **Fresh branch/commit state:** update the branch and commit reference to the current working branch or the exact commit under repair.

## Recommended next action

Do not use the existing `HANDOFF.md` alone as the brief for the hero repair. Create a new, repair-oriented handoff at the requested `_ops/handoff/` path, attach or reference the target hero image(s), and include the missing acceptance criteria above. Once that exists, the implementation agent can work against a concrete target instead of reverse-engineering intent from the prior completion summary.
