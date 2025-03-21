import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtUserPayload } from '../interfaces/jwt-user-payload.interface';
import { UnauthorizedException } from '../../../common/exceptions';
import { EnvConfig } from '../../../config/env.validation';

interface UserQueryService {
  findById: (id: JwtUserPayload['user']) => Promise<any>;
}

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'authUser') {
  constructor(
    readonly configService: ConfigService<EnvConfig>,
    private readonly userQueryService: UserQueryService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET') as string,
    });
  }

  async validate(payload: JwtUserPayload) {
    const user = await this.userQueryService.findById(payload.user);
    if (!user) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS();
    }
    if (!user.verified) {
      throw UnauthorizedException.USER_NOT_VERIFIED();
    }
    if (payload.code !== user.registerCode) {
      throw UnauthorizedException.REQUIRED_RE_AUTHENTICATION();
    }
    delete user.password;
    return user;
  }
}
