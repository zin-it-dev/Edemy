import type { AuthContextType } from "@/types/data.type";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined)