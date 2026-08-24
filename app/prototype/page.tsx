import { PageHeader } from "@/components/page-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const prototypes: { name: string; description?: string; href: string }[] = [
  { name: "Go Flow (v4)", href: "https://carbrain-go-flow-v4.vercel.app/" },
  { name: "Go Flow (v3)", href: "https://carbrain-middle-ds-v2.vercel.app/" },
  { name: "Go Flow (v2)", href: "https://carbrain-v2.vercel.app/" },
  { name: "Go Flow (v1)", href: "https://y-three-livid-63.vercel.app/" },
];

export default function PrototypePage() {
  return (
    <>
      <PageHeader eyebrow="PROTOTYPE · INDEX" title="Prototype" description="Interactive prototypes published from the CAS Design System, linked here for review and reference." />
      {prototypes.length > 0 ? (
        <section className="section-block">
          <div className="resource-list">
            {prototypes.map(item => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="resource-row">
                <span>{item.name}</span>
                <b>Open prototype <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></b>
              </a>
            ))}
          </div>
        </section>
      ) : (
        <section className="empty-state">
          <span>No prototypes yet</span>
          <h2>Nothing published here yet.</h2>
          <p>Interactive prototype links will be listed here once they&apos;re shared.</p>
        </section>
      )}
    </>
  );
}
