import { PageHeader } from "@/components/page-header";
import { radii } from "@/app/token-data";

export default function Radius() {
  return (
    <>
      <PageHeader eyebrow="FOUNDATIONS · RADIUS" title="Radius" description="Corner-radius values available for component and surface geometry." />
      <div className="scale-gallery radius">
        {radii.map(token => (
          <article key={token.name}>
            <div style={{ borderRadius: `${Math.min(Number(token.value), 40)}px` }}></div>
            <code>{token.name}</code><span>{token.value}px</span>
          </article>
        ))}
      </div>
    </>
  );
}
