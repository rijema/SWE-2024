import { CustomError } from './custom-error';

export class SweBusinessException extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, SweBusinessException.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
