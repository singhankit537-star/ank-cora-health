---
copyright: "Copyright © 2026 3Pillar Global, Inc."
license: "Proprietary - 3Pillar Background IP"
date: "2026-05-15"
component: "3Pillar AIRE SDLC Agentic Framework"
description: Drift workflow — detect impact of a requirement change, then stage a Change Request bundle (for frozen stories), direct-edit planned stories, create new stories, and apply foundation file writes — all behind one preview-then-confirm gate. The only sanctioned producer of CR-folder content (R17). Status-conditional editing per R14; single-gate apply per R16.
legal_notice: |
  PROPERTY OF 3PILLAR GLOBAL, INC. - CONFIDENTIAL & PROPRIETARY

  Component: 3Pillar AIRE SDLC Agentic Framework
  Copyright © 2026 3Pillar Global, Inc. All Rights Reserved.

  This file contains 3Pillar Pre-Existing Materials. When used in client deliveries, this component is licensed pursuant to the Master Services Agreement between 3Pillar Global and the client.

  USE RESTRICTIONS:
  Unauthorized use, reproduction, or distribution is strictly prohibited.
---

# Drift — Detection, Routing, and Single-Gate Apply

## Agent

**AIRE_REQUIREMENTS_STEWARD** — Mode B (detection + routing) → Mode A (staging + single-gate apply)

> **R17 — Canonical producer lock:** This is the ONLY sanctioned producer of content under `{cr-root}/CR-<n>/`. Any operator request to hand-author CR files outside this workflow MUST be refused with the literal R17 redirect message.

> **R16 — Single-gate preview-then-confirm:** This workflow stages every write in memory, presents a complete preview including the CR's `change-request.md` body inline, and HALTS until the user types `yes`. On `yes`, all writes happen atomically-in-spirit. On `cancel`, nothing is written.

> **R14 — Status-conditional editing:** Foundation stories with pre-edit `status ∈ {in-progress, done, blocked}` go through the CR-supersede path. Stories with `status: planned` are body-edited directly + appended with a `## Change log` block. Requirements without a matching foundation story result in new story file creation.

---

## Before Starting

1. Read `SPEC/agents/AIRE_REQUIREMENTS_STEWARD.md`
2. Read `SPEC/rulebooks/aire-requirements-steward-rulebook.md`
3. Read `docs/status.md` — if missing, **STOP**: tell user to run `aire-project-kickoff` first
4. Confirm `docs/requirements.md` exists. If missing → tell user to run `aire-greenfield-requirements` or `aire-brownfield-requirements` first

---

## Welcome Message (Show First)

Output this verbatim to the user when the workflow starts:

```
─────────────────────────────────────────────────────────────────
🧭  AIRE Requirements Steward — Drift Detection
─────────────────────────────────────────────────────────────────

I help you detect when requirement changes affect existing stories,
shipped code, or upcoming cycles. I'll show you the impact first.
You decide what happens next.

Two ground rules:
  • I show you everything before writing anything (R16).
  • Nothing touches disk until you read the draft and type `yes`.

Let me start by checking the project's drift-tracking config…
```

Then proceed to Phase 0.

---

## Reference Document Adherence (CRITICAL)

| Rule | Description |
|------|-------------|
| 🔴 **R1 — DRAFT, NEVER AUTO-FILE** | Everything is staged in memory and shown to the user before any write; the single-gate `yes` is the only authorization to write |
| 🔴 **R14 — STATUS-CONDITIONAL FOUNDATION-EDIT** | Frozen stories (`status ∈ {in-progress, done, blocked}`) → CR-supersede path. `status: planned` stories → direct body edit + `## Change log` block. No foundation match → new story file. Pre-edit status read from git snapshot |
| 🔴 **R15 — FACT-ONLY ANALYSIS OUTPUT** | Zero severity adjectives, zero advisory verbs, zero "Option A/B" in the impact report. UX prompts (menus) may be warm; analysis output stays strictly factual |
| 🔴 **R16 — SINGLE-GATE PREVIEW-THEN-CONFIRM** | All writes happen in Phase 8.8 after the user types `yes` at the Phase 8.7 preview. Writes restricted to the allow-list buckets (CR folder, planned-story bodies, new stories, foundation deltas, `superseded-by:` audit-writes, status.md, config). `docs/requirements.md` is SKIPPED in entry-mode 2B (user already edited it) |
| 🔴 **R17 — CANONICAL PRODUCER LOCK** | This workflow + Mode A is the only path that writes CR-folder content. Refuse non-Mode-A invocations with the literal R17 redirect message |
| 🔴 **R13 — SELF-VERIFICATION GATE** | Every apply ends with a self-verification block of computed predicates |

---

## Execution Steps

### Phase 0: Config Resolution

