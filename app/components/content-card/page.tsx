"use client";

import { ContentCard } from "@/components/ui/content-card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

const MEDIA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#B0E4FF'/><stop offset='1' stop-color='#D0DDFF'/></linearGradient></defs>" +
      "<rect width='200' height='100' fill='url(#g)'/></svg>"
  );

export default function ContentCardPage() {
  return (
    <>
      <PageHeader eyebrow="COMPONENTS · CONTENT CARD" title="Content Card" />
      <div>
      <p className="section-index">DESCRIPTION</p>
      <p className="wide-copy">A content card is a container that groups related information into a distinct unit, making content easier to identify, scan, and interact with.</p>
      <p className="section-index">PLAYGROUND MODE</p>
      <p className="wide-copy">A compact, single-row card pairing a bold label with a fixed-size media or icon slot — for list and media-row layouts.</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Badge size="small" color="warning">Partially implemented</Badge>
      </div>
      <section className="button-playground">
        <div className="component-preview">
          <div className="preview-bar"><span>Playground</span><span>Current theme</span></div>
          <div className="button-showcase">
            <div style={{ width: 290 }}><ContentCard label="Label" mediaSrc={MEDIA} /></div>
          </div>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">TOKENS & TYPOGRAPHY</p>
        <h2>Implementation bindings</h2>
        <div className="button-token-grid">
          {[["Border", "color/text/muted · 8% opacity"], ["Label", "Nunito Sans · 18 px · Bold 700"], ["Media size", "69 × 38 px"], ["Media radius", "8 px"], ["Corner radius", "radius/16 · 16 px"], ["Elevation", "shadow-xs · 0 1px 1px rgba(25,25,28,.04)"]].map(([label, value]) => (
            <article key={label}><strong>{label}</strong><code>{value}</code></article>
          ))}
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">COMPONENT STRUCTURE</p>
        <div className="component-template contract">
          {["Label · Editable text, truncates on overflow", "Media · Optional fixed 69×38 px thumbnail"].map((x, i) => (
            <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>
          ))}
        </div>
        <p className="wide-copy" style={{ marginTop: 16 }}>The Figma source page for this component is mostly unpopulated — no anatomy diagram or incorrect-example counterpart has been authored yet. This implementation covers the single populated example.</p>
      </section>
    </>
  );
}
