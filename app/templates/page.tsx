import { PageHeader } from "@/components/page-header";

export default function Templates() {
  return (
    <>
      <PageHeader eyebrow="TEMPLATES · INDEX" title="Templates" description="Approved page and screen templates that combine components and foundations to solve recurring user goals and product flows." />
      <section className="empty-state">
        <span>Planned for the next iteration</span>
        <h2>The structure is ready to grow.</h2>
        <p>This area remains intentionally focused until the underlying assets and ownership model are validated.</p>
      </section>
    </>
  );
}
