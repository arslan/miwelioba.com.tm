import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import AnimatedImage from '../elements/animated-image';
import NextImage from '../elements/image';
import ButtonLink from '../elements/button-link';

function ProductGroups({ data }) {
  const { title, subtitle, type, brands, anchor, decor } = data;

  const bgImages = decor?.decorationImages?.data.map((bgImage) => {
    return { data: { ...bgImage } };
  });

  return (
    <div className="container relative">
      {/* DECORATION IMAGES */}
      {decor?.decorationImages.data?.length === 5 ? (
        <div>
          {/* LIME */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[0] } }}
            speed={1}
            className="absolute -right-32 w-52 lg:-right-10 -top-32 -z-10"
          />
          {/* LEMON */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[1] } }}
            speed={2}
            className="absolute right-0 w-48 top-28"
          />
          {/* APPLE */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[2] } }}
            speed={-1}
            className="absolute w-56 top-24 lg:top-0 -left-32 lg:-left-0 -z-10"
          />
          {/* BLUEBERRY */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[3] } }}
            speed={1}
            className="absolute z-10 -top-36 w-28 right-96"
          />
          {/* HALF-APPLE */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[4] } }}
            speed={1}
            className="absolute w-48 -z-10 -left-20 top-32"
          />
        </div>
      ) : (
        console.log('Only 5 decoration images are supported. No less no more.')
      )}
      <div className="flex flex-col text-white " id={anchor}>
        <h2 className="text-center">{title}</h2>
        <h3 className="mt-4 text-lg text-center">{subtitle}</h3>
      </div>
      <div>
        {type === 'carousel' &&
          brands.data.map(({ attributes: { brandName, products } }) => (
            <div key={brandName}>
              {/* <h3 className="mt-12 text-3xl font-black text-white">
                {brandName}
              </h3> */}
              <Swiper
                spaceBetween={50}
                slidesPerView={4}
                className="!overflow-visible h-80 mt-32"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {products.data.map(
                  ({ id, attributes: { title, media, button } }) => (
                    <SwiperSlide className="h-full" key={id}>
                      <div className="relative flex flex-col items-center justify-end h-full transition-transform duration-300 bg-white shadow-sm lg:shadow-md group lg:hover:scale-105 lg:drop-shadow-xl rounded-large">
                        <div className="absolute w-[6.5rem] duration-500 -top-28 lg:group-hover:scale-110">
                          <NextImage media={media} />
                        </div>
                        <span className="font-bold ">{title}</span>
                        <div className="my-4 transition duration-300 lg:hover:scale-105 lg:hover:drop-shadow-md">
                          <ButtonLink
                            button={button}
                            appearance={button.type}
                            compact={true}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          ))}

        {type === 'grid' && (
          <div className="relative mt-12 mb-24">
            {/* DECORATION IMAGES */}
            {bgImages?.length === 8 ? (
              <div>
                {/* LIME */}
                <AnimatedImage
                  media={bgImages[0]}
                  speed={0.2}
                  className="absolute bottom-0 -left-16 w-52 -z-10"
                />
                {/* APPLE */}
                <AnimatedImage
                  media={bgImages[1]}
                  speed={0.3}
                  className="absolute w-48 -top-16 right-20 -z-10"
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
                  className="absolute -z-10 top-56 w-36 left-32"
                />
                {/* BLUEBERRY #2 */}
                <AnimatedImage
                  media={bgImages[3]}
                  speed={0.2}
                  className="absolute  -z-10 flip blur-[1.5px] top-96 w-28 left-[37rem]"
                />
                {/* CHERRY */}
                <AnimatedImage
                  media={bgImages[4]}
                  speed={0.3}
                  className="absolute left-0 w-48 -z-10 top-96"
                />
                {/* BANANA */}
                <AnimatedImage
                  media={bgImages[5]}
                  speed={0.4}
                  className="absolute  -z-10 w-48 left-[37rem] top-12"
                />
                {/* MINT */}
                <AnimatedImage
                  media={bgImages[6]}
                  speed={0.5}
                  className="absolute bottom-0 right-0 w-56 -z-20"
                />
                {/* ORANGE SLICES */}
                <AnimatedImage
                  media={bgImages[7]}
                  speed={0.7}
                  className="absolute w-48 -z-10 -right-16 bottom-96"
                />
              </div>
            ) : (
              console.log(
                'Only 8 decoration images are supported. No less no more.'
              )
            )}
            {brands.data.map(({ attributes: { brandName, products } }) => (
              <div key={brandName}>
                <h3 className="mb-12 text-3xl font-black text-center text-white">
                  {brandName}
                </h3>
                <div className="flex flex-row flex-wrap justify-center gap-4">
                  {products.data.map(
                    ({ id, attributes: { title, media, button } }) => (
                      <div
                        className="relative flex flex-col items-center justify-end mt-32 transition-transform duration-300 bg-white shadow-md select-none w-60 h-80 group hover:scale-105 drop-shadow-xl rounded-large"
                        key={id}
                      >
                        <div className="absolute w-[6.5rem] duration-500 -top-28 group-hover:scale-110">
                          <NextImage media={media} />
                        </div>
                        <span className="font-bold ">{title}</span>
                        <div className="my-4 transition duration-300 hover:scale-105 hover:drop-shadow-md">
                          <ButtonLink
                            button={button}
                            appearance={button.type}
                            compact={true}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGroups;
