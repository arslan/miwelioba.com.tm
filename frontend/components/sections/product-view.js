import NextImage from '../elements/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../elements/product-card';
import AnimatedImage from '../elements/animated-image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';


function ProductView({ data }) {
  const {
    title,
    description,
    propertiesTitle,
    properties,
    button,
    slug,
    media,
    decorationImages,
    thumbnailPicture: mainThumbnail,
    productThumbnails,
  } = data;

  const bgImages = decorationImages?.data.map((bgImage) => {
    return { data: { ...bgImage } };
  });

  const router = useRouter();

  const currentRoute = router.asPath;

  const variants = {
    active: { scale: 1.1, y: -15 },
    default: { scale: 1 },
  };

  return (
    <div className="container relative flex flex-col my-12 lg:flex-row max-w-screen">
      {/* DECORATION IMAGES */}
      {decorationImages?.data?.length === 8 ? (
        <div>
          {/* LIME */}
          <AnimatedImage
            media={bgImages[0]}
            speed={0.2}
            className="absolute bottom-0 w-32 -left-12 lg:-left-16 lg:w-52"
          />
          {/* APPLE */}
          <AnimatedImage
            media={bgImages[1]}
            speed={0.3}
            className="absolute right-0 w-48 -top-16 lg:right-20"
          />
          {/* ORANGE SLICE */}
          <AnimatedImage
            media={bgImages[2]}
            speed={-0.6}
            className="absolute top-0 w-32 -left-2 -z-10"
          />
          {/* BLUEBERRY */}
          <AnimatedImage
            media={bgImages[3]}
            speed={0.6}
            className="absolute w-24 -z-10 lg:z-10 left-12 top-56 lg:w-36 lg:left-32"
          />
          {/* BLUEBERRY #2 */}
          <AnimatedImage
            media={bgImages[3]}
            speed={0.2}
            className="absolute z-10 flip blur-[1.5px] top-96 w-28 left-[30rem] 2xl:left-[37rem]"
          />
          {/* CHERRY */}
          <AnimatedImage
            media={bgImages[4]}
            speed={0.3}
            className="absolute left-0 w-48 -z-10 lg:z-10 top-96"
          />
          {/* BANANA */}
          <AnimatedImage
            media={bgImages[5]}
            speed={0.4}
            className="absolute z-10 w-48 left-[30rem] 2xl:left-[37rem] top-12"
          />
          {/* MINT */}
          <AnimatedImage
            media={bgImages[6]}
            speed={0.5}
            className="absolute bottom-0 z-20 w-56 -right-32 lg:right-0"
          />
          {/* ORANGE SLICES */}
          <AnimatedImage
            media={bgImages[7]}
            speed={0.7}
            className="absolute z-10 w-32 -right-12 lg:w-48 lg:-right-16 lg:bottom-96 top-[30rem]"
          />
        </div>
      ) : (
        console.log('Only 8 decoration images are supported. No less no more.')
      )}
      {/* IMAGES CONTAINER */}
      <div className="flex flex-col w-full lg:w-1/2">
        {/* MAIN IMAGE */}
        <div className="self-center w-[40%] py-12 lg:w-1/4">
          <NextImage media={media} />
        </div>
        {/* THUMBNAILS */}
        <div className="z-20 flex flex-row flex-wrap justify-center my-8 lg:my-0">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            className="h-24 !overflow-visible lg:w-11/12 w-full"
          >
            {productThumbnails.map(
              ({ attributes: { thumbnailPicture, slug } }) => (
                <SwiperSlide className="" key={slug}>
                  <AnimatePresence>
                    <motion.div
                      animate={
                        currentRoute === '/' + slug ? 'active' : 'disabled'
                      }
                      variants={variants}
                      className={`${
                        currentRoute === '/' + slug ? 'drop-shadow-lg' : ''
                      }`}
                    >
                      <Link href={slug} scroll={false}>
                        <a className="flex flex-row w-20 h-20 p-2 bg-white rounded-full lg:p-3 lg:h-24 lg:w-24">
                          <div className="self-center w-full">
                            <NextImage media={thumbnailPicture} />
                          </div>
                        </a>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>

      <ProductCard data={{ title, description, propertiesTitle, properties }} />
    </div>
  );
}

export default ProductView;
