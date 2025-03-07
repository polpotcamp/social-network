import { HTTP_STATUS_FORBIDDEN} from './errors.js';
class ForbiddenError extends Error {
   statusCode;
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}
export default ForbiddenError;