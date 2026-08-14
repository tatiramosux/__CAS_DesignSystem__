import { PageHeader } from "@/components/page-header";

export default function Resources() {
  return (
    <>
      <PageHeader eyebrow="RESOURCES · INDEX" title="Resources" description="The tools, libraries, releases, and contribution paths teams need to adopt and evolve the system." />
      <section className="empty-state">
        <span>Planned for the next iteration</span>
        <h2>The structure is ready to grow.</h2>
        <p>This area remains intentionally focused until the underlying assets and ownership model are validated.</p>
      </section>
    </>
  );
}
