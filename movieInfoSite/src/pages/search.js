export function getInitialHtml({ movies }) {
  return `
    <h1>Search Results</h1>
    ${movies
      .map(
        (movie) => `
      <div class="movie">
        <p>${movie.name}</p>
        <button type="button">click</button>
      </div>`
      )
      .join("")}`;
}

export async function renderSearch({ searchParams, initialData }) {
  if (!initialData) {
    let movies;
    try {
      const res = await fetch(
        `${
          import.meta.env.DEV ? "http://localhost:3000" : ""
        }/api/search?query=${searchParams.query}`
      ).then((r) => r.json());
      movies = res.result;
    } catch (err) {
      console.log(err);
    }

    document.querySelector("#app").innerHTML = getInitialHtml({ movies });
  }

  Array.from(document.querySelectorAll(".movie")).forEach((element) =>
    element.addEventListener("click", () => {
      console.log("Clicked");
    })
  );
}
