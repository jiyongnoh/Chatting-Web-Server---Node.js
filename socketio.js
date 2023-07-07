const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://main--dainty-halva-ebc3f5.netlify.app",
    ],
    methods: ["GET", "POST"],
  },
});

const port = 3002;
const cors = require("cors");
// cors error 해결
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const message = req.body;
  console.log(message);
  io.emit("message", message);
  res.status(201).json(message);
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });

  socket.on("forceDisconnect", function () {
    socket.disconnect();
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: " + socket.name);
  });
});

server.listen(port, () => {
  console.log(`Socket IO server listening on port ${port}`);
});
