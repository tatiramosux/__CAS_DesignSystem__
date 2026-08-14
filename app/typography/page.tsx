import { PageHeader } from "@/components/page-header";
import { typography } from "@/app/token-data";

export default function Typography() {
  const heading = typography.find(token => token.name === "font-family/heading")?.desktop;
  const body = typography.find(token => token.name === "font-family/body")?.desktop;
  return (
    <>
      <PageHeader eyebrow="FOUNDATIONS · TYPOGRAPHY" title="Typography" description="The responsive type foundations exported from Figma, including font families, sizes, and weights for desktop and mobile." />
      <section className="type-specimen">
        <span>{heading} · Heading family</span>
        <h2 style={{ fontFamily: heading }}>A shared language for product teams.</h2>
        <code>{body} · Body family</code>
      </section>
      <section className="section-block">
        <p className="section-index">TYPE TOKENS</p><h2>Desktop and mobile mappings</h2>
        <div className="foundation-table">
          <div className="foundation-row head"><span>Token</span><span>Desktop</span><span>Mobile</span></div>
          {typography.map(token => <div className="foundation-row" key={token.name}><code>{token.name}</code><span>{token.desktop}</span><span>{token.mobile}</span></div>)}
        </div>
      </section>
    </>
  );
}
