import { PageHeader } from "@/components/page-header";
import { units } from "@/app/token-data";

export default function Units() {
  return (
    <>
      <PageHeader eyebrow="FOUNDATIONS · SPACING & UNITS" title="Spacing & units" description="The base numeric scale shared by spacing, sizing, typography, and layout decisions." />
      <div className="scale-gallery units">
        {units.map(token => (
          <article key={token.name}>
            <div style={{ width: `${Math.min(Number(token.value), 160)}px` }}></div>
            <code>{token.name}</code><span>{token.value}px</span>
          </article>
        ))}
      </div>
    </>
  );
}
