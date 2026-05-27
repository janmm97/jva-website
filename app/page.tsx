import { Hero } from "@/components/sections/Hero";
import { IntegrationSphere } from "@/components/sections/IntegrationSphere";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntegrationSphere />
      <Process />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
