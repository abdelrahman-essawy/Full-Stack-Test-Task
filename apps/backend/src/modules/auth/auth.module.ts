import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtUserStrategy } from './strategies/jwt-user.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { EnvConfig } from '../../config/env.validation';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<EnvConfig>) => ({
        privateKey: configService.get('JWT_SECRET'),
        publicKey: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
          algorithm: 'RS256',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
    }),
    UserModule,
  ],
  providers: [JwtUserStrategy, AuthService],
  controllers: [AuthController],
  exports: [JwtUserStrategy, PassportModule],
})
export class AuthModule {}
