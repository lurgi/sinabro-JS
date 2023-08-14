// import http from "http";
// const hostname = "localhost";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   console.log(`(●'◡'●)`, {
//     url: req.url,
//     method: req.method,
//   });
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });

import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

/* static file middleware */
app.use(express.static("public"));

/* CORS 이슈 해결 */
app.use(cors());

/* 부분적 CORS 이슈 해결 */
app.get("/api/text", cors(), (req, res) => {
  console.log("✨");
  res.json({
    name: "lurgi",
  });
});

app.listen(port, () => {
  console.log(`(●'◡'●)`, `Server running at http://localhost:${port}`);
});
