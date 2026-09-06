---
trigger: always_on
---

# Superpowers Rules (Always-On)

These rules apply to ALL work unless the user explicitly opts out.

## GATE 0: Knowledge Operating System (KOS) Initialization & Tool Trigger
Before generating any text response, plan, or code edit for the user, you MUST use your file-system tools (like `list_dir` or `view_file`) to check if `artifacts/knowledge/tech_stack.md` and other KOS files exist. 

**KOS Data Density Rule:** Use high-density notation for all logs. `active_tasks.md` must only contain the immediate sprint (delete completed `[x]` tasks immediately). `changelog.md` is capped at 15 recent entries (older entries must be moved to `changelog_archive.md`).


**If ANY file is missing (Initialization & Auto-healing):**
1. You MUST use your native file-writing tool (e.g., `write_to_file`) to ensure the `artifacts/knowledge` directory exists and to create any missing files among: `active_tasks.md`, `changelog.md`, `tech_stack.md`, and `project_structure.md`. **Do NOT use bash/terminal commands like `mkdir` or `touch` for this.**
2. Once created, use your native file-reading tools to silently read `package.json` (if applicable) and scan the root directory (`list_dir`).
3. Use your native file-writing tool to write the framework, styling, and directory map into `tech_stack.md` and `project_structure.md`.

**If the files exist (Hydration):**
1. Silently read `artifacts/knowledge/tech_stack.md` and `artifacts/knowledge/active_tasks.md` using your file-reading tools.
2. Ground all proposed changes in this context. Never introduce conflicting dependencies.

*Do not proceed to Gate 1 until Gate 0 is satisfied via actual tool execution.*

## GATE 1: Plan gate for non-trivial work
If the task is anything beyond a tiny change, do NOT edit code immediately.
You MUST:
1. Brainstorm briefly (goal, constraints, risks, acceptance criteria).
2. Write a step-by-step plan with verification steps.
3. Ask the user to approve the plan.

Only after approval may you implement.

### Execute-plan gate (Superpowers parity)
After the user approves a plan, do NOT begin implementation automatically.
You MUST pause and instruct the user to run: `/superpowers-execute-plan`

Only begin implementation after `/superpowers-execute-plan` is invoked, unless the user explicitly says to proceed without it.

### What counts as "tiny"?
- single-file change
- obvious edit
- low risk
Even then: do a mini-plan (3–5 steps) and include verification.

## GATE 2: Verification is mandatory
After implementation, you MUST provide exact commands to verify (tests/lint/run) and results if you were able to run them.

## GATE 3: Prefer TDD / regression tests
- If fixing a bug: add a regression test if practical.
- If adding behavior: add/adjust tests when practical.
If tests aren’t feasible, provide a concrete alternative verification path.

## GATE 4: Review pass required
Before final response, do a review pass and list issues by severity: Blocker / Major / Minor / Nit.

## GATE 5: Safety
- Never log secrets.
- Add timeouts, retries, and idempotency for API automations.
- Fail safe (no silent data loss).

## Artifact persistence (mandatory)
Any brainstorm, plan, review, or finish output must be written to disk under `artifacts/superpowers/`. Do not leave these as IDE-only documents. After writing, confirm the file exists.

## Persistence enforcement
When a workflow requires saving an artifact, you MUST ensure the file exists on disk.
Preferred method: use `python .agent/skills/superpowers-workflow/scripts/write_artifact.py --path <...>`
If you cannot execute commands, instruct the user to save the output manually.