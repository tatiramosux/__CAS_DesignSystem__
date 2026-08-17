"use client";

import { useState } from "react";
import { Avatar, type CASAvatarVariant, type CASAvatarSize } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";

const variants: CASAvatarVariant[] = ["image", "text", "placeholder"];
const sizes: CASAvatarSize[] = [16, 20, 24, 28, 32, 40, 48];
const PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#FFD7DE'/><stop offset='1' stop-color='#B0E4FF'/></linearGradient></defs>" +
      "<rect width='100' height='100' fill='url(#g)'/>" +
      "<circle cx='50' cy='38' r='17' fill='#ffffff' fill-opacity='0.65'/>" +
      "<circle cx='50' cy='96' r='36' fill='#ffffff' fill-opacity='0.65'/>" +
      "</svg>"
  );

export default function AvatarsPage() {
  const [variant, setVariant] = useState<CASAvatarVariant>("image");
  const [size, setSize] = useState<CASAvatarSize>(40);

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · AVATAR" title="Avatars" />
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">An avatar is a visual representation of a user or entity, typically displayed as an image, illustration, or initials.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">Avatars come in three forms, each with a purpose: Image Avatars, Text Avatars, and Placeholder Avatars.</p>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase"><Avatar variant={variant} size={size} src={PHOTO} alt="Sample avatar" initials="GP" /></div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Type" size="compact" value={variant} onChange={v => setVariant(v as CASAvatarVariant)} options={variants.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Size" size="compact" value={String(size)} onChange={v => setSize(Number(v) as CASAvatarSize)} options={sizes.map(x => ({ value: String(x), label: `${x} px` }))} />
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">TYPES</p>
        <h2>Three forms, each with a purpose</h2>
        <div className="state-demo-grid">
          <article className="state-demo-card"><Avatar variant="image" size={48} src={PHOTO} alt="Sample avatar" /><span className="tag tag-neutral">image</span></article>
          <article className="state-demo-card"><Avatar variant="text" size={48} initials="GP" /><span className="tag tag-neutral">text</span></article>
          <article className="state-demo-card"><Avatar variant="placeholder" size={48} /><span className="tag tag-neutral">placeholder</span></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">SIZE</p>
        <h2>Seven-step scale</h2>
        <p className="wide-copy">Avatars start at 16 px and grow by 4 px steps up to 32 px. Then, they increase by 8 px steps up to 48 px.</p>
        <div className="button-size-specs" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {sizes.map(x => (
            <article key={x}><Avatar variant="text" size={x} initials="GP" /><strong>{x} px</strong></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Shape", "radius/full · 999 px"], ["Background", "color/action/secondary/light"], ["Text / icon", "color/action/secondary/darker"], ["Initials", "Nunito Sans · Black 900"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {["Type · Image, Text, or Placeholder", "Size · 16, 20, 24, 28, 32, 40, 48 px", "Shape · Circle, photo or fill clipped to bounds"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
      </section>
    </>
  );
}
