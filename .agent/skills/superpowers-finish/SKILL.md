---
name: superpowers-finish
description: Finalizes work: runs verification, summarizes changes, notes follow-ups, and ensures repo hygiene. Use at the end of an implementation or debugging session.
---

# Finish Skill

## When to use this skill
- at the end of any non-trivial change set
- after a bug fix or feature is implemented
- before handing off work to a teammate/user

## 1. Output Final Artifacts
Generate the following output in the chat:
- **Verification:** (commands + results)
- **Summary of changes:** 
- **Follow-ups:** (if needed)
- **Manual validation steps:** (if applicable)

## 2. Stage KOS Updates (Mandatory)
Do NOT write directly to the main KOS files yet. Draft the proposed updates and save them to a staging file.

Before drafting the update, you MUST perform these pruning operations on the live files using direct file edits (`write_to_file` or `replace_file_content`):
- **Prune Tasks:** Delete any completed `[x]` tasks from `active_tasks.md` entirely. Do not keep a running list of finished items.
- **Archive Changelog:** Check the length of `changelog.md`. If it has more than 15 entries, move the oldest entries into a new file called `artifacts/knowledge/changelog_archive.md`.

Once pruning is complete:
1. Generate the exact text to be appended to `artifacts/knowledge/changelog.md` and `artifacts/knowledge/active_tasks.md`.
2. Use your native file-writing tools (e.g., `write_to_file`) to create `artifacts/knowledge/_pending_kos_update.md` containing the drafted KOS updates.

## 3. The Rollback Gate
After `_pending_kos_update.md` is generated, stop execution immediately and present this exact prompt to the user:

> **Task Completed & KOS Update Staged.**
> Review the code changes. 
> - Reply **COMMIT** to permanently append these updates to your Knowledge Operating System and conclude the task.
> - Reply **ROLLBACK** if the changes are incorrect. I will revert all uncommitted code, delete the pending KOS update, and reset the task state.

Wait for the user's explicit command before taking any further action.

## 4. Post-Approval Execution
**If the user replies COMMIT:**
1. Read the contents of `artifacts/knowledge/_pending_kos_update.md`.
2. Append the changelog data to `artifacts/knowledge/changelog.md` (using native tools).
3. Delete `artifacts/knowledge/_pending_kos_update.md` using OS-agnostic tools.
4. Write the final summary to `artifacts/superpowers/finish.md`.

**If the user replies ROLLBACK:**
1. Revert only the specific KOS files you modified using targeted tools to avoid destroying unrelated uncommitted work.
2. Delete `artifacts/knowledge/_pending_kos_update.md` using OS-agnostic tools.
3. Do not update the `changelog.md` or `finish.md`. Ask the user how they would like to adjust the plan.
