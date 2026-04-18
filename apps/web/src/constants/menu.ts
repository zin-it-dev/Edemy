type MenuPages = {
  path: string;
  title: string;
};

export const MENU: readonly MenuPages[] = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/about',
    title: 'About',
  },
] as const;
