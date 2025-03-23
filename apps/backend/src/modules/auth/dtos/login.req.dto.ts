import { loginSchema } from '@easygenerator/validations';
import { createZodDto } from 'nestjs-zod';

export class LoginReqDto extends createZodDto(loginSchema) {}