- [ ] Look for `docs/.requirements-steward.config`.
- [ ] **If absent → bootstrap:**
  - Auto-detect:
    - `requirements-sources`: `[docs/requirements.md]` + any files linked from its `## Sources` / `## References` section
    - `active-cycle`: from `docs/status.md` Project Overview "Active Cycle" field. If `CYCLE-N` → `docs/plans/builds/cycle-<N>`. If `N/A` → `docs/plans/stories` (cycle-less)
    - `active-base`: `git rev-parse --abbrev-ref @{u}` (upstream tracking branch) → fallback `main`
    - `frontmatter-format`: peek first 10 lines of first watched PRD. `---` → `yaml`. `<!--` → `html-comment`
  - Write `docs/.requirements-steward.config` with provenance comments above each field
  - **HALT** with this message:

    ```
    ─────────────────────────────────────────────────────────────────
    🆕 First run — drift config created at docs/.requirements-steward.config
    ─────────────────────────────────────────────────────────────────

    I auto-detected your project's drift-tracking settings.

    Detected values:
      • Watching: docs/requirements.md
      • Active cycle: <value>
      • Branch base: <value>
      • Frontmatter format: <value>

    Next steps:
      1. Review the file:    cat docs/.requirements-steward.config
      2. Edit if needed (e.g., add other PRDs you want watched)
      3. Commit it:          git add docs/.requirements-steward.config && git commit -m "Initialize drift tracking"
      4. Re-run aire-drift  to start drift detection

    Nothing else was modified. See you in a moment.
    ─────────────────────────────────────────────────────────────────
    ```

- [ ] **If present → load and verify:**
  - Run **config-drift check** (Mechanism 1):
    - Recompute auto-detection
    - Compare declared vs detected
    - If different → emit `⚠️ Config drift: <details>` but continue with declared config (R1: never silently override)
  - Print **effective configuration**:

    ```
    📋 Drift configuration loaded:
       requirements-sources:
         - docs/requirements.md           [default]
         - <other-files-if-any>           [config]
       active-cycle:        <value>       [auto-detected / config]
       active-base:         <value>       [auto-detected / config]
       frontmatter-format:  <value>       [auto-detected / config]

       Source: docs/.requirements-steward.config
    ```

### Phase 1: Ask What the User Wants to Analyze

Show this verbose menu to the user:

```
─────────────────────────────────────────────────────────────────
🔍  What do you want me to analyze?
─────────────────────────────────────────────────────────────────

Pick how you want to describe the change:

  [1] Describe a change in plain English
      → "Add MFA to login flow"
      → "Variance handling now requires supervisor signature"
      → I'll find which PRD sections and stories are affected.

  [2] Analyze a doc I already edited
      → You've modified docs/requirements.md (or another PRD).
      → I'll diff against the branch base and show the impact.

  [3] Refer to a separate plan or spec file
      → You have a new doc/section you want analyzed without
        editing the PRD yet.
      → Point me at the path; I'll surface what it would affect.

  [4] Exit
      → Cancel without doing anything.

Type 1, 2, 3, or 4:
```

Wait for user response. Then enter the corresponding sub-phase below.

### Phase 2A: "Describe a change in plain English"

- [ ] Ask: `What's the change? Describe it in your own words.`
- [ ] After user responds, restate the change back:

  ```
  Got it. Let me restate to make sure I understand:

    "<user's change>"

  Is this correct? [yes / no — let me rephrase]
  ```

- [ ] If user says "no" → re-prompt until confirmed.
- [ ] Once confirmed, locate matching sections:
  - Grep `docs/requirements.md` and all files in `requirements-sources` for keywords
  - Build candidate H2 section list
- [ ] Show candidates:

  ```
  I think this change affects these sections:

    [1] docs/requirements.md::§FR-1 User Login
    [2] docs/requirements.md::§FR-7 Session Management

  Are these the right sections?
    [yes]        → use these
    [edit]       → tell me which to add/remove
    [exit]       → cancel

  Type your choice:
  ```

- [ ] Construct hypothetical edit **in memory only** (NOT written to disk).
- [ ] Proceed to Phase 3.

### Phase 2B: "Analyze a doc I already edited"

- [ ] Resolve branch base from config (`active-base`).
- [ ] Compute union of changed files:

  ```bash
  git diff <active-base>...HEAD --name-only    # committed
  git diff --cached --name-only                # staged
  git diff --name-only                         # unstaged
  ```

- [ ] Intersect with `requirements-sources`.
- [ ] If empty → output and stop:

  ```
  ✅ No PRD changes detected on this branch.

  Files I'm watching:
    - docs/requirements.md
    - <others>

  If you expected drift here:
    • Make sure you edited a watched file
    • Check git status — your edits may be on a different branch
    • Or use option [3] to point me at a separate plan file

  Nothing else was modified. Exit.
  ```

- [ ] Otherwise, list the affected PRDs:

  ```
  📝 PRD changes detected on this branch (vs <active-base>):

    [1] docs/requirements.md
        • committed: yes
        • staged: yes
        • unstaged: no

  Ready to analyze the impact? [continue / exit]:
  ```

