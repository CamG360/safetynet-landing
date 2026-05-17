# SafetyNet Landing — Agent Instructions

## Parallel Agent Worktrees

When multiple AI agents or assistant sessions work on this repo,
do not put them in the same checkout.

### Worktree structure
Safetynet-landing
safetynet-landing\              ← canonical repo (main). Pull, inspect, and create worktrees from here only.
safetynet-landing-preparer\     ← preparer worktree
safetynet-landing-reviewer\     ← reviewer worktree

### Worktree assignment

**Preparer agent**
- Path:   C:\Users\CampbellMcCord\repos\Safetynet\Safetynet-landing\safetynet-landing-preparer
- Branch: agent/preparer
- Role:   Drafts, edits, builds

**Reviewer agent**
- Path:   C:\Users\CampbellMcCord\repos\Safetynet\Safetynet-landing\safetynet-landing-reviewer
- Branch: agent/reviewer
- Role:   Reviews, validates, critiques preparer output

### Rules

- The worktree path is the operating boundary — not the chat session.
- Do not switch branches in the canonical repo while an agent is active in a worktree.
- Do not edit sibling worktrees unless explicitly instructed.
- Before staging or committing, run `git status --short` and stage only files belonging to the current task.
- If main has changed underneath a worktree, pause before merging or rebasing.
- After a branch is merged and clean, remove the worktree:
  `git worktree remove ..\safetynet-landing-preparer`
  `git worktree remove ..\safetynet-landing-reviewer`

### Quick diagnostics

- Session suddenly changed branches → both sessions were in the same working directory.
- `git worktree add` says branch already checked out → create a new branch name or remove the stale worktree first.
- Removal fails → run `git status --short` in the worktree and preserve uncommitted work before forcing.

### Provisioning commands (for reference)

git worktree add -b agent/preparer ..\safetynet-landing-preparer
git worktree add -b agent/reviewer ..\safetynet-landing-reviewer

> Handoff workflow standard (HANDOFF.md / REVIEW.md structure, decision log, known risks): `docs/safetynet-agent-handoff-workflow_1430.170526.md`

---

## Handoff Workflow

### Role
This is the **preparer** worktree. After completing each task you must produce `HANDOFF.md` before committing. No exceptions.

### HANDOFF.md — required structure

```
TASK
[What was asked]

DONE
[What was executed — specific, not summary]

SKIPPED / REJECTED
[Anything not done and why — none if not applicable]

QUALITY GATES
[Gate name]: PASS / FAIL

OPEN FOR REVIEWER
[Anything requiring reviewer judgment — none if not applicable]

BRANCH
[Branch name and commit reference]
```

### Rules

- Produce `HANDOFF.md` at the end of every task, before committing.
- Commit `HANDOFF.md` in the same commit as the task work.
- List every skipped or rejected item explicitly — omitting omissions is a failure mode.
- Include the specific commit reference in the BRANCH section.
- Do not proceed to the next task until `HANDOFF.md` is committed.
