let count = 0;
setInterval(() => {
  count += 1;
  document.querySelector("#app").innerHTML = `
    <input/>
    <button>Click</button>
    <p>count : ${count}</p>
  `;
}, 5000);