- [ ] If user types `continue`:
  - For each affected PRD:
    - `snapshot-from = git show <active-base>:<path>` (save to temp)
    - `snapshot-to   = working tree version`
  - Proceed to Phase 3.

### Phase 2C: "Refer to a separate plan or spec file"

- [ ] Ask: `Path to the plan/spec file? (relative to project root)`
- [ ] Read the file. Show the user a preview of the first 20 lines:

  ```
  Loaded <path>. First 20 lines:
    <preview>

  I'll analyze this as a hypothetical edit to your PRD.
    snapshot-from = current docs/requirements.md on disk
    snapshot-to   = current state + grafted-in content from <path>

  Ready to analyze? [continue / different-file / exit]:
  ```

- [ ] If `continue` → proceed to Phase 3.
- [ ] If `different-file` → re-prompt for path.
- [ ] No actual edit is written to the PRD on disk.

### Phase 3: Anchor-Resolution Diff (R2)

- [ ] For each PRD pair (`snapshot-from`, `snapshot-to`):
  - Resolve anchor mode:
    - If `<!-- req-id: -->` blocks present → **ID-anchored** (v1.1+; in v1, treat as heading-anchored)
    - Else → **heading-anchored** (H2 section diff)
  - Compute diff per R2 anchor-resolution algorithm
  - Per matched anchor → body diff (paragraph-level)
  - Per anchor present in only one → record as added / removed

### Phase 4: Foundation-Trace (Reverse-Walk)

- [ ] Walk `docs/plans/stories/**/*.md` + any CR-born stories under `docs/plans/builds/cycle-*/CR/*/Epic */`.
- [ ] For each story:
  - **Precise match**: check `traces-to:` frontmatter for each modified section
  - **Heuristic fallback**: if no `traces-to:`, grep "Must Read" section for PRD references
- [ ] Build map: `{modified-section → [affected-story-ids]}`
- [ ] Annotate each affected story with: `status`, `epic`, `cycle`, `cr-id` (if CR-born)

### Phase 5: Impact-Tag Emission + Edit-Mode Routing (R8 + R14)

For each delta, emit:

```
affects_stories: <N>
affects_requirements: <M>
modifies_doc_only: <bool>
code_touched: <bool>
affects_shipped: <bool>      (any affected story has status: done)
```

For each affected or proposed story, emit the per-story edit-mode classification (R14):

```
edit-mode: cr | direct-edit | new-story
edit-eligible: true | false
```

**Classification rules** (read pre-edit `status` from git snapshot — `git show <active-base>:<path>`; do NOT trust the working tree):

| Pre-edit status | edit-mode | edit-eligible |
|---|---|---|
| `in-progress` | `cr` | true (always — CR-supersede path) |
| `done` | `cr` | true |
| `blocked` | `cr` | true |
| `planned` | `direct-edit` | true |
| (no foundation story exists for this requirement) | `new-story` | true |
| (cannot read git snapshot) | — | false (abort: cannot verify R14 eligibility) |

Compute cycle distribution (FACT-ONLY per R15):

```
Affected stories scheduled in: <list of cycles + counts>
Current active cycle (from docs/status.md): <CYCLE-N or N/A>
Affected stories in current cycle: <count>
```

Compute routing summary:

```
Routing: <X> CR-path, <Y> direct-edit, <Z> new-story
```

### Phase 6: Show the Impact Report

Output a clean, well-formatted report:

```
─────────────────────────────────────────────────────────────────
📊  Drift Impact Report
─────────────────────────────────────────────────────────────────

Change analyzed:
  "<restated change>"

Anchor mode: <heading-anchored / ID-anchored>

Modified sections (<N>):
  • docs/requirements.md::§FR-1 User Login
      <one-line summary of paragraph-level delta>

Added sections (<M>):
  • docs/requirements.md::§FR-N <New Section Title>

Removed sections (<K>):
  • (none)

─────────────────────────────────────────────────────────────────
Foundation stories that may be impacted:

  Story ID                                Status         Epic       Cycle      Edit mode               Match
  ────────────────────────────────        ───────────    ────────   ────────   ─────────────────       ─────────────────
  epic-1-story-1.1-User-Login             in-progress    Epic-1     CYCLE-1    CR (supersede)          traces-to (precise)
  epic-1-story-1.2-Password-Reset         done           Epic-1     CYCLE-1    CR (supersede)          Must Read grep (heuristic)
  epic-3-story-3.4-MFA-Setup              planned        Epic-3     CYCLE-1    Direct edit             traces-to (precise)
  (new — §FR-13 Void Transfer)            —              Epic-4     CYCLE-1    New story               no foundation match

─────────────────────────────────────────────────────────────────
Impact tags:

  affects_stories:        3
  affects_requirements:   2
  modifies_doc_only:      false
  code_touched:           true
  affects_shipped:        true   ⚠️

Routing:
  CR-path:        2
  Direct-edit:    1
  New-story:      1

Cycle distribution:
  Affected stories scheduled in: CYCLE-1 (3) + 1 new in CYCLE-1
  Current active cycle:          CYCLE-1
  Affected stories in current cycle: 4

─────────────────────────────────────────────────────────────────
```

