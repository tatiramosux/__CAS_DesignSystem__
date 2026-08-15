"use client";

import { useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Card, type CASCardVariant, type CASCardOrientation, type CASCardState } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

const variants: CASCardVariant[] = ["media-title", "title-only", "title-pills", "title-input"];
const orientations: CASCardOrientation[] = ["vertical", "horizontal"];
const states: CASCardState[] = ["default", "hover", "select"];
const MEDIA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#B0E4FF'/><stop offset='1' stop-color='#D0DDFF'/></linearGradient></defs>" +
      "<rect width='200' height='100' fill='url(#g)'/></svg>"
  );
const PILLS = [{ label: "Sedan", icon: faLocationDot }, { label: "SUV" }, { label: "Hatch" }, { label: "Pickup", selected: true }];

export default function CardPage() {
  const [variant, setVariant] = useState<CASCardVariant>("media-title");
  const [orientation, setOrientation] = useState<CASCardOrientation>("vertical");
  const [state, setState] = useState<CASCardState>("default");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · CARD" title="Card" description="A flexible container for grouping related content — title, media, pills, or an input — in eight layout combinations across three interaction states." />
      <div style={{ marginBottom: 24 }}>
        <Badge size="small" color="warning">Partially implemented</Badge>
      </div>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: variant === "media-title" && orientation === "horizontal" ? 320 : 260 }}>
              <Card
                variant={variant}
                orientation={orientation}
                state={state}
                title="Card title"
                description={variant !== "title-pills" && variant !== "title-input" ? "Supporting description text for this card." : undefined}
                imageSrc={MEDIA}
                pills={PILLS}
              />
            </div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Variant" size="compact" value={variant} onChange={v => setVariant(v as CASCardVariant)} options={variants.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Orientation" size="compact" value={orientation} onChange={v => setOrientation(v as CASCardOrientation)} options={orientations.map(x => ({ value: x, label: x }))} disabled={variant !== "media-title"} />
          <Dropdown label="State" size="compact" value={state} onChange={v => setState(v as CASCardState)} options={states.map(x => ({ value: x, label: x }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">TYPES</p>
        <h2>Four content layouts</h2>
        <div className="state-demo-grid">
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card variant="media-title" title="Media + title" description="Image on top, content below." imageSrc={MEDIA} /></div><span className="tag tag-neutral">media-title</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card variant="title-only" title="Title only" description="No media, just content." /></div><span className="tag tag-neutral">title-only</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card variant="title-pills" title="Vehicle type" pills={PILLS} /></div><span className="tag tag-neutral">title-pills</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Card variant="title-input" title="Notes" /></div><span className="tag tag-neutral">title-input</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Default, hover, and select</h2>
        <div className="state-demo-grid">
          {states.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><Card variant="title-only" state={x} title="Card title" description="Supporting description text." /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Default border", "color/text/muted · 8% opacity"], ["Hover border", "color/action/secondary/base · 24% opacity"], ["Select border & fill", "color/action/secondary/base, /lighter"], ["Title", "Nunito Sans · 16 px · Black 900"], ["Corner radius", "radius/16 · 16 px"], ["Elevation", "shadow-md · two-layer drop shadow"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT CONTRACT</p>
        <div className="component-template contract">
          {[
            "Variant · Media + title, Title only, Title + pills, Title + input",
            "Orientation · Vertical or Horizontal (Media + title only)",
            "State · Default, Hover, Select",
            "Pills · Reuses the Pill primitive, not Badge — different shape and color pairing",
          ].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}
        </div>
        <p className="wide-copy" style={{ marginTop: 16 }}>The header checkbox and footer action buttons shown in the Figma source aren&apos;t implemented yet — this design system doesn&apos;t have standalone Checkbox or Button-in-Card primitives to compose them from. Flagged as follow-up work.</p>
      </section>
    </>
  );
}
