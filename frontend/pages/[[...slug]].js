import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';
import Sections from '@/components/sections';
import { useRouter } from 'next/dist/client/router';
import ErrorPage from 'next/error';
import {
  getGlobalData,
  getPageData,
  fetchAPI,
  getProductData,
  getProductThumbnails,
} from '../utils/api';
import { getLocalizedPaths } from '../utils/localize';

import { AnimatePresence, motion } from 'framer-motion';

const DynamicPage = ({ global, metadata, pageContext, sections }) => {
  // Animations
  const variants = {
    hidden: { opacity: 0, x: -50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 50, y: 0 },
  };

  const router = useRouter();

  // Check if the required data was provided
  if (!router.isFallback && !sections) {
    return <ErrorPage statusCode={404} />;
  }

  if (metadata.shareImage?.data == null) {
    delete metadata.shareImage;
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  };

  return (
    <Layout global={global} pageContext={pageContext}>
    {console.log(global.attributes.decor)}
      <Seo metadata={metadataWithDefaults} />
      <AnimatePresence mode="wait" >
        <motion.div
          variants={variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          key={router.asPath}
          transition={{ type: 'linear' }}
          onAnimationComplete={() => window.scrollTo(0, 0)}
        >
          <Sections sections={sections} />{' '}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export async function getStaticPaths(context) {
  // Get all pages from Strapi

  const pages = await context.locales.reduce(
    async (currentPagesPromise, locale) => {
      const currentPages = await currentPagesPromise;
      const localePages = await fetchAPI('/pages', {
        locale,
        fields: ['slug', 'locale'],
      });
      const localeProducts = await fetchAPI('/products', {
        locale,
        fields: ['slug', 'locale'],
      });
      return [...currentPages, ...localePages.data, ...localeProducts.data];
    },
    Promise.resolve([])
  );

  const paths = pages.map((page) => {
    const { slug, locale } = page.attributes;
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split('/');

    return {
      params: { slug: slugArray },
      // Specify the locale to render
      locale,
    };
  });
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { params, locale, locales, defaultLocale } = context;

  const globalLocale = await getGlobalData(locale);

  // Fetch pages
  const pageData = await getPageData({
    slug: (!params.slug ? [''] : params.slug).join('/'),
    locale,
  });

  // Fetch product pages
  const productData = await getProductData({
    slug: (!params.slug ? [''] : params.slug).join('/'),
    locale,
  });

  // Giving the pate no props will trigger a 404 page
  if (pageData == null && productData == null) {
    return { props: {} };
  }

  // We have the required page data, pass it to the page component
  const {
    metadata,
    localizations = {},
    slug,
  } = pageData == null ? productData.attributes : pageData.attributes;

  // We have the required page data, pass it to the page component
  const { contentSections } = pageData == null ? {} : pageData.attributes;
  const productThumbnails = await getProductThumbnails();

  const productPageData =
    pageData == null ? { ...productData.attributes, ...globalLocale.attributes.decor, productThumbnails } : {};

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  };

  const localizedPaths = getLocalizedPaths(pageContext);

  return {
    props: {
      sections: contentSections || productPageData,
      metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  };
}

export default DynamicPage;