### Phase 7: Routing Decision Menu

Show this terse menu (R15-compliant — facts in the summary, neutral options below):

```
─────────────────────────────────────────────────────────────────
🎯  What's next?
─────────────────────────────────────────────────────────────────

Routing: <X> CR-path, <Y> direct-edit, <Z> new stories.

  [1] Proceed — draft CR, edit planned stories, create new ones
  [2] Log as blocker
  [3] Exit

Type 1, 2, or 3:
```

If `<X> == 0 && <Z> == 0` (only direct-edits), collapse:

```
Routing: <Y> direct-edit only.

  [1] Proceed — edit planned stories with changelog
  [2] Log as blocker
  [3] Exit
```

If all three are zero (analysis returned no actionable impact), output:

```
✅ No actionable impact detected. Nothing to draft, edit, or create.
   Drift report stays in your chat history. Exiting.
```

Branch on user choice:

- **[1]** → Phase 8 (Stage Everything + Single-Gate Apply)
- **[2]** → Phase 9 (Log as blocker)
- **[3]** → Phase 10 (Exit, no action)

### Phase 8: Stage Everything in Memory + Single-Gate Apply

This is the merged drafting + apply phase. **No writes happen until Phase 8.7's confirmation gate.**

#### Phase 8.1: Cycle Resolution + CR Numbering

- [ ] Detect cycle layout:

  ```
  If docs/plans/builds/cycle-*/ folders exist (cycle-using project):
      cr-root = docs/plans/builds/cycle-<active>/CR/
      cycle-introduced = <active>
  Else (cycle-less project):
      cr-root = docs/plans/change-requests/
      cycle-introduced = null
  ```

- [ ] Compute next CR id: scan `{cr-root}/CR-*/` → `max(n) + 1`, or `CR-1` if none. Per-cycle, not zero-padded.
- [ ] Compute next Epic number (global counter):
  - Scan every story frontmatter under `docs/plans/stories/**/*.md` and `docs/plans/builds/cycle-*/CR/*/Epic */**/*.md`
  - Take `max(epic-number) + 1`

#### Phase 8.2: R11 Collision Check (CR-path stories only)

- [ ] For each CR-path story-id, glob `{cr-root}/CR-*/change-request.md`
- [ ] Grep `impacts-stories:` in each open CR (status ∈ {proposed, approved, in-progress})
- [ ] If collision found, surface to user:

  ```
  ⚠️  Collision detected (R11):

    Story epic-N-story-N.M-Name is already linked to CR-X (status: proposed).

    Per R11, I will APPEND to CR-X instead of drafting a parallel CR.

  Proceed with append? [continue / exit]:
  ```

- [ ] On `continue` → append to existing CR's "Affected stories" and "Proposed resolution" sections (still staged in memory).

#### Phase 8.3: R12 Dependency-Cycle Check

- [ ] Walk `depends-on` graph across CR-path and direct-edit stories; Tarjan SCC.
- [ ] If SCC intersects scope → ABORT with recoverable error:

  ```
  ❌ R12 violation — dependency cycle in scope:

     SCC members: [story-a, story-b, story-c]

     The agent has no valid topological ordering and cannot safely
     stage this run. Resolve the cycle first.

  Aborting. No files written.
  ```

#### Phase 8.4: Stage CR Bundle in Memory (CR-path stories)

**Before staging — read first:**

- [ ] Read the body of every foundation story being superseded
- [ ] Read `docs/requirements.md` (both pre-edit and new versions of the changed sections)
- [ ] Read the codebase files that implement the affected stories (grep `## Implementation steps` in each foundation story to find them)

Without reading these files first, the story content will be generic. The depth rules are not optional.

- [ ] Compose `change-request.md` in memory:
  - YAML frontmatter per §4.3 of the rulebook (including `produced-by: requirements-steward@v1.0.0 Mode A` — R17)
  - 5 mandatory sections: `## Summary`, `## Impact analysis`, `## Dependency impact`, `## Resolution`, `## Approval`
  - **R14(a) enforcement** on Resolution: NEVER propose editing a foundation story body. Use CR-born superseding stories.
- [ ] Compose `plan-delta.md` in memory.
- [ ] Compose `requirements-delta.md` in memory.
  - **Entry-mode 2B note**: in 2B, this file is an audit record of the user's already-completed PRD edit, not a forward patch.
- [ ] Compose `README.md` in memory using §6 template.
- [ ] For each CR-path story, compose `CR-<n>.<m>.md` in memory using the full CR-born story template (see rulebook §5.4.2). Every section filled with specific content derived from reading the foundation story and codebase. No skeleton stubs.

