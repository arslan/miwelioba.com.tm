import Navbar from './elements/navbar';
import Footer from './elements/footer';

function Layout({ children, global, pageContext }) {
  const { navbar, footer } = global.attributes;
  return (
    <div className="flex flex-col justify-between min-h-screen overflow-hidden">
      <Navbar navbar={navbar} pageContext={pageContext} />
      {children}
      <Footer footer={footer} />
    </div>
  );
}

export default Layout;
