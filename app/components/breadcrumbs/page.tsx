"use client";

import { useState } from "react";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumbs, type CASBreadcrumbDivider } from "@/components/ui/breadcrumbs";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const dividers: CASBreadcrumbDivider[] = ["arrow", "slash"];
const trail = [{ label: "Home", href: "#", icon: faHouse }, { label: "Imersões", href: "#" }, { label: "DS Mastery" }];

export default function BreadcrumbsPage() {
  const [divider, setDivider] = useState<CASBreadcrumbDivider>("arrow");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · BREADCRUMBS" title="Breadcrumbs" />
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">Breadcrumbs are a sequence of navigational links that show the user&apos;s current location within a hierarchy and provide a path back to previous levels.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">Shows the user&apos;s current location within a hierarchy and displays three states: Default, Hover, and Selected.</p>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase"><Breadcrumbs items={trail} divider={divider} /></div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Divider" size="compact" value={divider} onChange={v => setDivider(v as CASBreadcrumbDivider)} options={dividers.map(x => ({ value: x, label: x }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">TYPES</p>
        <h2>Two divider styles</h2>
        <p className="wide-copy">Our breadcrumb component includes two divider styles: Arrow and Slash.</p>
        <div className="state-demo-grid">
          {dividers.map(x => (
            <article className="state-demo-card" key={x}>
              <Breadcrumbs items={trail} divider={x} />
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Default, hover, and selected</h2>
        <p className="wide-copy">Default crumbs are subtle and clickable. Hover becomes extrabold and underlined. The final, current-page crumb is always rendered strong and non-underlined — it isn&apos;t a navigable link.</p>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Default", "color/text/subtle"], ["Hover", "color/text/default · ExtraBold, underlined"], ["Selected", "color/text/strong · ExtraBold"], ["Divider", "color/text/muted"], ["Label", "Nunito Sans · 14 px"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {["Items · Ordered list of label, optional href, optional icon", "Divider · Arrow or Slash", "Last item · Always rendered as the current, non-interactive page"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
      </section>
    </>
  );
}
