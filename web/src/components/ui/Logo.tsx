import { Link } from 'react-router';
import logo from '@/assets/images/logo.svg';

const Logo = () => {
  return (
    <Link
      to="/"
      className="inline-flex items-center"
      aria-label="Edemy logo"
      title="Edemy"
    >
      <img src={logo} className="size-10 lg:size-11 mr-1" alt="Edemy logo" />
      <span className="italic font-extrabold">Edemy</span>
    </Link>
  );
};

export default Logo;
