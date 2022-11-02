import Image from 'next/image';
import PropTypes from 'prop-types';

import { mediaPropTypes } from 'utils/types';
import { getStrapiMedia } from 'utils/media';

function NextImage({ media, ...props }) {
  const { url, alternativeText, width, height } = media.data.attributes;

  const loader = ({ src, width }) => {
    return getStrapiMedia(src);
  };

  // The image has a fixed width and height
  if (props.width & props.height) {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ''} {...props} />
    );
  }
  const variants = {
    hidden: { opacity: 0, x: -100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 100, y: 0 },
  };
  // The image is responsive
  return (
    <Image
      loader={loader}
      layout="responsive"
      width={width || '100%'}
      height={height || '100%'}
      objectFit="contain"
      src={url}
      alt={alternativeText || ''}
      priority
    />
  );
}

NextImage.propTypes = {
  media: mediaPropTypes.isRequired,
  className: PropTypes.string,
};

export default NextImage;
