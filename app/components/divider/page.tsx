"use client";

import { useState } from "react";
import { Divider, type CASDividerOrientation, type CASDividerStyle } from "@/components/ui/divider";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const orientations: CASDividerOrientation[] = ["horizontal", "vertical"];
const styles: CASDividerStyle[] = ["line", "dotted"];

export default function DividerPage() {
  const [orientation, setOrientation] = useState<CASDividerOrientation>("horizontal");
  const [dividerStyle, setDividerStyle] = useState<CASDividerStyle>("line");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · DIVIDER" title="Divider" description="A thin separator line that groups or separates content. Our divider comes in two styles: Line and Dotted." />
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: orientation === "horizontal" ? 260 : 1, height: orientation === "horizontal" ? 1 : 120 }}>
              <Divider orientation={orientation} dividerStyle={dividerStyle} />
            </div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Orientation" size="compact" value={orientation} onChange={v => setOrientation(v as CASDividerOrientation)} options={orientations.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Style" size="compact" value={dividerStyle} onChange={v => setDividerStyle(v as CASDividerStyle)} options={styles.map(x => ({ value: x, label: x }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">STYLES</p>
        <h2>Two visual treatments</h2>
        <p className="wide-copy">Our divider comes in two styles: Line and Dotted. Both share the same subtle stroke color at low contrast, intended to organize content without competing for attention.</p>
        <div className="state-demo-grid">
          {styles.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><Divider dividerStyle={x} /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">ORIENTATION</p>
        <h2>Horizontal and vertical</h2>
        <div className="state-demo-grid">
          <article className="state-demo-card"><div style={{ width: "100%" }}><Divider orientation="horizontal" /></div><span className="tag tag-neutral">horizontal</span></article>
          <article className="state-demo-card" style={{ height: 96 }}><Divider orientation="vertical" /><span className="tag tag-neutral">vertical</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Stroke color", "color/stroke/subtle"], ["Line thickness", "1 px"], ["Dot diameter", "1.5 px"], ["Dot spacing", "6 px"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT CONTRACT</p>
        <div className="component-template contract">
          {["Orientation · Horizontal or Vertical", "Style · Line (solid) or Dotted"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
      </section>
    </>
  );
}
