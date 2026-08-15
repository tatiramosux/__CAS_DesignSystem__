import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

const linkedComponentPages: Partial<Record<string, string>> = {
  "Accordion": "/components/accordion",
  "Alerts": "/components/alerts",
  "Avatars": "/components/avatars",
  "Badges": "/components/badges",
  "Breadcrumbs": "/components/breadcrumbs",
  "Buttons": "/components/buttons",
  "Card": "/components/card",
  "Checkbox": "/components/checkbox",
  "Content Card": "/components/content-card",
  "Divider": "/components/divider",
  "Dropdown": "/components/dropdown",
  "Icon": "/components/icon",
  "Label": "/components/label",
  "Loading": "/components/loading",
  "Pagination": "/components/pagination",
  "Progress Indicators": "/components/progress-indicators",
  "Radio Button": "/components/radio-button",
  "Rating": "/components/rating",
  "Scroll": "/components/scroll",
  "Sidebar": "/components/sidebar",
  "Stepper": "/components/stepper",
  "Switch": "/components/switch",
  "Table": "/components/table",
  "Tabs": "/components/tabs",
  "Text Area": "/components/text-area",
  "Text Input": "/components/text-input",
  "Toggle Button": "/components/toggle-button",
  "Tooltip": "/components/tooltip",
};

const underConstructionPages = new Set([
  "Checkbox", "Card", "Content Card", "Pagination", "Progress Indicators", "Radio Button", "Rating",
  "Scroll", "Switch", "Table", "Tabs", "Text Area", "Toggle Button", "Tooltip",
]);

const catalog = ["Accordion", "Alerts", "Avatars", "Badges", "Buttons", "Breadcrumbs", "Card", "Checkbox", "Content Card", "Dropdown", "Divider", "Icon", "Label", "Loading", "Pagination", "Progress Indicators", "Radio Button", "Rating", "Scroll", "Sidebar", "Stepper", "Switch", "Table", "Tabs", "Text Area", "Text Input", "Tooltip", "Toggle Button"]
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
              <strong>{name}</strong><p>CAS component library</p>
              {underConstructionPages.has(name) ? (
                <Badge size="small" color="warning">Under construction</Badge>
              ) : (
                <Badge size="small" color="success">Documentation ready</Badge>
              )}
            </Link>
          ) : (
            <article className="component-card" key={name}><strong>{name}</strong><p>CAS component library</p></article>
          ))}
        </div>
      </section>
    </>
  );
}
