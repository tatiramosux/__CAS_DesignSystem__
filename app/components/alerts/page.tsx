"use client";

import { useState } from "react";
import { Alert, type CASAlertColor, type CASAlertLayout } from "@/components/ui/alert";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const colors: CASAlertColor[] = ["primary", "secondary", "error", "success", "warning", "information", "neutral"];
const layouts: CASAlertLayout[] = ["vertical", "horizontal"];
const TITLE = "Add your alert title here!";
const DESCRIPTION = "The alert here. It's better if you use two lines of text.";

export default function AlertsPage() {
  const [color, setColor] = useState<CASAlertColor>("primary");
  const [layout, setLayout] = useState<CASAlertLayout>("vertical");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · ALERT" title="Alerts" />
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">An alert is a message that communicates important information, changes, warnings, or feedback that requires the user&apos;s attention.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">Alerts come in seven types — Primary, Secondary, Error, Success, Warning, Information, and Default — and two layouts: Vertical and Horizontal.</p>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: 360 }}>
              <Alert color={color} layout={layout} title={TITLE} description={DESCRIPTION} actionLabel="Action" dismissible />
            </div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Color" size="compact" value={color} onChange={v => setColor(v as CASAlertColor)} options={colors.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Layout" size="compact" value={layout} onChange={v => setLayout(v as CASAlertLayout)} options={layouts.map(x => ({ value: x, label: x }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">COLORS</p>
        <h2>Seven supported colors</h2>
        <p className="wide-copy">Alerts share the same semantic color roles as Badges and Buttons — only the icon, background tint, border, and divider change; title and description stay the same neutral text colors across every variant.</p>
        <div className="state-demo-grid">
          {colors.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><Alert color={x} title={TITLE} description={DESCRIPTION} /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TYPES</p>
        <h2>Two layouts</h2>
        <p className="wide-copy">Choose between two alert layouts: Vertical (icon, then stacked title/description, then action) and Horizontal (icon and title inline, with a divider before the dismiss control).</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <article className="state-demo-card"><Alert layout="vertical" title={TITLE} description={DESCRIPTION} actionLabel="Action" dismissible /><span className="tag tag-neutral">vertical</span></article>
          <article className="state-demo-card"><Alert layout="horizontal" title={TITLE} actionLabel="Action" dismissible /><span className="tag tag-neutral">horizontal</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Primary", "color/action/primary/lighter, /light"], ["Secondary", "color/action/secondary/lighter, /light"], ["Error", "color/feedback/error/lighter, /light"], ["Success", "color/feedback/success/lighter, /light"], ["Warning", "color/feedback/warning/lighter, /light"], ["Information", "color/feedback/info/lighter, /light"], ["Neutral", "color/action/neutral/lighter, /light"], ["Corner radius", "radius/8 · 8 px"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {["Title · Editable text", "Description · Optional, Vertical layout only", "Color · Primary, Secondary, Error, Success, Warning, Information, Neutral", "Layout · Vertical or Horizontal", "Action · Optional inline text button", "Dismissible · Optional close control"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
      </section>
    </>
  );
}
