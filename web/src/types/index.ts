import type { ComponentPropsWithoutRef, ComponentType } from "react";
export type User = {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user';
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  user: User | null;
};

export interface AuthContextType {
  user: User | null
}

export type ListMenuItem = ComponentPropsWithoutRef<'li'> & {
  to: string;
  description: string;
};

export type NavigationItem = {
  title: string;
  to: string;
  children?: ListMenuItem[];
};

export type SibarItem = NavigationItem & {
  end?: boolean;
  icon: any;
};

export type CompanyLogo = {
  Icon: ComponentType<{ className?: string }>;
  altText: string;
};