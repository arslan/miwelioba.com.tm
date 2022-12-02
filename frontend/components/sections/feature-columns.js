import NextImage from '../elements/image';

export default function FeatureColumns({ data }) {
  const { columnFeatures } = data;

  return (
    <div className="container flex flex-row flex-wrap items-center justify-between gap-8 mt-12 mb-20 text-white lg:mt-24 lg:mb-36">
      {columnFeatures.map(({ id, title, media }) => (
        <div key={id} className="h-24 mx-auto text-center w-36">
          <div className="mx-auto mb-2 w-14">
            <NextImage media={media} />
          </div>
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
}
