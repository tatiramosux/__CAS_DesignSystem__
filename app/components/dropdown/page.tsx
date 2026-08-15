"use client";

import { useState } from "react";
import { Dropdown, type CASDropdownSize } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const sizes: CASDropdownSize[] = ["sm", "compact", "medium", "large"];
const positions: ("left" | "right")[] = ["left", "right"];
const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date", disabled: true },
];

export default function DropdownPage() {
  const [size, setSize] = useState<CASDropdownSize>("medium");
  const [position, setPosition] = useState<"left" | "right">("left");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [fruit, setFruit] = useState("apple");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · DROPDOWN" title="Dropdown" description="A custom select control with a labeled trigger, a positioned item panel, and full keyboard support — used everywhere the interface needs to choose one value from a list." />
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: 260 }}>
              <Dropdown label="Fruit" options={fruitOptions} value={fruit} onChange={setFruit} size={size} position={position} disabled={disabled} error={error} hintText="Pick your favorite" />
            </div>
          </div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Size" size="compact" options={sizes.map(x => ({ value: x, label: x }))} value={size} onChange={v => setSize(v as CASDropdownSize)} />
          <Dropdown label="Position" size="compact" options={positions.map(x => ({ value: x, label: x }))} value={position} onChange={v => setPosition(v as "left" | "right")} />
          <label className="check-field"><input type="checkbox" checked={error} onChange={e => setError(e.target.checked)} /> Error</label>
          <label className="check-field"><input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">SIZE</p>
        <h2>Four fixed heights</h2>
        <div className="button-size-specs">
          {sizes.map(x => (
            <article key={x}><div style={{ width: "100%" }}><Dropdown aria-label={x} size={x} options={fruitOptions} value={fruit} onChange={setFruit} /></div><strong>{x}</strong><span>{x === "sm" ? "32 px" : x === "compact" ? "40 px" : x === "medium" ? "48 px" : "56 px"}</span></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">STATES</p>
        <h2>Default, hover, focus, error, and disabled</h2>
        <p className="wide-copy">The trigger reuses the Text Input anatomy — label, value, hint text — with a chevron that rotates when the panel is open. Focus is communicated purely with the outer ring, matching Text Input.</p>
        <div className="state-demo-grid">
          <article className="state-demo-card"><div style={{ width: "100%" }}><Dropdown aria-label="Default" options={fruitOptions} value="apple" onChange={() => {}} /></div><span className="tag tag-neutral">default</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Dropdown aria-label="Error" options={fruitOptions} value="apple" onChange={() => {}} error /></div><span className="tag tag-neutral">error</span></article>
          <article className="state-demo-card"><div style={{ width: "100%" }}><Dropdown aria-label="Disabled" options={fruitOptions} value="apple" onChange={() => {}} disabled /></div><span className="tag tag-neutral">disabled</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Default border", "color/stroke/muted"], ["Hover border", "color/action/secondary/light"], ["Focus / open ring", "color/action/secondary/base"], ["Error border & text", "color/feedback/error/base"], ["Selected item", "color/action/secondary/lighter"], ["Label", "Nunito Sans · 14 px · Bold 700"], ["Corner radius", "radius/12 · 12 px"]].map(([label, value]) => <article key={label}><strong>{label}</strong><code>{value}</code></article>)}
        </div>
      </section>
      <section className="section-block"><p className="section-index">COMPONENT CONTRACT</p><div className="component-template contract">{["Options · Value, label, optional icon, optional disabled", "Position · Left or Right panel alignment", "Size · Small (32), Compact (40), Medium (48), Large (56)", "State · Default, Hover, Focus/Open, Error, Disabled", "Keyboard · Arrow keys move selection, Enter confirms, Escape closes"].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}</div></section>
    </>
  );
}
