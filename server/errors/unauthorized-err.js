import { HTTP_STATUS_UNAUTHORIZED } from './errors.js';
class UnauthorizedError extends Error {
   statusCode ;
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}
export default UnauthorizedError;
