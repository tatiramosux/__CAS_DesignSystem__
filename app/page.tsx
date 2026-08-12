"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "carbrain-light" | "carbrain-dark" | "brandx-light";
type Page = "overview" | "governance" | "tokens" | "color" | "typography" | "components" | "patterns" | "resources";

const themes: { id: Theme; label: string }[] = [
  { id: "carbrain-light", label: "CarBrain · Light" },
  { id: "carbrain-dark", label: "CarBrain · Dark" },
  { id: "brandx-light", label: "BrandX · Light" },
];

const nav = [
  { label: "Getting Started", mark: "01", items: [{ id: "overview", label: "Overview" }] },
  { label: "Foundations", mark: "02", items: [
    { id: "governance", label: "Governance" }, { id: "tokens", label: "Design tokens" },
    { id: "color", label: "Color" }, { id: "typography", label: "Typography" },
  ] },
  { label: "Components", mark: "03", items: [{ id: "components", label: "Component index" }] },
  { label: "Patterns", mark: "04", items: [{ id: "patterns", label: "Pattern index" }] },
  { label: "Resources", mark: "05", items: [{ id: "resources", label: "Libraries & tools" }] },
] as const;

const deepBlue = [
  ["50", "#E8EEFF"], ["100", "#D0DDFF"], ["200", "#98B8FF"], ["300", "#5698FF"],
  ["400", "#0076E1"], ["500", "#0059AC"], ["600", "#003B76"], ["700", "#002147"],
  ["800", "#001939"], ["900", "#000E25"], ["950", "#000718"],
];

const lightBlue = [
  ["50", "#EDF8FF"], ["100", "#DAF1FF"], ["200", "#B0E4FF"], ["300", "#7BD7FF"],
  ["400", "#00CBFE"], ["500", "#00BBEA"], ["600", "#0092B7"], ["700", "#006C88"],
];

const semanticRows = [
  ["color/text/inverse", "neutral/50", "neutral/800", "neutral/50", "Text on an opposite-polarity surface"],
  ["color/text/default", "neutral/500", "neutral/200", "neutral/500", "Default body and interface text"],
  ["color/text/strong", "neutral/800", "neutral/50", "neutral/800", "Headings, labels, and emphasized content"],
  ["color/stroke/default", "neutral/300", "neutral/100", "neutral/300", "Default borders for fields and surfaces"],
  ["color/icon/default", "neutral/400", "neutral/200", "neutral/400", "Default interface icon"],
  ["color/action/primary/base", "CarBrain/deep-blue/600", "CarBrain/deep-blue/400", "cyan/400", "Primary interactive action"],
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return <button className="copy" onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); }} aria-label={`Copy ${value}`}>{copied ? "Copied" : "Copy"}</button>;
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></header>;
}

function Overview({ setPage }: { setPage: (p: Page) => void }) {
  return <>
    <section className="hero">
      <p className="eyebrow">CAS DESIGN SYSTEM · V1.0</p>
      <h1>Build consistent products,<br /><span>faster.</span></h1>
      <p className="lead">A shared language for designers and developers to create accessible, theme-ready CarBrain experiences with confidence.</p>
      <div className="hero-actions"><button className="primary" onClick={() => setPage("governance")}>Explore foundations</button><button className="secondary" onClick={() => setPage("components")}>Browse components</button></div>
      <div className="theme-demo" aria-label="Theme architecture">
        <div><span>Semantic token</span><strong>color/action/primary/base</strong></div><i>→</i>
        <div><span>Current mode</span><strong>CarBrain · Light</strong></div><i>→</i>
        <div className="swatch-line"><b></b><span>Primitive alias</span><strong>deep-blue/600</strong></div>
      </div>
    </section>
    <section className="section-block"><p className="eyebrow">EXPLORE THE SYSTEM</p><h2>One system, two crafts.</h2><div className="feature-grid">
      <article><span className="feature-number">01</span><h3>Foundations</h3><p>Governance, tokens, color, type, spacing, radius, grid, iconography, and accessibility.</p><button onClick={() => setPage("governance")}>Read the foundations →</button></article>
      <article><span className="feature-number">02</span><h3>Components</h3><p>Reusable interface building blocks documented with usage, anatomy, specs, accessibility, and code.</p><button onClick={() => setPage("components")}>Open the component index →</button></article>
      <article><span className="feature-number">03</span><h3>Patterns</h3><p>Approved component combinations that solve recurring product flows and user goals.</p><button onClick={() => setPage("patterns")}>Explore patterns →</button></article>
    </div></section>
  </>;
}

