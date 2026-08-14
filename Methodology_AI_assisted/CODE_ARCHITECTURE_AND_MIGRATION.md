# Code Architecture and Migration

## Purpose

This document defines how the Design System is implemented and how an existing project is migrated to the governed architecture.

Design System semantics belong to `DESIGN_GOVERNANCE.md`.

AI behavior belongs to `DESIGN_GUARD_RAILS.md`.

This document owns technical implementation, code organization, component architecture, migration, and validation.

---

## 1. Technology Foundation

The default implementation foundation is:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Responsibilities are separated:

**React**  
Provides component composition and application structure.

**TypeScript**  
Provides typed component contracts and implementation safety.

**Tailwind CSS**  
Provides styling infrastructure.

**shadcn/ui**  
Provides reusable component infrastructure where appropriate.

None of these technologies defines Design System semantics.

---

## 2. Architecture Principle

The implementation should follow:

```text
Canonical Design Tokens
        ↓
Token Integration
        ↓
Semantic Styling
        ↓
Components
        ↓
Patterns / Composition
        ↓
Interfaces
```

Code should consume governed decisions rather than recreate them locally.

---

## 3. Canonical Token Integration

The latest approved `design-tokens.json` is the canonical source for token data.

Implementation must:

- consume or derive from canonical token data;
- preserve semantic aliases;
- support required themes and modes;
- avoid independent duplicate token definitions;
- avoid direct primitive consumption when an appropriate semantic token exists.

Token semantics and naming are governed by `DESIGN_GOVERNANCE.md`.

---

## 4. Zero Hardcoding

Properties governed by the Design System must not be hardcoded in components.

Avoid arbitrary values for governed properties such as:

- colors;
- spacing;
- typography;
- radius;
- borders;
- elevation;
- opacity;
- sizing;
- motion.

Technical values that are not Design System decisions may remain local when appropriate.

Do not create unnecessary tokens solely to eliminate every literal value from the codebase.

---

## 5. Tailwind Integration

Tailwind should expose or consume governed Design System values.

Preferred:

```text
Canonical Tokens
      ↓
Semantic Mapping
      ↓
Tailwind
      ↓
Components
```

Avoid maintaining a separate visual system inside Tailwind.

Arbitrary utilities should not bypass governed properties.

Tailwind defaults may be used only where they do not conflict with Design System Governance.

---

## 6. shadcn/ui Integration

shadcn/ui is infrastructure, not the final Design System.

Its components may be:

- reused;
- composed;
- extended;
- visually customized;
- structurally adapted when required.

A shadcn component does not need to visually match its default implementation.

When adapting shadcn/ui:

1. preserve useful behavior and accessibility;
2. replace default visual decisions with governed semantics;
3. maintain clear component APIs;
4. avoid unnecessary rewrites when adaptation is sufficient.

Custom implementation is acceptable when shadcn/ui does not provide a useful architectural foundation.

---

## 7. Component Strategy

Before creating a component, evaluate:

```text
REUSE
  ↓
COMPOSE
  ↓
EXTEND
  ↓
CREATE
```

### Reuse

Use an existing component when its responsibility already matches the requirement.

### Compose

Combine existing primitives or components when the requirement represents composition rather than a new primitive.

### Extend

Modify an existing component when the same responsibility needs additional governed behavior or variants.

### Create

Create a new component when no existing structure appropriately represents the responsibility.

Do not duplicate components solely because their visual presentation differs.

---

## 8. Component Responsibility

Each component should have a clear responsibility.

Components should:

- expose intentional APIs;
- use semantic Design System values;
- support relevant states;
- preserve accessibility;
- support responsive behavior where applicable;
- avoid embedding unrelated product-specific logic in reusable primitives.

Avoid large components with multiple unrelated responsibilities.

---

## 9. Component APIs

Use TypeScript to make component contracts explicit.

Prefer:

- typed props;
- explicit variants;
- predictable defaults;
- composition over excessive configuration;
- semantic prop names.

Avoid APIs based primarily on visual implementation details.

Prefer:

```tsx
<Button variant="primary" />
```

over:

```tsx
<Button blue rounded shadowLarge />
```

when `primary` represents the governed component responsibility.

---

## 10. States

Components should explicitly support the states relevant to their responsibility.

Common states may include:

