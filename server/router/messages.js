import auth from "../middlewares/auth.js";
import express from "express";
import { addMessage, getMessages } from "../controllers/messages.js";
const router = express.Router();

router.post('/messages', auth,  addMessage)
router.get('/messages/:conversationId', auth, getMessages)
export default router;