function Governance() {
  return <><PageHeader eyebrow="FOUNDATIONS · GOVERNANCE" title="Token governance" description="The rules that keep design intent stable across brands, themes, Figma, and production code." />
    <section className="decision"><span>Current decision</span><h2>Two token layers. One shared language.</h2><p>The current architecture contains primitive and semantic tokens. Components consume semantic tokens directly. A component-specific layer will only be introduced when proven decoupling needs arise.</p></section>
    <section className="section-block"><p className="section-index">01 / ARCHITECTURE</p><h2>From raw value to product intent</h2><div className="architecture">
      <article><span>Layer 01</span><h3>Primitives</h3><code>CarBrain/deep-blue/600</code><p>Raw brand and palette values. Never consumed directly by components.</p></article><b>→</b>
      <article><span>Layer 02</span><h3>Semantics</h3><code>color/action/primary/base</code><p>Stable purpose and hierarchy. The alias changes between modes.</p></article><b>→</b>
      <article><span>Consumer</span><h3>Components</h3><code>Button · Link · Checkbox</code><p>Components use the appropriate semantic token for each visual property.</p></article>
    </div></section>
    <section className="two-col section-block"><div><p className="section-index">02 / THEMING</p><h2>Product and appearance are separate dimensions</h2><p>A theme is the combination of a product identity and an appearance. Semantic names remain stable while their primitive aliases change.</p></div><div className="mode-list"><span>CarBrain <b>Light</b></span><span>CarBrain <b>Dark</b></span><span>BrandX <b>Light · experimental</b></span></div></section>
    <section className="section-block"><p className="section-index">03 / NAMING</p><h2>A predictable naming contract</h2><div className="syntax"><span>color</span><i>/</i><span>category</span><i>/</i><span>role or hierarchy</span><i>/</i><span>optional variant</span></div><ul className="rules"><li>Use singular categories: <code>icon</code>, not <code>icons</code>.</li><li>Do not include a brand name in semantic tokens.</li><li>Prefer purpose-based names for text, icon, stroke, and background.</li><li>Use intensity names only when intensity is the family’s main dimension.</li><li>Intensity is not interaction state; component behavior defines hover, pressed, focus, and disabled.</li></ul></section>
  </>;
}

