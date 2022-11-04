import ButtonLink from '../elements/button-link';
import NextImage from '../elements/image';
import Markdown from 'react-markdown';
import AnimatedImage from '../elements/animated-image';

function FeatureRow({ data }) {
  const { rowFeatures, featureButton, exclamationText, anchor, decor } = data;

  return (
    <div
      className="container relative flex flex-col pt-12 text-white lg:flex-row mb-36"
      id={anchor}
    >
      {/* DECORATION IMAGES */}
      {decor.decorationImages.data?.length === 5 ? (
        <div>
          {/* KIWI */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[0] } }}
            speed={3}
            className="absolute w-40 lg:-left-10 right-0 lg:-top-32 top-64 -z-10 blur-[2px] lg:blur-none"
          />
          {/* THREE ORANGES */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[1] } }}
            speed={-1.5}
            className="absolute w-48 -bottom-52 lg:-bottom-28 -left-28"
          />
          {/* LIME */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[2] } }}
            speed={-2}
            className="absolute z-10 w-56 top-80 lg:top-32 -right-20"
          />
          {/* LEMON */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[3] } }}
            speed={1}
            className="absolute z-10 w-64 -left-16 -top-20 lg:-top-32 lg:left-1/3"
          />
          {/* CHERRY */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[4] } }}
            speed={1}
            className="absolute bottom-0 z-10 w-48 -right-10 lg:right-56"
          />
        </div>
      ) : (
        console.log('Only 5 decoration images are supported. No less no more.')
      )}
      <div className="w-full shadow-md lg:w-3/4 drop-shadow-xl rounded-3xl overflow-clip">
        <NextImage media={rowFeatures.media} />
      </div>
      <div className="flex flex-col justify-between w-full gap-5 mt-12 lg:mt-0 lg:px-12">
        <h2>{rowFeatures.title}</h2>
        <Markdown>{rowFeatures.description}</Markdown>
        <span className="text-2xl font-bold">{exclamationText}</span>
        {featureButton.map((button) => (
          <ButtonLink
            button={button}
            appearance={button.type}
            compact={false}
            key={button.id}
          />
        ))}
      </div>
    </div>
  );
}

export default FeatureRow;
