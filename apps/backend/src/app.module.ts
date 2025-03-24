import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import {
  AllExceptionsFilter,
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
} from './common/filters';
import { ConfigAppModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { Request } from 'express';
import { getCorrelationId } from './common/utils';
import { RequestsLogMiddleware } from './common/middlewares/requests-log-middleware';

// TODO: add 'nestjs-pino'
@Module({
  imports: [
    LoggerModule.forRootAsync({
      // @ts-expect-error - We know this is a valid factory
      useFactory: async () => {
        return {
          pinoHttp: {
            autoLogging: false,
            base: null,
            quietReqLogger: true,
            transport:
              process.env.NODE_ENV !== 'production'
                ? { target: 'pino-pretty' }
                : undefined,
            genReqId: (req: Request) => getCorrelationId(req),
            level: 'debug',
          },
        };
      },
    }),
    ConfigAppModule,
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: BadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    { provide: APP_FILTER, useClass: ForbiddenExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    {
      // Allowing to do validation through DTO
      // Since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
      // their internal exception so that filter can recognize it
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },

    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLogMiddleware).forRoutes('*');
  }
}
