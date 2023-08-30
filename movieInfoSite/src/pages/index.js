import { goto } from "../router";

export function getInitialHtml() {
  return `
    <h1>Movie Info</h1>
    <form>
      <input type="search" name="query"/>
      <button type="submit">search</button>
    </form>
  `;
}

export function renderIndex() {
  document.querySelector("#app").innerHTML = getInitialHtml();
  document.body.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    goto(`/search?query=${event.target.query.value}`, { push: true });
  });
}
