import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const teamsChatLink = (email: string) => `https://teams.microsoft.com/l/chat/0/0?users=${email}`;

const maintainers = [
  {
    initials: "TR",
    name: "Tati Ramos",
    subtitle: "UX / UI Designer",
    description: "Design system lead, connecting design to development.",
    email: "tatiane.r@casautomotive.com",
  },
  {
    initials: "FM",
    name: "Fabio Marques",
    subtitle: "UX / UI Designer",
    description: "Design System advocate, specializing in transforming platforms into high-impact experiences.",
    email: "fabio.m@casautomotive.com",
  },
];

export default function MaintainersPage() {
  return (
    <>
      <PageHeader eyebrow="RESOURCES · MAINTAINERS" title="Design Library Maintainers" description="The people who own and evolve the CAS Design System — reach out with questions, proposals, or governance requests." />
      <section className="section-block">
        <div className="guidance-grid">
          {maintainers.map(person => (
            <article key={person.email} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Avatar variant="text" size={48} initials={person.initials} />
              <div>
                <strong style={{ display: "block", color: "var(--text-strong)", fontSize: 16, fontWeight: 800 }}>{person.name}</strong>
                <span style={{ display: "block", color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>{person.subtitle}</span>
              </div>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 13, lineHeight: 1.55 }}>{person.description}</p>
              <a href={teamsChatLink(person.email)} target="_blank" rel="noreferrer" className="resource-row" style={{ marginTop: "auto" }}>
                <span>{person.email}</span>
                <b>Contact via Teams <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></b>
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
