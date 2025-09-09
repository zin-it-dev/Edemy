import { Nav } from "react-bootstrap";
import { CiDark } from "react-icons/ci";
import { GoSun } from "react-icons/go";

import useTheme from "@/hooks/use-theme";

type ThemeProps = {
  size: number;
  className?: string;
};

const ThemeToggle = ({ size, className }: ThemeProps) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <Nav.Link onClick={toggleTheme} className={className}>
      {!isDark ? <CiDark size={size} /> : <GoSun size={size} />}
    </Nav.Link>
  );
};

export default ThemeToggle;
