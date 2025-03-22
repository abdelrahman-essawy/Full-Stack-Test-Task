import { Request } from 'express';
import { randomUUID } from 'crypto';

export function getCorrelationId(request: Request): string {
  return (request.headers['x-correlation-id'] as string) || randomUUID();
}
