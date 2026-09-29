export interface Project {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "project-one",
    name: "Project One",
    category: "Business Website",
    image: "",
    description:
      "A modern, high-performance web platform built to establish digital authority, present enterprise capabilities with absolute clarity, and provide an effortless user experience across every device.",
  },
  {
    slug: "project-two",
    name: "Project Two",
    category: "Service Brand",
    image: "",
    description:
      "A tailored digital identity and web presence crafted for an executive advisory firm, focused on quiet confidence, editorial restraint, and lasting trust.",
  },
  {
    slug: "project-three",
    name: "Project Three",
    category: "Online Store",
    image: "",
    description:
      "A minimalist digital storefront engineered for curated physical editions and design objects, featuring fluid catalog exploration, clear typography, and a frictionless purchase journey.",
  },
];
