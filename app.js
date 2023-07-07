const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
// cors error 해결
app.use(cors());
// json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Bye World!");
});

app.get("/user", (req, res) => {
  res.json({ msg: "User Hello!!" });
});

app.post("/user", cors(), (req, res) => {
  const message = req.body;
  // emit: 소켓에 데이터를 보내는 메서드. (eventName, data)
  // res.socket.server.io.emit("message", message);
  res.status(201).json(message.msg);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 이유를 모르겠네
// 리얼로;
// 주석 추가
// ㅎㅇㅎㅇ
ㄴ;
