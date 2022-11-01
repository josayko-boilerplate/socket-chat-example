import express from "express";
import http from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  const index = join(fileURLToPath(dirname(import.meta.url)), "index.html");
  res.sendFile(index);
});

io.on("connection", (socket) => {
  console.log("A user just connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
