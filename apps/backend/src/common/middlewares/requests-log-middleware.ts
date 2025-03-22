import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getCorrelationId } from '../utils';

export class RequestsLogMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestsLogMiddleware.name);
  private readonly maxDataLength = 10_000;
  private readonly blacklistMethods = ['OPTIONS'];
  private readonly blacklistPaths = ['/ignore-log'];
  private readonly blacklistResponseData = ['/ignore-body-response'];

  use(request: Request, response: Response, next: NextFunction): void {
    if (this.shouldSkipLog(request)) {
      return next();
    }

    this.logRequest(request);
    this.attachResponseLogger(response);
    next();
  }

  private shouldSkipLog(request: Request): boolean {
    return (
      this.isBlacklisted(request.baseUrl, this.blacklistPaths) ||
      this.blacklistMethods.includes(request.method.toUpperCase())
    );
  }

  private logRequest(request: Request): void {
    this.logger.log({
      reqId: getCorrelationId(request),
      message: `Incoming Request: ${request.method} ${request.baseUrl}`,
      url: request.baseUrl,
      method: request.method,
      query: JSON.stringify(request.query),
      headers: { 'user-agent': request.headers['user-agent'] },
      data: this.truncateData(JSON.stringify(request.body)),
    });
  }

  private attachResponseLogger(response: Response): void {
    const startTime = Date.now();
    const chunks: Buffer[] = [];

    const originalWrite = response.write.bind(response);
    response.write = (chunk: any, ...args: any[]) => {
      if (Buffer.isBuffer(chunk) || typeof chunk === 'string') {
        chunks.push(Buffer.from(chunk));
      }
      return originalWrite(chunk, ...args);
    };

    const originalEnd = response.end.bind(response);
    response.end = (chunk?: any, ...args: any[]) => {
      if (Buffer.isBuffer(chunk) || typeof chunk === 'string') {
        chunks.push(Buffer.from(chunk));
      }
      this.logResponse(
        response,
        Date.now() - startTime,
        Buffer.concat(chunks).toString()
      );
      return originalEnd(chunk, ...args);
    };
  }

  private logResponse(
    response: Response,
    duration: number,
    data: string
  ): void {
    const request = response.req;
    this.logger.log({
      message: `Response: ${request.method} ${request.path} - ${response.statusCode}`,
      url: request.path,
      method: request.method,
      status: response.statusCode,
      responseTime: `${duration}ms`,
      data: this.filterResponseData(data, request.path),
    });
  }

  private isBlacklisted(url: string, blacklist: string[]): boolean {
    return blacklist.some((path) =>
      new RegExp(`^${this.escapeRegExp(path)}`).test(url)
    );
  }

  private filterResponseData(data: string, url: string): string {
    return this.isBlacklisted(url, this.blacklistResponseData)
      ? '*too long*'
      : data;
  }

  private truncateData(data: string): string {
    return data.length > this.maxDataLength ? '*truncated*' : data;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
