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
        <section className="bg-white">
          <div className="mt-32 md:mt-20 mx-4  md:w-[80vw] md:mx-auto " ><HeroComponent /></div>
        </section>
        <section className="bg-white"><SecondaryHero /></section>
        <section className="px-2  bg-custome-black py-10 mt-10"><Features /></section>
      </main>
      <Footer />
    </div>
  );
}
