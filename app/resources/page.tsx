import { PageHeader } from "@/components/page-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const figmaFiles = [
  {
    name: "CAS Design System (v1.0)",
    href: "https://www.figma.com/design/ljmdJkv2aa10SL4NazHYAC/____CAS-Design-System--v1.0--____?node-id=1-574&t=f1D4dalJv9MCo0x2-1",
  },
  {
    name: "CarBrain Middle version (GO Flow)",
    href: "https://www.figma.com/design/aJZsBzofAQdUSUHjGODesj/Middle-DS--v2-?node-id=10-2&t=RDcrgTOeCLj6ajjH-1",
  },
];

const spreadsheets = [
  {
    name: "CarBrain Migration tracker",
    href: "https://casauto.sharepoint.com/:x:/s/SoftwareEngineering-CarBrainMigration/IQBPKjAkvN0cSIs8Gns3kn9FAT9OGOZwfi7DUD4BBmAc8bM?e=b4jNqa",
  },
];

function ResourceGroup({ title, items, cta }: { title: string; items: { name: string; href: string }[]; cta: string }) {
  return (
    <section className="section-block">
      <h2>{title}</h2>
      <div className="resource-list">
        {items.map(item => (
          <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="resource-row">
            <span>{item.name}</span>
            <b>{cta} <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></b>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Resources() {
  return (
    <>
      <PageHeader eyebrow="RESOURCES · INDEX" title="Resources" description="The tools, libraries, releases, and contribution paths teams need to adopt and evolve the system." />
      <ResourceGroup title="Figma files" items={figmaFiles} cta="Open in Figma" />
      <ResourceGroup title="Excel" items={spreadsheets} cta="Open spreadsheet" />
    </>
  );
}
