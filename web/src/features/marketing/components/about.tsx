import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';

const About = () => {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-16 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 md:flex-row lg:gap-14">
        {/* Visual / Video Preview Container */}
        <div className="group relative w-full max-w-md shrink-0">
          <div className="shadow-primary/20 border-border/50 bg-muted relative overflow-hidden rounded-2xl border shadow-2xl">
            <img
              className="h-auto max-h-80 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 sm:max-h-105 md:max-h-none"
              src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=600&auto=format&fit=crop"
              alt="PrebuiltUI Team Working"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
          </div>

          <button
            type="button"
            aria-label="Play Intro Video"
            className="border-background/80 bg-background/40 text-foreground hover:bg-background/80 focus-visible:ring-primary absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:outline-none active:scale-95 sm:size-16"
          >
            <Play className="text-primary size-6 translate-x-0.5 fill-current" />
            <span className="border-primary/40 pointer-events-none absolute -inset-1 animate-ping rounded-full border opacity-75" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex max-w-xl flex-col items-start space-y-4 text-left sm:space-y-5">
          {/* Section Badge */}
          <Badge
            variant="outline"
            className="text-primary border-primary/30 bg-primary/5 gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase"
          >
            <Sparkles className="size-3.5" />
            About Us
          </Badge>

          {/* Heading + Curved Underline Decor */}
          <div className="relative">
            <h2 className="text-foreground text-2xl font-bold tracking-tight uppercase sm:text-3xl lg:text-4xl">
              What we do?
            </h2>
            <svg
              width="223"
              height="12"
              viewBox="0 0 223 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary mt-1 w-36 opacity-80 sm:w-48"
              aria-hidden="true"
            >
              <path
                d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Description Paragraphs */}
          <div className="text-muted-foreground space-y-3 text-sm leading-relaxed sm:text-base">
            <p>
              <strong className="text-foreground font-medium">
                PrebuiltUI
              </strong>{' '}
              helps you build faster by transforming your design vision into
              fully functional, production-ready UI components.
            </p>
            <p>
              Whether you're launching a SaaS app, landing page, or dashboard,
              our collection of Tailwind CSS components is crafted to boost your
              development speed and improve user experience.
            </p>
            <p className="hidden sm:block">
              From UI design systems to automation-ready layouts, PrebuiltUI
              empowers you to build beautifully and scale effortlessly.
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="pt-2">
            <Button
              nativeButton={false}
              render={
                <Link to={'#'}>
                  <span>Read more</span>
                  <ArrowRight className="size-4" />
                </Link>
              }
              size="lg"
              className="shadow-primary/20 gap-2 rounded-full px-7 text-sm font-semibold shadow-md transition-all hover:gap-3 active:scale-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
