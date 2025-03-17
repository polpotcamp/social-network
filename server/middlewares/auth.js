import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/unauthorized-err.js";
import blackList from "../models/blackList.js";
export const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};
export default async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = extractBearerToken(authorization);
    const checkIfBlacklisted = await blackList.findOne({
      token: token,
    });
    if (checkIfBlacklisted) throw next(new UnauthorizedError(`Токен устарел`));
    if (!authorization) {
      throw next(
        new UnauthorizedError(`Необходима авторизация  ${authorization}`)
      );
    }
    let payload;
    try {
      payload = jwt.verify(token, "your_secret_key");
    } catch (err) {
      next(new UnauthorizedError(`Необходима авторизация ${token}`));
      return;
    }
    req.user = payload;
    next();
  } catch(err) {
    return next(err);
  }
}
