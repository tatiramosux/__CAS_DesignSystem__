import { PageHeader } from "@/components/page-header";
import { CopyButton } from "@/components/copy-button";
import { audit, paletteGroups } from "@/app/token-data";

function Palette({ title, colors }: { title: string; colors: { step: string; name: string; value: string }[] }) {
  return (
    <section className="section-block palette-section">
      <p className="section-index">PRIMITIVE PALETTE</p><h2>{title}</h2>
      <div className="palette">
        {colors.map(color => (
          <article key={color.name}>
            <div style={{ backgroundColor: color.value }}></div>
            <span>{color.step}</span><code>{color.value}</code><CopyButton value={color.name} />
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Color() {
  return (
    <>
      <PageHeader eyebrow="FOUNDATIONS · COLOR" title="Color" description="Primitive palettes carry brand values. Semantic tokens carry product intent. Components should prefer semantic color tokens whenever possible." />
      <div className="status-note"><span>Figma source</span><strong>{audit.primitiveCount} primitive color variables</strong><small>{paletteGroups.length} solid palette families plus alpha colors</small></div>
      {paletteGroups.map(group => <Palette key={group.name} title={group.name} colors={group.colors} />)}
      <section className="section-block">
        <p className="section-index">APPLICATION</p><h2>Use color by purpose, not appearance</h2>
        <div className="guidance-grid">
          <article><span className="do">Do</span><h3>Choose the semantic role</h3><code>color/text/default</code><p>The token remains meaningful when its resolved value changes.</p></article>
          <article><span className="dont">Don&rsquo;t</span><h3>Reach for the matching hex</h3><code>#003B76</code><p>A primitive value does not communicate intent or adapt safely to themes.</p></article>
        </div>
      </section>
    </>
  );
}
