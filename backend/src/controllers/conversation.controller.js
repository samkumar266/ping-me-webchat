import Conversation from "../models/conversation.model.js";

// Create new conversation between two users (if not exists)
export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "Both user IDs are required" });
  }

  try {
    // Check if conversation already exists (between these two users)
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    // Create new conversation
    conversation = new Conversation({
      members: [senderId, receiverId],
    });

    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all conversations for a user
export const getConversations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
