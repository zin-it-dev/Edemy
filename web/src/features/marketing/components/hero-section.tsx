import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import heroBg from '@/assets/images/hero.png';
import {
  BadgeCheck,
  Sparkles,
  ArrowRight,
  Code2,
  BrainCircuit,
  Rocket,
} from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { companiesData } from '@/constants/data';

const SUGGESTIONS = [
  {
    label: 'React & Next.js',
    icon: Code2,
    prompt: 'Full-stack React & Next.js 15 for beginners',
  },
  {
    label: 'System Design',
    icon: BrainCircuit,
    prompt: 'Advanced System Design & Microservices',
  },
  {
    label: 'AI & RAG Applications',
    icon: Rocket,
    prompt: 'Building AI Agents with RAG & Python',
  },
];

const HeroSection = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    console.log('Generating course for:', prompt);
    // TODO: Chuyển hướng hoặc mở Dialog Course
  };

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-between overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
        <img
          src={heroBg}
          alt="Hero background"
          className="size-full object-cover opacity-15 dark:opacity-30"
        />
        <div className="bg-primary/10 absolute top-1/3 left-1/2 size-75 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:size-125" />
      </div>

      {/* Main Hero Container */}
      <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:gap-8 sm:px-6">
        {/* Badge Link */}
        <Link to="/" className="group inline-flex items-center">
          <Badge
            variant="outline"
            className="border-primary/20 bg-background/60 group-hover:border-primary/50 group-hover:bg-accent gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-all sm:text-sm"
          >
            <BadgeCheck className="text-primary size-4 transition-transform group-hover:scale-110" />
            <span>AI-Powered Platform</span>
            <span className="text-muted-foreground hidden sm:inline">
              • Discover & Learn 🎓
            </span>
          </Badge>
        </Link>

        {/* Dynamic Responsive Heading */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Design, Build & Launch <br className="hidden sm:inline" />
            <span className="from-primary via-primary/80 to-chart-1 bg-linear-to-r bg-clip-text text-transparent">
              Effortless
            </span>{' '}
            Learning Paths
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm leading-relaxed sm:text-base lg:text-lg">
            Build, test, and deliver personalized courses in minutes. Empower
            your journey to master any tech stack with tailored AI guidance.
          </p>
        </div>

        {/* AI Prompt Input Container */}
        <div className="w-full max-w-2xl space-y-3">
          <form
            onSubmit={handleSubmit}
            className="group border-border/80 bg-background/80 focus-within:border-primary focus-within:ring-primary/20 relative rounded-2xl border p-2 shadow-xl backdrop-blur-md transition-all focus-within:ring-2"
          >
            <Textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What do you want to learn today? (e.g. Master Docker & Kubernetes in 2 weeks)..."
              className="placeholder:text-muted-foreground/60 min-h-25 w-full resize-none rounded-xl border-0 bg-transparent p-2 text-sm shadow-none focus-visible:ring-0 sm:min-h-30 sm:p-3 sm:text-base"
            />

            {/* Action Bottom Bar */}
            <div className="border-border/50 flex flex-col items-stretch justify-between gap-3 border-t px-2 pt-2.5 sm:flex-row sm:items-center">
              <span className="text-muted-foreground text-left text-[11px] sm:text-xs">
                ✨ Powered by AI. You can customize modules anytime.
              </span>

              <Button
                type="submit"
                size="default"
                className="w-full gap-2 rounded-xl px-5 font-semibold shadow-md transition-all active:scale-[0.98] sm:w-auto"
                disabled={!prompt.trim()}
              >
                <Sparkles className="size-4" />
                <span>Generate</span>
                <ArrowRight className="hidden size-4 sm:inline" />
              </Button>
            </div>
          </form>

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 sm:gap-2">
            <span className="text-muted-foreground mr-1 hidden text-xs sm:inline">
              Try asking:
            </span>
            {SUGGESTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPrompt(item.prompt)}
                  className="border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors active:scale-95 sm:text-xs"
                >
                  <Icon className="text-primary size-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust Companies Section */}
      <div className="container mx-auto max-w-5xl px-4 pt-10 sm:pt-16">
        <p className="text-muted-foreground/60 mb-6 text-center text-[10px] font-semibold tracking-widest uppercase sm:text-xs">
          Trusted by developers from global tech teams
        </p>

        <div className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-4 sm:gap-8 md:gap-12">
          {companiesData.map((item) => {
            const CompanyIcon = item.Icon;
            return (
              <div
                key={item.altText}
                className="text-muted-foreground/50 hover:text-foreground flex h-10 w-full items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <CompanyIcon className="h-6 w-auto max-w-[85%] object-contain sm:h-7 sm:max-w-full md:h-8" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
