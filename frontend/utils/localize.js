import { fetchAPI } from './api';

export async function getLocalizedPage(targetLocale, pageContext) {
  const localization = pageContext.localizations.data.find((localization) => {
    return localization.attributes.locale === targetLocale;
  });
  const localePage = await fetchAPI(`/pages/${localization.id}`);
  return localePage;
}

export function localizePath(page) {
  const { locale, defaultLocale, slug } = page;

  // the default locale is not prefixed
  if (locale === defaultLocale) {
    return `/${slug}`;
  }

  // The slug should have a localePrefix
  return `/${locale}/${slug}`;
}

export function getLocalizedPaths(page) {
  const paths = page.locales.map((locale) => {
    return {
      locale: locale,
      href: localizePath({ ...page, locale }),
    };
  });

  return paths;
}
