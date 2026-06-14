import { Outlet } from 'react-router';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
