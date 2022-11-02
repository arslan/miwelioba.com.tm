import { useEffect, useState, useRef, Fragment } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { LanguageIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';
import { localizePath } from 'utils/localize';

import { getLocalizedPage } from 'utils/localize';

function LocaleSwitch({ pageContext }) {
  {
    const isMounted = useRef(false);
    const router = useRouter();
    const [locale, setLocale] = useState();
    const [showing, setShowing] = useState(false);

    const lang = {
      en: 'English',
      ru: 'Русский',
      tk: 'Türkmençe',
    };

    const handleLocaleChange = async (selectedLocale) => {
      // Persist the user's language preference
      // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
      Cookies.set('NEXT_LOCALE', selectedLocale);
      setLocale(selectedLocale);
    };

    const handleLocaleChangeRef = useRef(handleLocaleChange);

    useEffect(() => {
      const localeCookie = Cookies.get('NEXT_LOCALE');
      if (!localeCookie) {
        handleLocaleChangeRef.current(router.locale);
      }

      const checkLocaleMismatch = async () => {
        if (
          !isMounted.current &&
          localeCookie &&
          localeCookie !== pageContext.locale
        ) {
          // Redirect to locale page if locale mismatch

          const localePage = getLocalizedPage(localeCookie, pageContext);
          router.push(
            `${localizePath({ ...pageContext, ...localeCookie })}`,
            `${localizePath({ ...pageContext, ...localeCookie })}`,
            { locale: localePage.locale }
          );
        }
        // setShowing(false)
      };
      setLocale(localeCookie || router.locale);
      checkLocaleMismatch();

      return () => {
        isMounted.current = true;
      };
    }, [locale, router, pageContext]);

    return (
      <Menu as="div" className="relative">
        <Menu.Button className="flex flex-row w-12 h-full">
          <LanguageIcon className="w-6 h-6" />
          <ChevronDownIcon className="w-5 h-5" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 flex flex-col p-2 mt-2 origin-top-right bg-white shadow-lg rounded-2xl w-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
          {pageContext.localizedPaths &&
            pageContext.localizedPaths.map(({ locale, href }) => (
              <Menu.Item key={locale} as={Fragment}>
                {({ active }) => (
                  <button
                    onClick={() => handleLocaleChange(locale)}
                    className={`${
                      active
                        ? 'bg-orange text-white rounded-full'
                        : 'text-black'
                    } p-3 w-full`}
                  >
                    <Link href={href} locale={locale} role="option" passHref>
                      <a>{lang[locale]}</a>
                    </Link>
                  </button>
                )}
              </Menu.Item>
            ))}
        </Menu.Items>
      </Menu>
    );
  }
}

export default LocaleSwitch;
