let routes;

window.addEventListener("popstate", (event) => {
  if (routes[location.pathname]) {
    routes[location.pathname]();
    return;
  }
});

export const goto = (url, { push } = {}) => {
  const pathname = url.split("?")[0];
  const params = Object.fromEntries(new URLSearchParams(url.split("?")[1]));

  if (routes[pathname]) {
    if (push) history.pushState({}, "", url);
    routes[pathname]({
      searchParams: params,
    });
    return;
  }
  location.href = url;
};

export function start(params) {
  routes = params.routes;
  goto(location.pathname + location.search);
}
