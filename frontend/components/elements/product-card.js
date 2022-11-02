import ReactMarkdown from 'react-markdown';

function ProductCard({ data }) {
  const { title, description, propertiesTitle, properties } = data;

  return (
    <div className="flex flex-col w-1/2 gap-4 p-12 bg-white rounded-large">
      <h2>{title}</h2>
      <ReactMarkdown className="flex flex-col gap-6 my-8">
        {description}
      </ReactMarkdown>
      <h3 className="text-orange">{propertiesTitle}</h3>
      <ul>
        {properties.map(({ propertyName, propertyValue }) => (
          <li
            className="flex flex-row justify-between font-mono text-sm"
            key={propertyName}
          >
            <div>{propertyName}</div>
            <div>{propertyValue}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductCard;
