import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollPipeline from "@/components/ScrollPipeline";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      {/*
        `relative` on main is required — the canvas uses position:absolute
        and must be contained within this element so it covers the full
        document height (not just the viewport).
      */}
      <main className="pt-[72px] relative">
        <ScrollPipeline />
        <Hero />
        <Stats />
        <Services />
        <Work />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}