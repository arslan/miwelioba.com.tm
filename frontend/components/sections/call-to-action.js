import Link from 'next/link';
import ButtonLink from '../elements/button-link';
import NextImage from '../elements/image';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

import AnimatedImage from '../elements/animated-image';

function CallToAction({ data }) {
  const { ctaFeatures, ctaButton, decor } = data;

  return (
    <div className="container relative px-64 pt-40 pb-20 text-white">
      {/* DECORATION IMAGES */}
      {decor.decorationImages.data?.length === 4 ? (
        <div>
          {/* POMEGRANATE */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[0] } }}
            speed={1}
            className="absolute z-10 w-64 left-30 -top-32"
          />
          {/* PEACHES */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[1] } }}
            speed={-2}
            className="absolute left-0 w-56 -bottom-64"
          />
          {/* TOMATO */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[2] } }}
            speed={-1}
            className="absolute z-10 w-56 right-20 -bottom-64"
          />
          {/* CHERRIES */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[3] } }}
            speed={1}
            className="absolute right-0 z-10 w-64 -top-32"
          />
        </div>
      ) : (
        console.log('Only 4 decoration images are supported. No less no more.')
      )}
      {ctaFeatures.map(({ title, description, link, media }) => (
        <div
          className="relative flex flex-row shadow-2xl bg-orange drop-shadow-xl rounded-large"
          key={title}
        >
          <div className="flex flex-col w-3/5 gap-4 p-8">
            <h2>{title}</h2>
            <p>{description}</p>
            <Link href={link.url}>
              <a className="arrow-link">
                {link.text}
                <ArrowLongRightIcon className="inline-block w-6 mb-1 ml-1" />
              </a>
            </Link>
            <ButtonLink
              button={ctaButton}
              appearance={ctaButton.type}
              compact={false}
            />
          </div>
          <div className="absolute w-[26rem] -right-10 -top-24">
            <NextImage media={media} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CallToAction;
