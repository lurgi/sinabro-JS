import express from "express";
import cors from "cors";
import movies from "./movie.json" assert { type: "json" };
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  fs.readFile("dist/main.html", (err, file) => {
    res.send(file.toString());
  });
});

app.get("/search", (req, res) => {
  const result = movies.filter((movie) =>
    movie.name.toLowerCase().includes(req.query.query)
  );
  res.json({ result });
});

app.listen(port, () => {
  console.log(`✨ it run on http://localhost:${port}`);
});
