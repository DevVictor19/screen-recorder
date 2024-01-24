import { createServer } from "node:http";
import { createWriteStream, createReadStream } from "node:fs";
import { join } from "path";

import express from "express";
import cors from "cors";
import { Server } from "socket.io";

export const app = express();

const workdir = process.cwd();
const filepath = join(workdir, "videos", "video.webm");

app.use(cors({ origin: "http://localhost:5500" }));

app.get("/video", (req, res) => {
  createReadStream(filepath).pipe(res);
});

export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5500",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  let writeStream = createWriteStream(filepath);

  socket.on("start", (data) => {
    console.log("writing: ", data);

    writeStream.write(data);
  });

  socket.on("pause", () => {
    console.log("pause writing the stream");
  });

  socket.on("stop", () => {
    console.log("stop writing the stream");

    if (!writeStream) return;
    writeStream.end();
  });
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
