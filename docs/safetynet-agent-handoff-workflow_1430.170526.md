# Agent Handoff Workflow — SafetyNet
Owner: CM

---

## Why This Exists

The preparer agent executes a task in isolation. The reviewer agent assesses it in isolation. Without a structured bridge, the reviewer is reading a diff with no context — what was attempted, what was rejected, what needs judgment. A handoff file is that bridge. It travels with the work, lives in the repo, and is the first thing the reviewer reads.

---

## Purpose

Transfer sufficient context from preparer to reviewer so the reviewer can run a fit-for-purpose assessment without re-interrogating the task from scratch.

## Outcome

Every task that passes through the preparer→reviewer loop has an auditable, versioned record of what was done, why, and whether it passed review. The verdict lives in the repo alongside the work.

---

## Workflow

```
PREPARER
  → Receives task brief
  → Executes task
  → Runs quality gates (pass/fail)
  → Produces HANDOFF.md
  → Commits work + HANDOFF.md to agent/preparer branch
        ↓
REVIEWER
  → Reads HANDOFF.md first — no other context assumed
  → Runs reviewer checklist against it
  → Produces REVIEW.md (verdict + notes)
  → Commits REVIEW.md to agent/preparer branch
        ↓
HUMAN
  → Reads REVIEW.md
  → If approved → raises PR to main
  → If rejected → returns to preparer with reviewer notes
```

---

## HANDOFF.md — Minimum Structure

```
TASK
[What was asked]

DONE
[What was executed — specific, not summary]

SKIPPED / REJECTED
[Anything not done and why — none if not applicable]

QUALITY GATES
[Gate name]: PASS / FAIL
[Gate name]: PASS / FAIL

OPEN FOR REVIEWER
[Anything requiring reviewer judgment — none if not applicable]

BRANCH
[Branch name and commit reference]
```

---

## REVIEW.md — Minimum Structure

```
VERDICT: APPROVED / REJECTED

CHECKLIST
- [Item]: YES / NO
- [Item]: YES / NO

NOTES
[Any material observations — none if clean pass]

REJECTED ITEMS
[If rejected — specific reason and what preparer must address]
```

---

## Reviewer Agent — Options Considered

| | Option A | Option B | Option C |
|---|---|---|---|
| **Description** | Reviewer reads preparer branch, outputs verdict to terminal only | Reviewer reads preparer branch, commits REVIEW.md to it | Reviewer has own branch, preparer merged into it for review |
| **Reviewer branch needed** | No | No | Yes |
| **Code changes** | None | None | None |
| **Verdict location** | Terminal only — lost after session | REVIEW.md committed to agent/preparer | REVIEW.md committed to agent/reviewer |
| **Auditable** | No | Yes | Yes |
| **Friction** | Low | Low | High — merge step required every task |
| **Scalable** | No — verdict disappears | Yes | Yes but unnecessary complexity |
| **Worktree for reviewer** | Not needed | Not needed | Required |
| **HANDOFF.md needed** | Yes | Yes | Yes |
| **Complexity** | Lowest | Low | High |
| **Context scope** | Full branch | Diff + HANDOFF.md only | Full branch |
| **Token efficiency** | Low | High — narrow context, less noise, higher accuracy | Low |
| **Risk** | Verdict lost if session drops | Low | Branch drift, merge conflicts possible |
| **Recommended** | No — no audit trail | **Yes** | No — overhead without benefit |
| **When it makes sense** | Quick sanity check only | Default operating model | If reviewer needs isolated environment to run tests |

**Decision: Option B.** Reviewer runs against `agent/preparer`, commits `REVIEW.md` there. One branch carries the work, the handoff, and the verdict. `agent/reviewer` worktree parked until there is a specific need for isolation.

---

## Known Risks

*To be revisited if this approach is formalised.*

| Risk | Detail | Current Mitigation |
|---|---|---|
| **Preparer honesty dependency** | Reviewer accuracy depends entirely on HANDOFF.md. If preparer misrepresents what was skipped or why, reviewer works from a flawed brief | HANDOFF.md requires explicit documentation of all skipped items — hard rule, not optional |
| **Absence blindness** | Diff shows what changed, not what wasn't changed. Omissions are invisible to reviewer unless flagged | Preparer must explicitly state skipped/rejected items in HANDOFF.md — omission of omissions is a failure mode |
| **Cumulative diff growth** | Multiple tasks on agent/preparer before PR degrades token efficiency and reviewer accuracy | One task per commit scope — PR raised per task or per logical unit |
| **Multi-commit ambiguity** | Multiple preparer commits in scope — reviewer unclear which commits to assess | HANDOFF.md must include specific commit reference(s) in scope |

---

## Rules

- Preparer always produces `HANDOFF.md` — no exceptions
- Reviewer always reads `HANDOFF.md` first — no exceptions
- `REVIEW.md` is always committed — verdict is never terminal-only
- Reviewer makes no code changes — assessment only
- If reviewer rejects — preparer receives `REVIEW.md` and reruns the task

---

<metadata>

― Reference ―
Title:      Agent Handoff Workflow — SafetyNet
Artifact:   Governance
Definition: Operational standard for context transfer between preparer and reviewer agents. Not a task brief or build instruction.
Logic Path: SafetyNet/ Agents/ Handoff Workflow
Filepath:   /outputs/safetynet-agent-handoff-workflow_1430.170526.md

― Purpose ―
Purpose:    Ensure preparer and reviewer agents operate with shared context across an isolated branch workflow
Objective:  Define the handoff file structure, reviewer file structure, workflow sequence, and reviewer agent options
Outcome:    Every task has an auditable record of execution, quality gates, and reviewer verdict in the repo

― Quality ―
Preparer:   C1
Reviewer:   Pending
Confidence: 80%
Tested:     0
Test notes:

― Classification ―
Level:      L2 (Operational/ Standards)

― Version ―
Timestamp:  #ver 1430.17/05/26

</metadata>
