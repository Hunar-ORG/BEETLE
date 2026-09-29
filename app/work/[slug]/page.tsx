import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { ProjectDetail } from "@/components/work/ProjectDetail";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Project Not Found | BEETLE",
    };
  }

  return {
    title: `${project.name} — ${project.category} | BEETLE`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
