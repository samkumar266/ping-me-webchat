// backend/models/Media.js
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    publicId: {
      type: String, // Cloudinary ID
    },
    mediaType: {
      type: String, // "image", "video", etc.
      default: "image",
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
