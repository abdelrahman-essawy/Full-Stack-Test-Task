import { z } from 'zod';
import * as console from 'node:console';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_SYNCHRONIZE: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  DATABASE_MIGRATIONS_RUN: z
    .string()
    .default('true')
    .transform((val) => val === 'true'),
  JWT_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),
  JWT_EXPIRATION: z.string().default('1h'),
  JWT_REFRESH_EXPIRATION: z.string().default('7d'),
});
export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnvVariables(config: Record<string, unknown>) {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    // TODO: use logger
    console.error('Invalid environment variables:', parsed.error.format());
    throw new Error('Invalid environment variables');
  }
  return parsed.data;
}
