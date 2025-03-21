import { createZodDto } from 'nestjs-zod';
import { loginSchema } from '@easygenerator/validations';

export class LoginReqDto extends createZodDto(loginSchema) {}
