import { Button } from '../../../components/ui/button';
import { Field, FieldLabel } from '../../../components/ui/field';
import { Input } from '../../../components/ui/input';

const Subscribe = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <Field className="space-y-2">
        <FieldLabel
          htmlFor="contact"
          className="text-foreground text-xs font-bold tracking-wider uppercase"
        >
          Join our newsletter for regular updates.
        </FieldLabel>

        <p className="text-muted-foreground text-xs">
          Get regular updates, resources, and career tips directly to your
          inbox.
        </p>

        <Field orientation="responsive">
          <Input
            id="contact"
            type="email" 
            name="email"
            required
            autoComplete="email"
            className="h-10 w-full rounded-md text-sm transition-colors focus-visible:ring-1"
            placeholder="Enter your email"
          />
          <Button type="submit" className="h-10 shrink-0 rounded-md px-5 text-sm font-medium transition-all active:scale-95">
            Subscribe
          </Button>
        </Field>
      </Field>
    </form>
  );
};

export default Subscribe;
