export function renderSearch({ searchParams }) {
  document.querySelector("#app").innerHTML = `
  <h1>Search Results</h1>
    <p> keyword : ${searchParams.query} </p>`;
}
