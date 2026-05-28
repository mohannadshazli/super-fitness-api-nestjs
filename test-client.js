const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyMzEwM2UxLWY1NjktNGRhOS04MTBmLWJiMmMwNjY0YzljZSIsImlhdCI6MTc3OTAzMjg4OCwiZXhwIjoxNzc5MTE5Mjg4fQ.AajegkhctAo8WJ5RWXC6ZVNktdCAs9hSyE4nICXxK24"
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  socket.emit("history");
  ask();
});

socket.on("reply", (data) => {
  console.log("\nAI:", data.message);
  ask();
});

socket.on("history", (data) => {
  console.log("\nHISTORY:", data);
});

function ask() {
  rl.question("You: ", (msg) => {
    socket.emit("message", {
      message: msg,
    });
  });
}