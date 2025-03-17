import User from "../models/user.js";
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from "../errors/errors.js";
import bcrypt from "bcryptjs";
import ConflictError from "../errors/conflict-err.js";
import BadRequestError from "../errors/bad-request-err.js";
import UnauthorizedError from "../errors/unauthorized-err.js";
import NotFoundError from "../errors/not-found-err.js";
import jwt from "jsonwebtoken";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import blackList from "../models/blackList.js";
import { extractBearerToken } from "../middlewares/auth.js";
export const logout = async (req, res, next) => {
  console.log('ch')
  try {
    const { authorization } = req.headers;
    const token = extractBearerToken(authorization);
    const checkIfBlacklisted = await blackList.findOne({ token: token });
    if (checkIfBlacklisted) return res.sendStatus(204);
    const newBlacklist = new blackList({
      token: token,
    });
    await newBlacklist.save();
    return res.status(HTTP_STATUS_OK).send({ message: "Вы успешно вышли" });
  } catch (err) {
    console.log('wh')
    return next(err);
  }
};
export const registration = async (req, res, next) => {
  try {
    const { name, about, email, password, secondName } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      next(
        new BadRequestError(
          `Пользователь с почтовым адресом ${email} уже существует`
        )
      );
    }
    if (req.files) {
      let fileName = Date.now().toString() + req.files.avatar.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.avatar.mv(path.join(__dirname, "..", "uploads", fileName));

      bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({
            name: name,
            secondName: secondName,
            avatar: fileName,
            about: about,
            email: email,
            password: hash,
            // activationLink
          })
        )
        .then(() =>
          res.status(HTTP_STATUS_CREATED).send(`вы успешно зарегистрировались`)
        );
    } else
      bcrypt.hash(password, 10).then((hash) =>
        User.create({
          name,
          secondName,
          avatar: "kartinki-znak-voprosa-31.jpg",
          about,
          email,
          password: hash,
          // activationLink
        })
      );
  } catch (error) {
    if (error.name === "ValidationError") {
      next(
        new BadRequestError(
          "Переданы некорректные данные в методы создания карточки"
        )
      );
    } else if (error.code === 11000) {
      next(
        new ConflictError(
          "Переданы некорректные данные в методы создания пользователя"
        )
      );
    }
    return next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Неверный email или пароль");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError("Неверный email или пароль ");
    }
    const payload = {
      _id: user._id,
    };
    const token = jwt.sign(payload, "your_secret_key", { expiresIn: "30d" });
    return res.status(HTTP_STATUS_OK).json(`Bearer ${token}`);
  } catch (err) {
    return next(err);
  }
};
export const getUserData = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user) {
      return res.status(HTTP_STATUS_OK).send({ data: user });
    } else {
      throw new NotFoundError(
        "Пользователь не найден или был запрошен несуществующий роут"
      );
    }
  } catch (err) {
    return next(err);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    userId = userId.replace(":", "");
    const user = await User.findById(userId);
    if (user) {
      return res.status(HTTP_STATUS_OK).send({
        data: {
          name: user.name,
          secondName: user.secondName,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
          followers: user.followers,
          followings: user.followings,
          friends: user.friends,
        },
      });
    } else {
      throw new NotFoundError(
        "Пользователь не найден или был запрошен несуществующий роут"
      );
    }
  } catch (err) {
    return next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { _id: 1 });
    return res.status(HTTP_STATUS_OK).send({ data: users });
  } catch (err) {
    return next(err);
  }
};
export const addFollwers = async (req, res, next) => {
  try {
    const fallower = await User.findByIdAndUpdate(req.body.follower, {
      $push: { followings: req.body.person },
    });
    const person = await User.findByIdAndUpdate(req.body.person, {
      $push: { followers: req.body.follower },
    });
    return res.status(HTTP_STATUS_OK).send({ data: fallower, person });
  } catch (err) {
    return next(err);
  }
};
export const addFriends = async (req, res, next) => {
  try {
    const friendOne = await User.findByIdAndUpdate(req.body.person, {
      $push: { friends: req.body.follower },
      $pull: { followers: req.body.follower },
    });
    const friendTwo = await User.findByIdAndUpdate(req.body.follower, {
      $push: { friends: req.body.person },
      $pull: { followings: req.body.person },
    });
    return res.status(HTTP_STATUS_OK).send({ data: friendOne, friendTwo });
  } catch (err) {
    return next(err);
  }
};
// export const getFollowers =async (req, res, next) => {
//   try {
//     const user = await User.findById(req.body.userId)
//     return res.status(HTTP_STATUS_OK).send({ data: friendOne,friendTwo });
//   } catch (err) {
//     return next(err);
//   }
// };
