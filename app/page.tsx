"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Button, type CASButtonSize, type CASButtonState, type CASButtonTreatment, type CASButtonType } from "@/components/ui/button";
import { TextInput, type CASTextInputSize, type CASTextInputState } from "@/components/ui/text-input";
import { Badge, type CASBadgeSize, type CASBadgeStyle, type CASBadgeColor } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare, faBars, faChevronLeft, faChevronRight, faMagnifyingGlass, faSquare } from "@fortawesome/free-solid-svg-icons";
import { audit, collectionSummary, cssVariables, grids, migrations, paletteGroups, radii, semanticTokens, themes, typography, units, type ThemeId } from "./token-data";

type Page = "overview" | "governance" | "tokens" | "color" | "typography" | "units" | "radius" | "grid" | "components" | "buttons" | "text-input" | "badges" | "patterns" | "resources";

const nav = [
  { label: "Getting Started", mark: "01", items: [{ id: "overview", label: "Overview" }] },
  { label: "Foundations", mark: "02", items: [
    { id: "governance", label: "Governance" }, { id: "tokens", label: "Design tokens" },
    { id: "color", label: "Color" }, { id: "typography", label: "Typography" },
    { id: "units", label: "Spacing & units" }, { id: "radius", label: "Radius" }, { id: "grid", label: "Grid & layout" },
  ] },
  { label: "Components", mark: "03", items: [{ id: "components", label: "Component index" }, { id: "buttons", label: "Buttons" }, { id: "text-input", label: "Text Input" }, { id: "badges", label: "Badges" }] },
  { label: "Patterns", mark: "04", items: [{ id: "patterns", label: "Pattern index" }] },
  { label: "Resources", mark: "05", items: [{ id: "resources", label: "Libraries & tools" }] },
] as const;


function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return <button className="copy" onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); }} aria-label={`Copy ${value}`}>{copied ? "Copied" : "Copy"}</button>;
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></header>;
}

function Overview({ setPage, theme }: { setPage: (p: Page) => void; theme: ThemeId }) {
  const primary = semanticTokens.find(token => token.canonicalName === "color/action/primary/base")?.modes[theme];
  return <>
    <section className="hero">
      <p className="eyebrow">CAS DESIGN SYSTEM · V1.0</p>
      <h1>Build consistent products,<br /><span>faster.</span></h1>
      <p className="lead">A shared language for designers and developers to create accessible, theme-ready CarBrain experiences with confidence.</p>
      <div className="hero-actions"><Button size="large" trailingIcon onClick={() => setPage("governance")}>Explore foundations</Button><Button size="large" buttonType="secondary" treatment="outline" trailingIcon onClick={() => setPage("components")}>Browse components</Button></div>
      <div className="theme-demo" aria-label="Theme architecture">
        <div><span>Semantic token</span><strong>color/action/primary/base</strong></div><i><FontAwesomeIcon icon={faArrowRight} /></i>
        <div><span>Current mode</span><strong>{themes.find(item => item.id === theme)?.label}</strong></div><i><FontAwesomeIcon icon={faArrowRight} /></i>
        <div className="swatch-line"><b style={{ background: primary?.resolved }}></b><span>Primitive alias</span><strong>{primary?.alias}</strong></div>
      </div>
    </section>
    <section className="section-block"><p className="eyebrow">EXPLORE THE SYSTEM</p><h2>One system, two crafts.</h2><div className="feature-grid">
      <article><span className="feature-number">01</span><h3>Foundations</h3><p>Governance, tokens, color, type, spacing, radius, grid, iconography, and accessibility.</p><Button buttonType="secondary" treatment="outline" size="small" trailingIcon onClick={() => setPage("governance")}>Read foundations</Button></article>
      <article><span className="feature-number">02</span><h3>Components</h3><p>Reusable interface building blocks documented with usage, anatomy, specs, accessibility, and code.</p><Button buttonType="secondary" treatment="outline" size="small" trailingIcon onClick={() => setPage("components")}>Open components</Button></article>
      <article><span className="feature-number">03</span><h3>Patterns</h3><p>Approved component combinations that solve recurring product flows and user goals.</p><Button buttonType="secondary" treatment="outline" size="small" trailingIcon onClick={() => setPage("patterns")}>Explore patterns</Button></article>
    </div></section>
  </>;
}

