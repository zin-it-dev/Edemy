import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';

interface CreditsProps {
  used?: number;
  total?: number;
  isCompact?: boolean;
}

const Credits = ({ used = 3, total = 5, isCompact = false }: CreditsProps) => {
  const percentage = Math.min(Math.round((used / total) * 100), 100);
  const remaining = Math.max(total - used, 0);

  if (isCompact) {
    return (
      <div className="relative flex items-center justify-center">
        <Sparkles className="size-4 text-amber-500 fill-amber-500/20" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <div className="text-sidebar-foreground flex items-center gap-1.5 font-medium">
          <Sparkles className="size-3.5 fill-amber-500/20 text-amber-500 shrink-0" />
          <span>Free Trial</span>
        </div>
        <span className="text-muted-foreground font-semibold">
          {remaining}/{total} left
        </span>
      </div>

      <Progress value={percentage} className="h-1.5 w-full" />

      <p className="text-muted-foreground text-[10px] leading-tight">
        {remaining > 0 ? (
          'Refreshes daily or upgrade.'
        ) : (
          <span className="text-destructive font-semibold">
            Out of free credits!
          </span>
        )}
      </p>
    </div>
  );
};

export default Credits;