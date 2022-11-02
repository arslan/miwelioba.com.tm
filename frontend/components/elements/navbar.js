import NextImage from './image';
import LocaleSwitch from './locale-switch';
import CustomLink from './custom-link';

function Navbar({ navbar, pageContext }) {
  return (
    <nav className="py-6 sm:py-2">
      {/* navbar */}
      <div className="container flex flex-row items-center justify-between font-sans font-medium text-white">
        {/* left */}
        <div className="w-12">
          <NextImage media={navbar.logo} />
        </div>
        <ul className="flex-row items-baseline hidden gap-16 list-none md:flex">
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
          <div>
            <LocaleSwitch pageContext={pageContext} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