#### Phase 8.4b: Stage Direct-Edits in Memory (status: planned stories)

For each direct-edit story:

- [ ] Read the foundation story body from disk (current working tree)
- [ ] Verify pre-edit `status: planned` by reading `git show <active-base>:<path>` — confirm `status: planned` in the git snapshot. If snapshot disagrees with working tree, abort with R14(b) violation.
- [ ] Compute the new body: apply the requirement delta to the relevant sections (`## Objective`, `## Implementation steps`, `## Acceptance criteria`, `## Tests`, etc.). Carry forward any sections not affected by the delta verbatim.
- [ ] Append a `## Change log` block to the bottom of the new body using this template:

  ```markdown
  ---

  ## Change log

  ### <YYYY-MM-DD> — Updated for <req-id>@v<new-version>

  **Trigger:** drift run; entry-mode <2A plain-English | 2B PRD-edit detected | 2C spec-file>.
  **Pre-edit status:** planned   ← R14(b) carve-out

  **Sections modified:**
  - `## <section name>` — <one-line delta>
  - `## <section name>` — <one-line delta>

  **Delta:**

  | Aspect | Before | After |
  | :-- | :-- | :-- |
  | <aspect 1> | <old> | <new> |
  | <aspect 2> | <old> | <new> |

  **Reason no CR was drafted:** foundation story was `status: planned` at edit time (R14(b) carve-out — no shipped or in-flight code to preserve).
  ```

- [ ] Hold the full new body (original frontmatter + rewritten sections + appended changelog block) in memory.

#### Phase 8.4c: Stage New Stories in Memory (no foundation match)

For each new-story candidate:

- [ ] Run the epic-routing decision tree (§5.4.1.2):

  ```
  Does the triggering requirement (§FR-N) trace to an existing epic?
    → YES:  story-id = epic-<N>-story-<N>.<M+1> where M = max existing in that epic.
    → NO:   prompt operator inline:
              "Requirement §FR-N doesn't match any existing epic.
               Create new epic? [yes / assign-to-existing / skip]"
            On yes:               allocate epic-<next-global>; story-id = epic-<new>-story-<new>.1
            On assign-to-existing: prompt for epic number
            On skip:               drop this story; continue with others
  ```

- [ ] Compose the new foundation story body using the foundation story template:
  - Frontmatter: `cr-id: null`, `supersedes: []`, `status: planned`, `traces-to: [<req-id>@v<version>]`, plus standard fields
  - Body sections: `## Objective`, `## Must Read`, `## Implementation steps`, `## Tests`, `## Acceptance criteria`, `## Prerequisites`, etc. — derived from the requirement
- [ ] Append a seeded `## Change log` block:

  ```markdown
  ---

  ## Change log

  ### <YYYY-MM-DD> — Created

  **Trigger:** drift run; new requirement <req-id>@v<version> had no matching foundation story.
  **Epic:** Epic-<N>  (<"assigned to existing Epic-N" | "new Epic-N created in this run">)
  **Sources:** <list of PRD sections seeding this story>
  ```

- [ ] Hold the full new file (path + body) in memory.

#### Phase 8.4d: Stage Foundation Deltas in Memory

- [ ] **`docs/requirements.md`** — compute patch (modified-section bodies + new-requirement insertions).
  - **SKIP if entry-mode == 2B** (user already edited it; their working tree is source of truth).
- [ ] **`docs/architecture/design/*.md`** — only if `requirements-delta` references architecture concepts (API endpoints, data models, integration points). Compute surgical section updates.
- [ ] **`docs/plans/builds/cycle-<N>/cycle-plan.md`** (cycle-using projects only) — compute scope append for CR-<n>, plus any rescheduling for affected stories.
- [ ] **`docs/plans/implementation-plan.md`** — compute index additions for new CR-born stories and new foundation stories.
- [ ] **`superseded-by:` audit-writes** — for each foundation story that has a CR-born superseding story, compute the frontmatter-only update (R14 byte-identity assert: rest of the body must be byte-identical pre/post).
- [ ] **`docs/status.md`** — compute updates:
  - Agent Activity row
  - Change Requests row (CR-<n> with status `applied`, applied-at = today)
  - Story Tracker rows for new CR-born stories and new foundation stories
  - Build Cycles count adjustments (cycle-using only)
  - Progress Summary re-tally if any affected story status changed

#### Phase 8.5: Pre-Emission Validation (§5.4.4)

Run the 8+ checks (a)–(j) per rulebook §3, against in-memory drafts. First failure halts:

```
❌ Pre-emission check failed: <which check>
   Detail: <regex match / missing file / format error>

I cannot present a malformed bundle. Please review the failure above
and re-run aire-drift.
```

#### Phase 8.6: R13 Self-Verification (Predicates, in-memory)

Compute and print each predicate's actual result against the staged content:

