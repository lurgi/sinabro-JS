document.querySelector("#app").innerHTML = `
  <div class="container mx-auto py-8">
    <h1 class="text-5xl font-mono font-extrabold">
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Hello!</span>
    </h1>
    <pre id="result"></pre>
  </div>
`;

async function fetchDatAndDisplay() {
  const API_HOST =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
  const json = await (await fetch(`${API_HOST}/api/test`)).json();
  console.log(json);
  document.querySelector("#result").innerHTML = JSON.stringify(json, null, 2);
}

/*
  CORS
  Cross Origin Resourse Sharing.

  클라이언트의 locailhost는 5173인데, server에서는 3000이다.
  브라우저에서는 다른 origin에서 fetch할 수 없다. (규칙)

  Origin이 다르더라도 Fetching하는 법.
  api 쪽에서 header를 설정해주면 된다.
  브라우저에서 header값을 보고, 안전한지 판단한다.
*/

fetchDatAndDisplay();
