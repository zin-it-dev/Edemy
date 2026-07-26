import { useState } from 'react';
import { AlertTriangle, Check, Copy, Home, RefreshCw } from 'lucide-react';
import { getErrorMessage, type FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = getErrorMessage(error) ?? 'An unknown error occurred.';
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleGoHome = () => {
    resetErrorBoundary();
    try {
      navigate('/');
    } catch {
      window.location.href = '/';
    }
  };

  const handleCopyError = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      role="alert"
      aria-live="assertive"
      className="relative flex min-h-screen w-full items-center justify-center p-4 bg-background text-foreground overflow-hidden select-none"
    >
      {/* Dynamic Background Glow Effect */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="h-75 w-75 sm:h-112.5 sm:w-112.5 rounded-full bg-destructive/10 dark:bg-destructive/15 blur-[120px] animate-pulse duration-1000" />
      </div>

      <Card className="relative w-full max-w-lg border-border/60 bg-card/75 dark:bg-card/50 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-linear-to-r from-destructive/80 via-destructive to-destructive/40" />

        <CardHeader className="pt-6 sm:pt-8 pb-4 text-center space-y-3">
          {/* Animated Icon Badge */}
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-8 ring-destructive/5 dark:ring-destructive/10 shadow-inner">
            <AlertTriangle className="size-7 animate-bounce animation-duration-[2s]" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/5 font-mono text-[10px] uppercase tracking-wider">
                System Error
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Something went wrong
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs sm:max-w-sm mx-auto leading-relaxed">
              An unexpected issue occurred. We’ve been notified and are actively working on a fix.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-5 sm:px-8">
          {/* Technical Details Console Box */}
          <div className="group relative rounded-2xl border border-border/80 bg-muted/40 dark:bg-muted/20 p-3.5 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-widest">
                Error Stack Trace
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyError}
                className="size-6 text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-lg transition-colors"
                title="Copy error message"
              >
                {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
              </Button>
            </div>

            <code className="block max-h-32 overflow-y-auto font-mono text-[11px] sm:text-xs text-destructive/90 dark:text-destructive break-all whitespace-pre-wrap leading-relaxed pr-1 custom-scrollbar">
              {import.meta.env.DEV ? message : 'An unexpected application error occurred.'}
            </code>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-2.5 px-5 sm:px-8 pb-6 sm:pb-8 pt-2">
          <Button
            onClick={resetErrorBoundary}
            size="lg"
            className="w-full sm:flex-1 gap-2 rounded-xl font-semibold shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98] touch-manipulation"
          >
            <RefreshCw className="size-4 shrink-0" />
            <span>Try again</span>
          </Button>

          <Button
            onClick={handleGoHome}
            size="lg"
            variant="outline"
            className="w-full sm:flex-1 gap-2 rounded-xl font-semibold border-border/80 hover:bg-accent/60 transition-all active:scale-[0.98] touch-manipulation"
          >
            <Home className="size-4 shrink-0" />
            <span>Go to Home</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}