```
─────────────────────────────────────────────────────────────────
🔬  Self-verification (R13 — measurable predicates, pre-write)
─────────────────────────────────────────────────────────────────

R5  trace-by-version regex on each traces-to entry:
     CR-<n>.1: matched 1/1  ✓
     CR-<n>.2: matched 1/1  ✓
     new-story epic-4-story-4.1: matched 1/1  ✓

R10 primary-epic field:
     value: "Epic-<K>"  ✓

R11 CR collision: <collisions or "none">  ✓

R12 depends-on cycle (Tarjan SCC): <SCC list or "none">  ✓

R14(a) foundation-edit regex on Resolution (CR-path stories):
     CR-<n>/change-request.md: 0 matches  ✓

R14(b) pre-edit status check (direct-edit stories):
     epic-3-story-3.4-MFA-Setup → planned  ✓
     <other direct-edit story IDs>

R14(c) ## Change log block presence:
     direct-edit stories: <Y>/<Y> have today's dated entry  ✓
     new stories: <Z>/<Z> have today's "Created" entry  ✓

R15 severity-adjective + advisory-verb regex:
     severity adjectives: 0  ✓
     advisory verbs: 0  ✓

R16 staged-writes allow-list partition:
     CR folder:                <count>
     planned-story direct-edits: <Y>
     new foundation stories:     <Z>
     requirements.md:            <0 in 2B | 1 otherwise>
     architecture:               <count>
     cycle-plan:                 <count>
     implementation-plan:        <count>
     superseded-by audit-writes: <count>
     status.md:                  1
     outside allow-list:         0  ✓

R17 produced-by frontmatter:
     value: "requirements-steward@v1.0.0 Mode A"  ✓

§5.4.1 foundation immutability ↔ CR-born coverage:
     <foundation-id> → CR-<n>.<m>  ✓

§5.4.2 per-CR file inventory:
     change-request.md ✓  plan-delta.md ✓  requirements-delta.md ✓
     README.md ✓  Epic <K> (Change Request)/ ✓ (<M> stories)

§9.1 section presence in change-request.md:
     ## Summary ✓  ## Impact analysis ✓  ## Dependency impact ✓
     ## Resolution ✓  ## Approval ✓
```

If any predicate fails or returns `not-computed` → halt before showing the preview.

#### Phase 8.7: PREVIEW + SINGLE-GATE CONFIRMATION (R16)

This is the **only approval gate** in the workflow. Show the user everything that will be written, plus the CR's `change-request.md` body inline, then halt for `yes` / `cancel`.

```
─────────────────────────────────────────────────────────────────
📋  Preview — about to apply CR-<n>
─────────────────────────────────────────────────────────────────

Entry mode: <2A / 2B / 2C>
CR-<n> Summary: <one-line from staged change-request.md>
Scheduled cycle: CYCLE-<N>

Files that will be written (<N> total):

CR bundle:
  • <cr-root>/CR-<n>/change-request.md
  • <cr-root>/CR-<n>/plan-delta.md
  • <cr-root>/CR-<n>/requirements-delta.md       (audit record in 2B; forward patch in 2A/2C)
  • <cr-root>/CR-<n>/README.md
  • <cr-root>/CR-<n>/Epic <K> (Change Request)/CR-<n>.1.md
  • <cr-root>/CR-<n>/Epic <K> (Change Request)/CR-<n>.2.md
  • <cr-root>/CR-<n>/CHANGELOG.md

Foundation direct-edits (<Y> stories, all pre-edit status: planned):
  • docs/plans/stories/epic-3-story-3.4-MFA-Setup.md
       Sections modified: ## Objective, ## Implementation steps, ## Acceptance criteria
       Change log entry appended.

New foundation stories (<Z>):
  • docs/plans/stories/epic-4-story-4.1-Void-Transfer.md       [Epic-4 — existing]
  • docs/plans/stories/epic-7-story-7.1-Quarterly-Reports.md   [Epic-7 — new (created this run)]

Foundation file updates:
  • docs/requirements.md          <SKIP — entry-mode 2B, you edited it>  ← only when 2B
  • docs/architecture/design/00-system-architecture.md
  • docs/plans/builds/cycle-<N>/cycle-plan.md
  • docs/plans/implementation-plan.md
  • docs/plans/stories/epic-4-story-4.1-Variance-Handling.md
       superseded-by audit-write only (R14 byte-identity verified)
  • docs/status.md

R14 verification:
  CR-path stories (CR-supersede): <count>
  Direct-edit stories (pre-edit status == planned): <Y>  ✓
  New stories created: <Z>  ✓
  Foundation body byte-identity (superseded-by writes): <count>  ✓

R16 verification:
  Files in allow-list: <total>
  Files outside allow-list: 0  ✓

─────────────────────────────────────────────────────────────────
📄  Draft of CR-<n>/change-request.md (read this carefully):
─────────────────────────────────────────────────────────────────

<INLINE RENDER of the staged change-request.md body — full content,
not summarized, so the user can review it without any file on disk>

─────────────────────────────────────────────────────────────────
🚦  Single-gate confirmation
─────────────────────────────────────────────────────────────────

Read the CR draft above. If everything looks right:

  Type:  yes        — apply all changes shown above
  Type:  cancel     — abort; nothing will be written

Your input:
```

