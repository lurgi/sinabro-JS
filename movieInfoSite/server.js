import express from "express";
import cors from "cors";
import movies from "./movie.json" assert { type: "json" };
import fs from "fs";
import { getInitialHTML } from "./dist/index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  fs.readFile("index.html", (err, file) => {
    res.send(file.toString().replace("<!--app-->", getInitialHTML["/"]));
  });
});

function getFilteredMovies(keyword) {
  return movies.filter((movie) => movie.name.toLowerCase().includes(keyword));
}

app.get("/search", (req, res) => {
  const filteredMovies = getFilteredMovies(req.query.query);
  const initialData = {
    movies: filteredMovies,
  };
  fs.readFile("index.html", (err, file) => {
    res.send(
      file.toString().replace(
        "<!--app-->",
        `<script>
            window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}
          </script>` + getInitialHTML["/search"](initialData)
      )
    );
  });
});

app.get("/api/search", (req, res) => {
  res.json({ result: getFilteredMovies(req.query.query) });
});

app.listen(port, () => {
  console.log(`✨ it run on http://localhost:${port}`);
});
