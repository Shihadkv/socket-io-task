const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// send back the response by broadcasting
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    console.log("Server received the message:", JSON.stringify(data));
    socket.broadcast.emit("receive_message", data);
    console.log("server is sending the message", data )
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});