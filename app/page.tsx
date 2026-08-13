"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare, faBars, faChevronLeft, faChevronRight, faMagnifyingGlass, faSquare } from "@fortawesome/free-solid-svg-icons";
import { audit, collectionSummary, cssVariables, grids, migrations, paletteGroups, radii, semanticTokens, themes, typography, units, type ThemeId } from "./token-data";

type Page = "overview" | "governance" | "tokens" | "color" | "typography" | "units" | "radius" | "grid" | "components" | "patterns" | "resources";

const nav = [
  { label: "Getting Started", mark: "01", items: [{ id: "overview", label: "Overview" }] },
  { label: "Foundations", mark: "02", items: [
    { id: "governance", label: "Governance" }, { id: "tokens", label: "Design tokens" },
    { id: "color", label: "Color" }, { id: "typography", label: "Typography" },
    { id: "units", label: "Spacing & units" }, { id: "radius", label: "Radius" }, { id: "grid", label: "Grid & layout" },
  ] },
  { label: "Components", mark: "03", items: [{ id: "components", label: "Component index" }] },
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
      <div className="hero-actions"><Button size="lg" onClick={() => setPage("governance")}>Explore foundations</Button><Button size="lg" variant="secondary" onClick={() => setPage("components")}>Browse components</Button></div>
      <div className="theme-demo" aria-label="Theme architecture">
        <div><span>Semantic token</span><strong>color/action/primary/base</strong></div><i><FontAwesomeIcon icon={faArrowRight} /></i>
        <div><span>Current mode</span><strong>{themes.find(item => item.id === theme)?.label}</strong></div><i><FontAwesomeIcon icon={faArrowRight} /></i>
        <div className="swatch-line"><b style={{ background: primary?.resolved }}></b><span>Primitive alias</span><strong>{primary?.alias}</strong></div>
      </div>
    </section>
    <section className="section-block"><p className="eyebrow">EXPLORE THE SYSTEM</p><h2>One system, two crafts.</h2><div className="feature-grid">
      <article><span className="feature-number">01</span><h3>Foundations</h3><p>Governance, tokens, color, type, spacing, radius, grid, iconography, and accessibility.</p><button onClick={() => setPage("governance")}>Read the foundations <FontAwesomeIcon icon={faArrowRight} /></button></article>
      <article><span className="feature-number">02</span><h3>Components</h3><p>Reusable interface building blocks documented with usage, anatomy, specs, accessibility, and code.</p><button onClick={() => setPage("components")}>Open the component index <FontAwesomeIcon icon={faArrowRight} /></button></article>
      <article><span className="feature-number">03</span><h3>Patterns</h3><p>Approved component combinations that solve recurring product flows and user goals.</p><button onClick={() => setPage("patterns")}>Explore patterns <FontAwesomeIcon icon={faArrowRight} /></button></article>
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
    <section className="two-col section-block"><div><p className="section-index">02 / THEMING</p><h2>Product and appearance are separate dimensions</h2><p>A theme is the combination of a product identity and an appearance. Semantic names remain stable while their primitive aliases change.</p></div><div className="mode-list"><span>CarBrain <b>Light</b></span><span>CarBrain <b>Dark</b></span><span>BrandX <b>Light · experimental</b></span></div></section>
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

function Components() {
  const catalog = ["Alerts","Avatars","Badges","Buttons","Breadcrumbs","Checkbox","Dropdown","Loading","Divider","Pagination","Progress Indicators","Radio Button","Rating","Scroll","Sidebar","Stepper","Switch","Table","Tabs","Text Area","Text Input","Tooltip","Toggle Button"].map(name => ({ name, status: "Ready" }));
  const review = ["Accordion","Cards","ComboBox","Dialog","Navigation Menu","Pill"].map(name => ({ name, status: "Under review" }));
  return <><PageHeader eyebrow="COMPONENTS · INDEX" title="Components" description="The component catalog currently available in the CAS Figma library. Ready items can be documented and mapped to React; items under review should not be treated as stable contracts." /><div className="component-layout"><section className="component-preview"><div className="preview-bar"><span>Button · live React mapping</span><button>CarBrain · Light</button></div><div className="button-showcase"><Button>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outlined</Button></div></section><aside className="component-template"><p className="section-index">COMPONENT PAGE TEMPLATE</p>{["Overview","Playground","Usage","Anatomy","Variants & states","Specs","Accessibility","Code","Changelog"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</aside></div><section className="section-block"><p className="section-index">FIGMA LIBRARY</p><h2>{catalog.length} ready components</h2><div className="component-catalog">{[...catalog,...review].map(item=><article key={item.name}><strong>{item.name}</strong><p>CAS component library</p><span className={item.status === "Ready" ? "" : "review"}>{item.status}</span></article>)}</div></section></>;
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
    <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation"><FontAwesomeIcon icon={faBars} /></button><button className="brand" onClick={() => go("overview")}><span>CAS</span><b>Design System</b><small>v1.0</small></button><div className="search-wrap"><FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} /><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the system" aria-label="Search the system" />{matches.length > 0 && <div className="search-results">{matches.map(x=><button key={x.id} onClick={()=>go(x.id)}>{x.label}<span>Open <FontAwesomeIcon icon={faArrowRight} /></span></button>)}</div>}</div><div className="top-actions"><a href="https://www.figma.com/design/ljmdJkv2aa10SL4NazHYAC/____CAS-Design-System--v1.0--____?node-id=12-4" target="_blank" rel="noreferrer">Figma <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a><select value={theme} onChange={e=>setTheme(e.target.value as ThemeId)} aria-label="Select theme">{themes.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></div></header>
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}><nav>{nav.map(group=><div className="nav-group" key={group.label}><button className="nav-title" onClick={()=>{ if(collapsed) setCollapsed(false); else go(group.items[0].id); }}><span>{group.mark}</span><b>{group.label}</b></button><div className="nav-items">{group.items.map(item=><button key={item.id} className={page===item.id?"active":""} onClick={()=>go(item.id)}><FontAwesomeIcon icon={faSquare} />{item.label}</button>)}</div></div>)}</nav><button className="collapse" onClick={()=>setCollapsed(!collapsed)}>{collapsed ? <FontAwesomeIcon icon={faChevronRight} /> : <><FontAwesomeIcon icon={faChevronLeft} /> Collapse</>}</button></aside>
    <main>{page === "overview" && <Overview setPage={go} theme={theme} />}{page === "governance" && <Governance />}{page === "tokens" && <Tokens theme={theme} />}{page === "color" && <Color />}{page === "typography" && <Typography />}{page === "units" && <ScalePage type="units" />}{page === "radius" && <ScalePage type="radius" />}{page === "grid" && <ScalePage type="grid" />}{page === "components" && <Components />}{page === "patterns" && <Placeholder type="Patterns" />}{page === "resources" && <Placeholder type="Resources" />}<footer><span>CAS Design System</span><span>English · Figma Variables source · 2026</span></footer></main>
  </div>;
}