- default;
- hover;
- focus;
- active;
- pressed;
- selected;
- disabled;
- loading;
- error;
- success.

Not every component requires every state.

State behavior must not be inferred directly from token intensity.

Token semantics are defined in `DESIGN_GOVERNANCE.md`.

---

## 11. Accessibility

Implementation must preserve accessible component behavior.

Where relevant, components should support:

- semantic HTML;
- keyboard interaction;
- visible focus;
- accessible names;
- labels and descriptions;
- ARIA relationships where necessary;
- non-color state communication;
- appropriate contrast.

When using shadcn/ui or another accessible primitive, preserve useful accessibility behavior during customization.

---

## 12. Responsive Behavior

Components and interfaces must support responsive behavior, including mobile.

The methodology does not require a universal mobile-first implementation strategy.

Responsive implementation should:

- preserve usability across relevant viewport sizes;
- avoid unnecessary breakpoint proliferation;
- use shared responsive patterns where appropriate;
- prevent local overrides from becoming an unmanaged parallel system.

Responsive behavior should be validated at relevant viewport sizes.

---

## 13. Project Structure

Use a predictable structure that separates reusable Design System code from product-level composition.

A typical structure may be:

```text
src/
├── components/
│   ├── ui/
│   └── patterns/
├── tokens/
├── styles/
├── lib/
├── hooks/
└── app/
```

Exact folders may vary by project.

The important distinction is responsibility:

```text
tokens
→ Design System data integration

components/ui
→ reusable component primitives

components/patterns
→ reusable compositions

styles
→ global styling infrastructure

lib
→ shared technical utilities

hooks
→ reusable React behavior

app
→ product/interface composition
```

Do not reorganize an existing repository solely to match this example.

Structure should evolve only when the change improves architectural clarity.

---

## 14. Naming

Code naming should communicate responsibility.

Use:

- `PascalCase` for React components;
- `camelCase` for variables and functions;
- established project conventions for files and folders;
- semantic names for variants and component APIs.

Avoid names based on temporary status such as:

```text
NewButton
FinalCard
ButtonV2
TestInput
```

unless explicitly temporary during controlled migration.

Token naming belongs to `DESIGN_GOVERNANCE.md`.

---

# Migration

## 15. Migration Principle

Migration aligns an existing project with the governed architecture without unnecessarily rebuilding working functionality.

The objective is:

```text
Understand
   ↓
Map
   ↓
Migrate
   ↓
Validate
```

Do not rewrite the entire project by default.

---

## 16. Audit Before Migration

Before structural migration, inspect the existing implementation.

Audit:

- repository structure;
- dependencies;
- Design Token usage;
- hardcoded governed properties;
- Tailwind configuration;
- themes;
- components;
- component duplication;
- states;
- accessibility;
- responsive behavior;
- legacy structures;
- potentially unused code.

Do not modify code during the initial audit unless explicitly requested.

---

## 17. Audit Classification

Classify findings as:

### KEEP

Already aligned or intentionally retained.

### MIGRATE

Valid structure that needs alignment with the new architecture.

### REFACTOR

Working implementation that requires structural improvement.

### REVIEW

Intent or impact is unclear and requires a decision.

### POTENTIALLY REMOVE

Appears unnecessary but requires validation before deletion.

Classification does not authorize destructive action.

---

## 18. Migration Mapping

Before implementation, establish how existing structures map to the target architecture.

Example:

```text
Existing Token Values
        ↓
Canonical Token Mapping

Existing Components
        ↓
Reuse / Compose / Extend / Create

Existing Styles
        ↓
Semantic Tailwind Integration

Existing Screens
        ↓
Migrated Components
```

The migration plan should identify dependencies before changing shared foundations.

---

## 19. Migration Order

Prefer migrating from foundations toward consumers.

Recommended order:

```text
1. Audit
2. Git baseline
3. Canonical token integration
4. Global styling foundations
5. Shared component primitives
6. Shared patterns
7. Interface consumers
8. Legacy cleanup
9. Final validation
```

The exact order may change when project dependencies require it.

---

## 20. Git Strategy

Git is the primary rollback mechanism.

Before material migration:

1. confirm a stable baseline;
2. create a dedicated migration branch;
3. migrate incrementally;
4. validate each coherent change;
5. commit small reversible units.

