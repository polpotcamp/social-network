import { HTTP_STATUS_NOT_FOUND } from './errors.js';
class NotFoundError extends Error {
  statusCode;
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}
export default NotFoundError;
