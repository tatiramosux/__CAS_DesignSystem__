"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PageHeader } from "@/components/page-header";
import { CopyButton } from "@/components/copy-button";
import { audit, collectionSummary, migrations, semanticTokens, themes } from "@/app/token-data";
import { useTheme } from "@/components/theme-context";

export default function Tokens() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("all");
  const categories = ["all", ...new Set(semanticTokens.filter(token => !token.ungrouped).map(token => token.canonicalName.split("/")[1]))];
  const visible = semanticTokens.filter(token => filter === "all" || token.canonicalName.split("/")[1] === filter);
  return (
    <>
      <PageHeader eyebrow="FOUNDATIONS · DESIGN TOKENS" title="Design tokens" description="The canonical catalog generated from the CAS Figma Variables export, with source aliases preserved for governance and migration." />
      <div className="status-note"><span>Figma source</span><strong>{audit.variableCount} variables · {audit.collectionCount} collections · {themes.length} color modes</strong><small>Imported August 12, 2026</small></div>
      <section className="collection-strip">{collectionSummary.map(collection => <article key={collection.name}><strong>{collection.count}</strong><span>{collection.name.replace(/^\d+ - /, "")}</span><small>{collection.name === "2 - Semantic" ? themes.find(t => t.id === theme)?.label : collection.modes.join(" · ")}</small></article>)}</section>
      <section className="section-block">
        <div className="section-toolbar">
          <div><p className="section-index">01 / SEMANTIC TOKENS</p><h2>{themes.find(t => t.id === theme)?.label}</h2></div>
          <select value={filter} onChange={event => setFilter(event.target.value)} aria-label="Filter semantic tokens">
            <option value="all">All categories</option>
            {categories.slice(1).map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div className="token-table">
          <div className="token-row token-head"><span>Canonical token</span><span>Figma alias</span><span>Resolved value</span><span></span></div>
          {visible.map(token => (
            <div className="token-row" key={token.sourceName}>
              <div className="token-name"><code>{token.canonicalName}</code>{token.sourceName !== token.canonicalName && <small>Figma: {token.sourceName}</small>}</div>
              <code>{token.modes[theme].alias}</code>
              <span className="resolved-value"><i style={{ background: token.modes[theme].resolved }}></i>{token.modes[theme].resolved}</span>
              <CopyButton value={token.canonicalName} />
            </div>
          ))}
        </div>
      </section>
      <section className="section-block"><p className="section-index">02 / MIGRATION REPORT</p><h2>{migrations.length} names require governance action</h2><div className="migration-list">{migrations.map(item => <div key={item.source}><code>{item.source}</code><span><FontAwesomeIcon icon={faArrowRight} /></span><code>{item.target}</code><small>{item.issue}</small></div>)}</div></section>
      <section className="section-block"><p className="section-index">03 / GOVERNANCE</p><h2>Rules for adding a token</h2><div className="check-grid">{["Has a real use case","Belongs to the right category","Has aliases for every active mode","Maps to code without ambiguity","Passes contrast in real context","Includes usage and migration notes"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></section>
    </>
  );
}
