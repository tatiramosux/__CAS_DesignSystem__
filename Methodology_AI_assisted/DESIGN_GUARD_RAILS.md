# Design Guard Rails

## Purpose

This document defines how AI must behave while working within the Design System methodology.

It does not redefine Design System Governance or technical architecture.

Design System rules belong to `DESIGN_GOVERNANCE.md`.

Implementation rules belong to `CODE_ARCHITECTURE_AND_MIGRATION.md`.

---

## 1. Golden Rule

> A user request does not override Governance.

Before making a material change, AI must validate the request against the relevant project documentation, canonical token data, and existing implementation.

If a request conflicts with the governed system, AI must surface the conflict rather than silently implement it.

---

## 2. Decision Model

AI operates in three modes:

### IMPLEMENT

Proceed when:

- existing Governance supports the request;
- scope is clear;
- no new governed decision is required;
- no material conflict exists.

### PROPOSE

Propose before implementing when the request would introduce or change:

- a governed token;
- semantic meaning;
- naming conventions;
- component-system conventions;
- foundational architecture;
- an exception to existing Governance.

### ASK

Ask for a decision when:

- authoritative sources conflict;
- material information is missing;
- multiple valid approaches have meaningful consequences;
- the requested action is destructive or difficult to reverse;
- Governance does not resolve the decision.

Do not guess when the uncertainty affects the governed system.

---

## 3. Read Before Acting

Before changing the system, inspect only the sources relevant to the task.

These may include:

- `PROJECT_CONTEXT.md`;
- `DESIGN_GOVERNANCE.md`;
- `CODE_ARCHITECTURE_AND_MIGRATION.md`;
- the latest approved `design-tokens.json`;
- relevant component specifications;
- relevant existing implementation.

Do not rely on framework defaults when governed project information exists.

Do not repeatedly load unrelated documentation when the required context is already known.

---

## 4. Respect Rule Ownership

Each rule has one authoritative owner.

AI must reference the authoritative document rather than creating a second interpretation elsewhere.

When documents appear to overlap, use the ownership model defined in `README.md`.

Do not silently reconcile conflicting authoritative sources.

---

## 5. Token Guard Rails

Follow the token architecture defined in `DESIGN_GOVERNANCE.md`.

AI must not:

- bypass semantic tokens when an appropriate semantic token exists;
- create governed tokens without approval;
- redefine canonical token values outside the approved JSON;
- invent token aliases or modes;
- create unnecessary token layers;
- silently rename or remove governed tokens.

When the latest approved JSON changes, treat it as the current canonical token state.

---

## 6. Zero Hardcoding

> Zero hardcoding of properties governed by the Design System.

When an approved Design System value exists, AI must not replace it with an arbitrary literal value.

This applies to governed properties such as:

- color;
- typography;
- spacing;
- radius;
- elevation;
- opacity;
- borders;
- sizing;
- motion;

when those properties are represented by the Design System.

This rule does not require creating tokens for every technical value in the codebase.

Only governed Design System properties are subject to this restriction.

---

## 7. Component Guard Rails

Before creating a new component, evaluate:

```text
REUSE
  ↓
COMPOSE
  ↓
EXTEND
  ↓
CREATE