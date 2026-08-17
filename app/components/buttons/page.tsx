"use client";

import { useState } from "react";
import { Button, type CASButtonSize, type CASButtonState, type CASButtonTreatment, type CASButtonType } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const types: CASButtonType[] = ["primary", "secondary", "tertiary", "danger", "neutral"];
const sizes: CASButtonSize[] = ["large", "medium", "small"];
const states: CASButtonState[] = ["default", "hover", "focus", "loading", "disabled"];
const groups: { type: CASButtonType; treatment: CASButtonTreatment; label: string }[] = [
  { type: "primary", treatment: "solid", label: "Primary · Solid" },
  { type: "secondary", treatment: "solid", label: "Secondary · Solid" },
  { type: "tertiary", treatment: "solid", label: "Tertiary · Solid" },
  { type: "danger", treatment: "solid", label: "Danger · Solid" },
  { type: "secondary", treatment: "outline", label: "Secondary · Outline" },
  { type: "neutral", treatment: "outline", label: "Neutral · Outline" },
];

export default function Buttons() {
  const [buttonType, setButtonType] = useState<CASButtonType>("primary");
  const [buttonSize, setButtonSize] = useState<CASButtonSize>("medium");
  const [buttonState, setButtonState] = useState<CASButtonState>("default");
  const [buttonTreatment, setButtonTreatment] = useState<CASButtonTreatment>("solid");
  const [leadingIcon, setLeadingIcon] = useState(true);
  const [trailingIcon, setTrailingIcon] = useState(true);
  const treatmentLocked = buttonType !== "secondary";
  const activeTreatment = buttonType === "neutral" ? "outline" : buttonType === "secondary" ? buttonTreatment : "solid";

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · BUTTON" title="Button" />
      <div>
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">A button is an interactive control that allows users to trigger an action or initiate a process.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">Actions from the CAS Figma component set, mapped to React with the same type, size, state, treatment, label, and icon properties.</p>
      </div>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase"><Button buttonType={buttonType} size={buttonSize} state={buttonState} treatment={buttonTreatment} leadingIcon={leadingIcon} trailingIcon={trailingIcon}>Button</Button></div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Type" size="compact" value={buttonType} onChange={v => setButtonType(v as CASButtonType)} options={types.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Size" size="compact" value={buttonSize} onChange={v => setButtonSize(v as CASButtonSize)} options={sizes.map(x => ({ value: x, label: x }))} />
          <Dropdown label="State" size="compact" value={buttonState} onChange={v => setButtonState(v as CASButtonState)} options={states.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Treatment" size="compact" value={activeTreatment} disabled={treatmentLocked} onChange={v => setButtonTreatment(v as CASButtonTreatment)} options={[{ value: "solid", label: "solid" }, { value: "outline", label: "outline" }]} />
          <label className="check-field"><input type="checkbox" checked={leadingIcon} onChange={e => setLeadingIcon(e.target.checked)} /> Leading icon</label>
          <label className="check-field"><input type="checkbox" checked={trailingIcon} onChange={e => setTrailingIcon(e.target.checked)} /> Trailing icon</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">90 FIGMA VARIANTS</p><h2>Six supported styles × three sizes × five states</h2>
        <p className="wide-copy">The Figma component does not support every Type × Solid combination. Primary, Tertiary, and Danger are Solid; Neutral is Outline; Secondary supports both treatments.</p>
        <div className="button-matrix">
          <div className="button-matrix__head"><span>Style</span>{states.map(state => <span key={state}>{state}</span>)}</div>
          {groups.map(group => <div className="button-matrix__row" key={group.label}><strong>{group.label}</strong>{states.map(state => <div key={state}><Button buttonType={group.type} size="small" state={state} treatment={group.treatment}>Button</Button></div>)}</div>)}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">ICON SLOTS</p><h2>Leading and trailing icons are independent</h2>
        <p className="wide-copy">Each icon slot is a boolean show/hide — matching the Figma instance-swap property. A button with no icons at all is just as valid as one with both.</p>
        <div className="state-demo-grid">
          {[["Both icons", true, true], ["Leading only", true, false], ["Trailing only", false, true], ["No icons", false, false]].map(([label, lead, trail]) => (
            <article className="state-demo-card" key={label as string}><Button leadingIcon={lead as boolean} trailingIcon={trail as boolean}>Button</Button><Badge size="small" color="neutral">{label as string}</Badge></article>
          ))}
        </div>
      </section>
      <section className="section-block"><p className="section-index">SIZE</p><h2>Three fixed heights</h2><div className="button-size-specs">{sizes.map(size => <article key={size}><Button size={size} leadingIcon trailingIcon>Button</Button><strong>{size}</strong><span>{size === "large" ? "56 px" : size === "medium" ? "48 px" : "40 px"}</span></article>)}</div></section>
      <section className="section-block"><p className="section-index">TOKENS & TYPOGRAPHY</p><h2>Implementation bindings</h2><div className="button-token-grid">{[["Primary", "color/action/primary/{base, dark, lighter}"], ["Secondary", "color/action/secondary/{base, dark, lighter}"], ["Tertiary", "color/action/tertiary/{base, dark, lighter}"], ["Danger", "color/feedback/error/{base, dark, lighter}"], ["Neutral", "color/action/neutral/{base, dark, lighter}"], ["Label", "Nunito Sans · 14 px · Semibold 600"], ["Small label", "Nunito Sans · 12 px · Semibold 600"], ["Corner radius", "radius/12 · 12 px"]].map(([label, value]) => <article key={label}><strong>{label}</strong><code>{value}</code></article>)}</div></section>
      <section className="section-block"><p className="section-index">COMPONENT STRUCTURE</p><div className="component-template contract">{["Type · Primary, Secondary, Tertiary, Danger, Neutral", "Size · Large (56), Medium (48), Small (40)", "State · Default, Hover, Focus, Loading, Disabled", "Treatment · Solid or Outline where supported", "Label · Editable text", "Icon Leading · Boolean + instance swap", "Icon Trailing · Boolean + instance swap"].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}</div></section>
    </>
  );
}
