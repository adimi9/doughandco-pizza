import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <br />
      <HomeMenu />
      <section className="text-center my-16" id = "about">  
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader = {'About Us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque expedita eligendi ex deserunt qui provident libero, ullam ad suscipit corrupti ea. Ipsa facilis deserunt voluptate nulla, fugit voluptatum atque ab?
          </p>
          </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t Hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +65 1234 5678
          </a>
        </div>
      </section>
    </>
  );
}