Avoid duplicating the complete project into another folder as the default safety strategy.

---

## 21. Incremental Migration

Prefer:

```text
Change
  ↓
Validate
  ↓
Commit
  ↓
Continue
```

over:

```text
Rewrite Everything
      ↓
Validate at the End
```

Small coherent changes improve:

- traceability;
- review;
- rollback;
- debugging;
- AI context efficiency.

---

## 22. Temporary Coexistence

Legacy and migrated structures may temporarily coexist when required for safe migration.

Example:

```text
Legacy Component
       +
Migrated Component
```

Temporary duplication is acceptable only when it:

- supports incremental migration;
- has a defined purpose;
- has an exit path.

Do not duplicate the entire architecture unnecessarily.

---

## 23. Existing Component Migration

For each existing component:

1. understand current responsibility;
2. identify consumers;
3. inspect token and style usage;
4. compare with Governance;
5. classify the component;
6. migrate incrementally;
7. validate states;
8. validate accessibility;
9. validate responsive behavior;
10. migrate consumers where required.

Modifying existing components is expected when their responsibility remains valid.

---

## 24. Hardcoded Value Migration

When governed properties are currently hardcoded:

```text
Hardcoded Value
      ↓
Identify Semantic Meaning
      ↓
Find Existing Governed Token
      │
      ├── Exists → Replace
      │
      └── Missing → PROPOSE
```

Do not create a new token merely because a hardcoded value exists.

First determine its semantic responsibility.

---

## 25. Legacy Removal

Do not delete legacy structures immediately after replacement.

Before removal:

- verify consumers have migrated;
- check imports and references;
- validate runtime behavior;
- confirm compatibility requirements;
- confirm rollback is available through Git.

If usage remains uncertain, keep the structure for review.

---

# Validation

## 26. Validation Layers

Relevant changes should be validated across the layers they affect.

### Code

- TypeScript;
- linting;
- tests where available;
- build integrity.

### Design System

- canonical token usage;
- theme resolution;
- component states;
- visual consistency.

### Accessibility

- keyboard interaction;
- focus;
- semantics;
- accessible naming;
- contrast where applicable.

### Responsive

- relevant desktop widths;
- tablet where applicable;
- mobile.

### Regression

- existing consumers;
- shared components;
- affected interfaces.

---

## 27. Local Validation

Validate locally before considering implementation complete.

A successful build alone does not prove Design System correctness.

Likewise, deployment is not a substitute for component and interface validation.

---

## 28. Integration Flow

Where GitHub and preview deployment are available, prefer:

```text
Local Implementation
        ↓
Local Validation
        ↓
Git Commit
        ↓
Branch / Pull Request
        ↓
Preview
        ↓
Review
        ↓
Merge
        ↓
Production
```

Preview environments support review.

They do not replace local validation.

---

## 29. Migration Completion

A migrated area is complete when:

- its responsibility is understood;
- canonical tokens are correctly consumed;
- governed hardcoding has been removed;
- relevant components follow the target architecture;
- required states work;
- accessibility is preserved;
- responsive behavior is preserved;
- consumers are validated;
- obsolete structures can be safely removed;
- changes are committed and reversible.

---

## 30. Final Rules

1. React and TypeScript provide the component foundation.
2. Tailwind CSS provides styling infrastructure.
3. shadcn/ui provides component infrastructure.
4. Infrastructure does not define Design System semantics.
5. Consume canonical Design Token data rather than duplicating it.
6. Do not hardcode Design System-governed properties.
7. Reuse, compose, or extend before creating components.
8. Component APIs should communicate semantic responsibility.
9. Preserve accessibility during customization.
10. Support responsive behavior, including mobile.
11. Do not reorganize a repository merely to match an example structure.
12. Audit before structural migration.
13. Classify before changing.
14. Migrate foundations before dependent consumers when practical.
15. Git is the primary rollback mechanism.
16. Prefer incremental migration over big-bang rewrites.
17. Temporary duplication requires a migration purpose and exit path.
18. Do not remove legacy structures until consumers are understood.
19. Hardcoded values must be mapped by semantic meaning, not visual similarity.
20. Validate locally before integration.
21. Deployment does not prove Design System correctness.
22. Keep migration changes traceable and reversible.