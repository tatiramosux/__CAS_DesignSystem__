"use client";

import { useState } from "react";
import { Label, HintText, type CASLabelType, type CASHintTextType } from "@/components/ui/label";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const labelTypes: CASLabelType[] = ["default", "error", "disabled"];
const hintTypes: CASHintTextType[] = ["default", "error"];

export default function LabelPage() {
  const [labelType, setLabelType] = useState<CASLabelType>("default");
  const [optional, setOptional] = useState(true);
  const [required, setRequired] = useState(true);
  const [labelInfo, setLabelInfo] = useState(true);
  const [hintType, setHintType] = useState<CASHintTextType>("default");
  const [hintInfo, setHintInfo] = useState(true);

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · LABEL" title="Label" />
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">A label is a short piece of text that identifies or describes an interface element, typically providing context for an associated control or input.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">The field label and its companion hint text — the title above a field and the informational line below it, reused across Text Input, Dropdown, and any other labeled structure.</p>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <Label type={labelType} optional={optional} required={required} information={labelInfo}>Label</Label>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Type" size="compact" value={labelType} onChange={v => setLabelType(v as CASLabelType)} options={labelTypes.map(x => ({ value: x, label: x }))} />
          <label className="check-field"><input type="checkbox" checked={optional} onChange={e => setOptional(e.target.checked)} /> Optional</label>
          <label className="check-field"><input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} /> Required</label>
          <label className="check-field"><input type="checkbox" checked={labelInfo} onChange={e => setLabelInfo(e.target.checked)} /> Information icon</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Default, error, and disabled</h2>
        <p className="wide-copy">The label text, optional hint, and required asterisk each recolor together — error turns everything red, disabled mutes it, and the info icon follows the same logic.</p>
        <div className="state-demo-grid">
          {labelTypes.map(x => (
            <article className="state-demo-card" key={x}>
              <Label type={x} optional required information>Label</Label>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <HintText type={hintType} information={hintInfo}>Hint Text</HintText>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Type" size="compact" value={hintType} onChange={v => setHintType(v as CASHintTextType)} options={hintTypes.map(x => ({ value: x, label: x }))} />
          <label className="check-field"><input type="checkbox" checked={hintInfo} onChange={e => setHintInfo(e.target.checked)} /> Information icon</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">HINT TEXT</p>
        <h2>Default and error</h2>
        <p className="wide-copy">Hint text sits below a field or any other structure to communicate supporting information — instructions, formatting rules, or a validation message.</p>
        <div className="state-demo-grid">
          {hintTypes.map(x => (
            <article className="state-demo-card" key={x}>
              <HintText type={x} information>Hint Text</HintText>
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Label default", "color/text/strong · Nunito Sans 16 px"], ["Label optional", "color/text/subtle"], ["Label error / required", "color/feedback/error/base"], ["Label disabled", "color/text/subtle"], ["Hint text default", "color/text/subtle · Nunito Sans 14 px"], ["Hint text error", "color/feedback/error/base"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {[
            "Label · Editable text",
            "Optional · Appends \"(optional)\" in a muted tone",
            "Required · Appends a red asterisk",
            "Information icon · Optional, recolors with the type",
            "Type (Label) · Default, Error, Disabled",
            "Type (Hint Text) · Default, Error",
          ].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}
        </div>
      </section>
    </>
  );
}
