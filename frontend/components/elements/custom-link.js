import Link from 'next/link';

const CustomLink = ({ link, children, className }) => {
  const isInternalLink = link.url.startsWith('/');
  const isAnchorLink = link.url.startsWith('/#');
  // For internal links, use the Next.js Link component

  if (isInternalLink && !isAnchorLink) {
    return (
      <Link href={link.url}>
        <a className={className}>{children}</a>
      </Link>
    );
  }

  // Plain <a> tags for external links and anchors

  if (isAnchorLink) {
    return (
      <Link href={link.url} className={className} scroll={false}>
        {children}
      </Link>
    );
  }
  if (link.newTab) {
    return (
      <a
        href={link.url}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <a href={link.url} className={className} target="_self">
      {children}
    </a>
  );
};

export default CustomLink;
