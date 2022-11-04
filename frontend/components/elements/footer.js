import NextImage from './image';
import Link from 'next/link';
import Markdown from 'react-markdown';

function Footer({ footer }) {
  const { description, logo, columns, copyrightText, copyrightCompany, developer } = footer;

  let copyrightDate = new Date(Date.now());

  return (
    <>
      <div className="p-8 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        <div className="container flex flex-row justify-center gap-12 text-xs text-white">
          <p className="self-center hidden w-2/5 lg:flex">{description}</p>
          <div className="hidden w-1/5 lg:block">
            <div className="w-10/12 mx-auto">
              <NextImage media={logo} />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-center lg:my-auto lg:text-left lg:flex-row lg:flex-wrap lg:w-2/5">
            {columns.map(({ id, title, description }) => (
              <div key={id} className="flex flex-col">
                <div className="mb-2 font-bold">{title}</div>
                <Markdown>{description}</Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-white lg:text-black lg:bg-white bg-orange">
        <div className="container flex flex-col gap-4 py-1 text-xs text-center lg:gap-0 lg:justify-between lg:flex-row">
          <div>
            {copyrightText}{' '}
            {copyrightDate.getFullYear()}
            {' '}
            {copyrightCompany}
           </div>
          <div>
            <Link href={developer.url}>
              <a>
                {developer.text}
                <span className="inline tracking-[0.01em] font-bold">
                  {' '}
                  hillitilsimat.com.tm
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
