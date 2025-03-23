import { createZodDto } from 'nestjs-zod';
import { signUpSchema } from '@easygenerator/validations-nest';

export class SignupReqDto extends createZodDto(signUpSchema) {}
