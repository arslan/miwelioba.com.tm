import ErrorPage from 'next/error'

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Get the data we need on all pages
  const { global } = pageProps;
  console.log(pageProps)
  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const { metadata, favicon, metaTitleSuffix } = global.attributes

  return <Component {...pageProps} />;
}

export default MyApp;
