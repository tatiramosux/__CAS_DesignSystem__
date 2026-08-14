"use client";

import { useState } from "react";
import { TextInput, type CASTextInputSize, type CASTextInputState } from "@/components/ui/text-input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

const sizes: CASTextInputSize[] = ["medium", "large"];
const states: CASTextInputState[] = ["default", "hover", "focus", "filled", "error", "disabled"];

export default function TextInputPage() {
  const [size, setSize] = useState<CASTextInputSize>("medium");
  const [state, setState] = useState<CASTextInputState>("default");
  const [leadingIcon, setLeadingIcon] = useState(true);
  const [trailingIcon, setTrailingIcon] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [required, setRequired] = useState(true);
  const hintText = state === "error" ? "This field is required" : "We'll never share this with anyone else";

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · TEXT INPUT" title="Text Input" description="The input field is a key part of forms and user interactions. It lets users enter text, numbers, or make selections, making it an essential tool for gathering information." />
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Interactive preview</span><span>CarBrain · current theme</span></div>
          <div className="button-showcase"><TextInput size={size} state={state} required={required} leadingIcon={leadingIcon} trailingIcon={trailingIcon} showInfo={showInfo} hintText={showHint ? hintText : undefined} /></div>
        </div>
        <aside className="button-controls">
          <label>Size<select value={size} onChange={e => setSize(e.target.value as CASTextInputSize)}>{sizes.map(x => <option key={x}>{x}</option>)}</select></label>
          <label>State<select value={state} onChange={e => setState(e.target.value as CASTextInputState)}>{states.map(x => <option key={x}>{x}</option>)}</select></label>
          <label className="check-field"><input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} /> Required asterisk</label>
          <label className="check-field"><input type="checkbox" checked={leadingIcon} onChange={e => setLeadingIcon(e.target.checked)} /> Leading icon</label>
          <label className="check-field"><input type="checkbox" checked={trailingIcon} onChange={e => setTrailingIcon(e.target.checked)} /> Trailing icon</label>
          <label className="check-field"><input type="checkbox" checked={showInfo} onChange={e => setShowInfo(e.target.checked)} /> Info icon</label>
          <label className="check-field"><input type="checkbox" checked={showHint} onChange={e => setShowHint(e.target.checked)} /> Hint text</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">SIX SUPPORTED STATES</p><h2>Default, Hover, Focus, Filled, Error, and Disabled</h2>
        <p className="wide-copy">Every state keeps the same anatomy — label, optional icons, value — and communicates purely through border, background tint, and text color. Leading icon, trailing icon, the info glyph, and the hint line are independent, opt-in slots — a field can carry any combination of them, including none.</p>
        <div className="state-demo-grid">{states.map(x => <article className="state-demo-card" key={x}><TextInput size="medium" state={x} label="Input" leadingIcon trailingIcon /><Badge size="small" color="neutral">{x}</Badge></article>)}</div>
      </section>
      <section className="section-block">
        <p className="section-index">ICON SLOTS</p><h2>Leading and trailing icons are independent</h2>
        <p className="wide-copy">Each icon slot is a boolean show/hide — matching the Figma instance-swap property. A field with no icons at all is just as valid as one with both.</p>
        <div className="state-demo-grid">
          {[["Both icons", true, true], ["Leading only", true, false], ["Trailing only", false, true], ["No icons", false, false]].map(([label, lead, trail]) => (
            <article className="state-demo-card" key={label as string}><TextInput size="medium" state="default" label="Input" leadingIcon={lead as boolean} trailingIcon={trail as boolean} /><Badge size="small" color="neutral">{label as string}</Badge></article>
          ))}
        </div>
      </section>
      <section className="section-block"><p className="section-index">SIZE</p><h2>Two fixed heights</h2><div className="button-size-specs">{sizes.map(x => <article key={x}><TextInput size={x} state="default" leadingIcon trailingIcon /><strong>{x}</strong><span>{x === "large" ? "56 px · 16 px padding" : "48 px · 12 px padding"}</span></article>)}</div></section>
      <section className="section-block"><p className="section-index">TOKENS & TYPOGRAPHY</p><h2>Implementation bindings</h2><div className="button-token-grid">{[["Default border", "color/stroke/muted"], ["Hover border", "color/action/secondary/light"], ["Focus border", "color/action/secondary/base"], ["Error border & text", "color/feedback/error/base"], ["Disabled label", "color/text/subtle"], ["Disabled value", "color/text/disable"], ["Label", "Nunito Sans · 14 px · Bold 700"], ["Hint text", "Nunito Sans · 12 px · Regular 400"], ["Corner radius", "radius/12 · 12 px"]].map(([label, value]) => <article key={label}><strong>{label}</strong><code>{value}</code></article>)}</div></section>
      <section className="section-block"><p className="section-index">COMPONENT CONTRACT</p><div className="component-template contract">{["Label · Editable text", "Required · Boolean, renders a red asterisk", "Size · Medium (48), Large (56)", "State · Default, Hover, Focus, Filled, Error, Disabled", "Leading icon · Boolean + instance swap, independent of trailing", "Trailing icon · Boolean + instance swap, independent of leading", "Info icon · Boolean, sits beside the label", "Hint text · Optional line below the field, switches to error color in the Error state"].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}</div></section>
    </>
  );
}
