import { loginSchema } from '@easygenerator/validations-nest';
import { createZodDto } from 'nestjs-zod';

export class LoginReqDto extends createZodDto(loginSchema) {}
