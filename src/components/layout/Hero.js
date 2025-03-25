import Right from "@/components/icons/Right";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 lg:gap-32"> 
        {/* Text Section */}
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
            <span className="text-orange-700">Pizza</span> and <br />
            friends are <br />
            all we need
          </h1>
          <p className="my-6 text-gray-700 text-base md:text-lg">
            Pizza is the missing piece that makes every day complete, <br />
            a simple yet delicious joy in life.
          </p>
          <div className="flex justify-center md:justify-start gap-4 text-sm">
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-6 py-3 rounded-full">
              Order now
              <Right />
            </button>
            <button className="flex items-center border-0 gap-2 py-3 text-gray-600 font-semibold">
              Learn more
              <Right />
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <Image 
            src='/lady.png' 
            layout='fill'
            objectFit='contain' 
            alt='pizza' 
          />
        </div>
      </div>
    </section>
  );
}