function Governance() {
  return <><PageHeader eyebrow="FOUNDATIONS · GOVERNANCE" title="Token governance" description="The rules that keep design intent stable across brands, themes, Figma, and production code." />
    <section className="decision"><span>Current decision</span><h2>Two token layers. One shared language.</h2><p>The current architecture contains primitive and semantic tokens. Components consume semantic tokens directly. A component-specific layer will only be introduced when proven decoupling needs arise.</p></section>
    <section className="section-block"><p className="section-index">01 / ARCHITECTURE</p><h2>From raw value to product intent</h2><div className="architecture">
      <article><span>Layer 01</span><h3>Primitives</h3><code>CarBrain/deep-blue/600</code><p>Raw brand and palette values. Never consumed directly by components.</p></article><b><FontAwesomeIcon icon={faArrowRight} /></b>
      <article><span>Layer 02</span><h3>Semantics</h3><code>color/action/primary/base</code><p>Stable purpose and hierarchy. The alias changes between modes.</p></article><b><FontAwesomeIcon icon={faArrowRight} /></b>
      <article><span>Consumer</span><h3>Components</h3><code>Button · Link · Checkbox</code><p>Components use the appropriate semantic token for each visual property.</p></article>
    </div></section>
    <section className="section-block"><p className="section-index">02 / THEMING</p><h2>Product and appearance are separate dimensions</h2><p className="wide-copy">A theme is the combination of a product identity and an appearance. Semantic names remain stable while their primitive aliases change.</p><div className="theme-cards">
      <article className="theme-card theme-card--carbrain-light"><img src="/CarBrain-on-light.png" alt="CarBrain" /><div><strong>CarBrain · Light</strong><span>Production theme</span></div></article>
      <article className="theme-card theme-card--carbrain-dark"><img src="/CarBrain-on-dark.svg" alt="CarBrain" /><div><strong>CarBrain · Dark</strong><span>Production theme</span></div></article>
      <article className="theme-card theme-card--brandx-light"><img src="/BrandX.svg" alt="BrandX" /><div><strong>BrandX · Light</strong><span>Experimental theme</span></div></article>
    </div></section>
    <section className="section-block"><p className="section-index">03 / NAMING</p><h2>A predictable naming contract</h2><div className="syntax"><span>color</span><i>/</i><span>category</span><i>/</i><span>role or hierarchy</span><i>/</i><span>optional variant</span></div><ul className="rules"><li>Use singular categories: <code>icon</code>, not <code>icons</code>.</li><li>Do not include a brand name in semantic tokens.</li><li>Prefer purpose-based names for text, icon, stroke, and background.</li><li>Use intensity names only when intensity is the family’s main dimension.</li><li>Intensity is not interaction state; component behavior defines hover, pressed, focus, and disabled.</li></ul></section>
  </>;
}

