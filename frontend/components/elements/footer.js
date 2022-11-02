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
          <p className="self-center w-2/5">{description}</p>
          <div className="w-1/5">
            <div className="w-10/12 mx-auto">
              <NextImage media={logo} />
            </div>
          </div>
          <div className="flex flex-row flex-wrap w-2/5 gap-4">
            {columns.map(({ id, title, description }) => (
              <div key={id} className="flex flex-col">
                <div className="mb-2 font-bold">{title}</div>
                <Markdown>{description}</Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-black bg-white">
        <div className="container flex flex-row justify-between py-1 text-sm">
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
