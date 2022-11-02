import Navbar from './elements/navbar';
import Footer from './elements/footer';

function Layout({ children, global, pageContext }) {
  const { navbar, footer } = global.attributes;
  return (
    <div className="flex flex-col justify-between min-h-screen overflow-hidden">
      <div className="flex-1">
        <Navbar navbar={navbar} pageContext={pageContext} />
        <div>{children}</div>
      </div>
      <Footer footer={footer} />
    </div>
  );
}

export default Layout;
