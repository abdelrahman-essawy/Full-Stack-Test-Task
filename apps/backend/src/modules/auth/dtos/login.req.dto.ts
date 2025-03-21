import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Invalid password'),
});

export class LoginReqDto extends createZodDto(loginSchema) {}
