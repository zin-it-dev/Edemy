import { Nav } from "react-bootstrap";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import useTheme from "@/hooks/use-theme";

const ThemeToggle = ({ size }: { size: number }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <Nav.Link className="text-primary" onClick={toggleTheme}>
      {!isDark ? <IoMoonOutline size={size} /> : <IoSunnyOutline size={size} />}
    </Nav.Link>
  );
};

export default ThemeToggle;
