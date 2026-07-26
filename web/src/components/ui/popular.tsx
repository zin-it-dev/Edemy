import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star, ArrowUpRight, Flame } from 'lucide-react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const cardData = [
  {
    id: 1,
    title: 'Unlock Your Creative Flow',
    category: 'UI/UX Design',
    rating: '4.9',
    students: '2.4k',
    image:
      'https://images.unsplash.com/photo-1543487945-139a97f387d5?w=1200&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Design Your Digital Future',
    category: 'Full-stack Dev',
    rating: '4.8',
    students: '1.8k',
    image:
      'https://images.unsplash.com/photo-1529254479751-faeedc59e78f?w=1200&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'Build with Passion, Ship with Pride',
    category: 'DevOps & Cloud',
    rating: '5.0',
    students: '3.1k',
    image:
      'https://images.unsplash.com/photo-1618327907215-4e514efabd41?w=1200&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Think Big, Code Smart',
    category: 'AI & Machine Learning',
    rating: '4.9',
    students: '4.2k',
    image:
      'https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=1200&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    title: 'Think Big, Code Smart',
    category: 'AI & Machine Learning',
    rating: '4.9',
    students: '4.2k',
    image:
      'https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=1200&auto=format&fit=crop&q=60',
  },
];

const Popular = () => {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <section className="overflow-hidden py-12 md:py-16">
      <div className="container mx-auto mb-8 max-w-2xl px-4 text-center">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 text-primary mb-3 gap-1.5 px-3 py-1"
        >
          <Flame className="fill-primary size-3.5" />
          <span>Trending Courses</span>
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Popular Learning Paths
        </h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Hand-picked courses designed to elevate your technical skills
        </p>
      </div>

      <div className="container mx-auto max-w-7xl px-6 sm:px-12">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            containScroll: 'trimSnaps',
          }}
          plugins={[plugin.current]}
          className="relative w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {cardData.map((card) => (
              <CarouselItem
                key={card.id}
                className="basis-full pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="border-border/60 bg-card group relative h-96 w-full overflow-hidden rounded-2xl border shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  {/* Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between">
                    <Badge className="bg-background/80 text-foreground border-0 text-[11px] font-medium backdrop-blur-md">
                      {card.category}
                    </Badge>
                    <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span>{card.rating}</span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col justify-end space-y-2 p-4 sm:p-5">
                    <h3 className="line-clamp-2 text-base leading-snug font-bold text-white sm:text-lg">
                      {card.title}
                    </h3>

                    <p className="text-xs text-gray-300">
                      {card.students} students enrolled
                    </p>

                    <div className="translate-y-2 transform pt-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:opacity-0">
                      <Button
                        size="sm"
                        className="h-9 w-full gap-2 rounded-xl bg-white text-xs font-medium text-black shadow-lg hover:bg-white/90"
                      >
                        <span>View Course</span>
                        <ArrowUpRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden sm:block">
            <CarouselPrevious className="border-border/60 bg-background/80 hover:bg-accent -left-4 backdrop-blur-md lg:-left-6" />
            <CarouselNext className="border-border/60 bg-background/80 hover:bg-accent -right-4 backdrop-blur-md lg:-right-6" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Popular;
