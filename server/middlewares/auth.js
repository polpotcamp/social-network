import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-err.js';
const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};
export default function auth(req, res, next) {
  const {authorization} = req.headers;
  if (!authorization) {
    throw next(
      new UnauthorizedError(`Необходима авторизация  ${authorization}`)
    );
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token , 'your_secret_key');
  } catch (err) {
    next(new UnauthorizedError(`Необходима авторизация ${token }`));
    return;
  }
  req.user = payload;
  next();
}

