import App from 'next/app';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { DefaultSeo } from 'next-seo';
import { InfinitySpin } from 'react-loader-spinner';

import { getStrapiMedia } from '../utils/media';
import '../styles/globals.css';
import { getGlobalData } from '../utils/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  // Get the data we need on all pages
  const { global } = pageProps;
  if (global == null) {
    return <ErrorPage statusCode={404} />;
  }
  const { metadata, favicon, metaTitleSuffix } = global.attributes;
  const router = useRouter();
  const [hasLoaded, setHasLoaded] = useState(undefined);

  useEffect(() => {
    const markLoading = () => {
      setHasLoaded(false);
      console.log('Marked as loading!');
    };
    const markComplete = () => {
      setHasLoaded(true);
      console.log('Marked as complete!');
    };

    if (hasLoaded === undefined && document.readyState === 'complete') {
      markComplete();
    } else {
      window.addEventListener('load', markComplete);
    }

    router.events.on('routeChangeStart', markLoading);
    router.events.on('routeChangeComplete', markComplete);
    router.events.on('routeChangeError', markComplete);

    return () => {
      window.removeEventListener('load', markComplete);

      router.events.off('routeChangeStart', markLoading);
      router.events.off('routeChangeComplete', markComplete);
      router.events.off('routeChangeError', markComplete);
    };
  });

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
      {!hasLoaded && (
        <div
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            padding: '1.5rem',
            textAlign: 'center',
            zIndex: 99,
          }}
          className="relative bg-orange"
        >
          <div className="flex flex-col items-center justify-center w-full h-full ">
            <InfinitySpin width="200" color="#ffffff" />
          </div>
        </div>
      )}

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
