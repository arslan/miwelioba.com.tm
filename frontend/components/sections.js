import CallToAction from './sections/call-to-action';
import ContactForm from './sections/contact-form';
import FeatureColumns from './sections/feature-columns';
import FeatureRow from './sections/feature-row';
import Hero from './sections/hero';
import ProductGroups from './sections/product-groups';
import ProductView from './sections/product-view';

// Map strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
  ComponentSectionsFeatureColumns: FeatureColumns,
  ComponentSectionsFeatureRow: FeatureRow,
  ComponentSectionsProductGroups: ProductGroups,
  ComponentSectionsCta: CallToAction,
  ComponentSectionsContactForm: ContactForm,
};

function Section({ sectionData }) {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__typename];

  if (!SectionComponent) return null;

  // Display the section
  return <SectionComponent data={sectionData} />;
}

function Sections({ sections }) {
  return (
    <div>
      {/* Show the actual sections of the Page */}
      {Array.isArray(sections) ? (
        sections.map((section) => (
          <Section
            sectionData={section}
            key={`${section.__typename}${section.id}`}
          />
        ))
      ) : (
        <ProductView data={sections} />
      )}
    </div>
  );
}

export default Sections;
