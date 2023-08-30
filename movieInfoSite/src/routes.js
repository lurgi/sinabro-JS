import { renderIndex, getInitialHtml as getInitialHtmlForIndex } from "./pages";
import {
  renderSearch,
  getInitialHtml as getInitialHtmlForSearch,
} from "./pages/search";

export const routes = {
  "/": renderIndex,
  "/search": renderSearch,
};

export const getInitialHTML = {
  "/": getInitialHtmlForIndex,
  "/search": getInitialHtmlForSearch,
};
