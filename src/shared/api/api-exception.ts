type APIExceptionProps = {
  message: string;
  code?: number;
  additionalInfo?: unknown;
  httpStatus?: number;
};

export class APIException extends Error {
  constructor(public props: APIExceptionProps) {
    super(props.message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
