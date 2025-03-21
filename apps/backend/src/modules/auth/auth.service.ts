import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserPayload } from './interfaces/jwt-user-payload.interface';
import { LoginReqDto, LoginResDto, SignupReqDto, SignupResDto } from './dtos';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import {
  BadRequestException,
  UnauthorizedException,
} from '../../common/exceptions';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupReqDto: SignupReqDto): Promise<SignupResDto> {
    const { email, password, name } = signupReqDto;

    const user = await this.userService.findByEmail(email);
    if (user) {
      throw BadRequestException.RESOURCE_ALREADY_EXISTS(
        `User with email ${email} already exists`
      );
    }

    const saltOrRounds = this.SALT_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    // refactored to use the User class constructor
    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.name = name;

    await this.userService.create(newUser);

    return {
      message: 'User created successfully',
    };
  }

  async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const { email, password } = loginReqDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compare(password, <string>user.password);
    if (!isPasswordValid) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid credentials');
    }

    const payload: JwtUserPayload = {
      user: user._id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    delete user.password;

    return {
      message: 'Login successful',
      accessToken,
      user,
    };
  }
}
