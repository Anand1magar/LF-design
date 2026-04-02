import { notFound } from "next/navigation";
import { portfolioItems } from "@/data/portfolioData";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";

/* ─── Static params for build-time generation ─── */
export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

/* ─── Dynamic metadata per project ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioItems.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found — LF Studio" };

  return {
    title: `${project.name} — LF Studio`,
    description: project.description,
    openGraph: {
      title: `${project.name} — LF Studio`,
      description: project.tagline,
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

/* ─── Page component ─── */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioItems.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectDetailPage project={project} slug={slug} />;
}
