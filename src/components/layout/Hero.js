import Right from "@/components/icons/Right";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12 flex items-center justify-center gap-[250px]"> {/* Centering both sections with gap */}
        {/* Text Section */}
        <div className="max-w-lg mt-6"> {/* Reduced margin-top to mt-4 */}
          <h1 className="text-7xl font-semibold leading-12">
            <span className="text-orange-700">Pizza</span>&nbsp;and <br />
            friends are <br />
            all we need <br />
          </h1>
          <p className="my-6 text-gray-700 text-base">
            Pizza is the missing piece that makes every day complete, <br />
            a simple yet delicious joy in life
          </p>
          <div className="flex gap-4 text-sm">
            <button className="flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
              Order now
              <Right />
            </button>
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
              Learn more
              <Right />
            </button>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="relative w-96 h-96 md:w-96 md:h-96"> {/* Image stays on the right */}
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