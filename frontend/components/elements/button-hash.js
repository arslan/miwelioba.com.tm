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

function ButtonHash({ button, appearance, compact = false }) {
  return (
        <ButtonContent
          button={button}
          appearance={appearance}
          compact={compact}
        />
  );
}

export default ButtonHash;
