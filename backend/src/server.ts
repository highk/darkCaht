import * as express from "express";
import * as socketIo from "socket.io";
import * as cors from "cors";
import * as moment from "moment-timezone";
import * as path from 'path'
import digitalClock from './digitalClock'

moment.tz.setDefault("Asia/Seoul");

const app = express();
const server = require("http").createServer(app);
app.use(cors());
app.options("*", cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const io = socketIo(server);

io.on("connection", function (socket: SocketIO.Socket) {
  console.log("CONNECT: " + socket.id);
  socket.emit("sysMessage", {body: "SOCKET_CONNECT", type: 'info'});
  socket.broadcast.emit("sysMessage", {body: "New User Join", type: 'info'});

  socket.on("message", (data) => {
    if (data.type === "image") {
      const url = data.body.match(/http[s]{0,1}:\/\/.+/g);
      if (url === null) {
        socket.emit("sysMessage", {body: "URL ERROR", type: 'error'});
        return;
      }

      io.emit("message", { ...data, body: url });
      return;
    }

    if (data.type === "time") {
      // socket.emit("sysMessage", moment().format("YYYY-MM-DD HH:mm:ss"));
      socket.emit("sysMessage", {body: digitalClock(moment()), type: 'time'});
      return;
    }

    if(data.type === "clear") {
      socket.emit("command", {type: "clear"})
      return;
    }

    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECT: " + socket.id);
  });
});

const PORT = process.env.PORT || "8080";

server.listen(PORT, function () {
  console.log("Socket IO server listening on port " + PORT);
});
