import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Sparkles } from 'lucide-react';
import Background from './background';

const faqsData = [
  {
    id: 'item-1',
    question: 'Lightning-Fast Performance',
    answer:
      'Built with speed in mind — minimal load times, optimized bundle size, and ultra-fast client-side rendering out of the box.',
  },
  {
    id: 'item-2',
    question: 'Fully Customizable Components',
    answer:
      'Easily adjust styles, structure, and behavior using Tailwind CSS utility classes and TypeScript primitives to match your brand requirements.',
  },
  {
    id: 'item-3',
    question: 'Responsive by Default',
    answer:
      'Every component is meticulously tested across mobile, tablet, desktop, and landscape orientations to ensure a seamless layout.',
  },
  {
    id: 'item-4',
    question: 'Tailwind CSS Powered',
    answer:
      'Built purely using modern Tailwind utility classes. No heavy external CSS libraries or bloated CSS-in-JS runtimes required.',
  },
  {
    id: 'item-5',
    question: 'Dark Mode & Theme Support',
    answer:
      'Seamlessly integrates with next-themes or custom dark mode strategies with automatic system preference detection.',
  },
];

const FAQs = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-12 sm:py-16 lg:py-24 overflow-hidden min-h-dvh">
      {/* Background Component */}
      <Background />

      <div className="container relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        
        {/* Badge Header */}
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-1.5 rounded-full border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md"
        >
          <HelpCircle className="size-3.5" />
          <span>Help Center & FAQ</span>
        </Badge>

        {/* Dynamic Title */}
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
          Frequently Asked Questions
        </h2>

        {/* Subtitle */}
        <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base leading-relaxed text-balance">
          Got questions? We&apos;ve got answers. Proactively clarifying doubts
          helps you build faster with complete confidence.
        </p>

        {/* Shadcn UI Accordion Wrapper */}
        <div className="mt-8 w-full max-w-2xl text-left">
          <Accordion
            className="w-full space-y-3"
          >
            {faqsData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-2xl border border-border/60 bg-card/60 px-4 sm:px-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:shadow-md dark:bg-card/40"
              >
                <AccordionTrigger className="py-4 text-sm font-semibold text-foreground hover:no-underline sm:text-base sm:py-5">
                  <span className="pr-2">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer Prompt */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-xs text-muted-foreground backdrop-blur-xs">
          <Sparkles className="size-3.5 text-primary shrink-0" />
          <span>Still have questions? Reach out to our 24/7 support team.</span>
        </div>
      </div>
    </section>
  );
};

export default FAQs;