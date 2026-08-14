# Project Context

## Purpose

This project uses a governed methodology for building and maintaining a reusable Design System with AI-assisted implementation.

The methodology separates Design System decisions from technical implementation so AI can work within an established system instead of creating new conventions during development.

## Technology Foundation

The implementation is based on:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui

React and TypeScript provide the component foundation.

Tailwind CSS provides the styling infrastructure.

shadcn/ui provides reusable component infrastructure.

These technologies support the Design System but do not define its visual identity, semantic rules, or token architecture.

## Canonical Design System Data

The latest approved `design-tokens.json` is the canonical live source for Design Token data.

It contains the current approved token names, values, aliases, and modes.

Canonical token data must not be manually duplicated as an independent source of truth.

## Documentation

Responsibilities are separated across:

- `DESIGN_GOVERNANCE.md` — Design System rules and semantics.
- `DESIGN_GUARD_RAILS.md` — AI behavior and decision boundaries.
- `CODE_ARCHITECTURE_AND_MIGRATION.md` — technical implementation and migration.
- `tokens/design-tokens.json` — canonical token data.

Each rule has one authoritative owner.

## Existing Projects

This methodology may be introduced into an existing project.

Before structural migration, the existing implementation must be understood and audited.

Working behavior should be preserved while the codebase is progressively aligned with the methodology.

Migration rules are defined in `CODE_ARCHITECTURE_AND_MIGRATION.md`.

## Operating Principle

> Understand the system before changing it. Reuse governed decisions before creating new ones.