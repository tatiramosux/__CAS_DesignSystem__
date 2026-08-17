"use client";

import { useState } from "react";
import { Stepper, StepperElement, type CASStepperVariant, type CASStepperPosition, type StepperStep } from "@/components/ui/stepper";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const variants: CASStepperVariant[] = ["number", "dot"];
const statuses: StepperStep["status"][] = ["done", "active", "inactive"];
const positions: CASStepperPosition[] = ["left", "left-right", "right", "end"];
const FLOW: StepperStep[] = [
  { label: "Vehicle", status: "done" },
  { label: "Ownership", status: "active" },
  { label: "Condition", status: "inactive" },
  { label: "Get An Offer", status: "inactive" },
];

export default function StepperPage() {
  const [variant, setVariant] = useState<CASStepperVariant>("number");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · STEPPER" title="Stepper" />
      <div>
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">A stepper is a control that allows users to increase or decrease a numeric value within a defined range.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">A horizontal progress track for a multi-step flow, showing which steps are done, which is active, and which are still ahead.</p>
      </div>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: 520 }}><Stepper steps={FLOW} variant={variant} /></div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Variant" size="compact" value={variant} onChange={v => setVariant(v as CASStepperVariant)} options={variants.map(x => ({ value: x, label: x }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">TYPES</p>
        <h2>Number or dot</h2>
        <p className="wide-copy">The number variant labels each circle with its step index; the dot variant is the same anatomy with the number omitted.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {variants.map(x => (
            <article className="state-demo-card" key={x}>
              <div style={{ width: "100%" }}><Stepper steps={FLOW} variant={x} /></div>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">ELEMENT</p>
        <h2>Left, left-right, right, and End</h2>
        <p className="wide-copy">Each circle is its own building block with its own line segment(s) — Left has a line only after it, left-right has a line on both sides, right has a line only before it, and End stands alone with no line and no label.</p>
        <div className="state-demo-grid">
          {positions.map(position => (
            <article className="state-demo-card" key={position}>
              <StepperElement status="done" position={position} variant={variant} number={1} label={position === "end" ? undefined : "Vehicle"} />
              <span className="tag tag-neutral">{position}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Done, active, and inactive</h2>
        <p className="wide-copy">A step&apos;s status colors both its circle and its own line segment — cyan once done, dark gray while active, and light gray while inactive. Active is the only status with a filled center dot in the Dot variant.</p>
        {variants.map(v => (
          <div key={v} style={{ marginBottom: 24 }}>
            <p className="wide-copy" style={{ fontWeight: 700, marginBottom: 8 }}>{v}</p>
            <div className="state-demo-grid">
              {statuses.map(status => (
                <article className="state-demo-card" key={status}>
                  <StepperElement status={status} position="left-right" variant={v} number={1} label="Vehicle" />
                  <span className="tag tag-neutral">{status}</span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Done circle", "color/action/secondary/base fill · #001939 number"], ["Active circle", "color/action/secondary/base border · canvas fill"], ["Inactive circle", "color/stroke/muted border"], ["Done line", "color/action/secondary/base"], ["Active line", "color/stroke/default"], ["Inactive line", "color/stroke/muted"], ["Label", "Nunito Sans · 14 px · Bold 700"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {["Steps · Ordered list of label + status", "Status · Done, Active, or Inactive", "Variant · Number or Dot"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
        <p className="wide-copy" style={{ marginTop: 16 }}>The Figma source also documents per-step hover states distinguishing reachable vs. unreachable inactive steps — simplified here to a single Inactive status. Flagged as follow-up work if that distinction needs to be interactive.</p>
      </section>
    </>
  );
}
