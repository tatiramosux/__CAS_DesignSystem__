# CLAUDE.md

## Project Methodology

This repository uses the AI-assisted Design System methodology located in:

`Methodology_AI_assisted/`

Before making any material change:

1. Read `Methodology_AI_assisted/README.md`.
2. Use it to identify which methodology documents are relevant to the task.
3. Read the relevant authoritative documents before implementation.
4. Inspect the existing implementation affected by the request.
5. For Design Token work, always consult the latest:
   `Methodology_AI_assisted/tokens/design-tokens.json`

Do not load unrelated methodology documents unless they are necessary to resolve the task.

## Authoritative Documents

Depending on the task, consult:

- `Methodology_AI_assisted/PROJECT_CONTEXT.md`
  Project context, technology foundation, and canonical sources.

- `Methodology_AI_assisted/DESIGN_GOVERNANCE.md`
  Design System semantics, token architecture, naming, themes, and accessibility.

- `Methodology_AI_assisted/DESIGN_GUARD_RAILS.md`
  AI behavior, scope boundaries, conflicts, and decision rules.

- `Methodology_AI_assisted/CODE_ARCHITECTURE_AND_MIGRATION.md`
  Technical architecture, component implementation, validation, and migration.

- `Methodology_AI_assisted/tokens/design-tokens.json`
  Canonical live source for current Design Token data.

## Rule Ownership

Each rule has one authoritative owner.

Do not duplicate, reinterpret, or create competing versions of governed rules.

If authoritative sources conflict, do not silently resolve the conflict.

## Decision Model

Follow the decision model defined in:

`Methodology_AI_assisted/DESIGN_GUARD_RAILS.md`

- `IMPLEMENT` — existing Governance clearly supports the change.
- `PROPOSE` — the change requires a new or modified governed decision.
- `ASK` — material ambiguity or conflict requires human input.

A user request does not automatically override Governance.

## Before Changing Code

Inspect the existing implementation relevant to the task.

Do not assume existing code should be replaced simply because it differs from the preferred architecture.

For migration or structural changes, follow:

`Methodology_AI_assisted/CODE_ARCHITECTURE_AND_MIGRATION.md`

## Design System Protection

Do not:

- hardcode properties governed by the Design System;
- bypass semantic tokens when an appropriate semantic token exists;
- create, rename, or remove governed tokens outside the Governance process;
- duplicate canonical token data;
- treat React, TypeScript, Tailwind CSS, shadcn/ui, or framework defaults as Design System authority;
- make unrelated changes outside the requested scope;
- silently resolve conflicts between Governance, canonical data, Design, and implementation.

## Canonical Token Source

For Design Token work:

`Methodology_AI_assisted/tokens/design-tokens.json`

is the canonical live source for current approved token data.

When an approved version replaces it, treat the new version as canonical.

Do not recreate its values as an independent source of truth.

## Scope

Finding a problem does not authorize fixing it.

Report relevant out-of-scope findings separately.

## Validation

Before declaring work complete, validate the affected implementation according to:

`Methodology_AI_assisted/CODE_ARCHITECTURE_AND_MIGRATION.md`

Do not claim completion when required validation has not been performed.