import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IException, IHttpExceptionResponse } from './exceptions.interface';

export abstract class BaseException extends HttpException {
  @ApiProperty({ description: 'Internal error code' })
  code?: number;

  @ApiHideProperty()
  override cause: Error | undefined;

  @ApiProperty({ description: 'Error message' })
  override message: string;

  @ApiProperty({ description: 'Detailed error description' })
  description?: string;

  @ApiProperty({
    description: 'Timestamp of the exception',
    format: 'date-time',
  })
  timestamp: string;

  @ApiProperty({ description: 'Trace ID of the request' })
  traceId: string;

  protected constructor(status: HttpStatus, exception: IException) {
    super(exception.message, status, { cause: exception.cause });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
    this.timestamp = new Date().toISOString();
  }

  setTraceId(traceId: string): void {
    this.traceId = traceId;
  }

  generateHttpResponseBody(message?: string): IHttpExceptionResponse {
    return {
      code: this.code || HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || this.message,
      description: this.description || '',
      timestamp: this.timestamp,
      traceId: this.traceId,
    };
  }
}
