"use client";

import { useState } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { AccordionItem, type CASAccordionStyle, type CASAccordionSize } from "@/components/ui/accordion";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const styles: CASAccordionStyle[] = ["outline", "rounded"];
const sizes: CASAccordionSize[] = ["sm", "md", "lg"];
const SUBTEXT = "Additional context appears here once the item expands, describing what the section contains.";

export default function AccordionPage() {
  const [accordionStyle, setAccordionStyle] = useState<CASAccordionStyle>("outline");
  const [size, setSize] = useState<CASAccordionSize>("md");
  const [hasIcon, setHasIcon] = useState(true);
  const [openDemo, setOpenDemo] = useState(false);

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · ACCORDION" title="Accordion" />
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">An accordion is a set of expandable sections that organizes related content, allowing users to reveal or hide information as needed.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">A collapsible header that reveals supporting text on demand. The accordion has three states: Default, Hover, and Expanded.</p>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: 340 }}>
              <AccordionItem title="Accordion title" subtext={SUBTEXT} icon={hasIcon ? faClock : undefined} accordionStyle={accordionStyle} size={size} open={openDemo} onOpenChange={setOpenDemo} />
            </div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Style" size="compact" value={accordionStyle} onChange={v => setAccordionStyle(v as CASAccordionStyle)} options={styles.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Size" size="compact" value={size} onChange={v => setSize(v as CASAccordionSize)} options={sizes.map(x => ({ value: x, label: x }))} />
          <label className="check-field"><input type="checkbox" checked={hasIcon} onChange={e => setHasIcon(e.target.checked)} /> Leading icon</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">TYPES</p>
        <h2>With icon or without</h2>
        <p className="wide-copy">The leading icon slot is optional — the title and chevron stay aligned the same way whether or not it&apos;s present.</p>
        <div className="state-demo-grid">
          <article className="state-demo-card"><div style={{ width: "100%" }}><AccordionItem title="Accordion title" subtext={SUBTEXT} icon={faClock} /></div><span className="tag tag-neutral">with icon</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><AccordionItem title="Accordion title" subtext={SUBTEXT} /></div><span className="tag tag-neutral">without icon</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STYLES</p>
        <h2>Two distinct treatments</h2>
        <p className="wide-copy">Choose from two distinct accordion styles: Outline (bottom border only, square corners) and Rounded (full border, 6 px radius).</p>
        <div className="state-demo-grid">
          {styles.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><AccordionItem title="Accordion title" subtext={SUBTEXT} icon={faClock} accordionStyle={x} /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">SIZE</p>
        <h2>Three sizes</h2>
        <p className="wide-copy">Size scales the title, subtext, and both icons together — Small (16 px title), Medium (18 px title), and Large (20 px title).</p>
        <div className="state-demo-grid">
          {sizes.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><AccordionItem title="Accordion title" subtext={SUBTEXT} icon={faClock} size={x} open /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Default and expanded</h2>
        <p className="wide-copy">The accordion has three states: Default, Hover, and Expanded. Expanding swaps the trailing plus icon for a minus and reveals the subtext line.</p>
        <div className="state-demo-grid">
          <article className="state-demo-card"><div style={{ width: "100%" }}><AccordionItem title="Accordion title" icon={faClock} open={false} onOpenChange={() => {}} /></div><span className="tag tag-neutral">default</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><AccordionItem title="Accordion title" subtext={SUBTEXT} icon={faClock} open onOpenChange={() => {}} /></div><span className="tag tag-neutral">expanded</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Border", "color/action/secondary/base · 16% opacity"], ["Hover / expanded fill", "color/action/secondary/base · 8% opacity"], ["Leading & plus/minus icon", "color/action/secondary/base"], ["Title (sm/md/lg)", "Nunito Sans · 16/18/20 px · Black 900"], ["Subtext (sm/md/lg)", "Nunito Sans · 14/16/18 px · Regular"], ["Icon (sm/md/lg)", "16/20/24 px"], ["Corner radius (Rounded)", "radius/6 · 6 px"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {["Title · Editable text", "Subtext · Optional, shown only while expanded", "Leading icon · Optional instance swap", "Style · Outline or Rounded", "Size · Small, Medium, or Large", "State · Default, Hover, Expanded"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
      </section>
    </>
  );
}
