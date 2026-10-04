import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { OrbitWire } from "@/components/orbit-wire";
import { Projects } from "@/components/projects";
import { StudioGallery } from "@/components/studio-gallery";
import { Thoughts } from "@/components/thoughts";
import { getOrbitWire } from "@/lib/orbit";

export const revalidate = 3600;

export default async function Home() {
  const wire = await getOrbitWire();
  const liveBoard = wire.posts.find((post) => post.kind === "studio" && post.image);
  const liveNotes = wire.posts.filter((post) => post.kind === "note" && post.text.length >= 48);

  return (
    <main id="main">
      <Hero />
      <OrbitWire wire={wire} />
      <About />
      <Mission />
      <Projects />
      <StudioGallery live={liveBoard} />
      <Thoughts notes={liveNotes} />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
