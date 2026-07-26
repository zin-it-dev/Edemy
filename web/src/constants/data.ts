import { Coursera } from '@/components/ui/svgs/coursera';
import { Openbootcamp } from '@/components/ui/svgs/openbootcamp';
import { Udacity } from '@/components/ui/svgs/udacity';
import { Webdev } from '@/components/ui/svgs/webdev';
import type {
  CompanyLogo,
  NavigationItem,
  SibarItem,
} from '@/types';
import {
  BookOpen,
  Compass,
  Gamepad2,
  LayoutDashboard,
  MessageCircle,
  WalletCards,
} from 'lucide-react';

export const companiesData: CompanyLogo[] = [
  {
    Icon: Coursera,
    altText: 'Coursera — leading online learning platform',
  },
  {
    Icon: Openbootcamp,
    altText: 'Openbootcamp — global marketplace for online courses',
  },
  {
    Icon: Udacity,
    altText: 'Udacity — professional nanodegree and training programs',
  },
  {
    Icon: Webdev,
    altText: 'Upleveled — practical upskilling and career growth',
  },
];

export const navigationData: NavigationItem[] = [
  {
    title: 'Courses' as const,
    to: '/courses' as const,
    children: [
      {
        title: 'Frontend',
        description: 'React, Next.js, Tailwind CSS',
        to: '/courses/frontend',
      },
      {
        title: 'Backend',
        description: 'Django, Node.js, NestJS',
        to: '/courses/backend',
      },
      {
        title: 'AI',
        description: 'LLM, LangChain, RAG',
        to: '/courses/ai',
      },
      {
        title: 'Mobile',
        description: 'Flutter, React Native',
        to: '/courses/mobile',
      },
    ] as const,
  },
  {
    title: 'Projects' as const,
    to: '/projects' as const,
  },
  {
    title: 'Pricing' as const,
    to: '/pricing' as const,
  },
  {
    title: 'Guides' as const,
    to: '/guides' as const,
  },
] as const;

export const sidebarData: SibarItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    to: '/dashboard',
    end: true,
  },
  {
    title: 'My Learning',
    icon: BookOpen,
    to: '/dashboard/my-courses',
  },
  {
    title: 'Ask AI Tutor',
    icon: MessageCircle,
    to: '/dashboard/chat',
  },
  {
    title: 'Explore',
    icon: Compass,
    to: '/explore',
  },
  {
    title: 'Game',
    icon: Gamepad2,
    to: '/dashboard/game',
  },
  {
    title: 'Billing',
    icon: WalletCards,
    to: '/dashboard/billing',
  },
];
