import NextImage from '../elements/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../elements/product-card';
import { useContext } from "react";

function ProductView({ data }) {
  const {
    title,
    description,
    propertiesTitle,
    properties,
    button,
    slug,
    media,
    thumbnailPicture: mainThumbnail,
    productThumbnails,
  } = data;

  const router = useRouter();

  const currentRoute = router.asPath;

  const variants = {
    active: { scale: 1.1, y: -15 },
    default: { scale: 1 },
  };


  return (
    <div className="container flex flex-row my-12 max-w-screen">
      {/* IMAGES CONTAINER */}
      <div className="flex flex-col w-1/2">
        {/* MAIN IMAGE */}
        <div className="self-center w-2/3">
          <NextImage media={media} />
        </div>
        {/* THUMBNAILS */}
        <div className="flex flex-row justify-center gap-4">
          {productThumbnails.map(
            ({ attributes: { thumbnailPicture, slug } }) => (
              <AnimatePresence>
                <motion.div
                  animate={currentRoute === '/' + slug ? 'active' : 'disabled'}
                  variants={variants}
                  className={`${
                    currentRoute === '/' + slug ? 'drop-shadow-lg' : ''
                  }`}
                >
                  <Link href={slug} scroll={false}>
                    <a className="flex flex-row w-24 h-24 p-3 bg-white rounded-full">
                      <div className="self-center w-full">
                        <NextImage media={thumbnailPicture} />
                      </div>
                    </a>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )
          )}
        </div>
      </div>

      <ProductCard data={{ title, description, propertiesTitle, properties }} />
    </div>
  );
}

export default ProductView;