- [ ] On `cancel` → Phase 8.10 (no writes).
- [ ] On any input other than `yes` or `cancel` → re-prompt with: `Please type 'yes' to apply or 'cancel' to abort.`
- [ ] On `yes` → proceed to Phase 8.8.

#### Phase 8.8: Apply All Staged Writes (Atomic in Spirit)

Execute writes in this order. If any sub-step fails → HALT and instruct user to `git status` + `git restore` to roll back. NEVER partial-apply.

- [ ] **8.8a — Write CR bundle** under `{cr-root}/CR-<n>/`:
  - `change-request.md`
  - `plan-delta.md`
  - `requirements-delta.md`
  - `README.md`
  - `Epic <K> (Change Request)/CR-<n>.<m>.md` for each CR-path story
- [ ] **8.8b — Write direct-edit story bodies** (full file rewrite — original frontmatter preserved, body replaced with the new content, `## Change log` block appended). For each direct-edit story:
  - Re-verify pre-edit `status: planned` from git snapshot one final time (defense in depth against TOCTOU)
  - Write the full new file
- [ ] **8.8c — Write new foundation story files** under `docs/plans/stories/`.
- [ ] **8.8d — Write `docs/requirements.md` patch** (skip if entry-mode 2B).
- [ ] **8.8e — Write `docs/architecture/design/*.md` patches** (only if staged).
- [ ] **8.8f — Write `docs/plans/builds/cycle-<N>/cycle-plan.md`** (cycle-using only).
- [ ] **8.8g — Write `docs/plans/implementation-plan.md`** index additions.
- [ ] **8.8h — Write `superseded-by:` audit-writes** on superseded foundation stories. For each:
  - Read current file
  - Update ONLY the `superseded-by:` frontmatter field
  - **R14 GUARD**: assert body is byte-identical before and after this write. Any difference → ABORT and instruct rollback.
  - Add `last-audit: { date: <today>, result: pass }`.
- [ ] **8.8i — Update CR-<n>/change-request.md frontmatter** to `status: applied`, `applied-at: <ISO>`, `applied-by: <git user>`. Append `## Closure` section listing files modified.
- [ ] **8.8j — Write `{cr-root}/CR-<n>/CHANGELOG.md`** (audit trail with file paths + line counts).
- [ ] **8.8k — Update `docs/status.md`** — all sections computed in 8.4d (Agent Activity, Change Requests, Story Tracker, Build Cycles, Progress Summary).
- [ ] **8.8l — Mode E INDEX rollup** — regenerate `docs/plans/builds/cycle-<N>/INDEX.md` (cycle-using only).

#### Phase 8.9: Post-Apply Routing + Implementation Commands

Print the routing block. Use **full file paths** for every `aire-dev-implement` command:

```
─────────────────────────────────────────────────────────────────
✅ CR-<n> applied. <N> files written.
─────────────────────────────────────────────────────────────────

Commit everything together:
   git add .
   git commit -m "Apply CR-<n>: <one-line summary>"

─────────────────────────────────────────────────────────────────
🎯 Implementation routing
─────────────────────────────────────────────────────────────────
```

If CR-path stories exist, emit the CR-rework block:

```
CR-born stories (rework path — shipped/in-progress code needs to change):

  aire-dev-implement <cr-root>/CR-<n>/Epic <K> (Change Request)/CR-<n>.1.md
  aire-dev-implement <cr-root>/CR-<n>/Epic <K> (Change Request)/CR-<n>.2.md
  ...

Heads-up: CR-path stories touch shipped or in-flight surfaces.
QA regression scope may include any foundation stories listed in
each CR-born story's ## 🌊 Impacted stories ripple section.
For in-progress foundations, pause any in-flight work on the
superseded story before starting the CR-born replacement.
```

If direct-edit stories exist, emit the direct-edit block:

```
Direct-edited stories (forward path — foundation rewritten in place):

  aire-dev-implement docs/plans/stories/epic-3-story-3.4-MFA-Setup.md
  ...

These foundation stories had pre-edit status: planned. Their bodies
are rewritten to match the new requirement; the appended
## Change log section records what changed.
```

If new stories exist, emit the new-story block:

```
New foundation stories (forward path — no prior implementation):

  aire-dev-implement docs/plans/stories/epic-4-story-4.1-Void-Transfer.md
  ...

The ## Change log section's "Created" entry records the trigger
requirement and epic assignment.
```

Per R1 (no auto-chain): print the commands; do NOT invoke them.

#### Phase 8.10: On Cancel — No Writes

