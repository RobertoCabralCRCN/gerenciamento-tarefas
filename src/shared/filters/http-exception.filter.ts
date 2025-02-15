import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ValidationError } from 'class-validator';
import { APIException, APIResponse } from '../api';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException | APIException | ValidationError,
    host: ArgumentsHost,
  ) {
    Logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    if (exception instanceof APIException) {
      return response
        .status(exception.props.httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR)
        .send(
          new APIResponse(
            exception.props.code ?? 5,
            exception.props.message,
            null,
            exception.props.additionalInfo,
          ),
        );
    }
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as {
        message: string[] | string;
        error: string;
        statusCode: number;
      };
      return response
        .status(exception.getStatus())
        .send(
          new APIResponse(
            98,
            Array.isArray(exceptionResponse.message)
              ? exceptionResponse.message.join('; ')
              : exceptionResponse.message,
            null,
          ),
        );
    }
    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(new APIResponse(-1, 'Erro desconhecido', null));
  }
}
