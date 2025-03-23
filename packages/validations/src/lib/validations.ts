import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Za-z]/, 'At least 1 uppercase letter')
    .regex(/[0-9]/, 'At Least 1 number')
    .regex(/[^A-Za-z0-9]/, 'At least 1 special character'),
});

const extractPasswordRules = (schema: z.ZodString) => {
  return schema._def.checks.map((check) => ({
    // @ts-expect-error - to be fixed
    rule: check.kind === 'min' ? new RegExp(`.{${check.value},}`) : check.regex,
    label: check.message || 'Unnamed rule',
  }));
};

const passwordSchema = signUpSchema.shape.password;
export const passwordRules = extractPasswordRules(passwordSchema);

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Invalid password'),
});
