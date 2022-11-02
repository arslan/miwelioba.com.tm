import Link from 'next/link';
import classNames from 'classnames';

function ButtonContent({ button, appearance, compact }) {
  return (
    <button
      className={classNames(
        // Common classes
        'block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm rounded-full',
        // Full-size button
        {
          'px-8 py-4': compact === false,
        },
        // Compact button
        {
          'px-6 py-3': compact === true,
        },
        // Specific to when the button is primary
        {
          'bg-white text-orange': appearance === 'primary',
        },
        // Specific to when the button is secondary
        {
          'bg-orange text-white': appearance === 'secondary',
        }
      )}
    >
      {button.text}
    </button>
  );
}

function ButtonLink({ button, appearance, compact = false, scroll = false }) {
  return (
    <Link href={button.url} scroll={scroll}>
      <a>
        <ButtonContent
          button={button}
          appearance={appearance}
          compact={compact}
        />
      </a>
    </Link>
  );
}

export default ButtonLink;
