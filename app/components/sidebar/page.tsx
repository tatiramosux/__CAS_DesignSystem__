"use client";

import { useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { SidebarHeader, SidebarItem, type CASSidebarItemSize, type CASSidebarItemState } from "@/components/ui/sidebar";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const sizes: CASSidebarItemSize[] = ["sm", "md", "lg"];
const states: CASSidebarItemState[] = ["default", "hover", "focused", "active", "disabled"];

export default function SidebarPage() {
  const [size, setSize] = useState<CASSidebarItemSize>("md");
  const [state, setState] = useState<CASSidebarItemState>("default");
  const [leadingIcon, setLeadingIcon] = useState(true);
  const [trailingIcon, setTrailingIcon] = useState(true);

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · SIDEBAR" title="Sidebar" />
      <div>
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">A sidebar is a secondary interface area that provides access to navigation, controls, or contextual information alongside the primary content.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">A collapsible navigation panel built from two parts: a Header (title, collapse control, and description) and a Content list of items — each with its own size, state, and optional sub-items.</p>
      </div>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: 288 }}><SidebarItem text="Item label" size={size} state={state} icon={leadingIcon ? faCircle : undefined} showChevron={trailingIcon} /></div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Size" size="compact" value={size} onChange={v => setSize(v as CASSidebarItemSize)} options={sizes.map(x => ({ value: x, label: x }))} />
          <Dropdown label="State" size="compact" value={state} onChange={v => setState(v as CASSidebarItemState)} options={states.map(x => ({ value: x, label: x }))} />
          <label className="check-field"><input type="checkbox" checked={leadingIcon} onChange={e => setLeadingIcon(e.target.checked)} /> Leading icon</label>
          <label className="check-field"><input type="checkbox" checked={trailingIcon} onChange={e => setTrailingIcon(e.target.checked)} /> Trailing icon</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">STRUCTURE</p>
        <h2>Header and content</h2>
        <p className="wide-copy">The Header carries the section title with a collapse control, and a short description below it. The Content underneath lists the navigable items — Item 2 here shows how sub-items expand underneath a parent when it has children.</p>
        <div className="state-demo-card">
          <div style={{ width: 288, border: "1px solid var(--stroke-subtle)", borderRadius: 6, overflow: "hidden" }}>
            <SidebarHeader title="Section title" description="A short line of supporting context for this section goes here." onCollapse={() => {}} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8 }}>
              <SidebarItem text="Item 1" state="active" showChevron={false} />
              <SidebarItem text="Item 2" defaultExpanded>
                <SidebarItem text="Sub-item A" size="sm" showChevron={false} />
                <SidebarItem text="Sub-item B" size="sm" showChevron={false} />
              </SidebarItem>
              <SidebarItem text="Item 3" showChevron={false} />
            </div>
          </div>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COLLAPSED</p>
        <h2>Icon-only, for a collapsed sidebar</h2>
        <p className="wide-copy">When the whole Sidebar collapses down to icons, each item drops its text and chevron for a square icon-only button.</p>
        <div className="state-demo-grid" style={{ gridTemplateColumns: "repeat(4,max-content)" }}>
          {states.map(x => (
            <article className="state-demo-card" key={x}>
              <SidebarItem text={`Item — ${x}`} icon={faCircle} state={x} collapsed />
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">SIZE</p>
        <h2>Three sizes</h2>
        <p className="wide-copy">Size scales the item&apos;s text and icons together — Small, Medium, and Large.</p>
        <div className="state-demo-grid">
          {sizes.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><SidebarItem text="Item label" icon={faCircle} size={x} /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Default, hover, focused, active, and disabled</h2>
        <p className="wide-copy">Active marks the current item with bold text against the canvas surface; Focused adds a soft ring for keyboard navigation; Disabled mutes the whole row. Hover on Default responds to a real pointer hover — the other states are forced here for illustration.</p>
        <div className="state-demo-grid">
          {states.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><SidebarItem text="Item label" icon={faCircle} state={x} /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Header title", "color/brand/primary/base · Nunito Sans 18 px Black 900"], ["Header description", "color/text/subtle · 12 px"], ["Item text", "color/text/strong · Nunito Sans 14/16/18 px"], ["Hover fill", "color/action/secondary/base · 8% opacity"], ["Focused fill & ring", "color/action/secondary/lighter · color/stroke/muted ring"], ["Active fill", "color/background/canvas · Bold text"], ["Disabled", "50% opacity"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {[
            "Header · Title, optional collapse control, optional description",
            "Item · Text, optional leading icon, optional trailing chevron for sub-items",
            "Size · Small, Medium, or Large",
            "State · Default, Hover, Focused, Active, Disabled",
          ].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}
        </div>
        <p className="wide-copy" style={{ marginTop: 16 }}>The Figma source also shows this panel used over a dark background in a couple of full-page mockups — worth keeping in mind if the Sidebar ever needs an inverse color treatment, though that variant isn&apos;t built here yet.</p>
      </section>
    </>
  );
}
