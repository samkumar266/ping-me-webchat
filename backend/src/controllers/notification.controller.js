import Notification from "../models/notification.model.js";

// Create a new notification (e.g., from message controller)
export const createNotification = async (req, res) => {
  try {
    const { userId, type, content } = req.body;

    const notification = new Notification({
      user: userId,
      type,
      content,
    });

    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all notifications for the logged-in user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const notifId = req.params.id;

    const updated = await Notification.findByIdAndUpdate(
      notifId,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error marking notification as read:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mark all notifications as read for logged-in user
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.updateMany(
      { user: userId, isRead: false },    // 🔍 condition
      { $set: { isRead: true } }          // ✅ update
    );
    console.log("Matched:", result.matchedCount, "Modified:", result.modifiedCount);

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all notifications as read:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
