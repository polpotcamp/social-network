import cookieParser from 'cookie-parser';
import express from "express";
import userRouter from "./router/user.js";
import postRouter from './router/post.js'
import commentRouter from './router/comments.js'
import conversationsRouter from './router/conversations.js'
import messageRouter from './router/messages.js'
import { handleError } from './middlewares/handleError.js';
import { errors } from 'celebrate';
import {requestLogger, errorLogger} from './middlewares/logger.js';
import cors from "cors";
import "dotenv/config.js";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload'
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.use(fileUpload())
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'))
app.use(requestLogger);
app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", commentRouter);
app.use("/", conversationsRouter);
app.use("/", messageRouter);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
