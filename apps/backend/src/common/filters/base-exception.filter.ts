import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export abstract class BaseExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  protected readonly logger = new Logger(this.constructor.name);

  constructor(protected readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: T, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      `Exception caught: ${exception.message}`,
      exception.stack
    );

    const responseBody = {
      statusCode: httpStatus,
      error: exception.name,
      message: exception.message,
      traceId: request.id || null,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
