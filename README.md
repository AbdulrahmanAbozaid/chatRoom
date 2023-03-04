# chatRoom task

## server events code

```JS
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
```

## client events code

```JS
$(".app #join-user").addEventListener("click", (e) => {
  uname = $("#username").value;
  if (uname) {
    socket.emit("newUser", uname);
    $(".join-screen").classList.remove("active");
    $(".chat-screen").classList.add("active");
  }
});

$(".exit-chat").addEventListener("click", (e) => {
  socket.emit("exitUser", uname);
  window.location.reload();
});

$("#send-message").addEventListener("click", (e) => {
  let msg = $("#message-input").value;
  if (msg) {
    socket.emit("sendMessage", { name: uname, text: msg });
    displayMessage({ name: uname, text: msg }, "me");
    $("#message-input").value = "";
  }
});
```

### client response

```JS
socket.on("update", (msg) => {
  displayMessage(msg, "update");
});

socket.on("getMessage", (msg) => {
  displayMessage(msg, "other");
});
```
