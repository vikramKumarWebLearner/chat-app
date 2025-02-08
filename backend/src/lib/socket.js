import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.BACKEND_URL || "http://localhost:5173";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: URL,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// user to connect to the server
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
