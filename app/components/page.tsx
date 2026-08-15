import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

const linkedComponentPages: Partial<Record<string, string>> = { "Buttons": "/components/buttons", "Text Input": "/components/text-input", "Badges": "/components/badges", "Icon": "/components/icon", "Dropdown": "/components/dropdown" };

const catalog = ["Alerts", "Avatars", "Badges", "Buttons", "Breadcrumbs", "Checkbox", "Dropdown", "Icon", "Loading", "Divider", "Pagination", "Progress Indicators", "Radio Button", "Rating", "Scroll", "Sidebar", "Stepper", "Switch", "Table", "Tabs", "Text Area", "Text Input", "Tooltip", "Toggle Button"]
  .sort((a, b) => a.localeCompare(b));

export default function ComponentIndex() {
  return (
    <>
      <PageHeader eyebrow="COMPONENTS · INDEX" title="Components" description="Reusable CAS interface elements aligned between Figma and React. Each page documents behavior, variants, tokens, accessibility, and implementation." />
      <section>
        <p className="section-index">FIGMA LIBRARY</p><h2>{catalog.length} components</h2>
        <p className="wide-copy">Cards become interactive when their documentation page is available in this library.</p>
        <div className="component-catalog">
          {catalog.map(name => linkedComponentPages[name] ? (
            <Link className="component-card is-linked" key={name} href={linkedComponentPages[name]!}>
              <strong>{name}</strong><p>CAS component library</p><Badge size="small" color="success">Documentation ready</Badge>
            </Link>
          ) : (
            <article className="component-card" key={name}><strong>{name}</strong><p>CAS component library</p></article>
          ))}
        </div>
      </section>
    </>
  );
}
