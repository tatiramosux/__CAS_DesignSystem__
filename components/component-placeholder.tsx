import { PageHeader } from "@/components/page-header";

export interface ComponentPlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  reason?: string;
}

export function ComponentPlaceholderPage({ eyebrow, title, description, reason }: ComponentPlaceholderPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <section className="empty-state">
        <span>Under construction</span>
        <h2>Not implemented yet.</h2>
        <p>{reason ?? "This component hasn't been built from Figma yet. It will be added here once its design and specs are shared."}</p>
      </section>
    </>
  );
}
