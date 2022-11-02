import ButtonLink from '../elements/button-link';
import NextImage from '../elements/image';
import Markdown from 'react-markdown';
import AnimatedImage from '../elements/animated-image';

function FeatureRow({ data }) {
  const { rowFeatures, featureButton, exclamationText, anchor, decor } = data;

  return (
    <div
      className="container relative flex flex-row pt-12 text-white mb-36"
      id={anchor}
    >
      {/* DECORATION IMAGES */}
      {decor.decorationImages.data?.length === 5 ? (
        <div>
          {/* KIWI */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[0] } }}
            speed={3}
            className="absolute w-40 -left-10 -top-32"
          />
          {/* THREE ORANGES */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[1] } }}
            speed={-1.5}
            className="absolute w-48 -bottom-28 -left-28"
          />
          {/* LIME */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[2] } }}
            speed={-2}
            className="absolute w-56 top-32 -right-20 -z-10"
          />
          {/* LEMON */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[3] } }}
            speed={1}
            className="absolute z-10 w-64 -top-32 left-1/3"
          />
          {/* CHERRY */}
          <AnimatedImage
            media={{ data: { ...decor.decorationImages?.data[4] } }}
            speed={1}
            className="absolute bottom-0 z-10 w-48 right-56"
          />
        </div>
      ) : (
        console.log('Only 5 decoration images are supported. No less no more.')
      )}
      <div className="w-3/4 shadow-md drop-shadow-xl rounded-3xl overflow-clip">
        <NextImage media={rowFeatures.media} />
      </div>
      <div className="flex flex-col justify-between w-full gap-5 px-12">
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
