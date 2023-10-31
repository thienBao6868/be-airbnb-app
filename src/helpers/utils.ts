import { HttpCode } from '@/utils/httpCode';
import { ReasonPhrases } from '@/utils/reasonPhrases';
import { Response } from 'express';

export class AppError extends Error {
  public readonly errorType: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean;
  constructor(message: string, httpCode: HttpCode, errorType: string) {
    super(message);
    this.httpCode = httpCode;
    this.errorType = errorType;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFound extends AppError {
  constructor(
    message: string,
    httpCode = HttpCode.NOT_FOUND,
    errorType = ReasonPhrases.NOT_FOUND,
  ) {
    super(message, httpCode, errorType);
  }
}
interface SendResponse{
    statusCode?: HttpCode;
    success?:boolean;
    data?:object | string | number;
    errors?: string | object; 
    message?: string
}

export class SuccessResponse implements SendResponse{
    statusCode;
    success;
    data;
    errors;
    message;
    constructor(
        props:SendResponse = {
            statusCode: HttpCode.OK,
            success:true,
            data:'oke',
            errors:undefined,
            message:'success',
        }
    )
    {
        this.statusCode = props.statusCode;
        this.success = props.success;
        this.data = props.data;
        this.errors = props.errors;
        this.message = props.message;
    }
    send(res:Response, header = {}){
        return res.status(this.statusCode || HttpCode.OK).json(this);
    }
}
