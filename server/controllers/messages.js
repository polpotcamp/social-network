import Message from "../models/message.js";
export const addMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getMessages = async (req, res) => {
  try {
    let conversationId =req.params.conversationId
    conversationId= conversationId.replace(":", "");
    const messages = await Message.find({
      conversationId: conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
