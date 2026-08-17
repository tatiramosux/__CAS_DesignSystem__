"use client";

import { useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Card, type CASCardImagePosition, type CASCardContent, type CASCardState } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const images: CASCardImagePosition[] = ["top", "bottom", "left", "none"];
const contents: CASCardContent[] = ["description", "pills", "input"];
const states: CASCardState[] = ["default", "hover", "select"];
const PILLS = [{ label: "Sedan", icon: faLocationDot }, { label: "SUV" }, { label: "Hatch" }, { label: "Pickup" }];

export default function CardPage() {
  const [image, setImage] = useState<CASCardImagePosition>("top");
  const [content, setContent] = useState<CASCardContent>("description");
  const [state, setState] = useState<CASCardState>("default");
  const [chevron, setChevron] = useState(false);
  const [footerSlots, setFooterSlots] = useState<0 | 1 | 2>(0);

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · CARD" title="Card" />
      <div>
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">A card is a container that groups related content and actions into a single, identifiable unit.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">A flexible container composed from a checkbox, title, and content area — description, pills, or an input — with an optional image and footer slots for arbitrary actions.</p>
      </div>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: image === "left" ? 320 : 260 }}>
              <Card
                image={image}
                content={content}
                state={state}
                chevron={chevron}
                footerSlots={footerSlots}
                title="Fast Lane"
                description="Save time, Enter your VIN number. Get you offer in fewer steps."
                pills={PILLS}
              />
            </div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Image" size="compact" value={image} onChange={v => setImage(v as CASCardImagePosition)} options={images.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Content" size="compact" value={content} onChange={v => setContent(v as CASCardContent)} options={contents.map(x => ({ value: x, label: x }))} />
          <Dropdown label="State" size="compact" value={state} onChange={v => setState(v as CASCardState)} options={states.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Footer slots" size="compact" value={String(footerSlots)} onChange={v => setFooterSlots(Number(v) as 0 | 1 | 2)} options={[0, 1, 2].map(x => ({ value: String(x), label: String(x) }))} />
          <label className="check-field"><input type="checkbox" checked={chevron} onChange={e => setChevron(e.target.checked)} /> Chevron</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">CONTENT TYPES</p>
        <h2>Description, pills, or input</h2>
        <p className="wide-copy">The content area under the title switches between a supporting description, a wrapped row of Pills, or a read-only text area with a character counter.</p>
        <div className="state-demo-grid">
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card image="top" content="description" title="Fast Lane" description="Save time, Enter your VIN number." /></div><span className="tag tag-neutral">description</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card content="pills" chevron title="Seats have rips or stains?" pills={PILLS} /></div><span className="tag tag-neutral">pills</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card content="input" chevron title="Seats have rips or stains?" /></div><span className="tag tag-neutral">input</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">IMAGE</p>
        <h2>Top, bottom, left, or none</h2>
        <p className="wide-copy">Image position is independent of content — Left switches the card to a horizontal layout.</p>
        <div className="state-demo-grid">
          {images.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: x === "left" ? 320 : "100%" }}><Card image={x} title="Fast Lane" description="Save time, Enter your VIN number." /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">FOOTER</p>
        <h2>Optional slot placeholders</h2>
        <p className="wide-copy">The footer holds one or two generic &quot;Slot&quot; placeholders, meant to be swapped for real actions (buttons, links) per use case. This is how Slot behaves: it&apos;s an optional placeholder component — replace it with any component, or hide it if not needed.</p>
        <div className="state-demo-grid">
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card title="Fast Lane" description="Save time, Enter your VIN number." footerSlots={1} /></div><span className="tag tag-neutral">1 slot</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card title="Fast Lane" description="Save time, Enter your VIN number." footerSlots={2} /></div><span className="tag tag-neutral">2 slots</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Default, hover, and select</h2>
        <div className="state-demo-grid">
          {states.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><Card state={x} title="Fast Lane" description="Save time, Enter your VIN number." /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Default border", "color/text/muted · 8% opacity"], ["Hover border", "color/action/secondary/base · 24% opacity"], ["Select border & fill", "color/action/secondary/base, /lighter"], ["Title", "Nunito Sans · 18 px Bold (description) · 16 px Black (pills/input)"], ["Corner radius", "radius/16 · 16 px"], ["Elevation", "shadow-md · two-layer drop shadow"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {[
            "Image · Top, Bottom, Left, or None",
            "Content · Description, Pills, or Input",
            "State · Default, Hover, Select",
            "Footer · 0, 1, or 2 generic Slot placeholders",
            "Checkbox and chevron are optional, presentational affordances in the header row",
          ].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}
        </div>
      </section>
    </>
  );
}
