import { Nav } from "react-bootstrap";
import { CiDark } from "react-icons/ci";
import { GoSun } from "react-icons/go";

import useTheme from "@/hooks/use-theme";

const ThemeToggle = ({ size }: { size: number }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <Nav.Link onClick={toggleTheme}>
      {!isDark ? <CiDark size={size} /> : <GoSun size={size} />}
    </Nav.Link>
  );
};

export default ThemeToggle;
