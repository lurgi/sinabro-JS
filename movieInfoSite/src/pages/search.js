export async function renderSearch({ searchParams }) {
  let movies;
  try {
    const res = await fetch(
      `http://localhost:3000/search?query=${searchParams.query}`
    ).then((r) => r.json());
    movies = res.result;
  } catch (err) {
    console.log(err);
  }

  document.querySelector("#app").innerHTML = `
    <h1>Search Results</h1>
    ${movies.map((movie) => `<p>${movie.name}</p>`)}
  `;
}
