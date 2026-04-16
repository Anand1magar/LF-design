import { notFound } from "next/navigation";
import { portfolioItems } from "@/data/portfolioData";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { JsonLd } from "@/components/layout/JsonLd";

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
    title: project.name,
    description: project.description,
    alternates: { canonical: `https://www.lftechnology.com/lfdesign/project/${project.slug}` },
    openGraph: {
      title: `${project.name} — LF Studio`,
      description: project.tagline,
      url: `https://www.lftechnology.com/lfdesign/project/${project.slug}`,
      images: project.image
        ? [{ url: project.image, width: 1200, height: 630, alt: project.name }]
        : [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — LF Studio`,
      description: project.tagline,
      images: project.image ? [project.image] : ["/og-default.jpg"],
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

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `https://www.lftechnology.com/lfdesign/project/${project.slug}`,
    dateCreated: project.year,
    creator: {
      "@type": "Organization",
      name: "LF Studio",
      url: "https://www.lftechnology.com/lfdesign",
    },
    ...(project.image && { image: `https://www.lftechnology.com/lfdesign${project.image}` }),
    keywords: project.tags?.join(", "),
    genre: project.category,
  };

  return (
    <>
      <JsonLd data={creativeWorkSchema} />
      <ProjectDetailPage project={project} slug={slug} />
    </>
  );
}
