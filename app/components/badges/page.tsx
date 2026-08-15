"use client";

import { useState } from "react";
import { Badge, type CASBadgeSize, type CASBadgeStyle, type CASBadgeColor } from "@/components/ui/badge";
import { Dropdown } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/page-header";
import { themes } from "@/app/token-data";
import { useTheme } from "@/components/theme-context";

const sizes: CASBadgeSize[] = ["medium", "small"];
const styles: CASBadgeStyle[] = ["strong", "fill", "border"];
const colors: CASBadgeColor[] = ["primary", "secondary", "danger", "success", "warning", "information", "neutral", "inverse"];

export default function BadgesPage() {
  const { theme } = useTheme();
  const [size, setSize] = useState<CASBadgeSize>("medium");
  const [badgeStyle, setBadgeStyle] = useState<CASBadgeStyle>("fill");
  const [color, setColor] = useState<CASBadgeColor>("primary");
  const [leadingIcon, setLeadingIcon] = useState(true);
  const [trailingIcon, setTrailingIcon] = useState(true);

  return (
    <>
      <PageHeader eyebrow="COMPONENTS · BADGE" title="Badges" description="The badge component helps organize and display small bits of information in a clear and attractive way." />
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Interactive preview</span><span>{themes.find(t => t.id === theme)?.label} · current theme</span></div>
          <div className="button-showcase"><Badge size={size} badgeStyle={badgeStyle} color={color} leadingIcon={leadingIcon} trailingIcon={trailingIcon}>Badge</Badge></div>
        </div>
        <aside className="button-controls">
          <Dropdown label="Size" size="compact" value={size} onChange={v => setSize(v as CASBadgeSize)} options={sizes.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Style" size="compact" value={badgeStyle} onChange={v => setBadgeStyle(v as CASBadgeStyle)} options={styles.map(x => ({ value: x, label: x }))} />
          <Dropdown label="Color" size="compact" value={color} onChange={v => setColor(v as CASBadgeColor)} options={colors.map(x => ({ value: x, label: x }))} />
          <label className="check-field"><input type="checkbox" checked={leadingIcon} onChange={e => setLeadingIcon(e.target.checked)} /> Leading icon</label>
          <label className="check-field"><input type="checkbox" checked={trailingIcon} onChange={e => setTrailingIcon(e.target.checked)} /> Trailing icon</label>
        </aside>
      </section>
      <section className="section-block">
        <p className="section-index">STYLES</p><h2>Three visual treatments</h2><p className="wide-copy">Badges come in three different styles: Strong, Fill, and Border.</p>
        <div className="state-demo-grid">{styles.map(x => <article className="state-demo-card" key={x}><Badge badgeStyle={x} color="primary" leadingIcon trailingIcon>Badge</Badge><Badge size="small" color="neutral">{x}</Badge></article>)}</div>
      </section>
      <section className="section-block">
        <p className="section-index">COLORS</p><h2>Eight supported colors</h2><p className="wide-copy">Badges share the same semantic color roles as buttons: Primary, Secondary, Danger, Success, Warning, Information, Neutral, and Inverse — each with a strong, fill, and border treatment.</p>
        <div className="state-demo-grid">{colors.map(x => <article className="state-demo-card" key={x}><Badge badgeStyle="border" color={x} leadingIcon>Badge</Badge><Badge size="small" color="neutral">{x}</Badge></article>)}</div>
      </section>
      <section className="section-block"><p className="section-index">SIZE</p><h2>Two fixed heights</h2><div className="button-size-specs">{sizes.map(x => <article key={x}><Badge size={x} leadingIcon trailingIcon>Badge</Badge><strong>{x}</strong><span>{x === "medium" ? "14 px text" : "12 px text"}</span></article>)}</div></section>
      <section className="section-block"><p className="section-index">TOKENS & TYPOGRAPHY</p><h2>Implementation bindings</h2><div className="button-token-grid">{[["Primary", "color/action/primary/{base, lighter, light}"], ["Secondary", "color/action/secondary/{base, lighter, light}"], ["Danger", "color/feedback/error/{dark, lighter, light}"], ["Success", "color/feedback/success/{dark, lighter, light}"], ["Warning", "color/feedback/warning/{dark, lighter, light}"], ["Information", "color/feedback/info/{dark, lighter, light}"], ["Label", "Nunito Sans · 14 px (Medium) / 12 px (Small) · ExtraBold 800"], ["Corner radius", "radius/6 · 6 px"]].map(([label, value]) => <article key={label}><strong>{label}</strong><code>{value}</code></article>)}</div></section>
      <section className="section-block"><p className="section-index">COMPONENT CONTRACT</p><div className="component-template contract">{["Label · Editable text", "Size · Medium (14 px text), Small (12 px text)", "Style · Strong (solid), Fill (soft), Border (soft + stroke)", "Color · Primary, Secondary, Danger, Success, Warning, Information, Neutral, Inverse", "Leading icon · Boolean + instance swap, independent of trailing", "Trailing icon · Boolean + instance swap, independent of leading"].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}</div></section>
    </>
  );
}
