import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { Projects } from "@/components/projects";
import { StudioGallery } from "@/components/studio-gallery";
import { Thoughts } from "@/components/thoughts";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Mission />
      <Projects />
      <StudioGallery />
      <Thoughts />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
