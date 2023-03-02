const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "/public/")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    socket.broadcast.emit("update", `${username} joined the chat`);
  });

  socket.on("exitUser", (username) => {
    socket.broadcast.emit("update", `${username} exited the chat`);
  });

  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("getMessage", msg);
  });
});

server.listen(3000, () => {
  console.log(`Running On port: 3000`);
});
