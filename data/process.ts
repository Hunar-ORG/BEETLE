export interface ProcessStep {
  number: string;
  name: string;
  tagline: string;
  description: string;
  visualType: "discover" | "design" | "build" | "launch";
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    name: "DISCOVER",
    tagline: "Foundation & Strategy",
    description:
      "Understand the business, audience, goals, and what needs to be communicated.",
    visualType: "discover",
  },
  {
    number: "02",
    name: "DESIGN",
    tagline: "Form & Identity",
    description:
      "Shape the visual direction, user experience, structure, and interaction around the business.",
    visualType: "design",
  },
  {
    number: "03",
    name: "BUILD",
    tagline: "Engineering & Craft",
    description:
      "Turn the approved direction into a fast, responsive, production-ready website.",
    visualType: "build",
  },
  {
    number: "04",
    name: "LAUNCH",
    tagline: "Deployment & Presence",
    description:
      "Refine, test, deploy, and make sure the website is ready to represent the business confidently.",
    visualType: "launch",
  },
];
