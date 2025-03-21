import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReqDto, LoginResDto, SignupReqDto, SignupResDto } from './dtos';

@ApiBadRequestResponse({
  type: BadRequestException,
})
@ApiInternalServerErrorResponse({
  type: InternalServerErrorException,
})
@ApiUnauthorizedResponse({
  type: UnauthorizedException,
})
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: SignupResDto,
  })
  @HttpCode(200)
  @Post('signup')
  async signup(
    @Body(ValidationPipe) signupReqDto: SignupReqDto
  ): Promise<SignupResDto> {
    return this.authService.signup(signupReqDto);
  }

  @ApiOkResponse({
    type: LoginResDto,
  })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body(ValidationPipe) loginReqDto: LoginReqDto
  ): Promise<LoginResDto> {
    return this.authService.login(loginReqDto);
  }
}
