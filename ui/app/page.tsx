import Features from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import HeroComponent from "@/components/home/HeroComponent";
import { NavBar } from "@/components/home/NavBar";
import SecondaryHero from "@/components/home/SecondaryHero";
import { ThemeProvider } from "@/components/themes/theme-provider";

export default function Home() {
  return (
    <div className="">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem forcedTheme='light' disableTransitionOnChange>
        <NavBar />
        <main>
          <section className="bg-white">
            <div className="mt-32 md:mt-10 mx-4  md:w-[80vw] md:mx-auto " ><HeroComponent /></div>
          </section>
          <section className="bg-white"><SecondaryHero /></section>
          <section className="px-2  bg-custome-black py-10 mt-10 md:h-[90vh]"><Features /></section>
        </main>
        <footer className="px-2 md:w-[80vw] md:mx-auto">
          <Footer />
        </footer>
      </ThemeProvider>
    </div>
  );
}
