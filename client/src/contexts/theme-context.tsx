import { createContext } from "react";

import type { Theme } from "@/types/theme.type";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
