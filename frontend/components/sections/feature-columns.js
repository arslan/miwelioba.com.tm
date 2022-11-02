import NextImage from '../elements/image';

export default function FeatureColumns({ data }) {
  const { columnFeatures } = data;

  return (
    <div className="container flex flex-row flex-wrap items-center justify-between gap-8 mt-24 text-white mb-36">
      {columnFeatures.map(({ id, title, media }) => (
        <div key={id}>
          <div className="mx-auto mb-2 w-14">
            <NextImage media={media} />
          </div>
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
}
