"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { PageHeader } from "@/components/page-header";
import { CopyButton } from "@/components/copy-button";

const byName = new Map<string, IconDefinition>();
for (const value of Object.values(solidIcons)) {
  if (typeof value === "object" && value !== null && "iconName" in value && "icon" in value) {
    const icon = value as IconDefinition;
    // Skip single-character glyphs (digits 0-9, letters a-z) — not real pictographic icons.
    if (icon.iconName.length === 1) continue;
    if (!byName.has(icon.iconName)) byName.set(icon.iconName, icon);
  }
}
const allIcons: IconDefinition[] = [...byName.values()].sort((a, b) => a.iconName.localeCompare(b.iconName));

export default function VisualAssetsIcons() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return allIcons;
    return allIcons.filter(icon => icon.iconName.includes(trimmed));
  }, [query]);
  const isSearching = query.trim().length > 0;

  return (
    <>
      <PageHeader eyebrow="VISUAL ASSETS · ICONS" title="Icons" description="The FontAwesome Solid icon set used across CAS components, mirrored from the Figma icon library. Search by name to find the identifier used in code." />
      <div className="status-note">
        <span>Icon library</span>
        <strong>{allIcons.length} icons · FontAwesome Solid</strong>
        <small>Import from @fortawesome/free-solid-svg-icons</small>
      </div>
      <section className="section-block">
        <p className="section-index">SEARCH</p>
        <h2>Find an icon by name</h2>
        <input
          className="icon-search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search icons, e.g. arrow, user, lock…"
          aria-label="Search icons"
        />
        <p className="wide-copy">
          {isSearching
            ? `${visible.length} match${visible.length === 1 ? "" : "es"}`
            : `All ${allIcons.length} icons`}
        </p>
        <div className="icon-grid">
          {visible.map(icon => (
            <article className="icon-card" key={icon.iconName}>
              <FontAwesomeIcon icon={icon} />
              <code>{icon.iconName}</code>
              <CopyButton value={icon.iconName} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
