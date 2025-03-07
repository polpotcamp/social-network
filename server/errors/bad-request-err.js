import { HTTP_STATUS_BAD_REQUEST } from './errors.js';
class BadRequestError extends Error {
  statusCode;
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}
export default BadRequestError;
