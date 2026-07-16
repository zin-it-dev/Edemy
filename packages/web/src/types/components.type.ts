import type { ComponentPropsWithoutRef, ComponentType } from "react";

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