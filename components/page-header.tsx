import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const sectionHubs: Record<string, string> = {
  "COMPONENTS": "/components",
  "TEMPLATES": "/templates",
  "RESOURCES": "/resources",
};

function toTitleCase(shouting: string) {
  return shouting.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  const [sectionRaw, pageRaw] = eyebrow.split(" · ");
  const isHub = pageRaw === "INDEX";
  const items = sectionRaw
    ? isHub
      ? [{ label: "Home", href: "/" }, { label: toTitleCase(sectionRaw) }]
      : [{ label: "Home", href: "/" }, { label: toTitleCase(sectionRaw), href: sectionHubs[sectionRaw] }, { label: title }]
    : null;

  return (
    <header className="page-heading">
      {items && <Breadcrumbs items={items} className="page-breadcrumb" />}
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="lead">{description}</p>}
    </header>
  );
}
