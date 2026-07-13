import { Coursera } from "@/components/ui/svgs/coursera";
import { Openbootcamp } from "@/components/ui/svgs/openbootcamp";
import { Udacity } from "@/components/ui/svgs/udacity";
import { UdemyDark } from "@/components/ui/svgs/udemyDark";
import { Webdev } from "@/components/ui/svgs/webdev";

export type CompanyLogo = {
    Icon: React.ComponentType<{ className?: string }>;
    altText: string
};

export const companiesData: CompanyLogo[] = [
    {
        Icon: Coursera,
        altText: 'Coursera — leading online learning platform',
    },
    {
        Icon: UdemyDark,
        altText: 'Udemy — global marketplace for online courses',
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