import App from 'next/app';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { DefaultSeo } from 'next-seo';

import { getStrapiMedia } from '../utils/media';
import '../styles/globals.css';
import { getGlobalData } from '../utils/api';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  // Get the data we need on all pages
  const { global } = pageProps;
  if (global == null) {
    return <ErrorPage statusCode={404} />;
  }
  const { metadata, favicon, metaTitleSuffix } = global.attributes;
  const router = useRouter();
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   document.onreadystatechange = () => {
  //     if (document.readyState === 'complete') {
  //       setLoaded(true);
  //     }
  //   };
  //   router.events.on('routeChangeStart', () => {
  //     setLoaded(false);
  //   });
  //   router.events.on('routeChangeComplete', () => {
  //     if (document.readyState === 'complete') {
  //       setLoaded(true);
  //     }
  //   });
  // }, [router.query.slug]);

  return (
    <>
      {/* Favicon */}
      <Head>
        <link rel="icon" href={getStrapiMedia(favicon.data.attributes.url)} />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title={metadata.metaTitle}
        description={metadata.metaDescription}
      />

      <Component {...pageProps} />
    </>
  );
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const globalLocale = await getGlobalData(appContext.router.locale);

  return {
    ...appProps,
    pageProps: {
      global: globalLocale,
    },
  };
};

export default MyApp;
