import auth from "../middlewares/auth.js";
import express from "express";
import { createConversation, getConversationTwoUsers, getConversationUser, getConversation } from "../controllers/conversations.js";
const router = express.Router();
router.post('/conversations', auth, createConversation)
router.get('/conversations/:userId', auth, getConversationUser)
router.get('/conversations/find/:convId', auth,getConversation )
router.get('/conversations/find/:firstUserId/:secondUserId', auth,getConversationTwoUsers)
export default router;