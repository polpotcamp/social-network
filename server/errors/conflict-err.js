import { HTTP_STATUS_CONFLICT } from './errors.js';
class ConflictError extends Error {
   statusCode;
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}
export default ConflictError;
