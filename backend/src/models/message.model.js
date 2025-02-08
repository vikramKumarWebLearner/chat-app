import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("messages", messageSchema);
export default Message;
