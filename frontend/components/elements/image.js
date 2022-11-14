import Image from 'next/image';
import PropTypes from 'prop-types';
import { mediaPropTypes } from 'utils/types';
import { getStrapiMedia } from 'utils/media';

function NextImage({ media, ...props }) {
  const { url, alternativeText, width, height } = media.data.attributes;

  const loader = ({ src, width, quality }) => {
    console.log(src, width, quality)
    return getStrapiMedia(`${src}?w=${width}&q=${quality || 40}&format=webp`);
  };

  // The image has a fixed width and height
  if (props.width & props.height) {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ''} {...props} />
    );
  }

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
