const socket = io();
const $ = (ele) => document.querySelector(ele);
let uname;

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

function displayMessage(msg, type) {
  switch (type) {
    case "me":
      let ele = document.createElement("div");
      ele.classList.add("message", "my-message");
      ele.innerHTML = `
          <div>
          <div class='name'>You</div>
          <div class='text'>${msg.text}</div>
          </div>
        `;
      $(".chat-screen>.messages").append(ele);
      break;

    case "other":
      let _ele = document.createElement("div");
      _ele.classList.add("message", "other-message");
      _ele.innerHTML = `
            <div>
            <div class='name'>${msg.name}</div>
            <div class='text'>${msg.text}</div>
            </div>
          `;
      $(".chat-screen>.messages").append(_ele);
      break;

    case "update":
      let upEle = document.createElement("div");
      upEle.textContent = msg;
      upEle.classList.add("update");
      $(".chat-screen>.messages").append(upEle);
      break;

    default:
      console.log("not found case");
  }

  $(".chat-screen>.messages").scrollTop =
    $(".chat-screen>.messages").scrollHeight -
    $(".chat-screen>.messages").clientHeight;
}

// Events
socket.on("update", (msg) => {
  displayMessage(msg, "update");
});

socket.on("getMessage", (msg) => {
  displayMessage(msg, "other");
});
