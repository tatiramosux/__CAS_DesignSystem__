import { PageHeader } from "@/components/page-header";
import { grids } from "@/app/token-data";

export default function Grid() {
  return (
    <>
      <PageHeader eyebrow="FOUNDATIONS · GRID & LAYOUT" title="Grid & layout" description="Responsive grid values for desktop, tablet, and mobile breakpoints." />
      <div className="foundation-table foundation-table--grid">
        <div className="foundation-row grid-head"><span>Token</span><span>Desktop</span><span>Tablet</span><span>Mobile</span></div>
        {grids.map(token => <div className="foundation-row grid-row" key={token.name}><code>{token.name}</code><span>{token.desktop}</span><span>{token.tablet}</span><span>{token.mobile}</span></div>)}
      </div>
      <div className="grid-preview">
        {["Desktop · 12 columns", "Tablet · 6 columns", "Mobile · 4 columns"].map((label, index) => (
          <article key={label}>
            <span>{label}</span>
            <div style={{ gridTemplateColumns: `repeat(${[12, 6, 4][index]}, 1fr)` }}>
              {Array.from({ length: [12, 6, 4][index] }).map((_, i) => <i key={i}></i>)}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
