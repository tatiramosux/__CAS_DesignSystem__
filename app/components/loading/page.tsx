"use client";

import { useState } from "react";
import { Spinner, type CASSpinnerStyle } from "@/components/ui/spinner";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const styles: CASSpinnerStyle[] = ["round", "dots"];

export default function LoadingPage() {
  const [spinnerStyle, setSpinnerStyle] = useState<CASSpinnerStyle>("round");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · LOADING" title="Loading" description="Our spinner comes in two styles: Round and Dots — used to indicate an in-progress state where no determinate progress can be shown." />
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase"><Spinner spinnerStyle={spinnerStyle} /></div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Style" size="compact" value={spinnerStyle} onChange={v => setSpinnerStyle(v as CASSpinnerStyle)} options={styles.map(x => ({ value: x, label: x }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">STYLES</p>
        <h2>Two spinner styles</h2>
        <p className="wide-copy">Round animates a highlighted arc around a ring; Dots fades eight radial spokes in a continuous chase. Both render at a fixed 20×20 px size.</p>
        <div className="state-demo-grid">
          {styles.map(x => (
            <article className="state-demo-card" key={x}>
              <Spinner spinnerStyle={x} />
              <span className="tag tag-neutral">{x}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Size", "20 × 20 px"], ["Stroke / spoke color", "color/text/strong"], ["Cycle duration", "0.8s linear infinite"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT CONTRACT</p>
        <div className="component-template contract">
          {["Style · Round or Dots", "Label · Accessible status label (defaults to \"Loading\")"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
      </section>
    </>
  );
}
