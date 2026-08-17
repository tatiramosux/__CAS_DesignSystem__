import { PageHeader } from "@/components/page-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const prototypes: { name: string; description?: string; href: string }[] = [];

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
