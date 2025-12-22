export class HttpError extends Error {
  code: number;
  info: {};

  constructor(message: string, code: number, info: {}) {
    super(message);
    this.code = code;
    this.info = info;
  }
}
