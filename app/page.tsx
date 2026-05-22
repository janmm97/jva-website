import { Hero } from "@/components/sections/Hero";
import { IntegrationSphere } from "@/components/sections/IntegrationSphere";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { SocialProof } from "@/components/sections/SocialProof";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntegrationSphere />
      <Services />
      <Products />
      <Process />
      <About />
      <SocialProof />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
