import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('authUser') {
  private static readonly JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError';
  private static readonly TOKEN_EXPIRED_ERROR = 'TokenExpiredError';

  override handleRequest(
    err: any,
    user: any,
    info: Error,
    context: any,
    status: any
  ) {
    if (info) {
      if (info.name === JwtUserAuthGuard.JSON_WEB_TOKEN_ERROR) {
        throw new UnauthorizedException('Invalid JWT token.');
      }
      if (info.name === JwtUserAuthGuard.TOKEN_EXPIRED_ERROR) {
        throw new UnauthorizedException('JWT token has expired.');
      }
      throw new UnauthorizedException(info.message);
    }
    if (err) {
      throw err;
    }
    return user;
  }
}
