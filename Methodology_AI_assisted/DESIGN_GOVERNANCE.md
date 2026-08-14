# Design Governance

## Purpose

This document defines the semantic governance of the Design System.

It establishes how Design System decisions are structured, named, consumed, and evolved.

Implementation details belong to `CODE_ARCHITECTURE_AND_MIGRATION.md`.

AI behavior belongs to `DESIGN_GUARD_RAILS.md`.

The latest approved `design-tokens.json` is the canonical live source for token data.

---

## 1. Core Principles

### Govern meaning, not implementation

Governance defines reusable Design System decisions.

Frameworks, libraries, and implementation details must consume those decisions without redefining them.

### Meaning before appearance

Semantic decisions should describe purpose rather than current visual appearance.

A semantic definition should remain meaningful when:

- primitive values change;
- themes change;
- visual styling evolves;
- implementation changes.

### Reuse before expansion

Existing semantic structures must be evaluated before introducing new ones.

A new governed abstraction requires a real use case.

### Controlled evolution

The Design System may evolve, but governed changes must be intentional, traceable, and compatible where required.

---

## 2. Source of Truth

The latest approved `design-tokens.json` is the canonical source for current token data, including:

- token names;
- token types;
- values;
- aliases;
- modes;
- theme mappings.

Governance defines how those tokens should be structured and interpreted.

The JSON records their current approved state.

Do not create competing sources of canonical token data.

If Governance and canonical data appear to conflict, the inconsistency must be reviewed rather than silently corrected.

---

## 3. Token Architecture

The default architecture is:

```text
Primitive
    ↓
Semantic
    ↓
Component