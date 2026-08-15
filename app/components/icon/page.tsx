"use client";

import { useState } from "react";
import { Icon, type CASIconSize } from "@/components/ui/icon";
import { Dropdown } from "@/components/ui/dropdown";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { PageHeader } from "@/components/page-header";
import { themes } from "@/app/token-data";
import { useTheme } from "@/components/theme-context";

const sizes: CASIconSize[] = ["sm", "md", "lg"];
const sizeSpecs: Record<CASIconSize, string> = { sm: "16 px", md: "20 px", lg: "24 px" };

export default function IconPage() {
  const { theme } = useTheme();
  const [size, setSize] = useState<CASIconSize>("md");

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · ICON" title="Icon" description="A shared wrapper that standardizes icon sizing wherever an icon is used — buttons, badges, text inputs, or on its own." />
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Interactive preview</span><span>{themes.find(t => t.id === theme)?.label} · current theme</span></div>
          <div className="button-showcase"><Icon icon={faCar} size={size} /></div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Size" size="compact" value={size} onChange={v => setSize(v as CASIconSize)} options={sizes.map(x => ({ value: x, label: x }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">SIZE</p>
        <h2>Three fixed sizes</h2>
        <div className="button-size-specs">
          {sizes.map(x => (
            <article key={x}><Icon icon={faCar} size={x} /><strong>{x}</strong><span>{sizeSpecs[x]}</span></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Small", "size-4 · 16 px"], ["Medium", "size-5 · 20 px"], ["Large", "size-6 · 24 px"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT CONTRACT</p>
        <div className="component-template contract">
          {["Icon · Any FontAwesome icon definition", "Size · Small (16), Medium (20), Large (24)"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
      </section>
    </>
  );
}
