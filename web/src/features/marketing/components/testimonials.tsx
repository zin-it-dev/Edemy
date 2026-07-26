import '@/styles/animations.css';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, MessageSquareQuote } from 'lucide-react';

interface Testimonial {
  id: number;
  description: string;
  image: string;
  name: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    description:
      'PrebuiltUI helped us reduce build time drastically. The components feel production ready and consistent across the product.',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    name: 'Alex Turner',
    company: 'Vercel',
  },
  {
    id: 2,
    description:
      'We shipped our MVP weeks earlier than planned. PrebuiltUI removed a huge amount of repetitive UI work.',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    name: 'Harry Peter',
    company: 'Amazon',
  },
  {
    id: 3,
    description:
      'PrebuiltUI strikes the right balance between flexibility and consistency. It feels like a system built by real product teams.',
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
    name: 'Jason Kim',
    company: 'Flipkart',
  },
  {
    id: 4,
    description:
      'The component structure and tokens system make scaling design incredibly easy. Highly recommended.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop',
    name: 'Sofia Martinez',
    company: 'Linear',
  },
  {
    id: 5,
    description:
      'PrebuiltUI allows me to focus on building features instead of fighting CSS. Everything looks premium right out of the box.',
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
    name: 'Alex Johnson',
    company: 'Microsoft',
  },
  {
    id: 6,
    description:
      'If you’re using Tailwind CSS, PrebuiltUI is a must have. It dramatically speeds up development while keeping the UI clean.',
    image:
      'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200',
    name: 'Emily Karter',
    company: 'Stripe',
  },
  {
    id: 7,
    description:
      'PrebuiltUI strikes the right balance between flexibility and consistency. It feels like a system built by real product teams.',
    image:
      'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png',
    name: 'Christofer Levin',
    company: 'Deloitte',
  },
  {
    id: 8,
    description:
      'PrebuiltUI helped us reduce build time drastically. The components feel production ready and consistent across the product.',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    name: 'Alex Turner',
    company: 'Vercel',
  },
  {
    id: 9,
    description:
      'We shipped our MVP weeks earlier than planned. PrebuiltUI removed a huge amount of repetitive UI work.',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    name: 'Harry Peter',
    company: 'Amazon',
  },
];

const columns = [
  { start: 0, end: 3, className: 'animate-scroll-up-1' },
  { start: 3, end: 6, className: 'hidden md:block animate-scroll-up-2' },
  { start: 6, end: 9, className: 'hidden lg:block animate-scroll-up-3' },
];

const Testimonials = () => {
  const renderCard = (testimonial: Testimonial, index: number) => (
    <Card
      key={`${testimonial.id}-${index}`}
      className="mb-4 border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:bg-card/40"
    >
      <CardContent className="p-5 sm:p-6">
        <Quote className="mb-3 size-5 text-primary/40 sm:size-6" />

        <p className="mb-5 text-xs font-normal leading-relaxed text-muted-foreground sm:text-sm">
          "{testimonial.description}"
        </p>

        <div className="flex items-center gap-3">
          <Avatar className="size-9 border border-border">
            <AvatarImage
              src={testimonial.image}
              alt={testimonial.name}
              className="object-cover"
            />
            <AvatarFallback className="text-xs font-semibold">
              {testimonial.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground sm:text-sm">
              {testimonial.name}
            </span>
            <span className="text-[11px] text-muted-foreground sm:text-xs">
              {testimonial.company}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-12 sm:py-16 lg:py-24 overflow-hidden">
      
      {/* Header Container */}
      <div className="container relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center mb-8 sm:mb-12">
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-1.5 rounded-full border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md"
        >
          <MessageSquareQuote className="size-3.5" />
          <span>Social Proof</span>
        </Badge>

        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
          People love us
        </h2>

        <p className="mt-3 max-w-md text-xs sm:text-base text-muted-foreground leading-relaxed text-balance">
          Don&apos;t just take our word for it. Here&apos;s what our users are saying.
        </p>
      </div>

      {/* Marquee Viewport Container */}
      <div className="group relative w-full max-w-6xl overflow-hidden px-2">
        
        {/* Upper & Lower Masking Gradients (Adapts to Light/Dark mode) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 sm:h-32 bg-gradient-to-b from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 sm:h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Scroll Container Grid */}
        <div className="grid grid-cols-1 gap-4 h-[500px] sm:h-[600px] md:grid-cols-2 lg:grid-cols-3 overflow-hidden no-scroll">
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`${col.className} group-hover:[animation-play-state:paused]`}
            >
              {[
                ...testimonials.slice(col.start, col.end),
                ...testimonials.slice(col.start, col.end),
              ].map((testimonial, index) => renderCard(testimonial, index))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;