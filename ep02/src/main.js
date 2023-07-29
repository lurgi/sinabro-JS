import test from "./test.json?raw";
import { setupProducts, getProductElement } from "./products";
import { setupCart } from "./cart";

function findElement(startingElement, seletor) {
  let currentElement = startingElement;
  while (currentElement) {
    if (currentElement.matches(seletor)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}

async function main() {
  const { updateCount, productById } = await setupProducts({
    container: document.querySelector("#products"),
  });

  const countObj = {};
  const { addProduct, removeProduct, updateCart } = setupCart({
    container: document.querySelector(".cart_items"),
    countObj,
  });

  const increaseCount = (productId) => {
    if (countObj[productId] === undefined || countObj[productId] === 0) {
      countObj[productId] = 1;
      addProduct({
        product: productById(productId),
        count: countObj[productId],
      });
    } else {
      countObj[productId] += 1;
      updateCart({ productId, count: countObj[productId] });
    }
    updateCount({ productId, count: countObj[productId] });
  };

  const decreaseCount = (productId) => {
    if (countObj[productId] === 1) {
      countObj[productId] -= 1;
      removeProduct({ product: productById(productId) });
    } else if (countObj[productId] !== 0) {
      countObj[productId] -= 1;
      updateCart({ productId, count: countObj[productId] });
    }
    updateCount({ productId, count: countObj[productId] });
  };

  document.querySelector(".cart_btn").addEventListener("click", () => {
    document.querySelector("#cart-layer").classList.remove("hidden");
    document.querySelector("body").classList.add("cart_display");
  });
  document.querySelector(".cart_close_btn").addEventListener("click", () => {
    document.querySelector("#cart-layer").classList.add("hidden");
    document.querySelector("body").classList.remove("cart_display");
  });

  document.querySelector("#products").addEventListener("click", (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");
    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });
  document.querySelector(".cart_items").addEventListener("click", (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");
    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });
}

main();
