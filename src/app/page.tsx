import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Story } from "@/components/Story";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <Providers>
      <a className="skip" href="#work">
        Skip to the work
      </a>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Work />
        <Experience />
        <Contact />
      </main>
    </Providers>
  );
}
