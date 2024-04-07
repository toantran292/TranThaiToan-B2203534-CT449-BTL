import HTTP_STATUS from "http-status-codes";
export interface IError {
  message: String;
  statusCode: number;
  status: string;
}

export interface IErrorResponse {
  message: String;
  statusCode: number;
  status: String;
  serializeErrors(): IError;
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
      status: this.status,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode: number = HTTP_STATUS.BAD_REQUEST;
  status: string = "error";

  constructor(message: string) {
    super(message);
  }
}

export class Forbidden extends CustomError {
  statusCode: number = HTTP_STATUS.FORBIDDEN;
  status: string = "forbidden";
  constructor(message: string) {
    super(message);
  }
}

export class TokenExpired extends Error {
  statusCode: number = HTTP_STATUS.UNAUTHORIZED;
  status: string = "token_expired";
  constructor(message: string) {
    super(message);
  }
}

export class ClassValidateError extends CustomError {
  statusCode: number = HTTP_STATUS.BAD_REQUEST;
  status: string = "invalid_data";
  constructor(message: string) {
    super(message);
    // this.errors = errors;
  }
}
