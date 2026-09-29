import { Hero } from "@/components/hero/Hero";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { TeamSection } from "@/components/sections/TeamSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main id="home" className="bg-[#010403]">
      <Hero />
      <AboutPrinciples />
      <TeamSection />
      <MissionSection />
      <WorkSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
