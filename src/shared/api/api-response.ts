export class APIResponse<T> {
  code: number;
  message: string;
  data: T;
  additionalInfo: any;

  constructor(code: number, message: string, data: T, additionalInfo?: any) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.additionalInfo = additionalInfo;
  }
}
