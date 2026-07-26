import heroBg from '@/assets/images/hero.png';

const Background = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
      <img
        src={heroBg}
        aria-hidden="true"
        className="h-full w-full object-cover object-center opacity-30 dark:opacity-20 transition-opacity duration-500 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background,hsl(var(--background)))_80%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[350px] sm:size-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
    </div>
  );
};

export default Background;