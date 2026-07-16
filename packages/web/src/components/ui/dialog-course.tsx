import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from './field';
import { Input } from './input';
import { Textarea } from './textarea';
import { Switch } from './switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Button } from './button';
import { Spinner } from './spinner';
import { Controller, useForm } from 'react-hook-form';
import { dialogCourseSchema, type DiaglogCourseSchema } from '@/utils/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { SidebarGroupAction } from './sidebar';
import { Plus } from 'lucide-react';
import { useId } from 'react';

type FieldConfig = {
  name: keyof DiaglogCourseSchema;
  label: string;
  description?: string;
  type: 'text' | 'textarea' | 'number' | 'switch' | 'select';
  placeholder?: string;
  min?: number;
  max?: number;
};

const FORM_FIELDS: FieldConfig[] = [
  {
    name: 'topic',
    label: 'Topic',
    description: 'Enter your topic below.',
    type: 'text',
    placeholder: 'Type your topic here.',
  },
  {
    name: 'description',
    label: 'Description (Optional)',
    description: 'Enter your description below.',
    type: 'textarea',
    placeholder: 'Type your description here.',
  },
  {
    name: 'difficulty',
    label: 'Difficulty Level',
    description: 'Select your level of expertise.',
    type: 'select',
  },
];

export function DialogCourse() {
  const DIFFICULTY_ITEMS = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'Advanced', value: 'advanced' },
  ] as const;

  const form = useForm<DiaglogCourseSchema>({
    resolver: zodResolver(dialogCourseSchema),
    defaultValues: {
      topic: '',
      description: '',
      difficulty: 'beginner',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = async (data: DiaglogCourseSchema) => {
    console.log(data);

    const id = toast.loading('Generating...');

    try {
      await new Promise((resolve) => setTimeout(() => resolve({ data }), 2000));

      toast.success('Nofications', {
        id,
        description: "Course generated",
        position: 'bottom-right',
      })
    } catch {
      toast.error('Failed to generate course.', { id });
    }
  };

  const formId = useId();

  return (
    <Dialog>
      <DialogTrigger
        render={
          <SidebarGroupAction>
            <Plus data-icon="inline-start" />{' '}
            <span className="sr-only">Create with AI</span>
          </SidebarGroupAction>
        }
      />
      <DialogContent className="w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>What can I help you learn?</DialogTitle>
          <DialogDescription>
            Generate a personalized course for yourself
          </DialogDescription>
        </DialogHeader>
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
          <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
            <FieldGroup className="mt-3">
              {FORM_FIELDS.map((cfg) => (
                <Controller
                  key={cfg.name}
                  name={cfg.name}
                  control={control}
                  render={({ field, fieldState }) => {
                    const isSwitch = cfg.type === 'switch';

                    return (
                      <Field
                        orientation={isSwitch ? 'horizontal' : 'vertical'}
                        className={isSwitch ? 'max-w-sm' : ''}
                        data-invalid={fieldState.invalid}
                      >
                        {isSwitch ? (
                          <>
                            <FieldContent>
                              <FieldLabel htmlFor={cfg.name}>
                                {cfg.label}
                              </FieldLabel>
                              {cfg.description && (
                                <FieldDescription>
                                  {cfg.description}
                                </FieldDescription>
                              )}
                            </FieldContent>
                            <Switch
                              id={cfg.name}
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                            />
                          </>
                        ) : (
                          <>
                            <FieldLabel htmlFor={cfg.name}>
                              {cfg.label}
                            </FieldLabel>
                            {cfg.description && (
                              <FieldDescription>
                                {cfg.description}
                              </FieldDescription>
                            )}

                            {cfg.type === 'text' && (
                              <Input
                                {...field}
                                value={(field.value as string) || ''}
                                id={cfg.name}
                                placeholder={cfg.placeholder}
                                aria-invalid={fieldState.invalid}
                              />
                            )}

                            {cfg.type === 'textarea' && (
                              <Textarea
                                {...field}
                                value={(field.value as string) || ''}
                                id={cfg.name}
                                placeholder={cfg.placeholder}
                                aria-invalid={fieldState.invalid}
                              />
                            )}

                            {cfg.type === 'select' && (
                              <Select
                                value={(field.value as string) || ''}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Choose a level">
                                    <SelectValue>
                                      {DIFFICULTY_ITEMS.find(
                                        (item) => item.value === field.value,
                                      )?.label ?? ''}
                                    </SelectValue>
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {DIFFICULTY_ITEMS.map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </>
                        )}
                      </Field>
                    );
                  }}
                />
              ))}

              <Field>
                <Button
                  type="submit"
                  form={formId}
                  disabled={!isDirty || !isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Generating...
                    </>
                  ) : (
                    'Generate'
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
