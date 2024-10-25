import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import HeroComponent from "@/components/home/HeroComponent";
import { NavBar } from "@/components/home/NavBar";
import SecondaryHero from "@/components/home/SecondaryHero";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <main>
        <section className="mt-32 md:mt-20  w-[80vw] mx-auto" >
          <HeroComponent />
        </section>
        <section><SecondaryHero /></section>
        <section className="px-2  bg-custome-black md:h-screen py-10"><Features/></section>
      </main>
      <Footer />
    </div>
  );
}

// mx-4 sm:mx-20 md:mx-48 lg:px-60