import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Invalid password'),
});
