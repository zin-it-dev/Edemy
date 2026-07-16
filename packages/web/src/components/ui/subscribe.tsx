import { Button } from './button';
import { Field, FieldLabel } from './field';
import { Input } from './input';

const Subscribe = () => {
  return (
    <form>
      <Field>
        <FieldLabel htmlFor="contact">Join our newsletter for regular updates.</FieldLabel>
        <Field orientation="horizontal">
          <Input id="contact" type="email" className="rounded-md" placeholder="Enter your email" />
          <Button variant={'outline'} className="rounded-md px-5 py-3">
            Subscribe
          </Button>
        </Field>
      </Field>
    </form>
  );
};

export default Subscribe;
