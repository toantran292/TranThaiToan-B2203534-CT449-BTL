import HTTP_STATUS from 'http-status-codes';
export interface IError {
  message: String;
  statusCode: number;
  status: string
}

export interface IErrorResponse {
  message: String;
  statusCode: number;
  status: String;
  serializeErrors(): IError
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status
    }
  }
}

export class BadRequestError extends CustomError {
  statusCode: number = HTTP_STATUS.BAD_REQUEST;
  status: string = 'error';

  constructor(message: string) {
    super(message)
  }
}
