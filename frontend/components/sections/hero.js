import Link from 'next/link';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import ButtonHash from '../elements/button-hash';
import AnimatedImage from '../elements/animated-image';
import HeroImage from '../elements/hero-image';

function Hero({ data }) {
  const {
    title,
    label,
    description,
    media,
    smallTextWithLink,
    buttons,
    decor,
  } = data;

  return (
    <main className="container flex flex-row !pr-0 text-white">
      {/* DECORATION IMAGES */}
      {decor.decorationImages.data?.length === 4 ? (
        <div>
          {/* MINT */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[0] } }}
            speed={-5}
            className="absolute left-0 w-48 bottom-20"
          />
          {/* LEMON */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[1] } }}
            speed={2}
            className="absolute right-20 w-32 blur-[1.5px] invisible lg:visible"
          />
          {/* BLUEBERRY */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[2] } }}
            speed={4}
            className="absolute w-28 left-20 top-20 blur-[1px] -z-10"
          />
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[2] } }}
            speed={1}
            className="absolute w-20 bottom-52 left-1/3 -z-10"
          />
          {/* CHERRY */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[3] } }}
            speed={2}
            className="absolute w-48 bottom-32 right-20 -z-10"
          />
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[3] } }}
            speed={-2}
            className="absolute w-48 bottom-20 right-1/4 blur-[1.5px] flip -z-10"
          />
        </div>
      ) : (
        console.log('Only 4 decoration images are supported. No less no more.')
      )}
      {/* MAIN PART */}
      <div className="flex flex-col justify-center lg:w-1/2">
        <span className="mb-2 text-lg font-bold tracking-widest uppercase text-yellow">
          {label}
        </span>
        <h1 className="my-2 text-5xl font-extrabold">{title}</h1>
        <span className="py-4 text-xl leading-8">{description}</span>
        <div className="text-md">
          <Link href="#">
            <a className="arrow-link">
              {smallTextWithLink}
              <ArrowLongRightIcon className="inline-block w-6 mb-1 ml-1" />
            </a>
          </Link>
        </div>
        <div className="mt-8">
          {buttons.map((button, i) => (
            <ButtonHash key={i} button={button} appearance={button.type} />
          ))}
        </div>
      </div>
      <div className="w-[70rem] mt-12 z-10">
        {/* <NextImage media={media} /> */}
        <HeroImage media={media}/>
      </div>
    </main>
  );
}

export default Hero;
