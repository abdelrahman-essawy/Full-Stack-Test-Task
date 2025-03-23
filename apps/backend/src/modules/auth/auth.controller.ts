import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { zodToOpenAPI } from 'nestjs-zod';
import { LoginReqDto, LoginResDto, SignupReqDto, SignupResDto } from './dtos';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { ERROR_MESSAGES } from '../../common/error-messages';
import { UnauthorizedException } from '../../common/exceptions';
import express from 'express';
import { loginSchema, signUpSchema } from '@easygenerator/validations';
// @ApiBadRequestResponse({
//   type: BadRequestException,
// })
// @ApiInternalServerErrorResponse({
//   type: InternalServerErrorException,
// })
// @ApiUnprocessableEntityResponse({
//   type: BadRequestException.VALIDATION_ERROR,
// })
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
  async login(@Body() loginReqDto: LoginReqDto, @Res() res: express.Response) {
    const { accessToken } = await this.authService.login(loginReqDto);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'User logged in successfully' });
  }
}
