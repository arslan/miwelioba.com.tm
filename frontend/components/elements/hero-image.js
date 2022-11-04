import AnimatedImage from './animated-image';

function HeroImage({ media }) {
  return (
    <div className="w-full h-96 lg:h-[32rem] scale-[0.60] lg:scale-100 pl-24 lg:pl-0">
      <div className="relative w-5 h-full mx-auto">
        {/* LEMON 1 */}
        <AnimatedImage
          media={{ data: media.data[0] }}
          speed={1}
          className="absolute z-30 w-24 h-32 right-2 top-20"
        />
        {/* BERRIES BOTTOM*/}
        <AnimatedImage
          media={{ data: media.data[1] }}
          speed={0}
          className="absolute h-32 w-44 -right-[5rem] bottom-16"
        />
        {/* BERRIES TOP*/}
        <AnimatedImage
          media={{ data: media.data[1] }}
          speed={0}
          className="absolute w-64 h-32 rotate-[80deg] right-6 top-16"
        />
        {/* MINT */}
        <AnimatedImage
          media={{ data: media.data[2] }}
          speed={1}
          className="absolute z-10 w-56 h-32 -right-12 top-32"
        />
        {/* LEFT JUICE */}
        <AnimatedImage
          media={{ data: media.data[3] }}
          speed={-0.8}
          className="absolute -top-6 -right-2 w-[22rem] h-32"
        />
        {/* ORANGE */}
        <AnimatedImage
          media={{ data: media.data[4] }}
          speed={-0.5}
          className="absolute bottom-0 z-40 h-32 w-72 lg:bottom-28 right-28"
        />
        {/* GRAPEFRUIT */}
        <AnimatedImage
          media={{ data: media.data[5] }}
          speed={0.8}
          className="absolute bottom-0 h-32 lg:bottom-48 w-52 -right-60"
        />
        {/* RIGHT JUICE */}
        <AnimatedImage
          media={{ data: media.data[6] }}
          speed={0.4}
          className="absolute -left-52 -rotate-[8deg] h-32 w-[30rem] z-10"
        />
        {/* LEMON 2 */}
        <AnimatedImage
          media={{ data: media.data[7] }}
          speed={0.4}
          className="absolute h-32 -top-8 w-44 left-24"
        />
      </div>
    </div>
  );
}

export default HeroImage;
