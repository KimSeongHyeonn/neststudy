import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { message: string; error: string; statusCode: number };

    if (typeof error === 'string') {
      response.status(status).json({
        error: error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(status).json({
        ...error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
