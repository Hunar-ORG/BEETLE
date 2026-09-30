export interface Project {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  browserUrl?: string;
  projectUrl?: string;
  url?: string;
  identifier?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "detailing-monster",
    name: "Detailing Monster",
    category: "CAR DETAILING SITE",
    image: "/images/projects/pj1.png",
    browserUrl: "detailing-monster.beetle",
    identifier: "DETAILING MONSTER",
    description:
      "A high-performance automotive care and precision detailing web platform engineered with clear service tier exploration, booking workflows, and dynamic visual showcases.",
  },
  {
    slug: "stillroom-studio",
    name: "Stillroom Studio",
    category: "INTERIOR DESIGN SITE",
    image: "/images/projects/pj2.png",
    browserUrl: "stillroomstudio.beetle",
    projectUrl:
      "https://vercel.com/rayyan3/stillroomstudio/ACCzb3g3Y2ejc4vkvQxSTQsQycJa",
    identifier: "STILLROOM STUDIO",
    description:
      "A refined interior design studio showcase crafted for Stillroom Studio, focused on quiet confidence, tactile materiality, and editorial restraint.",
  },
  {
    slug: "skill-bridge",
    name: "Skill Bridge",
    category: "JOB SEARCH PLATFORM",
    image: "/images/projects/pj3.png",
    browserUrl: "skillbridge.beetle",
    identifier: "SKILL BRIDGE",
    description:
      "A streamlined talent discovery and job search platform featuring real-time role filtering, candidate matching workflows, and frictionless application journeys.",
  },
  {
    slug: "true-up",
    name: "True Up",
    category: "FINANCE RECONCILIATION SYSTEM",
    image: "/images/projects/pj4.png",
    browserUrl: "trueup.beetle",
    identifier: "TRUE UP",
    description:
      "An enterprise financial reconciliation system designed for modern treasury teams, unifying automated ledger balance auditing, audit logging, and automated discrepancy resolution.",
  },
];
