import { start } from "./src/router";
import { routes, getInitialHTML } from "./src/routes";

export { getInitialHTML };

if (typeof window !== "undefined") {
  console.log("initial data", window.__INITIAL_DATA__);
  start({ routes });
}
