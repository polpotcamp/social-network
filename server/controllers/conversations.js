import Conversation from "../models/conversation.js";
import UnauthorizedError from "../errors/unauthorized-err.js";
export const createConversation = async (req, res) => {
  if (req.body.senderId !== req.user._id) {
    throw new UnauthorizedError("вы не вы");
  }
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    return next(err);
  }
};
export const getConversationUser = async (req, res) => {
  let userId = req.params.userId;
  userId = userId.replace(":", "");
  if (userId !== req.user._id) {
    throw new UnauthorizedError("вы не вы");
  }
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    return next(err);
  }
};
export const getConversationTwoUsers = async (req, res, next) => {
  let userId = req.params.firstUserId;
  userId = userId.replace(":", "");
  let secondUserId = req.params.secondUserId
  secondUserId = secondUserId.replace(":", "");
  if (userId !== req.user._id) {
   return  next(new UnauthorizedError("вы не вы "));
  }
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [userId, secondUserId] },
    });
    if (!conversation) {
      const newConversation = new Conversation({
        members: [userId, secondUserId],
      });
      const savedConversation = await newConversation.save();
      return res.status(200).json(savedConversation);
    } else {
      return res.status(200).json(conversation);
    }
  } catch (err) {
    return next(err);
  }
};
export const  getConversation = async (req, res, next) => {
  try{
    let convId =req.params.convId
    convId = convId.replace(":", "");
      const conversation = await Conversation.findById(convId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
        }
    return res.status(200).json(conversation);
  }
  catch (err) {
    return next(err);
  }
}
const createConversationFunc = async (senderId, receiverId) => {
  try {
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = await newConversation.save();
    return savedConversation;
  } catch (err) {
    throw err;
  }
};