function Tokens({ theme }: { theme: Theme }) {
  const modeIndex = theme === "carbrain-light" ? 1 : theme === "carbrain-dark" ? 2 : 3;
  return <><PageHeader eyebrow="FOUNDATIONS · DESIGN TOKENS" title="Design tokens" description="A platform-ready catalog of primitive values and semantic decisions. Imported Figma Variables will populate this model without changing the page structure." />
    <div className="status-note"><span>Data source</span><strong>Curated from the current governance review</strong><small>Awaiting complete Variables export</small></div>
    <section className="section-block"><p className="section-index">01 / SEMANTIC TOKENS</p><h2>Resolved for {themes.find(t => t.id === theme)?.label}</h2><div className="token-table"><div className="token-row token-head"><span>Token</span><span>Resolved alias</span><span>Usage</span><span></span></div>{semanticRows.map(row => <div className="token-row" key={row[0]}><code>{row[0]}</code><code>{row[modeIndex]}</code><span>{row[4]}</span><CopyButton value={row[0]} /></div>)}</div></section>
    <section className="section-block"><p className="section-index">02 / GOVERNANCE</p><h2>Rules for adding a token</h2><div className="check-grid">{["Has a real use case","Belongs to the right category","Has aliases for every active mode","Maps to code without ambiguity","Passes contrast in real context","Includes usage and migration notes"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></section>
  </>;
}

function Color() {
  return <><PageHeader eyebrow="FOUNDATIONS · COLOR" title="Color" description="Primitive palettes carry brand values. Semantic tokens carry product intent. Components should prefer semantic color tokens whenever possible." />
    <Palette title="CarBrain / deep-blue" colors={deepBlue} /><Palette title="CarBrain / light-blue" colors={lightBlue} />
    <section className="section-block"><p className="section-index">APPLICATION</p><h2>Use color by purpose, not appearance</h2><div className="guidance-grid"><article><span className="do">Do</span><h3>Choose the semantic role</h3><code>color/text/default</code><p>The token remains meaningful when its resolved value changes.</p></article><article><span className="dont">Don’t</span><h3>Reach for the matching hex</h3><code>#003B76</code><p>A primitive value does not communicate intent or adapt safely to themes.</p></article></div></section>
  </>;
}

function Palette({ title, colors }: { title: string; colors: string[][] }) {
  return <section className="section-block palette-section"><p className="section-index">PRIMITIVE PALETTE</p><h2>{title}</h2><div className="palette">{colors.map(([step,hex])=><article key={step}><div style={{backgroundColor:hex}}></div><span>{step}</span><code>{hex}</code><CopyButton value={hex} /></article>)}</div></section>;
}

function Typography() {
  return <><PageHeader eyebrow="FOUNDATIONS · TYPOGRAPHY" title="Typography" description="A reserved catalog surface for the CAS type scale, roles, weights, line heights, and code mappings." /><section className="type-specimen"><span>Display</span><h2>A shared language for product teams.</h2><code>Typography variables pending export</code></section><section className="section-block"><p className="section-index">PLANNED CATALOG</p><div className="check-grid">{["Font families","Display and heading roles","Body and label roles","Size and weight scale","Line height and tracking","Figma-to-code mapping"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></section></>;
}

function Components() {
  return <><PageHeader eyebrow="COMPONENTS · INDEX" title="Components" description="Reusable building blocks that solve specific interface needs. Each component will combine live examples, guidance, specifications, accessibility, and code." /><div className="component-layout"><section className="component-preview"><div className="preview-bar"><span>Preview</span><button>CarBrain · Light</button></div><div className="button-showcase"><button className="primary">Primary action</button><button className="secondary">Secondary</button><button className="outline">Outlined</button></div></section><aside className="component-template"><p className="section-index">COMPONENT PAGE TEMPLATE</p>{["Overview","Playground","Usage","Anatomy","Variants & states","Specs","Accessibility","Code","Changelog"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</aside></div><section className="section-block"><p className="section-index">MVP PILOT</p><h2>Button will validate the documentation model</h2><p className="wide-copy">The first complete component page will prove the connection between Figma properties, production behavior, semantic tokens, accessibility guidance, and copyable code before the pattern is scaled to the remaining library.</p></section></>;
}

function Placeholder({ type }: { type: "Patterns" | "Resources" }) {
  const copy = type === "Patterns" ? "Approved combinations of components and foundations that solve recurring user goals and product flows." : "The tools, libraries, releases, and contribution paths teams need to adopt and evolve the system.";
  return <><PageHeader eyebrow={`${type.toUpperCase()} · INDEX`} title={type} description={copy} /><section className="empty-state"><span>Planned for the next iteration</span><h2>The structure is ready to grow.</h2><p>This area remains intentionally focused until the underlying assets and ownership model are validated.</p></section></>;
}

export default function Home() {
  const [page, setPage] = useState<Page>("overview");
  const [theme, setTheme] = useState<Theme>("carbrain-light");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => { const saved = localStorage.getItem("cas-theme") as Theme | null; if (saved) setTheme(saved); }, []);
  useEffect(() => { localStorage.setItem("cas-theme", theme); document.documentElement.dataset.theme = theme; }, [theme]);
  const matches = useMemo(() => query.trim() ? nav.flatMap(g => g.items).filter(x => x.label.toLowerCase().includes(query.toLowerCase())) : [], [query]);
  const go = (id: string) => { setPage(id as Page); setMobileOpen(false); setQuery(""); window.scrollTo({top:0,behavior:"smooth"}); };
  return <div className={`app ${collapsed ? "is-collapsed" : ""}`}>
    <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">☰</button><button className="brand" onClick={() => go("overview")}><span>CAS</span><b>Design System</b><small>v1.0</small></button><div className="search-wrap"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the system" aria-label="Search the system" />{matches.length > 0 && <div className="search-results">{matches.map(x=><button key={x.id} onClick={()=>go(x.id)}>{x.label}<span>Open →</span></button>)}</div>}</div><div className="top-actions"><a href="https://www.figma.com/design/ljmdJkv2aa10SL4NazHYAC/____CAS-Design-System--v1.0--____?node-id=12-4" target="_blank" rel="noreferrer">Figma ↗</a><select value={theme} onChange={e=>setTheme(e.target.value as Theme)} aria-label="Select theme">{themes.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></div></header>
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}><nav>{nav.map(group=><div className="nav-group" key={group.label}><button className="nav-title" onClick={()=>{ if(collapsed) setCollapsed(false); else go(group.items[0].id); }}><span>{group.mark}</span><b>{group.label}</b></button><div className="nav-items">{group.items.map(item=><button key={item.id} className={page===item.id?"active":""} onClick={()=>go(item.id)}>{item.label}</button>)}</div></div>)}</nav><button className="collapse" onClick={()=>setCollapsed(!collapsed)}>{collapsed ? "→" : "← Collapse"}</button></aside>
    <main>{page === "overview" && <Overview setPage={go} />}{page === "governance" && <Governance />}{page === "tokens" && <Tokens theme={theme} />}{page === "color" && <Color />}{page === "typography" && <Typography />}{page === "components" && <Components />}{page === "patterns" && <Placeholder type="Patterns" />}{page === "resources" && <Placeholder type="Resources" />}<footer><span>CAS Design System</span><span>English · v1.0 · 2026</span></footer></main>
  </div>;
}
