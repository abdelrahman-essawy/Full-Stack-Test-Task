import { z } from 'zod';

export const envSchema = z.object({
  REACT_APP_API_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
});

console.log(env.REACT_APP_API_URL);
