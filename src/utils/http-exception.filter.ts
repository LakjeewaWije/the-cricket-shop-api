import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let message =
      exception instanceof HttpException
        ? exception.getResponse()?.['message']
          ? exception.getResponse()?.['message']
          : exception['message']
        : (exception as any).toString();

    response.status(status).json({
      statusCode: status,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: message,
    });
  }
}
