import { createZodDto } from 'nestjs-zod';
import { signUpSchema } from '@easygenerator/validations';

export class SignupReqDto extends createZodDto(signUpSchema) {}
