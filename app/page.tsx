"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { semanticTokens, themes } from "@/app/token-data";
import { useTheme } from "@/components/theme-context";

export default function Overview() {
  const { theme } = useTheme();
  const primary = semanticTokens.find(token => token.canonicalName === "color/action/primary/base")?.modes[theme];
  return (
    <>
      <section className="hero">
        <p className="eyebrow">CAS DESIGN SYSTEM · V1.0</p>
        <h1>Build consistent products,<br /><span>faster.</span></h1>
        <p className="lead">A shared language for designers and developers to create accessible, theme-ready CarBrain experiences with confidence.</p>
        <div className="hero-actions">
          <Button asChild size="large" trailingIcon><Link href="/governance">Explore foundations</Link></Button>
          <Button asChild size="large" buttonType="secondary" treatment="outline" trailingIcon><Link href="/components">Browse components</Link></Button>
        </div>
        <div className="theme-demo" aria-label="Theme architecture">
          <div><span>Semantic token</span><strong>color/action/primary/base</strong></div><i><FontAwesomeIcon icon={faArrowRight} /></i>
          <div><span>Current mode</span><strong>{themes.find(item => item.id === theme)?.label}</strong></div><i><FontAwesomeIcon icon={faArrowRight} /></i>
          <div className="swatch-line"><b style={{ background: primary?.resolved }}></b><span>Primitive alias</span><strong>{primary?.alias}</strong></div>
        </div>
      </section>
      <section className="section-block">
        <p className="eyebrow">EXPLORE THE SYSTEM</p><h2>One system, two crafts.</h2>
        <div className="feature-grid">
          <article><span className="feature-number">01</span><h3>Foundations</h3><p>Governance, tokens, color, type, spacing, radius, grid, iconography, and accessibility.</p><Button asChild buttonType="secondary" treatment="outline" size="small" trailingIcon><Link href="/governance">Read foundations</Link></Button></article>
          <article><span className="feature-number">02</span><h3>Components</h3><p>Reusable interface building blocks documented with usage, anatomy, specs, accessibility, and code.</p><Button asChild buttonType="secondary" treatment="outline" size="small" trailingIcon><Link href="/components">Open components</Link></Button></article>
          <article><span className="feature-number">03</span><h3>Templates</h3><p>Approved page and screen templates that solve recurring product flows and user goals.</p><Button asChild buttonType="secondary" treatment="outline" size="small" trailingIcon><Link href="/templates">Explore templates</Link></Button></article>
        </div>
      </section>
    </>
  );
}
