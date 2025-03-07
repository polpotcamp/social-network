import express from "express";
import { celebrate, Joi } from "celebrate";
import {
  registration,
  login,
  getUserData,
  getUserById,
  getAllUsers,
  addFollwers,
  addFriends,
} from "../controllers/users.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
router.post(
  "/signup",
  registration
);
router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
router.get("/user/me", auth, getUserData);
router.get("/user/:userId", getUserById);
router.get("/users/", getAllUsers);
router.post("/user/addToFoll",auth, addFollwers);
router.post("/user/addToFriend",auth, addFriends);
export default router;