If the user typed `cancel` at Phase 8.7:

```
✅ Cancelled. Nothing was written to disk.
   Drift report and staged preview remain in your chat history.
```

Then exit (no status.md update — nothing happened).

### Phase 9: Log as Blocker (no apply)

```
─────────────────────────────────────────────────────────────────
⏸️   Log-as-blocker path
─────────────────────────────────────────────────────────────────

What's gating this decision? (one-line description)
Type your input, or 'back' to choose differently:
```

- [ ] On user response:
  - Append to `docs/status.md` Blockers section:

    ```
    | BLK-<n> | <one-line description> | PDM | YYYY-MM-DD | 🟡 Open |
    ```

  - Append to Agent Activity:

    ```
    | AIRE_REQUIREMENTS_STEWARD | Analyzed: <change>; logged blocker BLK-<n> | Idle | YYYY-MM-DD |
    ```

  - Exit with:

    ```
    ✅ Blocker BLK-<n> logged in docs/status.md.
       Re-run aire-drift when the blocker clears.
    ```

### Phase 10: Exit (No Action)

```
─────────────────────────────────────────────────────────────────
Exiting without changes.
─────────────────────────────────────────────────────────────────

Drift report is in your chat history if you need to revisit it.
Nothing was written to disk.
```

---

## Output

**Location (only after the Phase 8.7 single-gate `yes`):**

- Phase 0 (first run / rebootstrap): `docs/.requirements-steward.config`
- Phase 8.8 (single-gate apply — all written together):
  - `{cr-root}/CR-<n>/change-request.md`
  - `{cr-root}/CR-<n>/plan-delta.md`
  - `{cr-root}/CR-<n>/requirements-delta.md`
  - `{cr-root}/CR-<n>/README.md`
  - `{cr-root}/CR-<n>/Epic <K> (Change Request)/CR-<n>.<m>.md` (one per CR-path story)
  - `{cr-root}/CR-<n>/CHANGELOG.md`
  - `docs/plans/stories/<foundation>.md` (full body rewrite for direct-edits + appended `## Change log`)
  - `docs/plans/stories/<new>.md` (newly created foundation stories)
  - `docs/requirements.md` (skipped in entry-mode 2B)
  - `docs/architecture/design/*.md` (if architecture affected)
  - `docs/plans/builds/cycle-<N>/cycle-plan.md` (cycle-using only)
  - `docs/plans/implementation-plan.md`
  - `docs/plans/stories/<superseded>.md` (`superseded-by:` audit-write only, R14 byte-identity verified)
  - `docs/status.md`
  - `docs/plans/builds/cycle-<N>/INDEX.md` (Mode E, cycle-using only)
- Phase 9 (blocker): `docs/status.md` only.
- Phase 10 (cancel/exit): nothing.

**R16 hard boundary:** writes happen ONLY after the user types `yes` at the Phase 8.7 single-gate. Every write must fall in the allow-list buckets (see rulebook §1 R16 predicate). `docs/requirements.md` is SKIPPED in entry-mode 2B.

---

## Rules (Quick Reference)

- 🔴 **R1**: Stage everything in memory; the single-gate `yes` is the only authorization to write.
- 🔴 **R14**: Status-conditional editing. Frozen stories (`in-progress` / `done` / `blocked`) → CR-supersede. `planned` → direct edit + `## Change log`. No foundation match → new story.
- 🔴 **R15**: Analysis output is fact-only. UX prompts may be warm but reports stay factual.
- 🔴 **R16**: Single-gate preview-then-confirm; writes only after `yes`; allow-list partition; PRD skipped in 2B.
- 🔴 **R17**: Only sanctioned producer of CR-folder content. Refuse non-Mode-A invocations.
- 🔴 **R13**: Phase 8.6 self-verification with computed predicates is MANDATORY before showing the preview.
- 🟡 **R11**: If a story is already in an open CR, APPEND; do NOT draft a parallel CR.
- 🟡 **R12**: If `depends-on` cycle intersects scope → ABORT.

---

## Next Step (After This Workflow)

| Path taken | Next action |
|-----------|-------------|
| Phase 8.8 (applied) | Commit (`git add . && git commit -m "Apply CR-<n>: <summary>"`); then run each `aire-dev-implement <full-path>` printed in Phase 8.9 |
| Phase 8.10 (canceled) | None — review preview + re-run `aire-drift` when ready |
| Phase 9 (blocker logged) | Resolve blocker → re-run `aire-drift` |
| Phase 10 (exit no action) | None — drift report is in chat history |

---

## 🔄 Next Steps in AIRE Workflow

**You are here → `aire-drift`**

| # | Next Command | Purpose |
|---|-------------|---------|
| ✅ | `aire-dev-implement <full-path-to-story>` | Implement each CR-born / direct-edited / new story per the Phase 8.9 routing output |
| 🔄 | `aire-drift` | Re-run after manual amend, blocker clears, or for additional changes |