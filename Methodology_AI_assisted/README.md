# AI-Governed Design System Methodology

A governance-first methodology for building, maintaining, and migrating Design Systems with AI-assisted implementation.

The goal is simple:

> AI operates within the Design System. It does not redefine the Design System.

---

## How the Methodology Works

The methodology separates context, Design System rules, AI behavior, technical implementation, and canonical token data.

Each rule has one authoritative owner.

Other documents may reference that rule, but should not redefine it.

---

## Documentation Structure

```text
/
├── README.md
├── PROJECT_CONTEXT.md
├── DESIGN_GOVERNANCE.md
├── DESIGN_GUARD_RAILS.md
├── CODE_ARCHITECTURE_AND_MIGRATION.md
└── tokens/
    └── design-tokens.json