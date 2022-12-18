import NextImage from './image';
import LocaleSwitch from './locale-switch';
import CustomLink from './custom-link';
import BurgerMenu from './burger-menu';
import Link from 'next/link';

function Navbar({ navbar, pageContext }) {
  return (
    <nav className="z-10 py-4 lg:py-6">
      {/* navbar */}
      <div className="container flex flex-row items-center justify-between font-sans font-medium text-white">
        {/* left */}
        <div className="w-12">
          <Link href="/" passHref>
            <a>
              <NextImage media={navbar.logo} />
            </a>
          </Link>
        </div>
        <ul className="flex-row items-baseline hidden gap-16 list-none lg:flex">
          {navbar.links.map((navLink) => (
            <li
              key={navLink.id}
              className="text-base transition-all duration-200 hover:text-yellow"
            >
              <CustomLink link={navLink}>{navLink.text}</CustomLink>
            </li>
          ))}
        </ul>

        {/* links, media:desktop */}
        {pageContext.localizedPaths && (
          <div className="flex flex-row gap-4">
            <LocaleSwitch pageContext={pageContext} />
            <BurgerMenu navbar={navbar} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
