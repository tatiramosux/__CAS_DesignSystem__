import { PageHeader } from "@/components/page-header";

export default function Patterns() {
  return (
    <>
      <PageHeader eyebrow="PATTERNS · INDEX" title="Patterns" description="Approved combinations of components and foundations that solve recurring user goals and product flows." />
      <section className="empty-state">
        <span>Planned for the next iteration</span>
        <h2>The structure is ready to grow.</h2>
        <p>This area remains intentionally focused until the underlying assets and ownership model are validated.</p>
      </section>
    </>
  );
}
