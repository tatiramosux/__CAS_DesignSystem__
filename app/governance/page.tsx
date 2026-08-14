import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PageHeader } from "@/components/page-header";

export default function Governance() {
  return (
    <>
      <PageHeader eyebrow="FOUNDATIONS · GOVERNANCE" title="Token governance" description="The rules that keep design intent stable across brands, themes, Figma, and production code." />
      <section className="decision"><span>Current decision</span><h2>Two token layers. One shared language.</h2><p>The current architecture contains primitive and semantic tokens. Components consume semantic tokens directly. A component-specific layer will only be introduced when proven decoupling needs arise.</p></section>
      <section className="section-block">
        <p className="section-index">01 / ARCHITECTURE</p><h2>From raw value to product intent</h2>
        <div className="architecture">
          <article><span>Layer 01</span><h3>Primitives</h3><code>CarBrain/deep-blue/600</code><p>Raw brand and palette values. Never consumed directly by components.</p></article><b><FontAwesomeIcon icon={faArrowRight} /></b>
          <article><span>Layer 02</span><h3>Semantics</h3><code>color/action/primary/base</code><p>Stable purpose and hierarchy. The alias changes between modes.</p></article><b><FontAwesomeIcon icon={faArrowRight} /></b>
          <article><span>Consumer</span><h3>Components</h3><code>Button · Link · Checkbox</code><p>Components use the appropriate semantic token for each visual property.</p></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">02 / THEMING</p><h2>Product and appearance are separate dimensions</h2><p className="wide-copy">A theme is the combination of a product identity and an appearance. Semantic names remain stable while their primitive aliases change.</p>
        <div className="theme-cards">
          <article className="theme-card theme-card--carbrain-light"><img src="/CarBrain-on-light.png" alt="CarBrain" /><div><strong>CarBrain · Light</strong><span>Production theme</span></div></article>
          <article className="theme-card theme-card--carbrain-dark"><img src="/CarBrain-on-dark.svg" alt="CarBrain" /><div><strong>CarBrain · Dark</strong><span>Production theme</span></div></article>
          <article className="theme-card theme-card--brandx-light"><img src="/BrandX.svg" alt="BrandX" /><div><strong>BrandX · Light</strong><span>Experimental theme</span></div></article>
        </div>
      </section>
      <section className="section-block">
        <p className="section-index">03 / NAMING</p><h2>A predictable naming contract</h2>
        <div className="syntax"><span>color</span><i>/</i><span>category</span><i>/</i><span>role or hierarchy</span><i>/</i><span>optional variant</span></div>
        <ul className="rules">
          <li>Use singular categories: <code>icon</code>, not <code>icons</code>.</li>
          <li>Do not include a brand name in semantic tokens.</li>
          <li>Prefer purpose-based names for text, icon, stroke, and background.</li>
          <li>Use intensity names only when intensity is the family&rsquo;s main dimension.</li>
          <li>Intensity is not interaction state; component behavior defines hover, pressed, focus, and disabled.</li>
        </ul>
      </section>
    </>
  );
}