function Tokens({ theme }: { theme: ThemeId }) {
  const [filter, setFilter] = useState("all");
  const categories = ["all", ...new Set(semanticTokens.filter(token => !token.ungrouped).map(token => token.canonicalName.split("/")[1]))];
  const visible = semanticTokens.filter(token => filter === "all" || token.canonicalName.split("/")[1] === filter);
  return <><PageHeader eyebrow="FOUNDATIONS · DESIGN TOKENS" title="Design tokens" description="The canonical catalog generated from the CAS Figma Variables export, with source aliases preserved for governance and migration." />
    <div className="status-note"><span>Figma source</span><strong>{audit.variableCount} variables · {audit.collectionCount} collections · {themes.length} color modes</strong><small>Imported August 12, 2026</small></div>
    <section className="collection-strip">{collectionSummary.map(collection => <article key={collection.name}><strong>{collection.count}</strong><span>{collection.name.replace(/^\d+ - /, "")}</span><small>{collection.modes.join(" · ")}</small></article>)}</section>
    <section className="section-block"><div className="section-toolbar"><div><p className="section-index">01 / SEMANTIC TOKENS</p><h2>{themes.find(t => t.id === theme)?.label}</h2></div><select value={filter} onChange={event => setFilter(event.target.value)} aria-label="Filter semantic tokens"><option value="all">All categories</option>{categories.slice(1).map(category => <option key={category} value={category}>{category}</option>)}</select></div><div className="token-table"><div className="token-row token-head"><span>Canonical token</span><span>Figma alias</span><span>Resolved value</span><span></span></div>{visible.map(token => <div className="token-row" key={token.sourceName}><div className="token-name"><code>{token.canonicalName}</code>{token.sourceName !== token.canonicalName && <small>Figma: {token.sourceName}</small>}</div><code>{token.modes[theme].alias}</code><span className="resolved-value"><i style={{ background: token.modes[theme].resolved }}></i>{token.modes[theme].resolved}</span><CopyButton value={token.canonicalName} /></div>)}</div></section>
    <section className="section-block"><p className="section-index">02 / MIGRATION REPORT</p><h2>{migrations.length} names require governance action</h2><div className="migration-list">{migrations.map(item => <div key={item.source}><code>{item.source}</code><span><FontAwesomeIcon icon={faArrowRight} /></span><code>{item.target}</code><small>{item.issue}</small></div>)}</div></section>
    <section className="section-block"><p className="section-index">03 / GOVERNANCE</p><h2>Rules for adding a token</h2><div className="check-grid">{["Has a real use case","Belongs to the right category","Has aliases for every active mode","Maps to code without ambiguity","Passes contrast in real context","Includes usage and migration notes"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></section>
  </>;
}

function Color() {
  return <><PageHeader eyebrow="FOUNDATIONS · COLOR" title="Color" description="Primitive palettes carry brand values. Semantic tokens carry product intent. Components should prefer semantic color tokens whenever possible." />
    <div className="status-note"><span>Figma source</span><strong>{audit.primitiveCount} primitive color variables</strong><small>{paletteGroups.length} solid palette families plus alpha colors</small></div>
    {paletteGroups.map(group => <Palette key={group.name} title={group.name} colors={group.colors} />)}
    <section className="section-block"><p className="section-index">APPLICATION</p><h2>Use color by purpose, not appearance</h2><div className="guidance-grid"><article><span className="do">Do</span><h3>Choose the semantic role</h3><code>color/text/default</code><p>The token remains meaningful when its resolved value changes.</p></article><article><span className="dont">Don’t</span><h3>Reach for the matching hex</h3><code>#003B76</code><p>A primitive value does not communicate intent or adapt safely to themes.</p></article></div></section>
  </>;
}

function Palette({ title, colors }: { title: string; colors: { step: string; name: string; value: string }[] }) {
  return <section className="section-block palette-section"><p className="section-index">PRIMITIVE PALETTE</p><h2>{title}</h2><div className="palette">{colors.map(color => <article key={color.name}><div style={{backgroundColor:color.value}}></div><span>{color.step}</span><code>{color.value}</code><CopyButton value={color.name} /></article>)}</div></section>;
}

function Typography() {
  const heading = typography.find(token => token.name === "font-family/heading")?.desktop;
  const body = typography.find(token => token.name === "font-family/body")?.desktop;
  return <><PageHeader eyebrow="FOUNDATIONS · TYPOGRAPHY" title="Typography" description="The responsive type foundations exported from Figma, including font families, sizes, and weights for desktop and mobile." /><section className="type-specimen"><span>{heading} · Heading family</span><h2 style={{ fontFamily: heading }}>A shared language for product teams.</h2><code>{body} · Body family</code></section><section className="section-block"><p className="section-index">TYPE TOKENS</p><h2>Desktop and mobile mappings</h2><div className="foundation-table"><div className="foundation-row head"><span>Token</span><span>Desktop</span><span>Mobile</span></div>{typography.map(token => <div className="foundation-row" key={token.name}><code>{token.name}</code><span>{token.desktop}</span><span>{token.mobile}</span></div>)}</div></section></>;
}

function ScalePage({ type }: { type: "units" | "radius" | "grid" }) {
  if (type === "grid") return <><PageHeader eyebrow="FOUNDATIONS · GRID & LAYOUT" title="Grid & layout" description="Responsive grid values for desktop, tablet, and mobile breakpoints." /><div className="foundation-table"><div className="foundation-row grid-head"><span>Token</span><span>Desktop</span><span>Tablet</span><span>Mobile</span></div>{grids.map(token => <div className="foundation-row grid-row" key={token.name}><code>{token.name}</code><span>{token.desktop}</span><span>{token.tablet}</span><span>{token.mobile}</span></div>)}</div><div className="grid-preview">{["Desktop · 12 columns","Tablet · 6 columns","Mobile · 4 columns"].map((label,index) => <article key={label}><span>{label}</span><div style={{ gridTemplateColumns: `repeat(${[12,6,4][index]}, 1fr)` }}>{Array.from({length:[12,6,4][index]}).map((_,i)=><i key={i}></i>)}</div></article>)}</div></>;
  const items = type === "units" ? units : radii;
  const title = type === "units" ? "Spacing & units" : "Radius";
  return <><PageHeader eyebrow={`FOUNDATIONS · ${title.toUpperCase()}`} title={title} description={type === "units" ? "The base numeric scale shared by spacing, sizing, typography, and layout decisions." : "Corner-radius values available for component and surface geometry."} /><div className={`scale-gallery ${type}`}>{items.map(token => <article key={token.name}><div style={type === "units" ? { width: `${Math.min(Number(token.value), 160)}px` } : { borderRadius: `${Math.min(Number(token.value), 40)}px` }}></div><code>{token.name}</code><span>{token.value}px</span></article>)}</div></>;
}

const linkedComponentPages: Partial<Record<string, Page>> = { "Buttons": "buttons", "Text Input": "text-input", "Badges": "badges" };

function ComponentIndex({ setPage }: { setPage: (page: Page) => void }) {
  const catalog = ["Alerts","Avatars","Badges","Buttons","Breadcrumbs","Checkbox","Dropdown","Loading","Divider","Pagination","Progress Indicators","Radio Button","Rating","Scroll","Sidebar","Stepper","Switch","Table","Tabs","Text Area","Text Input","Tooltip","Toggle Button"];
  return <><PageHeader eyebrow="COMPONENTS · INDEX" title="Components" description="Reusable CAS interface elements aligned between Figma and React. Each page documents behavior, variants, tokens, accessibility, and implementation." />
    <section><p className="section-index">FIGMA LIBRARY</p><h2>{catalog.length} components</h2><p className="wide-copy">Cards become interactive when their documentation page is available in this library.</p><div className="component-catalog">{catalog.map(name => linkedComponentPages[name] ? <button className="component-card is-linked" key={name} onClick={() => setPage(linkedComponentPages[name]!)}><strong>{name}</strong><p>CAS component library</p><Badge size="small" color="success">Documentation ready</Badge></button> : <article className="component-card" key={name}><strong>{name}</strong><p>CAS component library</p></article>)}</div></section></>;
}

function Buttons() {
  const [buttonType, setButtonType] = useState<CASButtonType>("primary");
  const [buttonSize, setButtonSize] = useState<CASButtonSize>("medium");
  const [buttonState, setButtonState] = useState<CASButtonState>("default");
  const [buttonTreatment, setButtonTreatment] = useState<CASButtonTreatment>("solid");
  const types: CASButtonType[] = ["primary","secondary","tertiary","danger","neutral"];
  const sizes: CASButtonSize[] = ["large","medium","small"];
  const states: CASButtonState[] = ["default","hover","focus","loading","disabled"];
  const groups: { type: CASButtonType; treatment: CASButtonTreatment; label: string }[] = [
    { type: "primary", treatment: "solid", label: "Primary · Solid" },
    { type: "secondary", treatment: "solid", label: "Secondary · Solid" },
    { type: "tertiary", treatment: "solid", label: "Tertiary · Solid" },
    { type: "danger", treatment: "solid", label: "Danger · Solid" },
    { type: "secondary", treatment: "outline", label: "Secondary · Outline" },
    { type: "neutral", treatment: "outline", label: "Neutral · Outline" },
  ];
  const treatmentLocked = buttonType !== "secondary";
  const activeTreatment = buttonType === "neutral" ? "outline" : buttonType === "secondary" ? buttonTreatment : "solid";
  const [leadingIcon, setLeadingIcon] = useState(true);
  const [trailingIcon, setTrailingIcon] = useState(true);
  return <><PageHeader eyebrow="COMPONENTS · BUTTON" title="Button" description="Actions from the CAS Figma component set, mapped to React with the same type, size, state, treatment, label, and icon properties." />
    <section className="button-playground"><div className="component-preview"><div className="preview-bar"><span>Interactive preview</span><span>CarBrain · current theme</span></div><div className="button-showcase"><Button buttonType={buttonType} size={buttonSize} state={buttonState} treatment={buttonTreatment} leadingIcon={leadingIcon} trailingIcon={trailingIcon}>Button</Button></div></div><aside className="button-controls">
      <label>Type<select value={buttonType} onChange={e=>setButtonType(e.target.value as CASButtonType)}>{types.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Size<select value={buttonSize} onChange={e=>setButtonSize(e.target.value as CASButtonSize)}>{sizes.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>State<select value={buttonState} onChange={e=>setButtonState(e.target.value as CASButtonState)}>{states.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Treatment<select value={activeTreatment} disabled={treatmentLocked} onChange={e=>setButtonTreatment(e.target.value as CASButtonTreatment)}><option value="solid">solid</option><option value="outline">outline</option></select></label>
      <label className="check-field"><input type="checkbox" checked={leadingIcon} onChange={e=>setLeadingIcon(e.target.checked)} /> Leading icon</label>
      <label className="check-field"><input type="checkbox" checked={trailingIcon} onChange={e=>setTrailingIcon(e.target.checked)} /> Trailing icon</label>
    </aside></section>
    <section className="section-block"><p className="section-index">90 FIGMA VARIANTS</p><h2>Six supported styles × three sizes × five states</h2><p className="wide-copy">The Figma component does not support every Type × Solid combination. Primary, Tertiary, and Danger are Solid; Neutral is Outline; Secondary supports both treatments.</p><div className="button-matrix"><div className="button-matrix__head"><span>Style</span>{states.map(state=><span key={state}>{state}</span>)}</div>{groups.map(group=><div className="button-matrix__row" key={group.label}><strong>{group.label}</strong>{states.map(state=><div key={state}><Button buttonType={group.type} size="small" state={state} treatment={group.treatment}>Button</Button></div>)}</div>)}</div></section>
    <section className="section-block"><p className="section-index">ICON SLOTS</p><h2>Leading and trailing icons are independent</h2><p className="wide-copy">Each icon slot is a boolean show/hide — matching the Figma instance-swap property. A button with no icons at all is just as valid as one with both.</p><div className="state-demo-grid">{[["Both icons", true, true], ["Leading only", true, false], ["Trailing only", false, true], ["No icons", false, false]].map(([label, lead, trail])=><article className="state-demo-card" key={label as string}><Button leadingIcon={lead as boolean} trailingIcon={trail as boolean}>Button</Button><Badge size="small" color="neutral">{label as string}</Badge></article>)}</div></section>
    <section className="section-block"><p className="section-index">SIZE</p><h2>Three fixed heights</h2><div className="button-size-specs">{sizes.map(size=><article key={size}><Button size={size} leadingIcon trailingIcon>Button</Button><strong>{size}</strong><span>{size === "large" ? "56 px" : size === "medium" ? "48 px" : "40 px"}</span></article>)}</div></section>
    <section className="section-block"><p className="section-index">TOKENS & TYPOGRAPHY</p><h2>Implementation bindings</h2><div className="button-token-grid">{[["Primary", "color/action/primary/{base, dark, lighter}"], ["Secondary", "color/action/secondary/{base, dark, lighter}"], ["Tertiary", "color/action/tertiary/{base, dark, lighter}"], ["Danger", "color/feedback/error/{base, dark, lighter}"], ["Neutral", "color/action/neutral/{base, dark, lighter}"], ["Label", "Nunito Sans · 14 px · Semibold 600"], ["Small label", "Nunito Sans · 12 px · Semibold 600"], ["Corner radius", "radius/12 · 12 px"]].map(([label, value])=><article key={label}><strong>{label}</strong><code>{value}</code></article>)}</div></section>
    <section className="section-block"><p className="section-index">COMPONENT CONTRACT</p><div className="component-template contract">{["Type · Primary, Secondary, Tertiary, Danger, Neutral","Size · Large (56), Medium (48), Small (40)","State · Default, Hover, Focus, Loading, Disabled","Treatment · Solid or Outline where supported","Label · Editable text","Icon Leading · Boolean + instance swap","Icon Trailing · Boolean + instance swap"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div></section></>;
}

function TextInputPage() {
  const [size, setSize] = useState<CASTextInputSize>("medium");
  const [state, setState] = useState<CASTextInputState>("default");
  const [leadingIcon, setLeadingIcon] = useState(true);
  const [trailingIcon, setTrailingIcon] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [required, setRequired] = useState(true);
  const sizes: CASTextInputSize[] = ["medium", "large"];
  const states: CASTextInputState[] = ["default", "hover", "focus", "filled", "error", "disabled"];
  const hintText = state === "error" ? "This field is required" : "We'll never share this with anyone else";
  return <><PageHeader eyebrow="COMPONENTS · TEXT INPUT" title="Text Input" description="The input field is a key part of forms and user interactions. It lets users enter text, numbers, or make selections, making it an essential tool for gathering information." />
    <section className="button-playground"><div className="component-preview"><div className="preview-bar"><span>Interactive preview</span><span>CarBrain · current theme</span></div><div className="button-showcase"><TextInput size={size} state={state} required={required} leadingIcon={leadingIcon} trailingIcon={trailingIcon} showInfo={showInfo} hintText={showHint ? hintText : undefined} /></div></div><aside className="button-controls">
      <label>Size<select value={size} onChange={e=>setSize(e.target.value as CASTextInputSize)}>{sizes.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>State<select value={state} onChange={e=>setState(e.target.value as CASTextInputState)}>{states.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="check-field"><input type="checkbox" checked={required} onChange={e=>setRequired(e.target.checked)} /> Required asterisk</label>
      <label className="check-field"><input type="checkbox" checked={leadingIcon} onChange={e=>setLeadingIcon(e.target.checked)} /> Leading icon</label>
      <label className="check-field"><input type="checkbox" checked={trailingIcon} onChange={e=>setTrailingIcon(e.target.checked)} /> Trailing icon</label>
      <label className="check-field"><input type="checkbox" checked={showInfo} onChange={e=>setShowInfo(e.target.checked)} /> Info icon</label>
      <label className="check-field"><input type="checkbox" checked={showHint} onChange={e=>setShowHint(e.target.checked)} /> Hint text</label>
    </aside></section>
    <section className="section-block"><p className="section-index">SIX SUPPORTED STATES</p><h2>Default, Hover, Focus, Filled, Error, and Disabled</h2><p className="wide-copy">Every state keeps the same anatomy — label, optional icons, value — and communicates purely through border, background tint, and text color. Leading icon, trailing icon, the info glyph, and the hint line are independent, opt-in slots — a field can carry any combination of them, including none.</p><div className="state-demo-grid">{states.map(x=><article className="state-demo-card" key={x}><TextInput size="medium" state={x} label="Input" leadingIcon trailingIcon /><Badge size="small" color="neutral">{x}</Badge></article>)}</div></section>
    <section className="section-block"><p className="section-index">ICON SLOTS</p><h2>Leading and trailing icons are independent</h2><p className="wide-copy">Each icon slot is a boolean show/hide — matching the Figma instance-swap property. A field with no icons at all is just as valid as one with both.</p><div className="state-demo-grid">{[["Both icons", true, true], ["Leading only", true, false], ["Trailing only", false, true], ["No icons", false, false]].map(([label, lead, trail])=><article className="state-demo-card" key={label as string}><TextInput size="medium" state="default" label="Input" leadingIcon={lead as boolean} trailingIcon={trail as boolean} /><Badge size="small" color="neutral">{label as string}</Badge></article>)}</div></section>
    <section className="section-block"><p className="section-index">SIZE</p><h2>Two fixed heights</h2><div className="button-size-specs">{sizes.map(x=><article key={x}><TextInput size={x} state="default" leadingIcon trailingIcon /><strong>{x}</strong><span>{x === "large" ? "56 px · 16 px padding" : "48 px · 12 px padding"}</span></article>)}</div></section>
    <section className="section-block"><p className="section-index">TOKENS & TYPOGRAPHY</p><h2>Implementation bindings</h2><div className="button-token-grid">{[["Default border", "color/stroke/muted"], ["Hover border", "color/action/secondary/light"], ["Focus border", "color/action/secondary/base"], ["Error border & text", "color/feedback/error/base"], ["Disabled label", "color/text/subtle"], ["Disabled value", "color/text/disable"], ["Label", "Nunito Sans · 14 px · Bold 700"], ["Hint text", "Nunito Sans · 12 px · Regular 400"], ["Corner radius", "radius/12 · 12 px"]].map(([label, value])=><article key={label}><strong>{label}</strong><code>{value}</code></article>)}</div></section>
    <section className="section-block"><p className="section-index">COMPONENT CONTRACT</p><div className="component-template contract">{["Label · Editable text","Required · Boolean, renders a red asterisk","Size · Medium (48), Large (56)","State · Default, Hover, Focus, Filled, Error, Disabled","Leading icon · Boolean + instance swap, independent of trailing","Trailing icon · Boolean + instance swap, independent of leading","Info icon · Boolean, sits beside the label","Hint text · Optional line below the field, switches to error color in the Error state"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div></section></>;
}

function BadgesPage() {
  const [size, setSize] = useState<CASBadgeSize>("medium");
  const [badgeStyle, setBadgeStyle] = useState<CASBadgeStyle>("fill");
  const [color, setColor] = useState<CASBadgeColor>("primary");
  const [leadingIcon, setLeadingIcon] = useState(true);
  const [trailingIcon, setTrailingIcon] = useState(true);
  const sizes: CASBadgeSize[] = ["medium", "small"];
  const styles: CASBadgeStyle[] = ["strong", "fill", "border"];
  const colors: CASBadgeColor[] = ["primary", "secondary", "danger", "success", "warning", "information", "neutral", "inverse"];
  return <><PageHeader eyebrow="COMPONENTS · BADGE" title="Badges" description="The badge component helps organize and display small bits of information in a clear and attractive way." />
    <section className="button-playground"><div className="component-preview"><div className="preview-bar"><span>Interactive preview</span><span>CarBrain · current theme</span></div><div className="button-showcase"><Badge size={size} badgeStyle={badgeStyle} color={color} leadingIcon={leadingIcon} trailingIcon={trailingIcon}>Badge</Badge></div></div><aside className="button-controls">
      <label>Size<select value={size} onChange={e=>setSize(e.target.value as CASBadgeSize)}>{sizes.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Style<select value={badgeStyle} onChange={e=>setBadgeStyle(e.target.value as CASBadgeStyle)}>{styles.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Color<select value={color} onChange={e=>setColor(e.target.value as CASBadgeColor)}>{colors.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="check-field"><input type="checkbox" checked={leadingIcon} onChange={e=>setLeadingIcon(e.target.checked)} /> Leading icon</label>
      <label className="check-field"><input type="checkbox" checked={trailingIcon} onChange={e=>setTrailingIcon(e.target.checked)} /> Trailing icon</label>
    </aside></section>
    <section className="section-block"><p className="section-index">STYLES</p><h2>Three visual treatments</h2><p className="wide-copy">Badges come in three different styles: Strong, Fill, and Border.</p><div className="state-demo-grid">{styles.map(x=><article className="state-demo-card" key={x}><Badge badgeStyle={x} color="primary" leadingIcon trailingIcon>Badge</Badge><Badge size="small" color="neutral">{x}</Badge></article>)}</div></section>
    <section className="section-block"><p className="section-index">COLORS</p><h2>Eight supported colors</h2><p className="wide-copy">Badges share the same semantic color roles as buttons: Primary, Secondary, Danger, Success, Warning, Information, Neutral, and Inverse — each with a strong, fill, and border treatment.</p><div className="state-demo-grid">{colors.map(x=><article className="state-demo-card" key={x}><Badge badgeStyle="border" color={x} leadingIcon>Badge</Badge><Badge size="small" color="neutral">{x}</Badge></article>)}</div></section>
    <section className="section-block"><p className="section-index">SIZE</p><h2>Two fixed heights</h2><div className="button-size-specs">{sizes.map(x=><article key={x}><Badge size={x} leadingIcon trailingIcon>Badge</Badge><strong>{x}</strong><span>{x === "medium" ? "14 px text" : "12 px text"}</span></article>)}</div></section>
    <section className="section-block"><p className="section-index">TOKENS & TYPOGRAPHY</p><h2>Implementation bindings</h2><div className="button-token-grid">{[["Primary", "color/action/primary/{base, lighter, light}"], ["Secondary", "color/action/secondary/{base, lighter, light}"], ["Danger", "color/feedback/error/{dark, lighter, light}"], ["Success", "color/feedback/success/{dark, lighter, light}"], ["Warning", "color/feedback/warning/{dark, lighter, light}"], ["Information", "color/feedback/info/{dark, lighter, light}"], ["Label", "Nunito Sans · 14 px (Medium) / 12 px (Small) · ExtraBold 800"], ["Corner radius", "radius/6 · 6 px"]].map(([label, value])=><article key={label}><strong>{label}</strong><code>{value}</code></article>)}</div></section>
    <section className="section-block"><p className="section-index">COMPONENT CONTRACT</p><div className="component-template contract">{["Label · Editable text","Size · Medium (14 px text), Small (12 px text)","Style · Strong (solid), Fill (soft), Border (soft + stroke)","Color · Primary, Secondary, Danger, Success, Warning, Information, Neutral, Inverse","Leading icon · Boolean + instance swap, independent of trailing","Trailing icon · Boolean + instance swap, independent of leading"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div></section></>;
}

function Placeholder({ type }: { type: "Patterns" | "Resources" }) {
  const copy = type === "Patterns" ? "Approved combinations of components and foundations that solve recurring user goals and product flows." : "The tools, libraries, releases, and contribution paths teams need to adopt and evolve the system.";
  return <><PageHeader eyebrow={`${type.toUpperCase()} · INDEX`} title={type} description={copy} /><section className="empty-state"><span>Planned for the next iteration</span><h2>The structure is ready to grow.</h2><p>This area remains intentionally focused until the underlying assets and ownership model are validated.</p></section></>;
}

export default function Home() {
  const [page, setPage] = useState<Page>("overview");
  const [theme, setTheme] = useState<ThemeId>("carbrain-light");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => { const saved = localStorage.getItem("cas-theme") as ThemeId | null; if (saved) setTheme(saved); }, []);
  useEffect(() => { localStorage.setItem("cas-theme", theme); document.documentElement.dataset.theme = theme; }, [theme]);
  const matches = useMemo(() => query.trim() ? nav.flatMap(g => g.items).filter(x => x.label.toLowerCase().includes(query.toLowerCase())) : [], [query]);
  const go = (id: string) => { setPage(id as Page); setMobileOpen(false); setQuery(""); window.scrollTo({top:0,behavior:"smooth"}); };
  return <div className={`app ${collapsed ? "is-collapsed" : ""}`} style={cssVariables(theme) as CSSProperties}>
    <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation"><FontAwesomeIcon icon={faBars} /></button><button className="brand" onClick={() => go("overview")} aria-label="CAS Design System home"><img src="/CAS-logo.svg" alt="CAS" /><b>Design System</b><small>v1.0</small></button><div className="search-wrap"><FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} /><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the system" aria-label="Search the system" />{matches.length > 0 && <div className="search-results">{matches.map(x=><button key={x.id} onClick={()=>go(x.id)}>{x.label}<span>Open <FontAwesomeIcon icon={faArrowRight} /></span></button>)}</div>}</div><div className="top-actions"><a href="https://www.figma.com/design/ljmdJkv2aa10SL4NazHYAC/____CAS-Design-System--v1.0--____?node-id=1483-8372&t=f1D4dalJv9MCo0x2-1" target="_blank" rel="noreferrer">Figma <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a><select value={theme} onChange={e=>setTheme(e.target.value as ThemeId)} aria-label="Select theme">{themes.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></div></header>
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}><nav>{nav.map(group=><div className="nav-group" key={group.label}><button className="nav-title" onClick={()=>{ if(collapsed) setCollapsed(false); else go(group.items[0].id); }}><span>{group.mark}</span><b>{group.label}</b></button><div className="nav-items">{group.items.map(item=><button key={item.id} className={page===item.id?"active":""} onClick={()=>go(item.id)}><FontAwesomeIcon icon={faSquare} />{item.label}</button>)}</div></div>)}</nav><button className="collapse" onClick={()=>setCollapsed(!collapsed)}>{collapsed ? <FontAwesomeIcon icon={faChevronRight} /> : <><FontAwesomeIcon icon={faChevronLeft} /> Collapse</>}</button></aside>
    <button className="sidebar-handle" onClick={()=>setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}><FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} /></button>
    <main>{page === "overview" && <Overview setPage={go} theme={theme} />}{page === "governance" && <Governance />}{page === "tokens" && <Tokens theme={theme} />}{page === "color" && <Color />}{page === "typography" && <Typography />}{page === "units" && <ScalePage type="units" />}{page === "radius" && <ScalePage type="radius" />}{page === "grid" && <ScalePage type="grid" />}{page === "components" && <ComponentIndex setPage={go} />}{page === "buttons" && <Buttons />}{page === "text-input" && <TextInputPage />}{page === "badges" && <BadgesPage />}{page === "patterns" && <Placeholder type="Patterns" />}{page === "resources" && <Placeholder type="Resources" />}<footer><span>CAS Design System</span><span>English · Figma Variables source · 2026</span></footer></main>
  </div>;
}
