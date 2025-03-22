import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  LoginReqDto,
  LoginResDto,
  loginSchema,
  SignupReqDto,
  SignupResDto,
  signUpSchema,
} from './dtos';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { ERROR_MESSAGES } from '../../common/error-messages';
import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '../../common/exceptions';

@ApiBadRequestResponse({
  type: BadRequestException,
})
@ApiInternalServerErrorResponse({
  type: InternalServerErrorException,
})
@ApiUnprocessableEntityResponse({
  type: BadRequestException.VALIDATION_ERROR,
})
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: SignupResDto,
  })
  @ApiException(() => new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS))
  @ApiBody({
    schema: zodToOpenAPI(signUpSchema),
  })
  @ApiOperation({
    summary: 'Signup a new user',
  })
  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto): Promise<SignupResDto> {
    return this.authService.signup(signupReqDto);
  }

  @ApiOkResponse({
    type: LoginResDto,
  })
  @ApiOperation({
    summary: 'Login a user',
  })
  @ApiException(
    () =>
      new UnauthorizedException({
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      })
  )
  @ApiBody({
    schema: zodToOpenAPI(loginSchema),
  })
  @Post('login')
  async login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReqDto);
  }
}
